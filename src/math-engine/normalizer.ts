/**
 * Math Answer Normalizer & Equivalence Engine
 * 
 * Accurately parses and compares student inputs across:
 * - Whole numbers and integers (-5, 0, 42)
 * - Fractions (1/2, 2/4, 3/6)
 * - Mixed numbers (1 1/2, 2 3/4)
 * - Decimals (0.5, .5, 0.50)
 * - Percentages (50%, 0.5, 50)
 * - Variable assignments (x = 4, y=4, 4)
 * - Units & currencies ($25, 25 dollars, 12 cm, 12 sq cm)
 * - Coordinate pairs ((2, 3), 2,3, (2,3))
 */

import { MathQuestion, ValidationResult } from './types';
import { gcd } from './helpers';

export interface ParsedAnswer {
  raw: string;
  cleaned: string;
  numericValue: number | null;
  fraction?: { num: number; den: number };
  isPercentage: boolean;
  coordinates?: [number, number];
  isAlgebraic: boolean;
  algebraicStr?: string;
}

/**
 * Strips cosmetic text, variable assignments (e.g. "x = "), dollar signs, and common unit suffixes.
 */
export function cleanInputString(input: string): string {
  if (!input) return '';
  let str = input.trim().toLowerCase();

  // Strip leading variable assignment like "x =", "y =", "ans =", "a =", "slope ="
  str = str.replace(/^[a-z]\s*=\s*/i, '');
  str = str.replace(/^ans(wer)?\s*=\s*/i, '');

  // Strip currency symbols and dollar words
  str = str.replace(/^\$\s*/, '').replace(/\s*(dollars?|cents?)$/i, '');

  // Strip percentage sign if attached
  const hadPercent = str.includes('%') || /percent/i.test(str);
  str = str.replace(/%/g, '').replace(/\s*percent(age)?/i, '');

  // Strip common units like cm, m, ft, in, units, sq cm, cm^2, sq units, etc.
  str = str.replace(/\s*(sq(uare)?\s*(units?|cm|m|ft|in|inches)?|cm\^2|m\^2|ft\^2|in\^2|cm²|m²|ft²|in²)$/i, '');
  str = str.replace(/\s*(units?|cm|m|km|ft|feet|in|inches|deg|degrees|°|hrs?|hours?|mins?|minutes?|secs?|seconds?|mph|km\/h)$/i, '');

  // Remove thousands separators in numbers e.g. 1,000 -> 1000
  str = str.replace(/(\d),(\d{3})\b/g, '$1$2');

  // Normalize spaces around negative signs e.g. "- 15" -> "-15"
  str = str.replace(/-\s+/g, '-');

  // Normalize spaces around fraction slashes e.g. "3 / 4" -> "3/4"
  str = str.replace(/\s*\/\s*/g, '/');

  // Normalize spaces around ratio colons e.g. "3 : 4" -> "3:4"
  str = str.replace(/\s*:\s*/g, ':');

  // Normalize spaces in coordinates e.g. "2 , 3" -> "2, 3"
  str = str.replace(/\s*,\s*/g, ', ');

  // Re-attach % flag indicator internally if it was present
  if (hadPercent) {
    str = str.trim() + '%';
  }

  return str.trim();
}

/**
 * Parses any user or expected answer string into numerical and structural components
 */
