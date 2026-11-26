import axios from "../axios";
export const signupRequest = async (
  token: string,
  path = "",
  body?: unknown,
) => {
  const config = { headers: { "x-signup-token": token } };
  const response =
    body === undefined
      ? await axios.get(`/signup-checkout${path}`, config)
      : await axios.post(`/signup-checkout${path}`, body, config);
  return response.data.data;
};
const fieldLabels: Record<string, string> = {
  "companyInfo.name": "Company name",
  "companyInfo.code": "Company domain",
  "companyInfo.phone": "Company phone",
  "companyInfo.email": "Admin email",
  "companyInfo.countryId": "Country",
  "companyInfo.industry": "Industry",
  "companyInfo.employeeRange": "Employee count",
  "userInfo.firstName": "First name",
  "userInfo.lastName": "Last name",
  "userInfo.email": "Admin email",
  "billingInfo.countryCode": "Country",
  "billingInfo.currency": "Billing currency",
  "billingInfo.declaredEmployees": "Employee count",
  "billingInfo.acceptedTerms": "Terms of Service",
  "billingInfo.acceptedDpa": "Data Processing Agreement",
  selectedPriceId: "Subscription plan",
};

export function signupValidationErrors(error: any): Record<string, string> {
  const payload = error?.response?.data ?? error?.data ?? error;
  if (!payload?.errors || typeof payload.errors !== "object") return {};
  const result: Record<string, string> = {};
  for (const [field, value] of Object.entries(payload.errors)) {
    const messages = (Array.isArray(value) ? value : [value]).filter(
      (message): message is string =>
        typeof message === "string" && Boolean(message.trim()),
    );
    if (!messages.length) continue;
    const label =
      fieldLabels[field] ??
      field
        .split(".")
        .pop()!
        .replace(/([a-z])([A-Z])/g, "$1 $2");
    result[field] =
      field === "companyInfo.phone"
        ? "Enter a valid company phone number with its country code, for example +2348031234567, or leave it blank."
        : `${label}: ${messages.join(". ")}`;
  }
  return result;
}

export const signupError = (error: any) => {
  const fields = Object.values(signupValidationErrors(error));
  if (fields.length) return fields.join(" ");
  const status = error?.response?.status ?? error?.status;
  if (status >= 500)
    return "Something went wrong on our side. Please try again. If this continues, contact get@onculture.io.";
  const message =
    error?.data?.message ?? error?.response?.data?.message ?? error?.message;
  if (message === "Validation failed")
    return "Please check the information you entered and try again.";
  if (/network error|failed to fetch|timeout/i.test(message ?? ""))
    return "We couldn’t connect to OnCulture. Check your connection and try again.";
  return Array.isArray(message)
    ? message.join(". ")
    : typeof message === "string"
      ? message
      : "Unable to continue. Please try again.";
};
