const MAILERLITE_WAITLIST_GROUP_ID = import.meta.env
  .VITE_APP_MAILERLITE_WAITLIST_GROUP_ID;
const MAILERLITE_CONTACT_GROUP_ID = import.meta.env
  .VITE_APP_MAILERLITE_CONTACT_GROUP_ID;
const MAILERLITE_BOOKDEMO_GROUP_ID = import.meta.env
  .VITE_APP_MAILERLITE_BOOKDEMO_GROUP_ID;

const URLS = {
  getSubscriptionPlans: '/subscription/allPlans',
  addToWaitlist: `https://api.mailerlite.com/api/v2/groups/${MAILERLITE_WAITLIST_GROUP_ID}/subscribers`,
  contactUs: `https://api.mailerlite.com/api/v2/groups/${MAILERLITE_CONTACT_GROUP_ID}/subscribers`,
  bookADemo: `https://api.mailerlite.com/api/v2/groups/${MAILERLITE_BOOKDEMO_GROUP_ID}/subscribers`,
  checkAllowedUser: `/auth/check-allowed-user`,
  signup: `/auth/signup`,
};

export default URLS;
