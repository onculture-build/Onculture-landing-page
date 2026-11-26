import { Box, Flex, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { isValidPhoneNumber } from "react-phone-number-input";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../../components/custom-button";
import CustomInput from "../../../components/custom-input";
import CustomSelect from "../../../components/custom-select";
import { PageRoutes } from "../../../lib/constants";
import { SignupLogin } from "../signup-shell";

interface SignupDraft {
  name?: string;
  code?: string;
  industry?: string;
  employeeRange?: string;
  phone?: string;
  country?: string;
}

interface CountryOption {
  iso2: string;
  name: string;
}

export default function CompanyDetailsStep({
  draft,
  update,
  checkedCode,
  domain,
  country,
  countryQuery,
  industries,
  ranges,
  onContinue,
  setError,
}: {
  draft: SignupDraft;
  update: (key: string, value: string) => void;
  checkedCode: string;
  domain: {
    isFetching: boolean;
    isError: boolean;
    data?: { available: boolean };
  };
  country?: CountryOption;
  countryQuery: {
    isPending: boolean;
    isError: boolean;
    data?: CountryOption[];
    refetch: () => unknown;
  };
  industries: string[];
  ranges: string[];
  onContinue: () => void;
  setError: (value: string) => void;
}) {
  const navigate = useNavigate();

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    if (!draft.name?.trim()) return setError("Enter your company name.");
    if (!country || !draft.industry || !draft.employeeRange)
      return setError("Select your industry, employee count and country.");
    if (draft.phone && !isValidPhoneNumber(draft.phone))
      return setError(
        "Enter a valid company phone number including the country code.",
      );
    if (domain.isFetching || checkedCode !== draft.code)
      return setError("Please wait while we check your company domain.");
    if (!domain.data?.available)
      return setError("Choose an available company domain.");
    onContinue();
  };

  return (
    <form onSubmit={submit}>
      <Stack spacing={5}>
        <CustomInput
          label="Company name"
          maxLength={50}
          h="4rem"
          value={draft.name || ""}
          isRequired
          onChange={(event) =>
            update("name", (event.target as HTMLInputElement).value)
          }
          onBlur={() => {
            if (!draft.code)
              update(
                "code",
                (draft.name || "")
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, "-")
                  .replace(/^-|-$/g, "")
                  .slice(0, 20),
              );
          }}
        />
        <Box>
          <Flex align="end" gap={3}>
            <CustomInput
              label="Company domain"
              h="4rem"
              value={draft.code || ""}
              maxLength={20}
              pattern="[a-z0-9]+(-[a-z0-9]+)*"
              isRequired
              onChange={(event) =>
                update(
                  "code",
                  (event.target as HTMLInputElement).value.toLowerCase(),
                )
              }
            />
            <Text mb={3} fontSize="14px" whiteSpace="nowrap">
              .{import.meta.env.VITE_COMPANY_DOMAIN || "OnCulture.io"}
            </Text>
          </Flex>
          {draft.code && (
            <Text
              mt={2}
              fontSize="14px"
              color={domain.data?.available ? "green.600" : "gray.600"}
            >
              {domain.isFetching || checkedCode !== draft.code
                ? "Checking availability…"
                : domain.isError
                  ? "Unable to check this domain. Please try again."
                  : domain.data?.available
                    ? `${draft.code} is available`
                    : "This domain is unavailable"}
            </Text>
          )}
        </Box>
        <SimpleGrid columns={{ base: 1, sm: 2 }} gap={3}>
          <CustomSelect
            label="Industry"
            h="4rem"
            placeholder="Select industry"
            options={industries.map((value) => ({ value, label: value }))}
            value={
              draft.industry
                ? { value: draft.industry, label: draft.industry }
                : undefined
            }
            onChange={(value) => update("industry", String(value.value))}
          />
          <CustomSelect
            label="Employee count"
            h="4rem"
            placeholder="Select range"
            options={ranges.map((value) => ({ value, label: value }))}
            value={
              draft.employeeRange
                ? { value: draft.employeeRange, label: draft.employeeRange }
                : undefined
            }
            onChange={(value) => update("employeeRange", String(value.value))}
          />
        </SimpleGrid>
        <SimpleGrid columns={{ base: 1, sm: 2 }} gap={3}>
          <CustomInput
            label="Company phone"
            type="tel"
            placeholder="+234 803 000 0000"
            value={draft.phone || ""}
            h="4rem"
            onChange={(event) =>
              update("phone", (event.target as HTMLInputElement).value)
            }
          />
          <CustomSelect
            label="Country"
            h="4rem"
            placeholder={
              countryQuery.isPending ? "Loading countries…" : "Select country"
            }
            isDisabled={countryQuery.isPending}
            options={(countryQuery.data || []).map((item) => ({
              value: item.iso2,
              label: item.name,
            }))}
            value={
              country ? { value: country.iso2, label: country.name } : undefined
            }
            onChange={(value) => update("country", String(value.value))}
          />
        </SimpleGrid>
        {countryQuery.isError && (
          <CustomButton variant="ghost" onClick={() => countryQuery.refetch()}>
            Retry loading countries
          </CustomButton>
        )}
        <Flex gap={4} mt={8}>
          <CustomButton
            variant="outline"
            w="full"
            h="4rem"
            padding={3}
            onClick={() => navigate(`/${PageRoutes.signup}`)}
          >
            Back
          </CustomButton>
          <CustomButton type="submit" w="full" h="4rem" padding={3}>
            Next
          </CustomButton>
        </Flex>
      </Stack>
      <SignupLogin />
    </form>
  );
}
