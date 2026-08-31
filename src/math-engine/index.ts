/**
 * Study Buddy Math Engine
 * Unified Question Generation & Evaluation System
 */

import { Grade, TopicKey, Difficulty, MathQuestion, TopicInfo } from './types';
import {
  generateGrade6Fractions,
  generateGrade6Decimals,
  generateGrade6Percentages,
  generateGrade6Ratios,
  generateGrade6Integers,
  generateGrade6BasicAlgebra,
  generateGrade6Geometry,
} from './generators/grade6';
import {
  generateGrade7RationalNumbers,
  generateGrade7Expressions,
  generateGrade7Equations,
  generateGrade7RatiosProportions,
  generateGrade7Percentages,
  generateGrade7Geometry,
  generateGrade7Probability,
} from './generators/grade7';
import {
  generateGrade8LinearEquations,
  generateGrade8Exponents,
  generateGrade8Functions,
  generateGrade8Pythagorean,
  generateGrade8Geometry,
  generateGrade8Statistics,
  generateGrade8Probability,
} from './generators/grade8';

export * from './types';
export * from './helpers';
export * from './normalizer';

export const GRADE_TOPICS: Record<Grade, TopicInfo[]> = {
  6: [
    {
      key: 'fractions',
      grade: 6,
      name: 'Fractions',
      shortDesc: 'Adding, subtracting, multiplying, and real-world fraction problems',
      icon: 'PieChart',
      color: 'from-blue-500 to-indigo-600',
    },
    {
      key: 'decimals',
      grade: 6,
      name: 'Decimals',
      shortDesc: 'Operations with decimals, money calculations, and shopping word problems',
      icon: 'Coins',
      color: 'from-emerald-500 to-teal-600',
    },
    {
      key: 'percentages',
      grade: 6,
      name: 'Percentages',
      shortDesc: 'Benchmark percents, calculating discounts, and percent of numbers',
      icon: 'Percent',
      color: 'from-amber-500 to-orange-600',
    },
    {
      key: 'ratios',
      grade: 6,
      name: 'Ratios',
      shortDesc: 'Simplifying ratios, part-to-part, and multi-part sharing',
      icon: 'Scale',
      color: 'from-purple-500 to-pink-600',
    },
    {
      key: 'integers',
      grade: 6,
      name: 'Integers',
      shortDesc: 'Absolute value, negative numbers, and temperature word problems',
      icon: 'ThermometerSnowflake',
      color: 'from-cyan-500 to-blue-600',
    },
    {
      key: 'basic-algebra',
      grade: 6,
      name: 'Basic Algebra',
      shortDesc: 'One-step equations, inverse operations, and evaluating expressions',
      icon: 'Variable',
      color: 'from-violet-500 to-indigo-600',
    },
    {
      key: 'geometry',
      grade: 6,
      name: 'Geometry',
      shortDesc: 'Perimeter, triangle area, rectangle area, and prism volumes',
      icon: 'Shapes',
      color: 'from-rose-500 to-red-600',
    },
  ],
  7: [
    {
      key: 'rational-numbers',
      grade: 7,
      name: 'Rational Numbers',
      shortDesc: 'Positive & negative fractions, decimals, and order of operations',
      icon: 'Binary',
      color: 'from-blue-500 to-indigo-600',
    },
    {
      key: 'expressions',
      grade: 7,
      name: 'Expressions',
      shortDesc: 'Distributive property, combining like terms, and factoring',
      icon: 'Layers',
      color: 'from-violet-500 to-purple-600',
    },
    {
      key: 'equations',
      grade: 7,
      name: 'Equations',
      shortDesc: 'Two-step linear equations and rental/pricing word problems',
      icon: 'Equal',
      color: 'from-amber-500 to-orange-600',
    },
    {
      key: 'ratios-proportions',
      grade: 7,
      name: 'Ratios and Proportions',
      shortDesc: 'Unit rates, solving proportions, and map scale drawings',
      icon: 'Compass',
      color: 'from-emerald-500 to-teal-600',
    },
    {
      key: 'percentages',
      grade: 7,
      name: 'Percentages',
      shortDesc: 'Tax, tips, markups, percent increase, and simple interest',
      icon: 'BadgePercent',
      color: 'from-rose-500 to-pink-600',
    },
    {
      key: 'geometry',
      grade: 7,
      name: 'Geometry',
      shortDesc: 'Circle area & circumference, angle pairs, and surface area',
      icon: 'CircleDot',
      color: 'from-sky-500 to-blue-600',
    },
    {
      key: 'probability',
      grade: 7,
      name: 'Probability',
      shortDesc: 'Single-event chance, spinners, marble bags, and survey predictions',
      icon: 'Dices',
      color: 'from-teal-500 to-emerald-600',
    },
  ],
  8: [
    {
      key: 'linear-equations',
      grade: 8,
      name: 'Linear Equations',
      shortDesc: 'Multi-step equations, variables on both sides, and slope',
      icon: 'TrendingUp',
      color: 'from-blue-500 to-indigo-600',
    },
    {
      key: 'exponents',
      grade: 8,
      name: 'Exponents',
      shortDesc: 'Laws of exponents, negative powers, and scientific notation',
      icon: 'Superscript',
      color: 'from-violet-500 to-purple-600',
    },
    {
      key: 'functions',
      grade: 8,
      name: 'Functions',
      shortDesc: 'Evaluating functions f(x), input-output tables, and rate of change',
      icon: 'Workflow',
      color: 'from-cyan-500 to-teal-600',
    },
    {
      key: 'pythagorean',
      grade: 8,
      name: 'Pythagorean Theorem',
      shortDesc: 'Right triangles, finding hypotenuse & legs, and distance problems',
      icon: 'TriangleRight',
      color: 'from-amber-500 to-orange-600',
    },
    {
      key: 'geometry',
      grade: 8,
      name: 'Geometry',
      shortDesc: 'Cylinder, cone & sphere volume, and parallel line transversals',
      icon: 'Box',
      color: 'from-rose-500 to-pink-600',
    },
    {
      key: 'statistics',
      grade: 8,
      name: 'Statistics',
      shortDesc: 'Mean, median, mode, range, target averages, and IQR box plots',
      icon: 'BarChart3',
      color: 'from-emerald-500 to-green-600',
    },
    {
      key: 'probability',
      grade: 8,
      name: 'Probability',
      shortDesc: 'Compound independent & dependent events without replacement',
      icon: 'Sparkles',
      color: 'from-purple-500 to-indigo-600',
    },
  ],
};

