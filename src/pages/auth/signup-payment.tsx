import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Box,
  Flex,
  Radio,
  RadioGroup,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import CustomButton from "../../components/custom-button";
import CustomInput from "../../components/custom-input";
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
}: {
  token: string;
  state: any;
  plan: PublicPlan;
  price: PlanPrice;
  seats: number;
  refresh: () => unknown;
  onDone: () => void;
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
          Uploading a receipt does not activate your workspace. An OnCulture
          administrator must confirm payment.
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
          <CustomButton w="full" h="44px" padding={2} onClick={onDone}>
            Continue
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
      <SimpleGrid columns={{ base: 1, md: 2 }} gap={5}>
        <Box as="form" onSubmit={pay}>
          <Text fontSize="14px" mb={3}>
            How would you like to pay?
          </Text>
          <RadioGroup
            value={method}
            onChange={(value) => {
              setMethod(value);
              const next = crypto.randomUUID();
              setKey(next);
              sessionStorage.setItem("signup-payment-key", next);
            }}
          >
            <Stack spacing={3}>
              <Box
                as="label"
                border="1px solid"
                borderColor={
                  method === "Online" ? "brand.primary.600" : "gray.200"
                }
                p={4}
                borderRadius="4px"
              >
                <Radio value="Online" colorScheme="purple">
                  Pay online with{" "}
                  {price.currency === "NGN" ? "Paystack" : "Stripe"}
                </Radio>
                <Text ml={6} mt={1} fontSize="14px" color="gray.600">
                  Your workspace opens as soon as payment is confirmed.
                </Text>
              </Box>
              <Box
                as="label"
                border="1px solid"
                borderColor={
                  method === "Invoice" ? "brand.primary.600" : "gray.200"
                }
                p={4}
                borderRadius="4px"
                opacity={state.invoiceAvailable ? 1 : 0.6}
              >
                <Radio
                  value="Invoice"
                  colorScheme="purple"
                  isDisabled={
                    !state.invoiceAvailable ||
                    currentOrder?.status === "Pending"
                  }
                >
                  Pay by invoice
                </Radio>
                <Text ml={6} mt={1} fontSize="14px" color="gray.600">
                  {state.invoiceAvailable
                    ? "Pay by bank transfer and upload your receipt. Access begins after payment confirmation."
                    : "Invoice payments are not currently available for this currency."}
                </Text>
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
              h="44px"
            />
            <CustomInput label="Tax ID (optional)" name="taxId" h="44px" />
          </SimpleGrid>
          <CustomButton
            type="submit"
            mt={5}
            w="full"
            h="44px"
            padding={2}
            loading={busy}
            disabled={!currentOrder && (quote.isPending || quote.isError)}
          >
            {method === "Invoice" ? "Create invoice" : `Pay ${money}`}
          </CustomButton>
        </Box>
        <Box
          bg="gray.50"
          p={5}
          border="1px solid"
          borderColor="gray.100"
          borderRadius="4px"
        >
          <Text fontWeight={600}>{plan.name}</Text>
          <Text fontSize="14px" color="gray.600" mt={1}>
            Billed {price.interval === "Annual" ? "yearly" : "monthly"}
          </Text>
          <Flex gap={1} wrap="wrap" mt={3}>
            {plan.grants
              .filter((g) => g.capability.moduleKey)
              .map((g) => (
                <Text
                  key={g.capabilityKey}
                  fontSize="11px"
                  border="1px solid"
                  borderColor="gray.300"
                  borderRadius="2px"
                  px={1}
                >
                  {g.capability.name}
                </Text>
              ))}
          </Flex>
          <Text mt={5} fontSize="13px">
            {formatPlanPrice(price)} × {price.perSeat ? Math.max(3, seats) : 1}{" "}
            users
          </Text>
          {(currentOrder?.periodStart || quote.data?.periodStart) && (
            <Text mt={3} fontSize="14px" color="gray.600">
              Billing period:{" "}
              {new Date(
                currentOrder?.periodStart || quote.data.periodStart,
              ).toLocaleDateString()}{" "}
              –{" "}
              {new Date(
                currentOrder?.periodEnd || quote.data.periodEnd,
              ).toLocaleDateString()}
            </Text>
          )}
          <Flex
            justify="space-between"
            borderTop="1px solid"
            borderColor="gray.200"
            mt={4}
            pt={4}
          >
            <Text fontWeight={600}>Due today</Text>
            <Text color="brand.primary.600" fontSize="24px" fontWeight={600}>
              {money}
            </Text>
          </Flex>
          <Text fontSize="14px" color="gray.600" mt={3}>
            You can change your plan and users later from Billing &amp;
            Subscription.
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
