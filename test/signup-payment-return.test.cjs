const assert = require("node:assert/strict");
const { test } = require("node:test");
const path = require("node:path");
const { buildSync } = require("esbuild");

// Render the real payment step without a browser or payment-provider calls.
require.extensions[".css"] = () => {};
const bundle = buildSync({
  stdin: {
    contents: `
      import React from 'react';
      import { renderToStaticMarkup } from 'react-dom/server';
      import { ChakraProvider } from '@chakra-ui/react';
      import PaymentStep from './src/pages/auth/components/payment-step';
      export const render = (props) => renderToStaticMarkup(
        <ChakraProvider><PaymentStep {...props} /></ChakraProvider>
      );`,
    resolveDir: path.resolve(__dirname, ".."),
    loader: "tsx",
  },
  bundle: true,
  platform: "node",
  format: "cjs",
  packages: "external",
  jsx: "automatic",
  define: { "import.meta.env": "{}" },
  write: false,
});
const compiled = { exports: {} };
new Function("require", "module", "exports", bundle.outputFiles[0].text)(
  require,
  compiled,
  compiled.exports,
);

function render(confirmation, data = { status: "PaymentRequired" }) {
  return compiled.exports.render({
    status: {
      isPending: false,
      isError: false,
      error: null,
      data,
      refetch() {},
    },
    takingLonger: false,
    token: "synthetic-signup-session",
    seats: 3,
    catalogRefetch() {},
    setStep() {},
    confirmation: {
      pending: false,
      paused: false,
      error: null,
      recheck() {},
      ...confirmation,
    },
  });
}

for (const [name, confirmation, expected] of [
  [
    "initial return before verification resolves",
    { pending: true },
    "Confirming your payment",
  ],
  [
    "provider still processing",
    { paymentStatus: "Pending" },
    "Confirming your payment",
  ],
  [
    "verification error",
    { error: new Error("Temporary verification failure") },
    "Check payment status",
  ],
  [
    "polling timeout",
    { paymentStatus: "Pending", paused: true },
    "Check payment status",
  ],
  ["manual review", { paymentStatus: "Review" }, "Check payment status"],
  [
    "paid before workspace status catches up",
    { paymentStatus: "Paid" },
    "Payment confirmed. We’re preparing your workspace",
  ],
]) {
  test(`${name}: protects the return from displaying checkout`, () => {
    const html = render(confirmation);
    assert.ok(html.includes(expected));
    assert.ok(!html.includes("<form"));
    assert.ok(!html.includes("Pay online with"));
    assert.ok(html.includes("You don’t need to pay again"));
  });
}

test("confirmed payment moves into the existing workspace creation state", () => {
  const html = render(
    { paymentStatus: "Paid" },
    { status: "Provisioning", paymentConfirmed: true },
  );
  assert.ok(html.includes("Payment confirmed. Your account is being created"));
  assert.ok(!html.includes("<form"));
});

test("a verified failure allows the existing recovery flow", () => {
  const html = render(
    { paymentStatus: "Failed" },
    { status: "PaymentRequired", order: { status: "Failed" } },
  );
  assert.ok(!html.includes("Confirming your payment"));
  assert.ok(html.includes("Choose a plan"));
});
