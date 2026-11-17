export type SelectorOptionValue = {
  label: string;
  value: string | number;
};

export type BookDemoType = {
  firstName: string;
  lastName: string;
  companyName: string;
  email: string;
  phone: string;
  employeeCount: string;
  message: string;
};

export type WaitlistType = {
  firstName: string;
  lastName?: string;
  email: string;
};

export type ContactType = {
  firstName: string;
  lastName?: string;
  companyName: string;
  email: string;
  reason: string;
  message?: string;
};

export type UserSignUpType = {
  firstName: string;
  lastName: string;
  email: string;
};

export type UserLoginType = {
  code: string;
};

export type ForgotDomainType = {
  email: string;
};

export type CompanySignupType = {
  name: string;
  code: string;
  email: string;
  values?: Record<"value", string>[];
};

export type AuthType = {
  billingInfo?: {
    countryCode: string;
    declaredEmployees: number;
    contactName: string;
    email: string;
    address: string;
    taxId?: string;
    companyName?: string;
    termsVersion: string;
    dpaVersion: string;
    acceptedTerms: true;
    acceptedDpa: true;
  };
  selectedPriceId?: string;
  userInfo: UserSignUpType;
  companyInfo: CompanySignupType;
};
