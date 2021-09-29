export function formatLongNumber(number: number) {
  if (number >= 1e9) {
    return `${(number / 1e9).toFixed(1)}B`;
  } else if (number >= 1e6) {
    return `${(number / 1e6).toFixed(1)}M`;
  } else if (number >= 1e3) {
    return `${(number / 1e3).toFixed(1)}K`;
  } else {
    return number.toString();
  }
}
