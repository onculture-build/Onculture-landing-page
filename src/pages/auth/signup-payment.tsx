import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Box,
  Flex,
  RadioGroup,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import CustomButton from "../../components/custom-button";
import CustomInput from "../../components/custom-input";
import CustomRadioButton from "../../components/custom-radio-button";
import {
  formatPlanPrice,
  PlanPrice,
  PublicPlan,
} from "../../services/queries/subscriptions.query";
import {
  signupRequest,
  signupError,
} from "../../services/queries/signup-checkout";
import toast from "react-hot-toast";

export default function SignupPayment({
  token,
  state,
  plan,
  price,
  seats,
  refresh,
  onDone,
  onBack,
}: {
  token: string;
  state: any;
  plan: PublicPlan;
  price: PlanPrice;
  seats: number;
  refresh: () => unknown;
  onDone: () => void;
  onBack: () => void;
}) {
  const [method, setMethod] = useState("Online");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [key, setKey] = useState(
    () => sessionStorage.getItem("signup-payment-key") || crypto.randomUUID(),
  );
  const currentOrder =
    state.order?.status === "Failed" || state.order?.priceId !== price.id
      ? null
      : state.order;
  const invoice = currentOrder?.invoice;
  const quote = useQuery({
    queryKey: ["signup-quote", token, state.priceId, state.seats],
    enabled: !currentOrder,
    queryFn: () => signupRequest(token, "/quote", {}),
    retry: false,
  });
  useEffect(() => {
    if (state?.order?.status === "Failed") {
      const next = crypto.randomUUID();
      setKey(next);
      sessionStorage.setItem("signup-payment-key", next);
    }
  }, [state?.order?.id, state?.order?.status]);
  const total =
    currentOrder?.amountMinor ??
    quote.data?.amountMinor ??
    price.unitAmountMinor *
      (price.perSeat ? Math.max(price.unitAmountMinor ? 3 : 1, seats) : 1);
  const money = formatPlanPrice({ ...price, unitAmountMinor: total });
  const nextBillingDate = currentOrder?.periodEnd || quote.data?.periodEnd;
  const formattedNextBillingDate = nextBillingDate
    ? new Date(nextBillingDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : null;
  const online = (order: any) => {
    if (order?.checkoutUrl) window.location.assign(order.checkoutUrl);
    else refresh();
  };
  const action = async (work: () => Promise<unknown>) => {
    setError("");
    setBusy(true);
    try {
      await work();
    } catch (e) {
      setError(signupError(e));
    } finally {
      setBusy(false);
    }
  };
  const selectMethod = (value: string) => {
    if (value === method) return;
    setMethod(value);
    const next = crypto.randomUUID();
    setKey(next);
    sessionStorage.setItem("signup-payment-key", next);
  };
  const pay = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    sessionStorage.setItem("signup-payment-key", key);
    action(async () => {
      const result = await signupRequest(token, "/payment", {
        idempotencyKey: key,
        method,
        email: String(values.get("billingEmail")),
        taxId: String(values.get("taxId") || ""),
        address: "",
      });
      if (result.active) return onDone();
      if (result.invoice) {
        refresh();
        return;
      }
      online(result);
    });
  };
  const upload = (file?: File) =>
    action(async () => {
      if (!file) return;
      if (file.size > 10 * 1024 * 1024)
        throw new Error("Please use a receipt smaller than 10 MB.");
      const signed = await signupRequest(
        token,
        `/invoices/${invoice.id}/upload`,
        { name: file.name, type: file.type },
      );
      const result = await fetch(signed.signedUrl, {
        method: "PUT",
        headers: { "Content-Type": file.type },
        body: file,
      });
      if (!result.ok)
        throw new Error("Receipt upload failed. Please try again.");
      await signupRequest(token, `/invoices/${invoice.id}/receipt`, {
        key: signed.key,
      });
      toast.success("Receipt submitted for review.");
      refresh();
    });
  if (invoice && invoice.status !== "Online")
    return (
      <Stack maxW="480px" mx="auto" spacing={5}>
        <Text textAlign="center">
          {invoice.status === "UnderReview"
            ? "Your payment is under review"
            : invoice.status === "Rejected"
              ? "Please submit another receipt"
              : "Your invoice is ready"}
        </Text>
        {invoice.reviewReason && (
          <Text role="alert" color="red.600">
            {invoice.reviewReason}
          </Text>
        )}
        <Box border="1px solid" borderColor="gray.200" p={5} borderRadius="4px">
          <Flex justify="space-between">
            <Text>Invoice</Text>
            <Text color="brand.primary.600">{invoice.reference}</Text>
          </Flex>
          <Flex justify="space-between" mt={3}>
            <Text>Amount due</Text>
            <Text fontWeight={600}>{money}</Text>
          </Flex>
          {Object.entries(invoice.bankDetails as Record<string, string>).map(
            ([key, value]) => (
              <Flex key={key} justify="space-between" mt={3} gap={3}>
                <Text>
                  {(
                    {
                      bankName: "Bank",
                      accountName: "Account name",
                      accountNumber: "Account number",
                    } as Record<string, string>
                  )[key] || key}
                </Text>
                <Text>{value}</Text>
              </Flex>
            ),
          )}
          <Text fontSize="14px" color="gray.600" mt={4}>
            Use {invoice.reference} as your transfer reference.
          </Text>
        </Box>
        {["Issued", "Rejected"].includes(invoice.status) && (
          <Box
            as="label"
            p={6}
            textAlign="center"
            border="1px dashed"
            borderColor="purple.200"
            cursor="pointer"
          >
            <Text>Upload your payment receipt</Text>
            <Text fontSize="14px" color="gray.600">
              JPG, PNG or PDF · up to 10 MB
            </Text>
            <CustomInput
              aria-label="Payment receipt"
              isFile
              h="44px"
              accept="image/jpeg,image/png,application/pdf"
              isDisabled={busy}
              onChange={(event) => {
                const input = event.target as HTMLInputElement;
                upload(input.files?.[0]);
                input.value = "";
              }}
            />
          </Box>
        )}
        <Text fontSize="13px" color="gray.600">
          An OnCulture administrator must confirm payment before we create your
          workspace. We’ll email your account setup link once it’s ready.
        </Text>
        {error && (
          <Text role="alert" color="red.600">
            {error}
          </Text>
        )}
        <Flex gap={3}>
          {invoice.status !== "UnderReview" && (
            <CustomButton
              variant="outline"
              w="full"
              h="44px"
              padding={2}
              loading={busy}
              onClick={() =>
                action(async () =>
                  online(
                    await signupRequest(
                      token,
                      `/invoices/${invoice.id}/online`,
                      {},
                    ),
                  ),
                )
              }
            >
              Pay online instead
            </CustomButton>
          )}
          <CustomButton w="full" h="44px" padding={2} onClick={() => refresh()}>
            Check payment status
          </CustomButton>
        </Flex>
      </Stack>
    );
  return (
    <Stack spacing={4}>
      {(error || state?.order?.status === "Failed") && (
        <Box role="alert" bg="red.50" color="red.700" p={4} borderRadius="4px">
          {error ||
            "Your payment did not go through. Try again or choose another payment method."}
        </Box>
      )}
      {quote.isError && (
        <Text role="alert" color="red.600">
          {signupError(quote.error)}
        </Text>
      )}
      <SimpleGrid
        columns={{ base: 1, md: 2 }}
        templateColumns={{
          base: "1fr",
          md: "minmax(0, 2fr) minmax(260px, 1fr)",
        }}
        gap={"24px"}
      >
        <Box as="form" onSubmit={pay}>
          <Text fontSize="16px" fontWeight="500" mb={3}>
            How would you like to pay?
          </Text>
          <RadioGroup value={method} onChange={selectMethod}>
            <Stack spacing={3}>
              <CustomRadioButton
                value="Online"
                variant="card"
                isChecked={method === "Online"}
                onChange={() => selectMethod("Online")}
                label={`Pay online with ${
                  price.currency === "NGN" ? "Paystack" : "Stripe"
                }`}
                subLabel={
                  price.currency === "NGN"
                    ? "Pay using the available card, bank transfer or USSD options at checkout. Access begins after payment confirmation."
                    : "Pay securely with Stripe using the available payment methods at checkout. Access begins after payment confirmation."
                }
              />
              <Box opacity={state.invoiceAvailable ? 1 : 0.6}>
                <CustomRadioButton
                  value="Invoice"
                  variant="card"
                  isChecked={method === "Invoice"}
                  onChange={() => selectMethod("Invoice")}
                  isDisabled={
                    !state.invoiceAvailable ||
                    currentOrder?.status === "Pending"
                  }
                  label="Pay by invoice"
                  subLabel={
                    state.invoiceAvailable
                      ? "We’ll send an invoice with a reference code. Access begins after an OnCulture administrator confirms payment. Uploading a receipt does not activate your workspace."
                      : "Invoice payments are not currently available for this currency."
                  }
                />
              </Box>
            </Stack>
          </RadioGroup>
          <SimpleGrid columns={{ base: 1, sm: 2 }} gap={3} mt={4}>
            <CustomInput
              label="Billing email"
              name="billingEmail"
              type="email"
              defaultValue={state.email}
              isRequired
              h="4rem"
            />
            <CustomInput label="Tax ID (optional)" name="taxId" h="4rem" />
          </SimpleGrid>
          <SimpleGrid
            columns={{
              base: 1,
              sm: !state.order || state.order.status === "Failed" ? 2 : 1,
            }}
            gap={3}
            mt={5}
          >
            {(!state.order || state.order.status === "Failed") && (
              <CustomButton
                type="button"
                variant="outline"
                h="48px"
                padding={2}
                onClick={onBack}
                disabled={busy}
              >
                Back
              </CustomButton>
            )}
            <CustomButton
              type="submit"
              h="48px"
              padding={2}
              loading={busy}
              disabled={!currentOrder && (quote.isPending || quote.isError)}
            >
              {method === "Invoice" ? "Create invoice" : `Pay ${money}`}
            </CustomButton>
          </SimpleGrid>
        </Box>
        <Box
          bg="#FAFAFB"
          p={"1rem 1.5rem"}
          border="1px solid"
          borderColor="#EEEDF0"
          borderRadius="4px"
        >
          <Flex justify="space-between">
            <Text fontSize="17px" fontWeight={600}>
              {plan.name}
            </Text>
            <Text fontSize="13px" color="#4A4F66" mt={1}>
              Billed {price.interval === "Annual" ? "yearly" : "monthly"}
            </Text>
          </Flex>
          <Flex gap={"7px"} wrap="wrap" my={4}>
            {plan.grants
              .filter((g) => g.capability.moduleKey)
              .map((g) => (
                <Text
                  key={g.capabilityKey}
                  fontSize="13px"
                  border="1px solid"
                  borderColor="#BBC4D9"
                  borderRadius="4px"
                  px={2}
                  color="#425276"
                  backgroundColor="#F3F5F7"
                >
                  {g.capability.name}
                </Text>
              ))}
          </Flex>
          <hr />
          <br />
          <Flex justify="space-between" mt={4}>
            <Text color={"#4A4F66"} fontSize="14px">
              {formatPlanPrice(price)} ×{" "}
              {price.perSeat ? Math.max(3, seats) : 1} users
            </Text>
            <Text fontSize="14px" color="#1B1B1B" fontWeight={600}>
              {money}
            </Text>
          </Flex>
          {(currentOrder?.periodStart || quote.data?.periodStart) && (
            <Flex justify="space-between" my={3}>
              <Text fontSize="13px" color="#4A4F66">
                Billing period:{" "}
              </Text>
              <Text fontSize="13px" color="#1B1B1B">
                {new Date(
                  currentOrder?.periodStart || quote.data.periodStart,
                ).toLocaleDateString()}{" "}
                –{" "}
                {new Date(
                  currentOrder?.periodEnd || quote.data.periodEnd,
                ).toLocaleDateString()}
              </Text>
            </Flex>
          )}
          <hr />
          <Flex
            justify="space-between"
            borderTop="1px solid"
            borderColor="#EEEDF0"
            mt={4}
            pt={4}
          >
            <Text fontWeight={600}>Due today</Text>
            <Text color="#5C00DD" fontSize="24px" fontWeight={700}>
              {money}
            </Text>
          </Flex>
          <Text fontSize="12px" color="#4A4F66" mt={3}>
            {formattedNextBillingDate &&
              `Then ${money} a ${
                price.interval === "Annual" ? "year" : "month"
              } from ${formattedNextBillingDate}. `}
            Card payments are processed securely by{" "}
            {price.currency === "NGN" ? "Paystack" : "Stripe"}.
          </Text>
        </Box>
      </SimpleGrid>
      {currentOrder?.status === "Pending" && (
        <CustomButton
          variant="ghost"
          color="brand.primary.600"
          loading={busy}
          onClick={() =>
            action(async () => {
              await signupRequest(token, `/verify/${currentOrder.id}`, {});
              refresh();
            })
          }
        >
          Check payment status
        </CustomButton>
      )}
    </Stack>
  );
}
