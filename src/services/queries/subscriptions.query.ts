import { useQuery } from "@tanstack/react-query";
import axios from "../axios";
import URLS from "../urls";

export interface PlanPrice {
  id: string;
  interval: "Monthly" | "Annual";
  currency: string;
  unitAmountMinor: number;
  perSeat: boolean;
}

export interface PublicPlan {
  id: string;
  versionId: string;
  slug: string;
  name: string;
  description: string;
  prices: PlanPrice[];
  grants: {
    capabilityKey: string;
    limit: number | null;
    capability: { name: string; moduleKey: string | null; hasLimit: boolean };
  }[];
}

export const formatPlanPrice = (price: PlanPrice) => {
  const formatter = new Intl.NumberFormat(
    price.currency === "NGN" ? "en-NG" : "en-US",
    {
      style: "currency",
      currency: price.currency,
    },
  );
  const digits = formatter.resolvedOptions().maximumFractionDigits ?? 2;
  const amount = price.unitAmountMinor / 10 ** digits;
  return Number.isInteger(amount)
    ? new Intl.NumberFormat(price.currency === "NGN" ? "en-NG" : "en-US", {
        style: "currency",
        currency: price.currency,
        maximumFractionDigits: 0,
      }).format(amount)
    : formatter.format(amount);
};

export const useGetSubscriptionPlans = () =>
  useQuery({
    queryKey: ["publicSubscriptionPlans"],
    queryFn: async (): Promise<PublicPlan[]> => {
      const res = await axios.get(URLS.getSubscriptionPlans);
      return res.data.data;
    },
  });
