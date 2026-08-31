/**
 * Grade 6 Question Generators
 * Topics: Fractions, Decimals, Percentages, Ratios, Integers, Basic Algebra, Geometry
 */

import { MathQuestion, Difficulty } from '../types';
import {
  randomInt,
  randomChoice,
  gcd,
  simplifyFraction,
  formatFraction,
  formatNumber,
  roundTo,
} from '../helpers';

export function generateGrade6Fractions(difficulty: Difficulty): MathQuestion {
  const id = `g6-frac-${Date.now()}-${randomInt(100, 999)}`;

  if (difficulty === 'easy') {
    // Adding or subtracting like denominators or simplifying
    const subType = randomChoice(['add', 'sub', 'simplify']);

    if (subType === 'add') {
      const den = randomChoice([4, 5, 6, 8, 10, 12]);
      const n1 = randomInt(1, den - 2);
      const n2 = randomInt(1, den - 1 - n1);
      const sumNum = n1 + n2;
      const [, sDen] = simplifyFraction(sumNum, den);
      const ansStr = formatFraction(sumNum, den);

      return {
        id,
        grade: 6,
        topicKey: 'fractions',
        topicName: 'Fractions',
        difficulty,
        prompt: `Add the fractions and simplify your answer to lowest terms:`,
        mathExpression: `${n1}/${den} + ${n2}/${den}`,
        correctAnswer: ansStr,
        acceptedAnswers: [ansStr, `${sumNum}/${den}`, (sumNum / den).toString(), roundTo(sumNum / den, 3).toString()],
        answerType: 'fraction',
        placeholder: 'e.g. 3/4 or 1/2',
        hints: [
          `Since the denominators are already the same (${den}), add only the top numbers (numerators).`,
          `${n1} + ${n2} = ${sumNum}. Now simplify ${sumNum}/${den} by dividing top and bottom by their greatest common factor.`,
        ],
        solution: {
          formula: 'a/d + b/d = (a + b)/d',
          steps: [
            `Keep the common denominator: ${den}.`,
            `Add the numerators: ${n1} + ${n2} = ${sumNum}.`,
            `Write the fraction: ${sumNum}/${den}.`,
            ...(sDen !== den
              ? [`Divide both numerator and denominator by ${gcd(sumNum, den)} to get ${ansStr}.`]
              : [`The fraction ${ansStr} is already in simplest form.`]),
          ],
          finalAnswer: ansStr,
          tip: 'When denominators are identical, simply combine the numerators!',
        },
      };
    } else if (subType === 'sub') {
      const den = randomChoice([5, 6, 8, 10, 12]);
      const n1 = randomInt(2, den - 1);
      const n2 = randomInt(1, n1 - 1);
      const diffNum = n1 - n2;
      const ansStr = formatFraction(diffNum, den);

      return {
        id,
        grade: 6,
        topicKey: 'fractions',
        topicName: 'Fractions',
        difficulty,
        prompt: `Subtract the fractions and simplify your answer:`,
        mathExpression: `${n1}/${den} - ${n2}/${den}`,
        correctAnswer: ansStr,
        acceptedAnswers: [ansStr, `${diffNum}/${den}`, (diffNum / den).toString()],
        answerType: 'fraction',
        placeholder: 'e.g. 1/4',
        hints: [
          `Both fractions have the same bottom number (${den}), so subtract the numerators: ${n1} - ${n2}.`,
          `Simplify ${diffNum}/${den} if possible.`,
        ],
        solution: {
          steps: [
            `Subtract the numerators: ${n1} - ${n2} = ${diffNum}.`,
            `Keep the denominator ${den}: ${diffNum}/${den}.`,
            `Simplified form: ${ansStr}.`,
          ],
          finalAnswer: ansStr,
        },
      };
    } else {
      // Simplify a fraction
      const factor = randomChoice([2, 3, 4, 5]);
      const baseNum = randomChoice([1, 2, 3, 5]);
      const baseDen = randomChoice([2, 3, 4, 5, 7]);
      const actualDen = baseDen <= baseNum ? baseNum + 2 : baseDen;
      const num = baseNum * factor;
      const den = actualDen * factor;
      const ansStr = formatFraction(num, den);

      return {
        id,
        grade: 6,
        topicKey: 'fractions',
        topicName: 'Fractions',
        difficulty,
        prompt: `Simplify the fraction to its lowest terms:`,
        mathExpression: `${num}/${den}`,
        correctAnswer: ansStr,
        acceptedAnswers: [ansStr, (num / den).toString()],
        answerType: 'fraction',
        placeholder: 'e.g. 2/3',
        hints: [
          `Find the greatest common factor (GCF) of ${num} and ${den}.`,
          `Divide both ${num} and ${den} by ${gcd(num, den)}.`,
        ],
        solution: {
          steps: [
            `Find the common factor of ${num} and ${den}, which is ${gcd(num, den)}.`,
            `Divide numerator: ${num} ÷ ${gcd(num, den)} = ${baseNum}.`,
            `Divide denominator: ${den} ÷ ${gcd(num, den)} = ${actualDen}.`,
          ],
          finalAnswer: ansStr,
        },
      };
    }
  }

  if (difficulty === 'medium') {
    // Word problems or unlike denominators
    const isWordProblem = Math.random() > 0.4;

    if (isWordProblem) {
      // Classic middle school pizza / recipe problem
      const name = randomChoice(['Sara', 'Liam', 'Maya', 'Jordan', 'Emma', 'Lucas']);
      const item = randomChoice(['a pizza', 'a chocolate bar', 'a pan of brownies', 'a blueberry pie']);
      const totalParts = randomChoice([4, 6, 8, 10]);
      const haveNum = randomInt(2, totalParts - 1);
      const eatFractionChoice = randomChoice([
        { num: 1, den: 2, name: '1/2' },
        { num: 1, den: 3, name: '1/3' },
        { num: 1, den: 4, name: '1/4' },
      ]);

      // Result: (haveNum / totalParts) * (eatFractionChoice.num / eatFractionChoice.den)
      const resNum = haveNum * eatFractionChoice.num;
      const resDen = totalParts * eatFractionChoice.den;
      const ansStr = formatFraction(resNum, resDen);
      const ansDec = roundTo(resNum / resDen, 3);

      return {
        id,
        grade: 6,
        topicKey: 'fractions',
        topicName: 'Fractions',
        difficulty,
        prompt: `${name} has ${haveNum}/${totalParts} of ${item}. ${name} eats ${eatFractionChoice.name} of what they have. What fraction of the whole ${item.replace('a ', '')} did ${name} eat?`,
        correctAnswer: ansStr,
        acceptedAnswers: [ansStr, `${resNum}/${resDen}`, ansDec.toString(), (resNum / resDen).toString()],
        answerType: 'fraction',
        placeholder: 'e.g. 1/4',
        hints: [
          `"Eating ${eatFractionChoice.name} OF ${haveNum}/${totalParts}" means you multiply the two fractions.`,
          `Multiply the numerators: ${haveNum} × ${eatFractionChoice.num}, and denominators: ${totalParts} × ${eatFractionChoice.den}.`,
        ],
        solution: {
          formula: '(a/b) × (c/d) = (a × c) / (b × d)',
          steps: [
            `Set up the multiplication: (${haveNum}/${totalParts}) × (${eatFractionChoice.name}).`,
            `Multiply the top numbers: ${haveNum} × ${eatFractionChoice.num} = ${resNum}.`,
            `Multiply the bottom numbers: ${totalParts} × ${eatFractionChoice.den} = ${resDen}.`,
            `Simplify ${resNum}/${resDen} to get ${ansStr}.`,
          ],
          finalAnswer: ansStr,
          tip: 'In fraction word problems, the word "of" usually indicates multiplication!',
        },
      };
    } else {
      // Unlike denominator addition / subtraction
      const den1 = randomChoice([2, 3, 4, 5]);
      const den2 = randomChoice([3, 4, 5, 6]);
      if (den1 === den2) return generateGrade6Fractions(difficulty);

      const num1 = randomInt(1, den1 - 1);
      const num2 = randomInt(1, den2 - 1);
      const commonDen = (den1 * den2) / gcd(den1, den2);
      const adjNum1 = num1 * (commonDen / den1);
      const adjNum2 = num2 * (commonDen / den2);
      const sumNum = adjNum1 + adjNum2;
      const ansStr = formatFraction(sumNum, commonDen);

      return {
        id,
        grade: 6,
        topicKey: 'fractions',
        topicName: 'Fractions',
        difficulty,
        prompt: `Add the fractions with unlike denominators and simplify:`,
        mathExpression: `${num1}/${den1} + ${num2}/${den2}`,
        correctAnswer: ansStr,
        acceptedAnswers: [ansStr, `${sumNum}/${commonDen}`, (sumNum / commonDen).toString()],
        answerType: 'fraction',
        placeholder: 'e.g. 7/12',
        hints: [
          `Find the Least Common Denominator (LCD) of ${den1} and ${den2}, which is ${commonDen}.`,
          `Convert ${num1}/${den1} to ${adjNum1}/${commonDen} and ${num2}/${den2} to ${adjNum2}/${commonDen}, then add.`,
        ],
        solution: {
          steps: [
            `Find LCD of ${den1} and ${den2} = ${commonDen}.`,
            `Convert first fraction: ${num1}/${den1} = ${adjNum1}/${commonDen}.`,
            `Convert second fraction: ${num2}/${den2} = ${adjNum2}/${commonDen}.`,
            `Add numerators: ${adjNum1} + ${adjNum2} = ${sumNum}.`,
            `Result: ${sumNum}/${commonDen} = ${ansStr}.`,
          ],
          finalAnswer: ansStr,
        },
      };
    }
  }

  // Hard: Dividing fractions or multi-step mixed operations
  const n1 = randomInt(1, 4);
  const d1 = randomChoice([3, 4, 5, 6]);
  const n2 = randomInt(1, 3);
  const d2 = randomChoice([2, 3, 5, 7]);

  // (n1 / d1) ÷ (n2 / d2) = (n1 * d2) / (d1 * n2)
  const resNum = n1 * d2;
  const resDen = d1 * n2;
  const ansStr = formatFraction(resNum, resDen);

  return {
    id,
    grade: 6,
    topicKey: 'fractions',
    topicName: 'Fractions',
    difficulty: 'hard',
    prompt: `Divide the fractions and simplify your answer:`,
    mathExpression: `(${n1}/${d1}) ÷ (${n2}/${d2})`,
    correctAnswer: ansStr,
    acceptedAnswers: [ansStr, `${resNum}/${resDen}`, (resNum / resDen).toString()],
    answerType: 'fraction',
    placeholder: 'e.g. 5/6 or 1 1/4',
    hints: [
      `Remember "Keep, Change, Flip" (Multiply by the reciprocal).`,
      `Keep ${n1}/${d1}, change ÷ to ×, and flip ${n2}/${d2} to ${d2}/${n2}.`,
    ],
    solution: {
      formula: '(a/b) ÷ (c/d) = (a/b) × (d/c)',
      steps: [
        `Flip the second fraction to get its reciprocal: ${d2}/${n2}.`,
        `Multiply by the reciprocal: (${n1}/${d1}) × (${d2}/${n2}).`,
        `Multiply numerators: ${n1} × ${d2} = ${resNum}.`,
        `Multiply denominators: ${d1} × ${n2} = ${resDen}.`,
        `Simplify ${resNum}/${resDen} = ${ansStr}.`,
      ],
      finalAnswer: ansStr,
      tip: 'To divide fractions, multiply by the upside-down fraction (reciprocal)!',
    },
  };
}

