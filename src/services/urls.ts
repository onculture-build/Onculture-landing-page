const MAILERLITE_GROUP_ID = import.meta.env.VITE_APP_MAILERLITE_GROUP_ID;

const URLS = {
  getSubscriptionPlans: '/subscription/allPlans',
  addToWaitlist: `https://api.mailerlite.com/api/v2/groups/${MAILERLITE_GROUP_ID}/subscribers`,
};

export default URLS;
