import { useQuery } from "@tanstack/react-query";
import {
  FormControl,
  FormLabel,
  Input,
  Link,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";
import axios from "../../services/axios";
import CustomCheckbox from "../../components/custom-checkbox";

export const legalConfig = {
  termsUrl: import.meta.env.VITE_TERMS_URL as string | undefined,
  dpaUrl: import.meta.env.VITE_DPA_URL as string | undefined,
  termsVersion: import.meta.env.VITE_TERMS_VERSION as string | undefined,
  dpaVersion: import.meta.env.VITE_DPA_VERSION as string | undefined,
};
export const termsVersion =
  (legalConfig.termsVersion as string | undefined) ?? "v1";
export const dpaVersion =
  (legalConfig.dpaVersion as string | undefined) ?? "v1";

export default function BillingFields({
  name,
  email,
  country,
  onCountry,
  employees,
  onEmployees,
}: {
  name: string;
  email: string;
  country: string;
  onCountry: (country: string) => void;
  employees: number;
  onEmployees: (value: number) => void;
}) {
  const { data: countries = [], isError } = useQuery({
    queryKey: ["signup-countries"],
    queryFn: async (): Promise<{ iso2: string; name: string }[]> => {
      const response = await axios.get(
        "/countries?isPaginated=false&direction=asc",
      );
      return response.data.data;
    },
  });
  return (
    <Stack spacing={5}>
      <FormControl isRequired>
        <FormLabel htmlFor="billing-country">Country</FormLabel>
        <Select
          id="billing-country"
          name="billingCountry"
          required
          value={country}
          onChange={(event) => onCountry(event.target.value)}
          placeholder="Select country"
        >
          {countries.map((item) => (
            <option key={item.iso2} value={item.iso2}>
              {item.name}
            </option>
          ))}
        </Select>
        {isError && (
          <Text role="alert">
            Unable to load countries. Please reload and try again.
          </Text>
        )}
      </FormControl>
      <Text>
        {country
          ? country === "NG"
            ? "Billed in NGN through Paystack."
            : "Billed in USD through Stripe."
          : "Choose your country to confirm billing currency."}
      </Text>
      <FormControl isRequired>
        <FormLabel htmlFor="employee-count">Active employees</FormLabel>
        <Input
          id="employee-count"
          name="billingEmployees"
          type="number"
          required
          min={1}
          max={1000000}
          step={1}
          value={employees || ""}
          onChange={(event) => onEmployees(Number(event.target.value))}
        />
      </FormControl>
      <Text>Paid plans have a minimum of 3 billable seats.</Text>
      {(
        [
          ["billingContact", "Billing contact", name, 150],
          ["billingEmail", "Billing email", email, 254],
          ["billingAddress", "Billing address", "", 1000],
          ["billingTaxId", "Tax ID (optional)", "", 100],
        ] as const
      ).map(([key, label, value, max]) => (
        <FormControl key={key} isRequired={key !== "billingTaxId"}>
          <FormLabel htmlFor={key}>{label}</FormLabel>
          <Input
            id={key}
            name={key}
            type={key === "billingEmail" ? "email" : "text"}
            defaultValue={value}
            maxLength={max}
            required={key !== "billingTaxId"}
          />
        </FormControl>
      ))}

      <CustomCheckbox
        name="acceptedTerms"
        required
        label={
          <Text fontSize="14px">
            I agree to the{" "}
            <Link href="/terms" target="_blank" rel="noopener noreferrer">
              Terms of Service
            </Link>
            .
          </Text>
        }
      />
      {/* <CustomCheckbox
        name="acceptedDpa"
        required
        label={
          <Text fontSize="14px">
            I agree to the{" "}
            <Link
              href="/data-processing"
              target="_blank"
              rel="noopener noreferrer"
            >
              Data Processing Agreement
            </Link>
            .
          </Text>
        }
      /> */}
      <Link
        href="https://onculture.io/privacy-policy"
        target="_blank"
        rel="noopener noreferrer"
      >
        Privacy policy
      </Link>
    </Stack>
  );
}