export function generateGrade6Decimals(difficulty: Difficulty): MathQuestion {
  const id = `g6-dec-${Date.now()}-${randomInt(100, 999)}`;

  if (difficulty === 'easy') {
    // Money / simple addition or subtraction
    const a = roundTo(randomInt(10, 80) * 0.25 + randomInt(1, 9) * 0.1, 2);
    const b = roundTo(randomInt(5, 50) * 0.25 + randomInt(1, 9) * 0.1, 2);
    const op = randomChoice(['+', '-']);
    const ans = op === '+' ? roundTo(a + b, 2) : roundTo(Math.max(a, b) - Math.min(a, b), 2);
    const first = op === '+' ? a : Math.max(a, b);
    const second = op === '+' ? b : Math.min(a, b);

    return {
      id,
      grade: 6,
      topicKey: 'decimals',
      topicName: 'Decimals',
      difficulty,
      prompt: `Calculate the exact value:`,
      mathExpression: `${first.toFixed(2)} ${op} ${second.toFixed(2)}`,
      correctAnswer: ans.toString(),
      acceptedAnswers: [ans.toString(), ans.toFixed(2), `$${ans.toFixed(2)}`],
      answerType: 'decimal',
      placeholder: 'e.g. 12.45',
      hints: [
        `Line up the decimal points vertically before calculating.`,
        op === '+'
          ? `Add from right to left, carrying over when needed.`
          : `Subtract from right to left, borrowing when needed.`,
      ],
      solution: {
        steps: [
          `Line up the decimal points of ${first.toFixed(2)} and ${second.toFixed(2)}.`,
          `Perform column ${op === '+' ? 'addition' : 'subtraction'}.`,
          `Place the decimal point directly below in the answer: ${ans.toFixed(2)}.`,
        ],
        finalAnswer: ans.toString(),
      },
    };
  }

  if (difficulty === 'medium') {
    // Decimal multiplication or shopping word problem
    const price = roundTo(randomInt(2, 9) + randomChoice([0.25, 0.5, 0.75, 0.45, 0.99]), 2);
    const qty = randomInt(3, 8);
    const total = roundTo(price * qty, 2);
    const item = randomChoice(['notebooks', 'pens', 'sketchbooks', 'water bottles', 'packs of stickers']);

    return {
      id,
      grade: 6,
      topicKey: 'decimals',
      topicName: 'Decimals',
      difficulty,
      prompt: `A student bought ${qty} ${item} for $${price.toFixed(2)} each. What was the total cost before tax?`,
      correctAnswer: total.toFixed(2),
      acceptedAnswers: [total.toFixed(2), total.toString(), `$${total.toFixed(2)}`, `$${total}`],
      answerType: 'decimal',
      unit: '$',
      placeholder: 'e.g. 15.75',
      hints: [
        `Multiply the price of one item ($${price.toFixed(2)}) by the quantity (${qty}).`,
        `Calculate ${price.toFixed(2)} × ${qty}. Remember to place 2 decimal places in your final dollar amount.`,
      ],
      solution: {
        formula: 'Total Cost = Unit Price × Quantity',
        steps: [
          `Set up the multiplication: $${price.toFixed(2)} × ${qty}.`,
          `Multiply without decimals: ${Math.round(price * 100)} × ${qty} = ${Math.round(total * 100)}.`,
          `Count 2 decimal places: $${total.toFixed(2)}.`,
        ],
        finalAnswer: `$${total.toFixed(2)}`,
      },
    };
  }

  // Hard: Multi-step budget & change or decimal division
  const paid = randomChoice([20, 50, 100]);
  const item1Price = roundTo(randomInt(3, 12) + 0.49, 2);
  const item1Qty = randomInt(2, 3);
  const item2Price = roundTo(randomInt(4, 15) + 0.75, 2);
  const subtotal = roundTo(item1Price * item1Qty + item2Price, 2);
  const change = roundTo(paid - subtotal, 2);

  return {
    id,
    grade: 6,
    topicKey: 'decimals',
    topicName: 'Decimals',
    difficulty: 'hard',
    prompt: `Marcus paid with a $${paid} bill after buying ${item1Qty} binders at $${item1Price.toFixed(2)} each and 1 backpack organizer for $${item2Price.toFixed(2)}. How much change did he receive?`,
    correctAnswer: change.toFixed(2),
    acceptedAnswers: [change.toFixed(2), change.toString(), `$${change.toFixed(2)}`, `$${change}`],
    answerType: 'decimal',
    unit: '$',
    placeholder: 'e.g. 8.25',
    hints: [
      `First, calculate the total cost of all items: (${item1Qty} × $${item1Price.toFixed(2)}) + $${item2Price.toFixed(2)}.`,
      `Then subtract the total cost from the $${paid} bill.`,
    ],
    solution: {
      steps: [
        `Cost of binders: ${item1Qty} × $${item1Price.toFixed(2)} = $${(item1Price * item1Qty).toFixed(2)}.`,
        `Total spent: $${(item1Price * item1Qty).toFixed(2)} + $${item2Price.toFixed(2)} = $${subtotal.toFixed(2)}.`,
        `Calculate change: $${paid} - $${subtotal.toFixed(2)} = $${change.toFixed(2)}.`,
      ],
      finalAnswer: `$${change.toFixed(2)}`,
    },
  };
}

