import { LimitedNumber } from '../types/index.js';

export function generateRandomValue({ min, max }: LimitedNumber) {
  return +((Math.random() * (max - min)) + min);
}

export function getRandomItems<T>(items: T[]): T[] {
  const startPosition = generateRandomValue({ min: 0, max: items.length - 1 });
  const endPosition = startPosition + generateRandomValue({ min: startPosition, max: items.length });
  return items.slice(startPosition, endPosition);
}

export function getRandomItem<T>(items: T[]): T {
  return items[generateRandomValue({ min: 0, max: items.length - 1 })];
}
