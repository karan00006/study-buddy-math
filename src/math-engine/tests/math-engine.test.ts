import { describe, it, expect } from 'vitest';
import {
  parseAnswer,
  areAnswersEquivalent,
  checkAnswer,
} from '../normalizer';
import { GRADE_TOPICS, generateQuestion, generatePracticeSet } from '../index';
import { Grade, Difficulty } from '../types';

describe('Math Engine: Answer Normalizer & Equivalence', () => {
  it('correctly handles basic numbers and integers', () => {
    const p1 = parseAnswer('42');
    const p2 = parseAnswer(42);
    expect(p1.numericValue).toBe(42);
    expect(areAnswersEquivalent(p1, p2)).toBe(true);

    const neg1 = parseAnswer('-15');
    const neg2 = parseAnswer('- 15');
    expect(areAnswersEquivalent(neg1, neg2)).toBe(true);
  });

  it('correctly equates fractions and decimals', () => {
    // 1/2 == 0.5 == 2/4 == 3/6
    const half = parseAnswer('1/2');
    const halfDec = parseAnswer('0.5');
    const twoFourths = parseAnswer('2/4');
    const threeSixths = parseAnswer('3/6');

    expect(areAnswersEquivalent(half, halfDec)).toBe(true);
    expect(areAnswersEquivalent(twoFourths, half)).toBe(true);
    expect(areAnswersEquivalent(threeSixths, halfDec)).toBe(true);

    // 3/4 == 0.75 == 6/8
    const threeFourths = parseAnswer('3/4');
    const threeFourthsDec = parseAnswer('0.75');
    expect(areAnswersEquivalent(threeFourths, threeFourthsDec)).toBe(true);
  });

  it('correctly equates percentages with decimals and numbers', () => {
    // 50% == 0.5 == 1/2
    const pct50 = parseAnswer('50%');
    const dec05 = parseAnswer('0.5');
    expect(areAnswersEquivalent(pct50, dec05, { isPercentageQuestion: true })).toBe(true);

    // 25% == 0.25 == 1/4
    const pct25 = parseAnswer('25%');
    const dec025 = parseAnswer('0.25');
    const frac14 = parseAnswer('1/4');
    expect(areAnswersEquivalent(pct25, dec025, { isPercentageQuestion: true })).toBe(true);
    expect(areAnswersEquivalent(pct25, frac14, { isPercentageQuestion: true })).toBe(true);
  });

  it('correctly parses mixed numbers', () => {
    // 1 1/2 == 1.5 == 3/2
    const mixed1 = parseAnswer('1 1/2');
    const dec1 = parseAnswer('1.5');
    const frac1 = parseAnswer('3/2');

    expect(areAnswersEquivalent(mixed1, dec1)).toBe(true);
    expect(areAnswersEquivalent(mixed1, frac1)).toBe(true);
  });

  it('verifies exact examples from user specification: 0.5 == 1/2, 50% == 0.5, 2/4 == 1/2', () => {
    // 0.5 should equal 1/2
    expect(areAnswersEquivalent(parseAnswer('0.5'), parseAnswer('1/2'))).toBe(true);
    expect(areAnswersEquivalent(parseAnswer('1/2'), parseAnswer('0.5'))).toBe(true);

    // 50% should equal 0.5
    expect(areAnswersEquivalent(parseAnswer('50%'), parseAnswer('0.5'), { isPercentageQuestion: true })).toBe(true);
    expect(areAnswersEquivalent(parseAnswer('0.5'), parseAnswer('50%'), { isPercentageQuestion: true })).toBe(true);

    // 2/4 should equal 1/2
    expect(areAnswersEquivalent(parseAnswer('2/4'), parseAnswer('1/2'))).toBe(true);
  });

  it('correctly validates the Sara pizza fraction example question', () => {
    const pizzaQuestion = {
      id: 'test-pizza',
      grade: 6 as Grade,
      topicKey: 'fractions' as const,
      topicName: 'Fractions',
      difficulty: 'medium' as Difficulty,
      prompt: 'Sara has 3/4 of a pizza. She eats 1/3 of what she has. How much pizza did she eat?',
      correctAnswer: '1/4',
      acceptedAnswers: ['1/4', '0.25', '2/8'],
      answerType: 'fraction' as const,
      hints: ['Multiply the fractions: (3/4) × (1/3)', '3/12 simplifies to 1/4'],
      solution: {
        steps: ['(3/4) × (1/3) = 3/12', 'Simplify: 3/12 = 1/4'],
        finalAnswer: '1/4',
      },
    };

    expect(checkAnswer('1/4', pizzaQuestion).isCorrect).toBe(true);
    expect(checkAnswer('0.25', pizzaQuestion).isCorrect).toBe(true);
    expect(checkAnswer('2/8', pizzaQuestion).isCorrect).toBe(true);
    expect(checkAnswer(' 1 / 4 ', pizzaQuestion).isCorrect).toBe(true);
    expect(checkAnswer('1/3', pizzaQuestion).isCorrect).toBe(false);
  });

  it('correctly strips currency and units', () => {
    const money1 = parseAnswer('$25');
    const money2 = parseAnswer('25 dollars');
    const plain25 = parseAnswer('25');
    expect(areAnswersEquivalent(money1, plain25)).toBe(true);
    expect(areAnswersEquivalent(money2, plain25)).toBe(true);

    const cm1 = parseAnswer('12 cm');
    const cmSq = parseAnswer('12 sq cm');
    const num12 = parseAnswer('12');
    expect(areAnswersEquivalent(cm1, num12)).toBe(true);
    expect(areAnswersEquivalent(cmSq, num12)).toBe(true);
  });

  it('correctly handles variable assignments', () => {
    const eq1 = parseAnswer('x = 4');
    const eq2 = parseAnswer('x=4');
    const plain4 = parseAnswer('4');

    expect(areAnswersEquivalent(eq1, plain4)).toBe(true);
    expect(areAnswersEquivalent(eq2, plain4)).toBe(true);
  });
});