export function generateGrade6Percentages(difficulty: Difficulty): MathQuestion {
  const id = `g6-pct-${Date.now()}-${randomInt(100, 999)}`;

  if (difficulty === 'easy') {
    // Benchmark percentages: 10%, 25%, 50%
    const pct = randomChoice([10, 20, 25, 50, 75]);
    const base = randomChoice([20, 40, 60, 80, 100, 120, 160, 200]);
    const ans = (pct / 100) * base;

    return {
      id,
      grade: 6,
      topicKey: 'percentages',
      topicName: 'Percentages',
      difficulty,
      prompt: `Find ${pct}% of ${base}:`,
      correctAnswer: ans.toString(),
      acceptedAnswers: [ans.toString(), formatNumber(ans)],
      answerType: 'number',
      placeholder: 'e.g. 20',
      hints: [
        `${pct}% as a fraction is ${pct}/100${pct === 50 ? ' (or 1/2)' : pct === 25 ? ' (or 1/4)' : pct === 10 ? ' (or 1/10)' : ''}.`,
        `Multiply ${pct / 100} × ${base}.`,
      ],
      solution: {
        steps: [
          `Convert ${pct}% to a decimal: ${pct} ÷ 100 = ${pct / 100}.`,
          `Multiply by ${base}: ${pct / 100} × ${base} = ${ans}.`,
        ],
        finalAnswer: ans.toString(),
      },
    };
  }

  if (difficulty === 'medium') {
    // What percent is X of Y?
    const pct = randomChoice([15, 30, 40, 60, 70, 85]);
    const base = randomChoice([40, 50, 80, 100, 200]);
    const part = (pct / 100) * base;

    return {
      id,
      grade: 6,
      topicKey: 'percentages',
      topicName: 'Percentages',
      difficulty,
      prompt: `What percentage of ${base} is ${part}?`,
      correctAnswer: `${pct}%`,
      acceptedAnswers: [`${pct}%`, `${pct}`, (pct / 100).toString()],
      answerType: 'percentage',
      placeholder: 'e.g. 35%',
      hints: [
        `Set up the fraction: Part / Total = ${part} / ${base}.`,
        `Divide ${part} by ${base} and multiply by 100 to get the percentage.`,
      ],
      solution: {
        formula: 'Percentage = (Part ÷ Total) × 100%',
        steps: [
          `Divide the part by the total: ${part} ÷ ${base} = ${part / base}.`,
          `Multiply by 100: ${part / base} × 100 = ${pct}%.`,
        ],
        finalAnswer: `${pct}%`,
      },
    };
  }

  // Hard: Sales discount / tax word problem
  const originalPrice = randomChoice([30, 40, 50, 60, 80, 90, 120]);
  const discountPct = randomChoice([15, 20, 25, 30, 40]);
  const discountAmount = (discountPct / 100) * originalPrice;
  const salePrice = originalPrice - discountAmount;

  return {
    id,
    grade: 6,
    topicKey: 'percentages',
    topicName: 'Percentages',
    difficulty: 'hard',
    prompt: `A jacket regularly priced at $${originalPrice} is on sale for ${discountPct}% off. What is the sale price of the jacket?`,
    correctAnswer: salePrice.toString(),
    acceptedAnswers: [salePrice.toString(), `$${salePrice}`, `$${salePrice}.00`, `${salePrice}.00`],
    answerType: 'number',
    unit: '$',
    placeholder: 'e.g. 48',
    hints: [
      `First, calculate the discount amount: ${discountPct}% of $${originalPrice}.`,
      `Then subtract the discount amount from $${originalPrice}.`,
    ],
    solution: {
      steps: [
        `Calculate discount: ${discountPct}% × $${originalPrice} = 0.${discountPct} × ${originalPrice} = $${discountAmount}.`,
        `Subtract discount from original price: $${originalPrice} - $${discountAmount} = $${salePrice}.`,
      ],
      finalAnswer: `$${salePrice}`,
    },
  };
}

