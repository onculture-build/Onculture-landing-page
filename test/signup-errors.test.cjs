const assert = require("node:assert/strict");
const { test } = require("node:test");
const path = require("node:path");
const { buildSync } = require("esbuild");

const bundle = buildSync({
  entryPoints: [
    path.resolve(__dirname, "../src/services/queries/signup-checkout.ts"),
  ],
  bundle: true,
  platform: "node",
  format: "cjs",
  packages: "external",
  define: { "import.meta.env": "{}" },
  write: false,
});
const compiled = { exports: {} };
new Function("require", "module", "exports", bundle.outputFiles[0].text)(
  require,
  compiled,
  compiled.exports,
);
const { signupError, signupValidationErrors } = compiled.exports;
const payload = {
  message: "Validation failed",
  errors: { "companyInfo.phone": ["phone must be a valid phone number"] },
};

for (const [name, error] of [
  [
    "Axios response rejected by the interceptor",
    { status: 400, data: payload },
  ],
  ["Axios error", { response: { status: 400, data: payload } }],
  ["raw response body", payload],
]) {
  test(`${name} exposes the actionable phone validation`, () => {
    const message = signupError(error);
    assert.match(message, /company phone number with its country code/);
    assert.doesNotMatch(message, /Validation failed|companyInfo/);
    assert.equal(signupValidationErrors(error)["companyInfo.phone"], message);
  });
}

test("multiple invalid fields are preserved with readable labels", () => {
  const error = {
    data: {
      message: "Validation failed",
      errors: {
        "companyInfo.name": ["name should not be empty"],
        "userInfo.email": ["email must be an email"],
        selectedPriceId: ["selectedPriceId must be a UUID"],
      },
    },
  };
  const fields = signupValidationErrors(error);
  assert.equal(Object.keys(fields).length, 3);
  assert.match(
    signupError(error),
    /Company name:.*Admin email:.*Subscription plan:/,
  );
});

test("empty validation payloads have a useful fallback", () => {
  assert.equal(
    signupError({ data: { message: "Validation failed", errors: {} } }),
    "Please check the information you entered and try again.",
  );
});

test("business errors and message arrays remain visible", () => {
  assert.equal(
    signupError({ data: { message: "This domain is already registered" } }),
    "This domain is already registered",
  );
  assert.equal(
    signupError({
      data: { message: ["Choose a plan", "Enter an employee count"] },
    }),
    "Choose a plan. Enter an employee count",
  );
});

test("network failures explain the recovery action", () => {
  assert.match(
    signupError(new Error("Network Error")),
    /Check your connection and try again/,
  );
});

test("server failures do not expose database diagnostics", () => {
  const message = signupError({
    status: 500,
    data: { message: "Invalid prisma query: internal_table" },
  });
  assert.match(message, /Something went wrong on our side/);
  assert.doesNotMatch(message, /prisma|internal_table/);
});
