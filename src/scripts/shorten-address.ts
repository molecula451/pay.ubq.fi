export function shortenAddress(address) {
  return `${address.slice(0, 10)}...${address.slice(-8)}`;
}