export function generateGrade6Ratios(difficulty: Difficulty): MathQuestion {
  const id = `g6-rat-${Date.now()}-${randomInt(100, 999)}`;

  if (difficulty === 'easy') {
    // Simplifying ratios
    const factor = randomInt(2, 6);
    const r1 = randomInt(2, 7);
    let r2 = randomInt(2, 9);
    if (r1 === r2) r2 = r1 + 1;
    const [s1, s2] = simplifyFraction(r1, r2);

    const a = s1 * factor;
    const b = s2 * factor;

    return {
      id,
      grade: 6,
      topicKey: 'ratios',
      topicName: 'Ratios',
      difficulty,
      prompt: `Simplify the ratio ${a} : ${b} to its simplest form:`,
      correctAnswer: `${s1}:${s2}`,
      acceptedAnswers: [`${s1}:${s2}`, `${s1}/${s2}`, `${s1} to ${s2}`],
      answerType: 'any',
      placeholder: 'e.g. 2:3',
      hints: [
        `Find the greatest common factor of ${a} and ${b}.`,
        `Divide both numbers by ${gcd(a, b)}.`,
      ],
      solution: {
        steps: [
          `Find GCF(${a}, ${b}) = ${gcd(a, b)}.`,
          `Divide both parts by ${gcd(a, b)}: ${a} ÷ ${gcd(a, b)} = ${s1} and ${b} ÷ ${gcd(a, b)} = ${s2}.`,
        ],
        finalAnswer: `${s1}:${s2}`,
      },
    };
  }

  if (difficulty === 'medium') {
    // Word problem: Part to Part
    const ratioA = randomInt(2, 5);
    const ratioB = randomInt(3, 7);
    const multiplier = randomInt(3, 8);
    const countA = ratioA * multiplier;
    const countB = ratioB * multiplier;
    const itemA = randomChoice(['blue marbles', 'apples', 'dogs', 'fiction books', 'pencils']);
    const itemB = randomChoice(['red marbles', 'oranges', 'cats', 'non-fiction books', 'pens']);

    return {
      id,
      grade: 6,
      topicKey: 'ratios',
      topicName: 'Ratios',
      difficulty,
      prompt: `In a collection, the ratio of ${itemA} to ${itemB} is ${ratioA} : ${ratioB}. If there are ${countA} ${itemA}, how many ${itemB} are there?`,
      correctAnswer: countB.toString(),
      acceptedAnswers: [countB.toString()],
      answerType: 'number',
      placeholder: 'e.g. 15',
      hints: [
        `Find how many times ${ratioA} goes into ${countA} (${countA} ÷ ${ratioA}).`,
        `Multiply that scaling factor by ${ratioB}.`,
      ],
      solution: {
        steps: [
          `Set up the proportion: ${ratioA} / ${ratioB} = ${countA} / x.`,
          `Find the scale factor: ${countA} ÷ ${ratioA} = ${multiplier}.`,
          `Multiply the other part by ${multiplier}: ${ratioB} × ${multiplier} = ${countB}.`,
        ],
        finalAnswer: countB.toString(),
      },
    };
  }

  // Hard: Part to Whole distribution
  const r1 = randomInt(2, 4);
  const r2 = randomInt(3, 5);
  const totalParts = r1 + r2;
  const multiplier = randomInt(5, 15);
  const totalAmount = totalParts * multiplier;
  const share2 = r2 * multiplier;
  const person1 = randomChoice(['Alex', 'Maya', 'Leo', 'Zoe']);
  const person2 = randomChoice(['Sam', 'Chris', 'Jordan', 'Taylor']);

  return {
    id,
    grade: 6,
    topicKey: 'ratios',
    topicName: 'Ratios',
    difficulty: 'hard',
    prompt: `$${totalAmount} is shared between ${person1} and ${person2} in the ratio ${r1} : ${r2}. How much money does ${person2} receive?`,
    correctAnswer: share2.toString(),
    acceptedAnswers: [share2.toString(), `$${share2}`],
    answerType: 'number',
    unit: '$',
    placeholder: 'e.g. 45',
    hints: [
      `First, find the total number of ratio parts: ${r1} + ${r2} = ${totalParts} parts.`,
      `Find the value of 1 part by dividing the total money by total parts ($${totalAmount} ÷ ${totalParts}).`,
      `Multiply the value of 1 part by ${person2}'s share (${r2} parts).`,
    ],
    solution: {
      steps: [
        `Total ratio parts: ${r1} + ${r2} = ${totalParts}.`,
        `Value per part: $${totalAmount} ÷ ${totalParts} = $${multiplier}.`,
        `${person2}'s share: ${r2} × $${multiplier} = $${share2}.`,
      ],
      finalAnswer: `$${share2}`,
    },
  };
}

