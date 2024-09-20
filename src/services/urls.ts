export const MAILERLITE_WAITLIST_GROUP_ID = import.meta.env
  .VITE_APP_MAILERLITE_WAITLIST_GROUP_ID;
export const MAILERLITE_CONTACT_GROUP_ID = import.meta.env
  .VITE_APP_MAILERLITE_CONTACT_GROUP_ID;
export const MAILERLITE_BOOKDEMO_GROUP_ID = import.meta.env
  .VITE_APP_MAILERLITE_BOOKDEMO_GROUP_ID;

const URLS = {
  getSubscriptionPlans: '/subscription/allPlans',
  mailerLiteApi: 'https://connect.mailerlite.com/api/subscribers',
  redirectToCompany: '/companies/get-company-url',
  forgotCompanyDomain: '/companies/user/forgot-companies',
  checkAllowedUser: `/auth/check-allowed-user`,
  signup: `/auth/signup`,
};

export default URLS;
