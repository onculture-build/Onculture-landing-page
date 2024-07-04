export interface IAddToWaitlist {
  email: string;
  fields: {
    first_name: string;
    last_name?: string;
  };
}
