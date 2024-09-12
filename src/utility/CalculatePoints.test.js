// CalculatePoints.test.js
import { calculatePoints } from './CalculatePoints'

test('calculatePoints correctly calculates points', () => {
  expect(calculatePoints(120)).toBe(90);
  expect(calculatePoints(75)).toBe(25);
  expect(calculatePoints(50)).toBe(0);
  expect(calculatePoints(200)).toBe(250);
});