/**
 * Generates a single procedural math question based on grade, topic, and difficulty
 */
export function generateQuestion(
  grade: Grade,
  topicKey: TopicKey,
  difficulty: Difficulty
): MathQuestion {
  switch (grade) {
    case 6:
      switch (topicKey) {
        case 'fractions':
          return generateGrade6Fractions(difficulty);
        case 'decimals':
          return generateGrade6Decimals(difficulty);
        case 'percentages':
          return generateGrade6Percentages(difficulty);
        case 'ratios':
          return generateGrade6Ratios(difficulty);
        case 'integers':
          return generateGrade6Integers(difficulty);
        case 'basic-algebra':
          return generateGrade6BasicAlgebra(difficulty);
        case 'geometry':
          return generateGrade6Geometry(difficulty);
        default:
          return generateGrade6Fractions(difficulty);
      }

    case 7:
      switch (topicKey) {
        case 'rational-numbers':
          return generateGrade7RationalNumbers(difficulty);
        case 'expressions':
          return generateGrade7Expressions(difficulty);
        case 'equations':
          return generateGrade7Equations(difficulty);
        case 'ratios-proportions':
          return generateGrade7RatiosProportions(difficulty);
        case 'percentages':
          return generateGrade7Percentages(difficulty);
        case 'geometry':
          return generateGrade7Geometry(difficulty);
        case 'probability':
          return generateGrade7Probability(difficulty);
        default:
          return generateGrade7Equations(difficulty);
      }

    case 8:
      switch (topicKey) {
        case 'linear-equations':
          return generateGrade8LinearEquations(difficulty);
        case 'exponents':
          return generateGrade8Exponents(difficulty);
        case 'functions':
          return generateGrade8Functions(difficulty);
        case 'pythagorean':
          return generateGrade8Pythagorean(difficulty);
        case 'geometry':
          return generateGrade8Geometry(difficulty);
        case 'statistics':
          return generateGrade8Statistics(difficulty);
        case 'probability':
          return generateGrade8Probability(difficulty);
        default:
          return generateGrade8LinearEquations(difficulty);
      }

    default:
      return generateGrade6Fractions(difficulty);
  }
}

/**
 * Generates a set of unique practice questions
 */
export function generatePracticeSet(
  grade: Grade,
  topicKey: TopicKey,
  difficulty: Difficulty,
  count: number
): MathQuestion[] {
  const questions: MathQuestion[] = [];
  const generatedSignatures = new Set<string>();

  let attempts = 0;
  while (questions.length < count && attempts < count * 8) {
    attempts++;
    const q = generateQuestion(grade, topicKey, difficulty);
    const signature = `${q.prompt}|${q.mathExpression || ''}|${q.correctAnswer}`;
    if (!generatedSignatures.has(signature)) {
      generatedSignatures.add(signature);
      questions.push(q);
    }
  }

  // Fallback if needed
  while (questions.length < count) {
    questions.push(generateQuestion(grade, topicKey, difficulty));
  }

  return questions;
}