export function generateGrade6Integers(difficulty: Difficulty): MathQuestion {
  const id = `g6-int-${Date.now()}-${randomInt(100, 999)}`;

  if (difficulty === 'easy') {
    // Absolute value or basic integer addition
    const isAbs = Math.random() > 0.5;
    if (isAbs) {
      const val = randomInt(-35, -3);
      return {
        id,
        grade: 6,
        topicKey: 'integers',
        topicName: 'Integers',
        difficulty,
        prompt: `Evaluate the absolute value expression:`,
        mathExpression: `|${val}|`,
        correctAnswer: Math.abs(val).toString(),
        acceptedAnswers: [Math.abs(val).toString()],
        answerType: 'number',
        placeholder: 'e.g. 15',
        hints: [
          `Absolute value represents the distance a number is from zero on a number line.`,
          `Distance is always positive or zero.`,
        ],
        solution: {
          steps: [
            `The absolute value |${val}| represents the distance from 0 to ${val}.`,
            `Since distance is always positive, |${val}| = ${Math.abs(val)}.`,
          ],
          finalAnswer: Math.abs(val).toString(),
        },
      };
    } else {
      const a = randomInt(-15, -1);
      const b = randomInt(-15, -1);
      const sum = a + b;

      return {
        id,
        grade: 6,
        topicKey: 'integers',
        topicName: 'Integers',
        difficulty,
        prompt: `Calculate the sum:`,
        mathExpression: `(${a}) + (${b})`,
        correctAnswer: sum.toString(),
        acceptedAnswers: [sum.toString()],
        answerType: 'number',
        placeholder: 'e.g. -12',
        hints: [
          `When adding two negative numbers, add their absolute values and keep the negative sign.`,
          `${Math.abs(a)} + ${Math.abs(b)} = ${Math.abs(sum)}, then make it negative.`,
        ],
        solution: {
          steps: [
            `Both integers are negative.`,
            `Add their absolute values: ${Math.abs(a)} + ${Math.abs(b)} = ${Math.abs(sum)}.`,
            `Apply the negative sign: ${sum}.`,
          ],
          finalAnswer: sum.toString(),
        },
      };
    }
  }

  if (difficulty === 'medium') {
    // Mixed sign subtraction or temperature word problem
    const isWordProblem = Math.random() > 0.5;
    if (isWordProblem) {
      const startTemp = randomInt(-12, -2);
      const change = randomInt(8, 18);
      const finalTemp = startTemp + change;
      const city = randomChoice(['Chicago', 'Minneapolis', 'Denver', 'Montreal', 'Calgary']);

      return {
        id,
        grade: 6,
        topicKey: 'integers',
        topicName: 'Integers',
        difficulty,
        prompt: `At 6:00 AM, the temperature in ${city} was ${startTemp}°C. By noon, the temperature had risen by ${change}°C. What was the temperature at noon?`,
        correctAnswer: finalTemp.toString(),
        acceptedAnswers: [finalTemp.toString(), `${finalTemp}°C`, `${finalTemp} degrees`],
        answerType: 'number',
        placeholder: 'e.g. 5',
        hints: [
          `"Risen by" means adding: ${startTemp} + ${change}.`,
          `Start at ${startTemp} on a number line and move ${change} units to the right.`,
        ],
        solution: {
          steps: [
            `Set up the equation: ${startTemp} + ${change}.`,
            `Subtract the absolute values: ${change} - ${Math.abs(startTemp)} = ${finalTemp}.`,
            `Since the positive number is larger, the result is ${finalTemp}°C.`,
          ],
          finalAnswer: `${finalTemp}°C`,
        },
      };
    } else {
      const a = randomInt(-10, 10);
      const b = randomInt(-15, -1);
      const res = a - b; // subtracting negative = adding positive

      return {
        id,
        grade: 6,
        topicKey: 'integers',
        topicName: 'Integers',
        difficulty,
        prompt: `Evaluate:`,
        mathExpression: `${a} - (${b})`,
        correctAnswer: res.toString(),
        acceptedAnswers: [res.toString()],
        answerType: 'number',
        placeholder: 'e.g. 8',
        hints: [
          `Subtracting a negative number is equivalent to adding a positive number!`,
          `Rewrite ${a} - (${b}) as ${a} + ${Math.abs(b)}.`,
        ],
        solution: {
          steps: [
            `Remember: minus a negative is a plus: - (-b) = + b.`,
            `Rewrite: ${a} + ${Math.abs(b)}.`,
            `Calculate: ${res}.`,
          ],
          finalAnswer: res.toString(),
        },
      };
    }
  }

  // Hard: Multi-step integer operations / elevation
  const a = randomInt(-6, -2);
  const b = randomInt(-8, -3);
  const c = randomInt(-15, -1);
  const product = a * b; // positive
  const res = product + c; // product + negative = product - abs(c)

  return {
    id,
    grade: 6,
    topicKey: 'integers',
    topicName: 'Integers',
    difficulty: 'hard',
    prompt: `Evaluate using the order of operations (PEMDAS):`,
    mathExpression: `(${a}) × (${b}) + (${c})`,
    correctAnswer: res.toString(),
    acceptedAnswers: [res.toString()],
    answerType: 'number',
    placeholder: 'e.g. 10',
    hints: [
      `First do multiplication: (${a}) × (${b}). Negative × Negative = Positive!`,
      `Then add (${c}) to your result.`,
    ],
    solution: {
      steps: [
        `Multiply first: (${a}) × (${b}) = ${product} (negative × negative is positive).`,
        `Add the remaining integer: ${product} + (${c}) = ${product} - ${Math.abs(c)} = ${res}.`,
      ],
      finalAnswer: res.toString(),
    },
  };
}

