export class AppUtilities {
  static formatAmount(amount: number, currency: string = 'NGN'): string {
    return amount.toLocaleString('en-US', {
      style: 'currency',
      currency: currency,
    });
  }

  static capitalize = (text: string) => {
    return text?.[0].toUpperCase().concat(text.slice(1));
  };
}
