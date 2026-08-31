/**
 * Math Engine Helper Utilities
 */

export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomChoice<T>(items: readonly T[] | T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

export function randomChoices<T>(items: readonly T[] | T[], count: number): T[] {
  const shuffled = [...items].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export function gcd(a: number, b: number): number {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y !== 0) {
    const temp = y;
    y = x % y;
    x = temp;
  }
  return x || 1;
}

export function lcm(a: number, b: number): number {
  if (a === 0 || b === 0) return 0;
  return Math.abs((a * b) / gcd(a, b));
}

export function simplifyFraction(numerator: number, denominator: number): [number, number] {
  if (denominator === 0) throw new Error('Division by zero in fraction simplification');
  let num = numerator;
  let den = denominator;
  if (den < 0) {
    num = -num;
    den = -den;
  }
  const factor = gcd(num, den);
  return [num / factor, den / factor];
}

export function formatFraction(numerator: number, denominator: number): string {
  const [num, den] = simplifyFraction(numerator, denominator);
  if (den === 1) return `${num}`;
  return `${num}/${den}`;
}

export function formatMixedNumber(numerator: number, denominator: number): string {
  const [num, den] = simplifyFraction(numerator, denominator);
  if (den === 1) return `${num}`;
  const whole = Math.floor(Math.abs(num) / den);
  const remainder = Math.abs(num) % den;
  const sign = num < 0 ? '-' : '';
  if (whole === 0) {
    return `${sign}${remainder}/${den}`;
  }
  if (remainder === 0) {
    return `${sign}${whole}`;
  }
  return `${sign}${whole} ${remainder}/${den}`;
}

export function roundTo(num: number, decimals = 2): number {
  const factor = Math.pow(10, decimals);
  return Math.round((num + Number.EPSILON) * factor) / factor;
}

export function formatNumber(num: number, maxDecimals = 2): string {
  const rounded = roundTo(num, maxDecimals);
  return Number.isInteger(rounded) ? `${rounded}` : `${rounded}`;
}

export function shuffleArray<T>(array: T[]): T[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export interface PythagoreanTriple {
  a: number;
  b: number;
  c: number;
}

export const COMMON_PYTHAGOREAN_TRIPLES: PythagoreanTriple[] = [
  { a: 3, b: 4, c: 5 },
  { a: 5, b: 12, c: 13 },
  { a: 6, b: 8, c: 10 },
  { a: 8, b: 15, c: 17 },
  { a: 9, b: 12, c: 15 },
  { a: 7, b: 24, c: 25 },
  { a: 12, b: 16, c: 20 },
  { a: 10, b: 24, c: 26 },
  { a: 15, b: 20, c: 25 },
  { a: 20, b: 21, c: 29 },
];

export function getRandomPythagoreanTriple(): PythagoreanTriple {
  const triple = randomChoice(COMMON_PYTHAGOREAN_TRIPLES);
  // Randomly swap legs a and b for variety
  return Math.random() > 0.5 ? triple : { a: triple.b, b: triple.a, c: triple.c };
}