export function generateGrade6BasicAlgebra(difficulty: Difficulty): MathQuestion {
  const id = `g6-alg-${Date.now()}-${randomInt(100, 999)}`;

  if (difficulty === 'easy') {
    // One-step addition/subtraction: x + a = b or x - a = b
    const isAdd = Math.random() > 0.5;
    const a = randomInt(4, 25);
    const xVal = randomInt(3, 30);
    const b = isAdd ? xVal + a : xVal - a;
    const equation = isAdd ? `x + ${a} = ${b}` : `x - ${a} = ${b}`;

    return {
      id,
      grade: 6,
      topicKey: 'basic-algebra',
      topicName: 'Basic Algebra',
      difficulty,
      prompt: `Solve for x:`,
      mathExpression: equation,
      correctAnswer: xVal.toString(),
      acceptedAnswers: [xVal.toString(), `x = ${xVal}`, `x=${xVal}`],
      answerType: 'algebra',
      placeholder: 'e.g. 8',
      hints: [
        `Use the inverse (opposite) operation to isolate x.`,
        isAdd
          ? `Subtract ${a} from both sides of the equation.`
          : `Add ${a} to both sides of the equation.`,
      ],
      solution: {
        steps: [
          `Original equation: ${equation}`,
          isAdd
            ? `Subtract ${a} from both sides: x = ${b} - ${a}`
            : `Add ${a} to both sides: x = ${b} + ${a}`,
          `Calculate: x = ${xVal}.`,
        ],
        finalAnswer: xVal.toString(),
      },
    };
  }

  if (difficulty === 'medium') {
    // One-step multiplication/division: ax = b or x / a = b
    const isMult = Math.random() > 0.4;
    const a = randomInt(3, 9);
    const xVal = randomInt(3, 15);
    const b = isMult ? a * xVal : xVal;
    const equation = isMult ? `${a}x = ${b}` : `x / ${a} = ${b}`;
    const ans = isMult ? xVal : a * b;

    return {
      id,
      grade: 6,
      topicKey: 'basic-algebra',
      topicName: 'Basic Algebra',
      difficulty,
      prompt: `Solve for x:`,
      mathExpression: equation,
      correctAnswer: ans.toString(),
      acceptedAnswers: [ans.toString(), `x = ${ans}`, `x=${ans}`],
      answerType: 'algebra',
      placeholder: 'e.g. 7',
      hints: [
        isMult
          ? `Divide both sides by ${a} to get x by itself.`
          : `Multiply both sides by ${a} to solve for x.`,
      ],
      solution: {
        steps: [
          `Equation: ${equation}`,
          isMult
            ? `Divide both sides by ${a}: x = ${b} ÷ ${a} = ${ans}.`
            : `Multiply both sides by ${a}: x = ${b} × ${a} = ${ans}.`,
        ],
        finalAnswer: ans.toString(),
      },
    };
  }

  // Hard: Evaluating algebraic expressions or 2-step setup
  const a = randomInt(2, 6);
  const b = randomInt(3, 12);
  const xGiven = randomInt(3, 8);
  const result = a * xGiven + b;

  return {
    id,
    grade: 6,
    topicKey: 'basic-algebra',
    topicName: 'Basic Algebra',
    difficulty: 'hard',
    prompt: `Evaluate the algebraic expression when x = ${xGiven}:`,
    mathExpression: `${a}x + ${b}`,
    correctAnswer: result.toString(),
    acceptedAnswers: [result.toString()],
    answerType: 'number',
    placeholder: 'e.g. 23',
    hints: [
      `Substitute ${xGiven} in place of x in the expression.`,
      `Calculate: (${a} × ${xGiven}) + ${b}.`,
    ],
    solution: {
      steps: [
        `Substitute x = ${xGiven}: ${a}(${xGiven}) + ${b}.`,
        `Multiply first: ${a} × ${xGiven} = ${a * xGiven}.`,
        `Add ${b}: ${a * xGiven} + ${b} = ${result}.`,
      ],
      finalAnswer: result.toString(),
    },
  };
}

