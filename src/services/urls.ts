const MAILERLITE_GROUP_ID = import.meta.env.VITE_APP_MAILERLITE_GROUP_ID;

const URLS = {
  getSubscriptionPlans: '/api/subscription/allPlans',
  addToWaitlist: `/api/groups/${MAILERLITE_GROUP_ID}/subscribers`,
};

export default URLS;
