import { useEffect, useState } from "react";
import { Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppSelector } from "../../services/store/hooks";
import { authUser } from "../../services/store/selectors";
import { useRegisterCompany } from "../../services/mutations";
import { useGetSubscriptionPlans } from "../../services/queries/subscriptions.query";
import {
  signupError,
  signupRequest,
} from "../../services/queries/signup-checkout";
import axios from "../../services/axios";
import SignupShell from "./signup-shell";
import { termsVersion, dpaVersion } from "./billing-fields";
import { PageRoutes } from "../../lib/constants";
import CompanyDetailsStep from "./components/company-details-step";
import PlanSelectionStep from "./components/plan-selection-step";
import PaymentStep from "./components/payment-step";
import SignupComplete from "./components/signup-complete";

const readDraft = () => {
  try {
    return JSON.parse(sessionStorage.getItem("signup-workspace-draft") || "{}");
  } catch {
    return {};
  }
};
const industries = [
  "Agriculture",
  "Education",
  "Financial services",
  "Healthcare",
  "Hospitality",
  "Manufacturing",
  "Non-profit",
  "Professional services",
  "Retail",
  "Technology",
  "Other",
];
const ranges = ["1–10", "11–50", "51–200", "201–500", "501–1,000", "1,001+"];

export default function CompanyOnboarding() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const user = useAppSelector(authUser);
  const [draft, setDraft] = useState(readDraft);
  const [step, setStep] = useState(() =>
    sessionStorage.getItem("signup-checkout-token") ? 3 : 1,
  );
  const [token, setToken] = useState(
    () => sessionStorage.getItem("signup-checkout-token") || "",
  );
  const [priceId, setPriceId] = useState(
    () => params.get("price") || draft.priceId || "",
  );
  const [seats, setSeats] = useState(() => draft.seats || 1);
  const [currency, setCurrency] = useState(() => draft.currency || "");
  const [interval, setInterval] = useState(() => draft.interval || "Monthly");
  const [error, setError] = useState("");
  const signup = useRegisterCompany();
  const catalog = useGetSubscriptionPlans();
  const plans = catalog.data || [];
  const selectedPlan = plans.find((plan) =>
    plan.prices.some((price) => price.id === priceId),
  );
  const selectedPrice = selectedPlan?.prices.find(
    (price) => price.id === priceId,
  );
  const countryQuery = useQuery({
    queryKey: ["signup-countries"],
    queryFn: async () =>
      (await axios.get("/countries?isPaginated=false&direction=asc")).data
        .data as { id: string; iso2: string; name: string }[],
  });
  const country = countryQuery.data?.find(
    (country) => country.iso2 === draft.country,
  );
  const [checkedCode, setCheckedCode] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => setCheckedCode(draft.code || ""), 400);
    return () => clearTimeout(timer);
  }, [draft.code]);
  const domain = useQuery({
    queryKey: ["signup-domain", checkedCode],
    enabled: !!checkedCode && !token,
    queryFn: async () =>
      (
        await axios.get(
          `/signup-checkout/domain/${encodeURIComponent(checkedCode)}`,
        )
      ).data.data as { available: boolean },
  });
  const status = useQuery({
    queryKey: ["signup-checkout", token],
    enabled: !!token,
    queryFn: () => signupRequest(token),
    refetchInterval: (query) =>
      query.state.data?.status === "Active" ? false : 5000,
    retry: false,
  });
  useEffect(() => {
    if (!plans.length) return;
    if (
      selectedPrice &&
      (selectedPrice.currency !== currency ||
        selectedPrice.interval !== interval)
    ) {
      setCurrency(selectedPrice.currency);
      setInterval(selectedPrice.interval);
      return;
    }
    if (!currency) {
      const options = plans.flatMap((plan) =>
        plan.prices.map((price) => price.currency),
      );
      const preferred = draft.country === "NG" ? "NGN" : "USD";
      setCurrency(
        selectedPrice?.currency ||
          (options.includes(preferred) ? preferred : options[0]),
      );
      if (selectedPrice) setInterval(selectedPrice.interval);
      return;
    }
    if (
      selectedPrice &&
      selectedPrice.currency === currency &&
      selectedPrice.interval === interval
    )
      return;
    const match =
      selectedPlan?.prices.find(
        (price) => price.currency === currency && price.interval === interval,
      ) ||
      plans
        .flatMap((plan) => plan.prices)
        .find(
          (price) => price.currency === currency && price.interval === interval,
        );
    if (match) setPriceId(match.id);
    else setPriceId("");
  }, [plans, currency, interval, selectedPrice, selectedPlan, draft.country]);
  useEffect(() => {
    sessionStorage.setItem(
      "signup-workspace-draft",
      JSON.stringify({ ...draft, priceId, seats, currency, interval }),
    );
  }, [draft, priceId, seats, currency, interval]);
  useEffect(() => {
    if (status.data?.status === "Active") setStep(4);
  }, [status.data?.status]);
  useEffect(() => {
    const id = params.get("orderId");
    if (token && id && /^[a-f0-9-]{36}$/i.test(id))
      signupRequest(token, `/verify/${id}`, {})
        .then(() => status.refetch())
        .catch((error) => setError(signupError(error)));
  }, [token, params]);
  useEffect(() => {
    if (!user.email && !token)
      navigate(`/${PageRoutes.signup}`, { replace: true });
  }, [user.email, token, navigate]);
  const update = (key: string, value: string) =>
    setDraft((old: any) => ({ ...old, [key]: value }));
  const choose = (id: string) => {
    setPriceId(id);
    if (
      plans.some((plan) =>
        plan.prices.some(
          (price) => price.id === id && price.unitAmountMinor === 0,
        ),
      )
    )
      setSeats(1);
  };
  const register = async () => {
    setError("");
    if (!selectedPlan || !selectedPrice)
      return setError("Choose an available plan.");
    if (!Number.isInteger(seats) || seats < 1 || seats > 1000000)
      return setError("Enter a whole number of users between 1 and 1,000,000.");
    const limit = selectedPlan.grants.find(
      (grant) => grant.capabilityKey === "emp.seats",
    )?.limit;
    if (limit != null && seats > limit)
      return setError(`This plan allows at most ${limit} users.`);
    if (sessionStorage.getItem("signup-legal-accepted") !== "true")
      return navigate(`/${PageRoutes.signup}`);
    try {
      if (token) {
        await signupRequest(token, "/selection", { priceId, seats });
        await status.refetch();
        setStep(3);
        return;
      }
      const result = await signup.mutateAsync({
        checkoutBeforeVerification: true,
        selectedPriceId: priceId,
        userInfo: user,
        companyInfo: {
          name: draft.name.trim(),
          code: draft.code,
          email: user.email,
          phone: draft.phone?.trim() || undefined,
          industry: draft.industry,
          employeeRange: draft.employeeRange,
          countryId: country?.id,
        },
        billingInfo: {
          countryCode: draft.country,
          currency: selectedPrice.currency,
          declaredEmployees: seats,
          contactName: `${user.firstName} ${user.lastName}`,
          email: user.email,
          address: "",
          termsVersion,
          dpaVersion,
          acceptedTerms: true,
          acceptedDpa: true,
        },
      });
      const saved = result.data?.signupToken;
      if (!saved)
        throw new Error(
          "Unable to start signup checkout. Please contact support.",
        );
      sessionStorage.setItem("signup-checkout-token", saved);
      setToken(saved);
      setStep(3);
    } catch (error) {
      setError(signupError(error));
    }
  };
  if (step === 4)
    return (
      <SignupComplete
        status={status}
        selectedPrice={selectedPrice}
        userEmail={user.email}
        draftCode={draft.code}
        token={token}
        setStep={setStep}
      />
    );
  return (
    <SignupShell
      step={step === 3 && selectedPrice?.unitAmountMinor === 0 ? 2 : step}
      title={
        step === 1
          ? "Create Company Profile"
          : step === 2
            ? "Choose your plan"
            : selectedPrice?.unitAmountMinor === 0
              ? "Creating your workspace"
              : "Payment"
      }
      subtitle={
        step === 1
          ? "Set up your company’s workspace on OnCulture"
          : step === 2
            ? "Priced per user. You can upgrade or add users any time."
            : selectedPrice?.unitAmountMinor === 0
              ? "Your Free plan does not require payment."
              : "Your workspace opens as soon as payment goes through"
      }
      wide={step === 2 ? "plans" : step === 3 ? "payment" : step > 1}
    >
      {(error || status.isError) && (
        <Text role="alert" color="red.600" bg="red.50" p={3} mb={4}>
          {error || signupError(status.error)}
        </Text>
      )}
      {step === 1 && (
        <CompanyDetailsStep
          draft={draft}
          update={update}
          checkedCode={checkedCode}
          domain={domain}
          country={country}
          countryQuery={countryQuery}
          industries={industries}
          ranges={ranges}
          setError={setError}
          onContinue={() => {
            setCurrency(currency || (draft.country === "NG" ? "NGN" : "USD"));
            setStep(2);
          }}
        />
      )}
      {step === 2 && (
        <PlanSelectionStep
          catalog={catalog}
          plans={plans}
          priceId={priceId}
          choose={choose}
          seats={seats}
          setSeats={setSeats}
          currency={currency}
          setCurrency={setCurrency}
          interval={interval}
          setInterval={setInterval}
          selectedPrice={selectedPrice}
          signupPending={signup.isPending}
          token={token}
          register={register}
          back={() => setStep(1)}
        />
      )}
      {step === 3 && (
        <PaymentStep
          status={status}
          selectedPlan={selectedPlan}
          selectedPrice={selectedPrice}
          token={token}
          seats={seats}
          catalogRefetch={() => catalog.refetch()}
          setStep={setStep}
        />
      )}
    </SignupShell>
  );
}