export function generateGrade6Geometry(difficulty: Difficulty): MathQuestion {
  const id = `g6-geo-${Date.now()}-${randomInt(100, 999)}`;

  if (difficulty === 'easy') {
    // Area or perimeter of rectangle
    const isArea = Math.random() > 0.5;
    const length = randomInt(5, 14);
    const width = randomInt(3, 9);
    const ans = isArea ? length * width : 2 * (length + width);

    return {
      id,
      grade: 6,
      topicKey: 'geometry',
      topicName: 'Geometry',
      difficulty,
      prompt: isArea
        ? `Find the area of a rectangle with length ${length} cm and width ${width} cm:`
        : `Find the perimeter of a rectangle with length ${length} cm and width ${width} cm:`,
      diagram: {
        type: 'rectangle',
        title: 'Rectangle',
        params: { length, width, unit: 'cm' },
      },
      correctAnswer: ans.toString(),
      acceptedAnswers: [ans.toString(), `${ans} cm`, `${ans} sq cm`, `${ans} cm²`],
      answerType: 'number',
      unit: isArea ? 'cm²' : 'cm',
      placeholder: 'e.g. 24',
      hints: [
        isArea
          ? `Area of a rectangle = length × width.`
          : `Perimeter of a rectangle = 2 × (length + width) or add all 4 sides.`,
      ],
      solution: {
        formula: isArea ? 'Area = length × width' : 'Perimeter = 2(length + width)',
        steps: isArea
          ? [
              `Formula: Area = length × width`,
              `Substitute: Area = ${length} × ${width}`,
              `Calculate: ${ans} cm²`,
            ]
          : [
              `Formula: Perimeter = 2 × (${length} + ${width})`,
              `Calculate: 2 × ${length + width} = ${ans} cm`,
            ],
        finalAnswer: `${ans} ${isArea ? 'cm²' : 'cm'}`,
      },
    };
  }

  if (difficulty === 'medium') {
    // Area of a triangle: A = 1/2 * b * h
    const base = randomChoice([6, 8, 10, 12, 14, 16]);
    const height = randomInt(4, 11);
    const area = 0.5 * base * height;

    return {
      id,
      grade: 6,
      topicKey: 'geometry',
      topicName: 'Geometry',
      difficulty,
      prompt: `Find the area of a triangle with base = ${base} m and height = ${height} m:`,
      diagram: {
        type: 'triangle-generic',
        title: 'Triangle',
        params: { base, height, unit: 'm' },
      },
      correctAnswer: area.toString(),
      acceptedAnswers: [area.toString(), `${area} m²`, `${area} sq m`],
      answerType: 'number',
      unit: 'm²',
      placeholder: 'e.g. 35',
      hints: [
        `Area of a triangle = (1/2) × base × height.`,
        `Multiply ${base} × ${height}, then divide by 2.`,
      ],
      solution: {
        formula: 'Area = (1/2) × base × height',
        steps: [
          `Base = ${base} m, Height = ${height} m.`,
          `Multiply base by height: ${base} × ${height} = ${base * height}.`,
          `Divide by 2: ${base * height} ÷ 2 = ${area} m².`,
        ],
        finalAnswer: `${area} m²`,
      },
    };
  }

  // Hard: Volume of a rectangular prism
  const l = randomInt(4, 8);
  const w = randomInt(3, 6);
  const h = randomInt(2, 5);
  const volume = l * w * h;

  return {
    id,
    grade: 6,
    topicKey: 'geometry',
    topicName: 'Geometry',
    difficulty: 'hard',
    prompt: `Find the volume of a rectangular prism with length ${l} cm, width ${w} cm, and height ${h} cm:`,
    diagram: {
      type: 'rectangular-prism',
      title: 'Rectangular Prism',
      params: { length: l, width: w, height: h, unit: 'cm' },
    },
    correctAnswer: volume.toString(),
    acceptedAnswers: [volume.toString(), `${volume} cm³`, `${volume} cubic cm`],
    answerType: 'number',
    unit: 'cm³',
    placeholder: 'e.g. 72',
    hints: [
      `Volume of a rectangular prism = length × width × height.`,
      `Multiply the three dimensions: ${l} × ${w} × ${h}.`,
    ],
    solution: {
      formula: 'Volume = length × width × height',
      steps: [
        `Multiply length and width: ${l} × ${w} = ${l * w}.`,
        `Multiply by height: ${l * w} × ${h} = ${volume} cm³.`,
      ],
      finalAnswer: `${volume} cm³`,
    },
  };
}