export function parseAnswer(input: string | number): ParsedAnswer {
  if (typeof input === 'number') {
    return {
      raw: `${input}`,
      cleaned: `${input}`,
      numericValue: input,
      isPercentage: false,
      isAlgebraic: false,
    };
  }

  const raw = `${input}`.trim();
  const cleaned = cleanInputString(raw);
  const isPercent = cleaned.endsWith('%') || raw.includes('%');
  const baseCleaned = cleaned.replace(/%$/, '').trim();

  // Check for Coordinate pair: e.g. "(2, 3)" or "2, 3" or "(2,3)"
  const coordMatch = baseCleaned.match(/^\(?\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*\)?$/);
  if (coordMatch) {
    const x = parseFloat(coordMatch[1]);
    const y = parseFloat(coordMatch[2]);
    return {
      raw,
      cleaned: `(${x}, ${y})`,
      numericValue: null,
      coordinates: [x, y],
      isPercentage: false,
      isAlgebraic: false,
    };
  }

  // Check for Mixed Number: e.g. "1 1/2" or "-2 3/4"
  const mixedMatch = baseCleaned.match(/^(-?\d+)\s+(\d+)\s*\/\s*(\d+)$/);
  if (mixedMatch) {
    const whole = parseInt(mixedMatch[1], 10);
    const num = parseInt(mixedMatch[2], 10);
    const den = parseInt(mixedMatch[3], 10);
    if (den !== 0) {
      const sign = whole < 0 || mixedMatch[1].startsWith('-') ? -1 : 1;
      const absWhole = Math.abs(whole);
      const totalNum = sign * (absWhole * den + num);
      const numericValue = totalNum / den;
      return {
        raw,
        cleaned: baseCleaned,
        numericValue: isPercent ? numericValue / 100 : numericValue,
        fraction: { num: totalNum, den },
        isPercentage: isPercent,
        isAlgebraic: false,
      };
    }
  }

  // Check for Fraction: e.g. "3/4" or "-5/6" or "10 / 2"
  const fracMatch = baseCleaned.match(/^(-?\d+(?:\.\d+)?)\s*\/\s*(-?\d+(?:\.\d+)?)$/);
  if (fracMatch) {
    const num = parseFloat(fracMatch[1]);
    const den = parseFloat(fracMatch[2]);
    if (den !== 0) {
      const numericValue = num / den;
      return {
        raw,
        cleaned: `${num}/${den}`,
        numericValue: isPercent ? numericValue / 100 : numericValue,
        fraction: { num, den },
        isPercentage: isPercent,
        isAlgebraic: false,
      };
    }
  }

  // Check for standard Decimal / Integer: e.g. "0.5", "-12", "42"
  const numMatch = baseCleaned.match(/^-?\d*\.?\d+$/);
  if (numMatch) {
    const parsed = parseFloat(baseCleaned);
    if (!isNaN(parsed)) {
      return {
        raw,
        cleaned: baseCleaned,
        numericValue: isPercent ? parsed / 100 : parsed,
        isPercentage: isPercent,
        isAlgebraic: false,
      };
    }
  }

  // Check for simple algebraic expression: e.g. "2x + 3", "3x - 5", "x^2", "x = 4"
  const normalizedAlgebraic = baseCleaned
    .replace(/\s+/g, '')
    .replace(/\*/g, '')
    .replace(/\+ -/g, '-')
    .toLowerCase();

  return {
    raw,
    cleaned: baseCleaned,
    numericValue: null,
    isPercentage: isPercent,
    isAlgebraic: true,
    algebraicStr: normalizedAlgebraic,
  };
}

/**
 * Checks if two parsed answers are mathematically equivalent
 */