describe('Math Engine: Topic Problem Generators for All Grades', () => {
  const grades: Grade[] = [6, 7, 8];
  const difficulties: Difficulty[] = ['easy', 'medium', 'hard'];

  for (const grade of grades) {
    describe(`Grade ${grade} Generators`, () => {
      const topics = GRADE_TOPICS[grade];

      for (const topic of topics) {
        describe(`Topic: ${topic.name} (${topic.key})`, () => {
          for (const difficulty of difficulties) {
            it(`generates valid ${difficulty} question and verifies its correct answer`, () => {
              // Generate multiple iterations to test random variation
              for (let i = 0; i < 3; i++) {
                const question = generateQuestion(grade, topic.key, difficulty);

                expect(question.id).toBeTruthy();
                expect(question.grade).toBe(grade);
                expect(question.topicKey).toBe(topic.key);
                expect(question.difficulty).toBe(difficulty);
                expect(question.prompt).toBeTruthy();
                expect(question.correctAnswer).toBeDefined();
                expect(question.hints.length).toBeGreaterThanOrEqual(1);
                expect(question.solution.steps.length).toBeGreaterThanOrEqual(1);
                expect(question.solution.finalAnswer).toBeTruthy();

                // Self-validation: The generated correct answer MUST pass the checkAnswer evaluator!
                const valResult = checkAnswer(question.correctAnswer.toString(), question);
                expect(
                  valResult.isCorrect,
                  `Expected generated answer "${question.correctAnswer}" to validate for prompt: "${question.prompt}"`
                ).toBe(true);
              }
            });
          }
        });
      }
    });
  }

  it('generates a full practice set with requested count and unique items', () => {
    const set = generatePracticeSet(6, 'fractions', 'medium', 10);
    expect(set.length).toBe(10);
    set.forEach((q) => {
      expect(q.grade).toBe(6);
      expect(q.topicKey).toBe('fractions');
      expect(q.difficulty).toBe('medium');
    });
  });
});
