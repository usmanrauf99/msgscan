export function shortenHash(
  hash: string,
  type: "address" | "transaction",
  sliceLength?: number
): string {
  if (type === "address") {
    if (hash.length < 42) return hash;
    return `${hash.slice(0, sliceLength || 8)}...${hash.slice(
      hash.length - (sliceLength || 8)
    )}`;
  } else if (type === "transaction") {
    if (hash.length < 42) return hash;
    return `${hash.slice(0, sliceLength || 14)}...`;
  }
  return hash;
}
