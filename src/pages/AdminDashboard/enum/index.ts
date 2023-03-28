export const PROFILE_TYPE = Object.freeze({
  BIO: { label: "Bio", value: "Bio" },
  EMPLOYEES: { label: "Employees", value: "Employees" },
  SUBSCRIPTION: { label: "Subscription", value: "Subscription" },
  INTEGRATIONS: { label: "Integrations", value: "Integrations" },
});

export const TEMPLATE_VIEW = Object.freeze({
  SUMMARY: { label: "Summary", value: "Summary" },
  SETTINGS: { label: "Settings", value: "Settings" },
  ADVANCED: { label: "Advanced", value: "Advanced" },
});

export const TIMESETTER_VIEW = Object.freeze({
  DAILY: { label: "Daily", value: "Daily" },
  WEEKLY: { label: "Weekly", value: "Weekly" },
  MONTHLY: { label: "Monthly", value: "Monthly" },
  YEARLY: { label: "Yearly", value: "Yearly" },
});

export const SETTINGS_STATUS = Object.freeze({
  UPDATE: { label: "Update", value: "Update" },
  ACTIVATE: { label: "Activate", value: "Activate" },
  RESET: { label: "Reset", value: "Reset" },
});

export const WEEKDAYS = Object.freeze({
  SUNDAY: { label: "S", value: 0 },
  MONDAY: { label: "M", value: 1 },
  TUESDAY: { label: "T", value: 2 },
  WEDNESDAY: { label: "W", value: 3 },
  THURSDAY: { label: "T", value: 4 },
  FRIDAY: { label: "F", value: 5 },
  SATURDAY: { label: "S", value: 6 },
});

export const DayOptions = [
  {
    value: "weekly",
    label: "Weekly",
  },
  {
    value: "daily",
    label: "Daily",
  },
];

export const DurationOptions = [
  {
    value: "15minutes",
    label: "15 Minutes",
  },
  {
    value: "30minutes",
    label: "30 Minutes",
  },
  {
    value: "45minutes",
    label: "45 Minutes",
  },
  {
    value: "60minutes",
    label: "60 Minutes",
  },
];

export interface PeerProps {
  currentView: string;
  setCurrentView: (val: string) => void;
  position?: boolean;
}
