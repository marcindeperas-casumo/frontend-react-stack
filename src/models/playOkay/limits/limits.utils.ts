export function integerToLoginBlockTime(integer: number): string {
  return `${String(integer)}:00`.padStart(5, "0");
}