export function areAnswersEquivalent(
  userParsed: ParsedAnswer,
  expectedParsed: ParsedAnswer,
  options?: { isPercentageQuestion?: boolean; tolerance?: number }
): boolean {
  const tolerance = options?.tolerance ?? 0.0001;

  // 1. Exact cleaned match
  if (
    userParsed.cleaned.toLowerCase() === expectedParsed.cleaned.toLowerCase() ||
    userParsed.raw.trim().toLowerCase() === expectedParsed.raw.trim().toLowerCase()
  ) {
    return true;
  }

  // 2. Coordinate equality
  if (userParsed.coordinates && expectedParsed.coordinates) {
    return (
      Math.abs(userParsed.coordinates[0] - expectedParsed.coordinates[0]) < tolerance &&
      Math.abs(userParsed.coordinates[1] - expectedParsed.coordinates[1]) < tolerance
    );
  }

  // 3. Algebraic equality
  if (userParsed.isAlgebraic && expectedParsed.isAlgebraic) {
    if (userParsed.algebraicStr && expectedParsed.algebraicStr) {
      if (userParsed.algebraicStr === expectedParsed.algebraicStr) return true;
      // Handle commutative addition e.g. "3+2x" === "2x+3"
      const userTerms = userParsed.algebraicStr.split(/(?=[+-])/).sort().join('');
      const expectedTerms = expectedParsed.algebraicStr.split(/(?=[+-])/).sort().join('');
      if (userTerms === expectedTerms) return true;
    }
  }

  // 4. Numeric value comparisons
  if (userParsed.numericValue !== null && expectedParsed.numericValue !== null) {
    const userVal = userParsed.numericValue;
    const expVal = expectedParsed.numericValue;

    // Direct numerical equality
    if (Math.abs(userVal - expVal) < tolerance) {
      return true;
    }

    // Percentage flexibility:
    // If the question is about percentages, "50%", "50", and "0.5" should all resolve equivalently
    // e.g. user types "50%" (numericValue = 0.5) and expected is "50" or "50%" or "0.5"
    if (options?.isPercentageQuestion || userParsed.isPercentage || expectedParsed.isPercentage) {
      if (Math.abs(userVal * 100 - expVal) < tolerance) return true;
      if (Math.abs(userVal - expVal * 100) < tolerance) return true;
      if (Math.abs(userVal * 100 - expVal * 100) < tolerance) return true;
    }

    // Fraction check: e.g. user types 2/4 and expected is 1/2 or 0.5
    if (userParsed.fraction && expectedParsed.fraction) {
      const g1 = gcd(userParsed.fraction.num, userParsed.fraction.den);
      const g2 = gcd(expectedParsed.fraction.num, expectedParsed.fraction.den);
      if (
        userParsed.fraction.num / g1 === expectedParsed.fraction.num / g2 &&
        userParsed.fraction.den / g1 === expectedParsed.fraction.den / g2
      ) {
        return true;
      }
    }
  }

  // 5. If one is algebraic representation of variable (e.g. user typed "x=4" or "4")
  if (userParsed.numericValue !== null && expectedParsed.algebraicStr) {
    const num = expectedParsed.algebraicStr.match(/^[a-z]=(-?\d+(?:\.\d+)?)$/);
    if (num && Math.abs(userParsed.numericValue - parseFloat(num[1])) < tolerance) {
      return true;
    }
  }
  if (expectedParsed.numericValue !== null && userParsed.algebraicStr) {
    const num = userParsed.algebraicStr.match(/^[a-z]=(-?\d+(?:\.\d+)?)$/);
    if (num && Math.abs(parseFloat(num[1]) - expectedParsed.numericValue) < tolerance) {
      return true;
    }
  }

  return false;
}

const CELEBRATION_MESSAGES = [
  '🎉 Correct! Great job!',
  '🌟 Awesome work! You nailed it!',
  '🎯 Spot on! Excellent thinking!',
  '✨ Brilliant! Keep it up!',
  '🚀 Outstanding job! You got it right!',
  '👏 Perfect answer! Great math skills!',
];

/**
 * Main evaluation function to check student answer against a math question
 */
export function checkAnswer(userInput: string, question: MathQuestion): ValidationResult {
  const userTrimmed = (userInput || '').trim();
  if (!userTrimmed) {
    return {
      isCorrect: false,
      userAnswerRaw: '',
      userAnswerNormalized: '',
      expectedNormalized: `${question.correctAnswer}`,
      feedback: 'Please enter an answer before submitting.',
    };
  }

  const isPercentageQuestion =
    question.answerType === 'percentage' ||
    question.topicKey.includes('percent') ||
    `${question.correctAnswer}`.includes('%');

  const userParsed = parseAnswer(userTrimmed);
  const expectedParsed = parseAnswer(question.correctAnswer);

  let isMatch = areAnswersEquivalent(userParsed, expectedParsed, { isPercentageQuestion });

  // Also test against any secondary accepted answers
  if (!isMatch && question.acceptedAnswers && question.acceptedAnswers.length > 0) {
    for (const alt of question.acceptedAnswers) {
      const altParsed = parseAnswer(alt);
      if (areAnswersEquivalent(userParsed, altParsed, { isPercentageQuestion })) {
        isMatch = true;
        break;
      }
    }
  }

  if (isMatch) {
    const feedback = CELEBRATION_MESSAGES[Math.floor(Math.random() * CELEBRATION_MESSAGES.length)];
    return {
      isCorrect: true,
      userAnswerRaw: userTrimmed,
      userAnswerNormalized: userParsed.cleaned,
      expectedNormalized: `${question.correctAnswer}`,
      feedback,
    };
  }

  return {
    isCorrect: false,
    userAnswerRaw: userTrimmed,
    userAnswerNormalized: userParsed.cleaned,
    expectedNormalized: `${question.correctAnswer}`,
    feedback: '❌ Not quite. Try again or use a hint.',
  };
}
