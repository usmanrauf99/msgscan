export function formatPrice(price: string | number): string {
  const numPrice = Number(price);
  if (isNaN(numPrice)) return "0.00";

  const [integerPart, decimalPart = ""] = numPrice.toString().split(".");

  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const formattedDecimal = decimalPart.padEnd(2, "0").slice(0, 2);

  return `${formattedInteger}.${formattedDecimal}`;
}
