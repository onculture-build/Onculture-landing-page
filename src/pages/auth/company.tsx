import ViewportContainer from "../../layouts/container";
import CustomButton from "../../components/custom-button";
import CustomInput from "../../components/custom-input";
import { CompanySchema } from "../../lib/schema";
import { AuthType, CompanySignupType } from "../../lib/types";
import { Box, Flex, Heading, Spinner, Stack, Text } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm, Resolver } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import SelectedPlan from "../../components/selected-plan";
import BillingFields, { termsVersion, dpaVersion } from "./billing-fields";
import { useGetSubscriptionPlans } from "../../services/queries/subscriptions.query";
import CompanyValuesInput from "../../components/company-values";
import { useAppDispatch, useAppSelector } from "../../services/store/hooks";
import { authCompany, authUser } from "../../services/store/selectors";
import { useRegisterCompany } from "../../services/mutations";
import { PageRoutes } from "../../lib/constants";
import { clearEntries } from "../../services/store/slices/auth";
import toast from "react-hot-toast";

const CompanyOnboarding = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector(authUser);
  const companyData = useAppSelector(authCompany);
  const [country, setCountry] = React.useState("");
  const [employees, setEmployees] = React.useState(1);
  const formRef = React.useRef<HTMLFormElement>(null);
  const { data: plans } = useGetSubscriptionPlans();
  const selectedPriceId = params.get("price");

  const { mutate: signup, isPending } = useRegisterCompany();

  const {
    register,
    setValue,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CompanySignupType>({
    resolver: yupResolver(CompanySchema),
    defaultValues: {
      name: companyData.name,
      code: companyData.code,
      email: companyData.email,
      values: companyData.values,
    },
  } as unknown as { resolver: Resolver<CompanySignupType> });

  const draftKey = `subscription-signup:${userInfo.email}`;
  React.useEffect(() => {
    try {
      const draft = JSON.parse(sessionStorage.getItem(draftKey) || "null");
      if (!draft || typeof draft !== "object") return;
      for (const field of ["name", "code", "email"] as const) {
        if (typeof draft[field] === "string") setValue(field, draft[field]);
      }
      if (typeof draft.billingCountry === "string")
        setCountry(draft.billingCountry);
      if (Number(draft.billingEmployees) > 0)
        setEmployees(Number(draft.billingEmployees));
      for (const field of [
        "billingContact",
        "billingEmail",
        "billingAddress",
        "billingTaxId",
      ]) {
        const input = formRef.current?.elements.namedItem(field);
        if (
          input instanceof HTMLInputElement &&
          typeof draft[field] === "string"
        )
          input.value = draft[field];
      }
    } catch {
      /* Storage can be unavailable; registration still works. */
    }
  }, [draftKey, setValue]);

  const saveDraft = () => {
    if (!formRef.current) return;
    const fields = new FormData(formRef.current);
    const names = [
      "name",
      "code",
      "email",
      "billingCountry",
      "billingEmployees",
      "billingContact",
      "billingEmail",
      "billingAddress",
      "billingTaxId",
    ];
    try {
      sessionStorage.setItem(
        draftKey,
        JSON.stringify(
          Object.fromEntries(
            names.map((name) => [name, fields.get(name) ?? ""]),
          ),
        ),
      );
    } catch {
      /* Do not block submission if storage is unavailable. */
    }
  };

  const submitHandler = ({ values, ...data }: CompanySignupType) => {
    if (isPending) return;
    let billingInfo;
    if (selectedPriceId) {
      const plan = plans?.find((item) =>
        item.prices.some((price) => price.id === selectedPriceId),
      );
      const price = plan?.prices.find((item) => item.id === selectedPriceId);
      if (!plan || !price) {
        toast.error("Please select an available plan.");
        return;
      }
      if (!country || price.currency !== (country === "NG" ? "NGN" : "USD")) {
        toast.error("Please choose a plan in your country's billing currency.");
        return;
      }
      const cap = plan.grants.find(
        (grant) => grant.capabilityKey === "emp.seats",
      )?.limit;
      if (cap != null && employees > cap) {
        toast.error(
          `This plan allows at most ${cap} active employees. Please choose another plan.`,
        );
        return;
      }
      const fields = new FormData(formRef.current!);
      if (!fields.has("acceptedTerms") || !fields.has("acceptedDpa")) {
        toast.error("Please accept both agreements.");
        return;
      }
      billingInfo = {
        countryCode: country,
        declaredEmployees: employees,
        contactName: String(fields.get("billingContact") || "").trim(),
        email: String(fields.get("billingEmail") || "").trim(),
        address: String(fields.get("billingAddress") || "").trim(),
        taxId: String(fields.get("billingTaxId") || "").trim(),
        companyName: data.name,
        termsVersion,
        dpaVersion,
        acceptedTerms: true as const,
        acceptedDpa: true as const,
      };
    }
    const validValues = (values || []).filter((val) => val.value !== "");

    const signupData: AuthType = {
      ...(params.get("price") && { selectedPriceId: params.get("price")! }),
      userInfo,
      ...(billingInfo && { billingInfo }),
      companyInfo: {
        ...data,
        ...(validValues.length && { values: validValues }),
      },
    };
    signup(signupData, {
      onSuccess: (res: any) => {
        sessionStorage.removeItem(draftKey);
        sessionStorage.removeItem("auth");
        dispatch(clearEntries());
        const message = res?.data.message || "";
        if (
          message.toLowerCase().includes("waitlist") ||
          message.toLowerCase().includes("notify you when approved")
        ) {
          navigate(`/${PageRoutes.signup}/${PageRoutes.signupFailure}`);
        } else if (
          message.toLowerCase().includes("verification email") ||
          message.toLowerCase().includes("email has been sent")
        ) {
          navigate(`/${PageRoutes.signup}/${PageRoutes.signupSuccess}`);
        } else {
          navigate(`/${PageRoutes.signup}/${PageRoutes.signupSuccess}`);
        }
      },
      onError: (err: any) => {
        const message = err?.data?.message ?? err?.message;
        toast.error(
          typeof message === "string"
            ? message
            : "Unable to register. Please try again.",
        );
      },
    });
  };

  const companyDomain = import.meta.env.VITE_COMPANY_DOMAIN;

  return (
    <ViewportContainer>
      <Box
        p={{ base: 10, md: 24 }}
        maxW={{ base: "100%", md: "70%", xl: "50%" }}
        mx={"auto"}
        my={"10vh"}
      >
        <Heading
          textAlign="center"
          fontSize={"heading2"}
          fontWeight={"bold"}
          mb={5}
        >
          Create Company Profile
        </Heading>
        <Text textAlign={"center"}>Enter your company's information</Text>
        <SelectedPlan />
        <form
          ref={formRef}
          onChange={saveDraft}
          onSubmit={handleSubmit(submitHandler)}
        >
          <Stack mt={20} gap={10}>
            <CustomInput
              {...register("name", {
                onBlur(event) {
                  const { value } = event.target;
                  setValue(
                    "code",
                    value.split(" ").join("-").substring(0, 20).toLowerCase(),
                  );
                },
              })}
              placeholder="Company Name"
              label="Company Name"
              isRequired
              p={"2rem"}
              errorMessage={errors.name?.message}
            />
            <CustomInput
              {...register("email")}
              placeholder="Email Address"
              label="Email Address"
              isRequired
              p={"2rem"}
              errorMessage={errors.email?.message}
            />
            <Stack>
              <Flex alignItems={"end"} gap={5}>
                <CustomInput
                  {...register("code", {
                    onBlur(event) {
                      const { value } = event.target;
                      setValue(
                        "code",
                        value.split(" ").join("-").toLowerCase(),
                      );
                    },
                  })}
                  placeholder="Your Company's custom URL"
                  label="Company Domain (20 characters max)"
                  isRequired
                  p={"2rem"}
                  errorMessage={errors.code?.message}
                  maxLength={20}
                />
                <Text pb={3} fontSize={"heading5"}>
                  .{companyDomain || "onculture.io"}
                </Text>
              </Flex>
            </Stack>
            {selectedPriceId && (
              <BillingFields
                name={`${userInfo.firstName} ${userInfo.lastName}`}
                email={userInfo.email}
                country={country}
                onCountry={setCountry}
                employees={employees}
                onEmployees={setEmployees}
              />
            )}
            <CompanyValuesInput
              title="values"
              label="Company Values"
              errors={errors}
              register={register}
              control={control}
            />

            <Flex mt={12} w={{ md: "80%" }} mx={"auto"} gap={4}>
              <CustomButton
                type="button"
                variant="outline"
                py={7}
                onClick={() => navigate(-1)}
                w={"100%"}
              >
                Back
              </CustomButton>
              <CustomButton
                type="submit"
                py={7}
                w={"100%"}
                gap={3}
                isDisabled={isPending}
              >
                {isPending && <Spinner color="#FFF" speed="0.5s" />}
                Next
              </CustomButton>
            </Flex>
          </Stack>
        </form>
      </Box>
    </ViewportContainer>
  );
};

export default CompanyOnboarding;
