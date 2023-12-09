export function counter<T>(items: T[]): Map<T, number> {
  const counts = new Map<T, number>();
  items.forEach((item) => {
    counts.set(item, (counts.get(item) || 0) + 1);
  });
  return counts;
}

export const gcd = (a: number, b: number): number => {
  return !b ? a : gcd(b, a % b);
}

export const lcm = (a: number, b: number): number => {
  return (a * b) / gcd(a, b);   
}
