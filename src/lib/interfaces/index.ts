export interface IAddToWaitlist {
  email: string;
  fields: {
    first_name: string;
    last_name?: string;
  };
  groups?: string[];
}

export interface IContactUs {
  email: string;
  fields: {
    first_name: string;
    last_name?: string;
    company_name: string;
    reason: string;
    message?: string;
  };
  groups?: string[];
}

export interface IBookADemo {
  email: string;
  fields: {
    first_name: string;
    last_name?: string;
    company_name: string;
    phone_number?: string;
    employee_count: string;
    message?: string;
  };
  groups?: string[];
}
