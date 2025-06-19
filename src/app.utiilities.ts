export class AppUtilities {
  static formatAmount(amount: number, currency: string = "NGN"): string {
    return amount.toLocaleString("en-US", {
      style: "currency",
      currency: currency,
    });
  }

  static capitalize = (text: string) => {
    return text?.[0].toUpperCase().concat(text.slice(1));
  };

  static truncateChars(text: string, charLimit: number = 50): string {
    if (!text) return "";
    if (text.length <= charLimit) return text;
    return text.slice(0, charLimit) + "...";
  }
}
