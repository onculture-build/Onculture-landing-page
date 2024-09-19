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
