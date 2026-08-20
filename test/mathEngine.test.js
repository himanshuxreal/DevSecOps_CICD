import test from 'node:test';
import assert from 'node:assert/strict';
import { evaluateExpression, formatResult, factorial, toRadians } from '../src/utils/mathEngine.js';

test('Basic Arithmetic Operations', () => {
  // Addition
  assert.equal(evaluateExpression('5 + 3').result, 8);
  // Subtraction
  assert.equal(evaluateExpression('10 - 4').result, 6);
  // Multiplication
  assert.equal(evaluateExpression('6 * 7').result, 42);
  // Division
  assert.equal(evaluateExpression('20 / 4').result, 5);
  // Modulo
  assert.equal(evaluateExpression('10 % 3').result, 1);
});

test('Order of Operations (PEMDAS/BODMAS) & Parentheses', () => {
  assert.equal(evaluateExpression('2 + 3 * 4').result, 14);
  assert.equal(evaluateExpression('(2 + 3) * 4').result, 20);
  assert.equal(evaluateExpression('10 - 2 ^ 3').result, 2);
  assert.equal(evaluateExpression('(10 - 2) ^ 2').result, 64);
});

test('Scientific Functions & Factorial', () => {
  // Factorials
  assert.equal(factorial(0), 1);
  assert.equal(factorial(5), 120);
  assert.equal(evaluateExpression('fact(5)').result, 120);

  // Square roots & cube roots
  assert.equal(evaluateExpression('sqrt(16)').result, 4);
  assert.equal(evaluateExpression('cbrt(27)').result, 3);

  // Exponentials and powers
  assert.equal(evaluateExpression('sqr(5)').result, 25);
  assert.equal(evaluateExpression('cube(3)').result, 27);
  assert.equal(evaluateExpression('recip(4)').result, 0.25);
});

test('Trigonometry with DEG and RAD', () => {
  // 90 degrees sin is 1
  assert.equal(Math.round(evaluateExpression('sin(90)', 'DEG').result), 1);
  // cos 0 is 1
  assert.equal(evaluateExpression('cos(0)', 'DEG').result, 1);
});

test('Floating Point Precision Formatting', () => {
  // 0.1 + 0.2 should cleanly format to '0.3' without float jitter
  assert.equal(evaluateExpression('0.1 + 0.2').formatted, '0.3');
});

test('Error Handling', () => {
  assert.equal(evaluateExpression('10 / 0').success, false);
  assert.equal(evaluateExpression('sqrt(-4)').success, false);
  assert.equal(evaluateExpression('((5 + 2)').success, false);
});
