/**
 * Grade 7 Question Generators
 * Topics: Rational Numbers, Expressions, Equations, Ratios & Proportions, Percentages, Geometry, Probability
 */

import { MathQuestion, Difficulty } from '../types';
import {
  randomInt,
  randomChoice,
  formatFraction,
  roundTo,
} from '../helpers';

export function generateGrade7RationalNumbers(difficulty: Difficulty): MathQuestion {
  const id = `g7-rat-${Date.now()}-${randomInt(100, 999)}`;

  if (difficulty === 'easy') {
    // Adding / subtracting negative rational numbers
    const den = randomChoice([3, 4, 5, 6, 8, 10]);
    const n1 = -randomInt(1, den - 1);
    const n2 = randomInt(1, den - 1);
    const sumNum = n1 + n2;
    const ansStr = formatFraction(sumNum, den);

    return {
      id,
      grade: 7,
      topicKey: 'rational-numbers',
      topicName: 'Rational Numbers',
      difficulty,
      prompt: `Add the rational numbers:`,
      mathExpression: `(${n1}/${den}) + (${n2}/${den})`,
      correctAnswer: ansStr,
      acceptedAnswers: [ansStr, `${sumNum}/${den}`, (sumNum / den).toString()],
      answerType: 'fraction',
      placeholder: 'e.g. -1/4 or 1/2',
      hints: [
        `Both fractions share the same denominator (${den}).`,
        `Add the numerators: (${n1}) + (${n2}) = ${sumNum}. Keep the denominator ${den} and simplify.`,
      ],
      solution: {
        steps: [
          `Combine numerators: (${n1} + ${n2}) / ${den} = ${sumNum}/${den}.`,
          `Simplify fraction: ${ansStr}.`,
        ],
        finalAnswer: ansStr,
      },
    };
  }

  if (difficulty === 'medium') {
    // Multiplying rational numbers (negative fractions)
    const n1 = -randomInt(1, 3);
    const d1 = randomChoice([2, 3, 5]);
    const n2 = randomChoice([-1, 1]) * randomInt(1, 4);
    const d2 = randomChoice([3, 4, 5, 7]);

    const numProd = n1 * n2;
    const denProd = d1 * d2;
    const ansStr = formatFraction(numProd, denProd);

    return {
      id,
      grade: 7,
      topicKey: 'rational-numbers',
      topicName: 'Rational Numbers',
      difficulty,
      prompt: `Multiply the rational numbers and simplify:`,
      mathExpression: `(${n1}/${d1}) × (${n2}/${d2})`,
      correctAnswer: ansStr,
      acceptedAnswers: [ansStr, `${numProd}/${denProd}`, (numProd / denProd).toString()],
      answerType: 'fraction',
      placeholder: 'e.g. -2/15',
      hints: [
        `Multiply top numbers together: (${n1}) × (${n2}).`,
        `Multiply bottom numbers together: (${d1}) × (${d2}).`,
        `Remember: Negative × Negative = Positive, and Negative × Positive = Negative.`,
      ],
      solution: {
        steps: [
          `Multiply numerators: (${n1}) × (${n2}) = ${numProd}.`,
          `Multiply denominators: ${d1} × ${d2} = ${denProd}.`,
          `Simplify ${numProd}/${denProd} = ${ansStr}.`,
        ],
        finalAnswer: ansStr,
      },
    };
  }

  // Hard: Order of operations with negative rational numbers & powers
  const base = -randomInt(2, 4);
  const power = randomChoice([2, 3]);
  const basePowerVal = Math.pow(base, power);
  const multA = randomInt(-5, -2);
  const multB = randomInt(2, 5);
  const product = multA * multB;
  const result = basePowerVal - product;

  return {
    id,
    grade: 7,
    topicKey: 'rational-numbers',
    topicName: 'Rational Numbers',
    difficulty: 'hard',
    prompt: `Evaluate following the order of operations (PEMDAS):`,
    mathExpression: `(${base})^${power} - (${multA}) × (${multB})`,
    correctAnswer: result.toString(),
    acceptedAnswers: [result.toString()],
    answerType: 'number',
    placeholder: 'e.g. 24',
    hints: [
      `Step 1: Calculate the exponent (${base})^${power} = ${basePowerVal}.`,
      `Step 2: Calculate the multiplication (${multA}) × (${multB}) = ${product}.`,
      `Step 3: Subtract: ${basePowerVal} - (${product}).`,
    ],
    solution: {
      steps: [
        `Evaluate exponent: (${base})^${power} = ${basePowerVal}.`,
        `Evaluate multiplication: (${multA}) × (${multB}) = ${product}.`,
        `Subtract: ${basePowerVal} - (${product}) = ${basePowerVal} + ${Math.abs(product)} = ${result}.`,
      ],
      finalAnswer: result.toString(),
    },
  };
}

export function generateGrade7Expressions(difficulty: Difficulty): MathQuestion {
  const id = `g7-exp-${Date.now()}-${randomInt(100, 999)}`;

  if (difficulty === 'easy') {
    // Expanding a(bx + c) using Distributive Property
    const a = randomInt(2, 6);
    const b = randomInt(2, 5);
    const c = randomInt(3, 9);
    const coeff = a * b;
    const constant = a * c;
    const ansStr = `${coeff}x + ${constant}`;

    return {
      id,
      grade: 7,
      topicKey: 'expressions',
      topicName: 'Expressions',
      difficulty,
      prompt: `Expand the algebraic expression using the distributive property:`,
      mathExpression: `${a}(${b}x + ${c})`,
      correctAnswer: ansStr,
      acceptedAnswers: [ansStr, `${coeff}x+${constant}`, `${constant}+${coeff}x`, `${constant} + ${coeff}x`],
      answerType: 'algebra',
      placeholder: 'e.g. 6x + 12',
      hints: [
        `Distribute the outer factor (${a}) to each term inside parentheses.`,
        `Calculate (${a} × ${b}x) + (${a} × ${c}).`,
      ],
      solution: {
        formula: 'a(b + c) = ab + ac',
        steps: [
          `Multiply ${a} by the first term: ${a} × ${b}x = ${coeff}x.`,
          `Multiply ${a} by the second term: ${a} × ${c} = ${constant}.`,
          `Combine: ${ansStr}.`,
        ],
        finalAnswer: ansStr,
      },
    };
  }

  if (difficulty === 'medium') {
    // Combining like terms: ax + b + cx - d
    const a = randomInt(3, 8);
    const c = randomInt(2, 6);
    const b = randomInt(4, 15);
    const d = randomInt(1, 8);
    const totalX = a + c;
    const totalConst = b - d;
    const sign = totalConst >= 0 ? '+' : '-';
    const absConst = Math.abs(totalConst);
    const ansStr = `${totalX}x ${sign} ${absConst}`;

    return {
      id,
      grade: 7,
      topicKey: 'expressions',
      topicName: 'Expressions',
      difficulty,
      prompt: `Simplify the expression by combining like terms:`,
      mathExpression: `${a}x + ${b} + ${c}x - ${d}`,
      correctAnswer: ansStr,
      acceptedAnswers: [ansStr, `${totalX}x${sign}${absConst}`, `${totalX}x + ${totalConst}`],
      answerType: 'algebra',
      placeholder: 'e.g. 7x + 5',
      hints: [
        `Group the x terms together: ${a}x + ${c}x.`,
        `Group the constant numbers together: ${b} - ${d}.`,
      ],
      solution: {
        steps: [
          `Combine x terms: ${a}x + ${c}x = ${totalX}x.`,
          `Combine constants: ${b} - ${d} = ${totalConst}.`,
          `Write simplified expression: ${ansStr}.`,
        ],
        finalAnswer: ansStr,
      },
    };
  }

  // Hard: Factoring out greatest common factor: GCF(a, b) -> g(x + c)
  const g = randomChoice([3, 4, 5, 6, 7]);
  const innerCoeff = randomInt(2, 4);
  const innerConst = randomInt(3, 7);
  const term1 = g * innerCoeff;
  const term2 = g * innerConst;
  const ansStr = `${g}(${innerCoeff}x + ${innerConst})`;

  return {
    id,
    grade: 7,
    topicKey: 'expressions',
    topicName: 'Expressions',
    difficulty: 'hard',
    prompt: `Factor the expression completely by finding the greatest common factor:`,
    mathExpression: `${term1}x + ${term2}`,
    correctAnswer: ansStr,
    acceptedAnswers: [ansStr, `${g}(${innerCoeff}x+${innerConst})`],
    answerType: 'algebra',
    placeholder: 'e.g. 4(2x + 3)',
    hints: [
      `Find the GCF of ${term1} and ${term2}, which is ${g}.`,
      `Divide both terms by ${g} and place the result inside parentheses.`,
    ],
    solution: {
      steps: [
        `Find the greatest common factor of ${term1} and ${term2}: GCF = ${g}.`,
        `Divide first term: ${term1}x ÷ ${g} = ${innerCoeff}x.`,
        `Divide second term: ${term2} ÷ ${g} = ${innerConst}.`,
        `Factored form: ${ansStr}.`,
      ],
      finalAnswer: ansStr,
    },
  };
}

export function generateGrade7Equations(difficulty: Difficulty): MathQuestion {
  const id = `g7-eq-${Date.now()}-${randomInt(100, 999)}`;

  if (difficulty === 'easy') {
    // 2-step equation: ax + b = c
    const a = randomInt(2, 6);
    const xVal = randomInt(3, 12);
    const b = randomInt(2, 15);
    const c = a * xVal + b;

    return {
      id,
      grade: 7,
      topicKey: 'equations',
      topicName: 'Equations',
      difficulty,
      prompt: `Solve the two-step equation for x:`,
      mathExpression: `${a}x + ${b} = ${c}`,
      correctAnswer: xVal.toString(),
      acceptedAnswers: [xVal.toString(), `x = ${xVal}`, `x=${xVal}`],
      answerType: 'algebra',
      placeholder: 'e.g. 5',
      hints: [
        `Step 1: Undo the addition by subtracting ${b} from both sides (${c} - ${b}).`,
        `Step 2: Undo the multiplication by dividing both sides by ${a}.`,
      ],
      solution: {
        steps: [
          `Original equation: ${a}x + ${b} = ${c}`,
          `Subtract ${b} from both sides: ${a}x = ${c - b}`,
          `Divide by ${a}: x = ${c - b} ÷ ${a} = ${xVal}`,
        ],
        finalAnswer: xVal.toString(),
      },
    };
  }

  if (difficulty === 'medium') {
    // Equations with subtraction or fractions: (x / a) - b = c or a(x - b) = c
    const a = randomInt(3, 8);
    const xVal = randomInt(2, 10);
    const b = randomInt(2, 7);
    const c = xVal;
    // x / a - b = c => x = a * (c + b)
    const eqLeft = `x/${a} - ${b} = ${c}`;
    const ans = a * (c + b);

    return {
      id,
      grade: 7,
      topicKey: 'equations',
      topicName: 'Equations',
      difficulty,
      prompt: `Solve for x:`,
      mathExpression: eqLeft,
      correctAnswer: ans.toString(),
      acceptedAnswers: [ans.toString(), `x = ${ans}`, `x=${ans}`],
      answerType: 'algebra',
      placeholder: 'e.g. 24',
      hints: [
        `Step 1: Add ${b} to both sides: x/${a} = ${c} + ${b} = ${c + b}.`,
        `Step 2: Multiply both sides by ${a} to isolate x.`,
      ],
      solution: {
        steps: [
          `Add ${b} to both sides: x/${a} = ${c + b}.`,
          `Multiply both sides by ${a}: x = ${c + b} × ${a} = ${ans}.`,
        ],
        finalAnswer: ans.toString(),
      },
    };
  }

  // Hard: Real-world 2-step equation word problem
  const deposit = randomChoice([12, 15, 20, 25]);
  const hourlyRate = randomChoice([8, 10, 12, 15]);
  const hours = randomInt(3, 7);
  const total = deposit + hourlyRate * hours;
  const name = randomChoice(['Liam', 'Maya', 'Aiden', 'Sophia', 'Ethan']);
  const activity = randomChoice(['rent a kayak', 'rent a bicycle', 'book a music practice room', 'rent bowling equipment']);

  return {
    id,
    grade: 7,
    topicKey: 'equations',
    topicName: 'Equations',
    difficulty: 'hard',
    prompt: `${name} spent $${total} in total to ${activity}. The shop charges a $${deposit} flat deposit plus $${hourlyRate} per hour. How many hours did ${name} use the rental?`,
    correctAnswer: hours.toString(),
    acceptedAnswers: [hours.toString(), `${hours} hours`, `${hours} hrs`],
    answerType: 'number',
    placeholder: 'e.g. 4',
    hints: [
      `Set up the equation: ${hourlyRate}h + ${deposit} = ${total}, where h is the number of hours.`,
      `Subtract the flat deposit ($${deposit}) from the total ($${total}), then divide by the hourly rate ($${hourlyRate}).`,
    ],
    solution: {
      steps: [
        `Set up equation: ${hourlyRate}h + ${deposit} = ${total}`,
        `Subtract deposit: ${hourlyRate}h = ${total} - ${deposit} = ${total - deposit}`,
        `Divide by hourly rate: h = ${total - deposit} ÷ ${hourlyRate} = ${hours} hours.`,
      ],
      finalAnswer: `${hours} hours`,
    },
  };
}

export function generateGrade7RatiosProportions(difficulty: Difficulty): MathQuestion {
  const id = `g7-prop-${Date.now()}-${randomInt(100, 999)}`;

  if (difficulty === 'easy') {
    // Solving direct proportion: a/b = x/d
    const a = randomInt(2, 6);
    const b = randomChoice([3, 4, 5, 7, 8]);
    const factor = randomInt(3, 8);
    const d = b * factor;
    const xAns = a * factor;

    return {
      id,
      grade: 7,
      topicKey: 'ratios-proportions',
      topicName: 'Ratios and Proportions',
      difficulty,
      prompt: `Solve the proportion for x:`,
      mathExpression: `${a}/${b} = x/${d}`,
      correctAnswer: xAns.toString(),
      acceptedAnswers: [xAns.toString(), `x = ${xAns}`, `x=${xAns}`],
      answerType: 'algebra',
      placeholder: 'e.g. 15',
      hints: [
        `Use cross-multiplication: ${b} × x = ${a} × ${d}.`,
        `Or notice that ${b} was multiplied by ${factor} to get ${d}, so multiply ${a} by ${factor}.`,
      ],
      solution: {
        steps: [
          `Cross multiply: ${b} · x = ${a} · ${d} = ${a * d}.`,
          `Divide by ${b}: x = ${a * d} ÷ ${b} = ${xAns}.`,
        ],
        finalAnswer: xAns.toString(),
      },
    };
  }

  if (difficulty === 'medium') {
    // Unit rate & distance/speed problem
    const hours1 = randomChoice([2, 3, 4]);
    const speed = randomChoice([45, 50, 55, 60, 65]);
    const miles1 = speed * hours1;
    const hours2 = hours1 + randomInt(2, 4);
    const miles2 = speed * hours2;

    return {
      id,
      grade: 7,
      topicKey: 'ratios-proportions',
      topicName: 'Ratios and Proportions',
      difficulty,
      prompt: `A car travels ${miles1} miles in ${hours1} hours at a constant speed. At this same rate, how many miles will it travel in ${hours2} hours?`,
      correctAnswer: miles2.toString(),
      acceptedAnswers: [miles2.toString(), `${miles2} miles`],
      answerType: 'number',
      unit: 'miles',
      placeholder: 'e.g. 250',
      hints: [
        `First find the unit rate (speed): ${miles1} miles ÷ ${hours1} hours = ${speed} mph.`,
        `Multiply the unit rate by ${hours2} hours.`,
      ],
      solution: {
        formula: 'Distance = Speed × Time',
        steps: [
          `Find unit rate (speed): ${miles1} ÷ ${hours1} = ${speed} mph.`,
          `Calculate distance for ${hours2} hours: ${speed} × ${hours2} = ${miles2} miles.`,
        ],
        finalAnswer: `${miles2} miles`,
      },
    };
  }

  // Hard: Map scale drawings
  const mapCm = randomInt(2, 5);
  const actualKmPerUnit = randomChoice([15, 20, 25, 40, 50]);
  const actualDist1 = mapCm * actualKmPerUnit;
  const targetMapCm = mapCm + randomInt(3, 6);
  const targetActual = targetMapCm * actualKmPerUnit;

  return {
    id,
    grade: 7,
    topicKey: 'ratios-proportions',
    topicName: 'Ratios and Proportions',
    difficulty: 'hard',
    prompt: `On a city map, ${mapCm} cm represents ${actualDist1} km in real life. If two parks are ${targetMapCm} cm apart on the map, what is the actual distance between them?`,
    correctAnswer: targetActual.toString(),
    acceptedAnswers: [targetActual.toString(), `${targetActual} km`, `${targetActual} kilometers`],
    answerType: 'number',
    unit: 'km',
    placeholder: 'e.g. 140',
    hints: [
      `Find the scale for 1 cm: ${actualDist1} km ÷ ${mapCm} cm = ${actualKmPerUnit} km per cm.`,
      `Multiply that rate by ${targetMapCm} cm.`,
    ],
    solution: {
      steps: [
        `Scale rate per 1 cm: ${actualDist1} ÷ ${mapCm} = ${actualKmPerUnit} km.`,
        `Actual distance: ${targetMapCm} × ${actualKmPerUnit} = ${targetActual} km.`,
      ],
      finalAnswer: `${targetActual} km`,
    },
  };
}

export function generateGrade7Percentages(difficulty: Difficulty): MathQuestion {
  const id = `g7-pct-${Date.now()}-${randomInt(100, 999)}`;

  if (difficulty === 'easy') {
    // Sales tax / tip
    const bill = randomChoice([30, 40, 50, 60, 80]);
    const tipPct = randomChoice([15, 18, 20]);
    const tipAmount = (tipPct / 100) * bill;
    const totalBill = bill + tipAmount;

    return {
      id,
      grade: 7,
      topicKey: 'percentages',
      topicName: 'Percentages',
      difficulty,
      prompt: `A family had dinner at a restaurant with a bill of $${bill}. They left a ${tipPct}% tip. What was the total amount paid including the tip?`,
      correctAnswer: totalBill.toString(),
      acceptedAnswers: [totalBill.toString(), totalBill.toFixed(2), `$${totalBill}`, `$${totalBill.toFixed(2)}`],
      answerType: 'number',
      unit: '$',
      placeholder: 'e.g. 57.50',
      hints: [
        `Find the tip: ${tipPct}% of $${bill} = (${tipPct} ÷ 100) × ${bill} = $${tipAmount}.`,
        `Add the tip to the original bill: $${bill} + $${tipAmount}.`,
      ],
      solution: {
        steps: [
          `Calculate tip: $${bill} × 0.${tipPct} = $${tipAmount}.`,
          `Add to bill: $${bill} + $${tipAmount} = $${totalBill}.`,
        ],
        finalAnswer: `$${totalBill}`,
      },
    };
  }

  if (difficulty === 'medium') {
    // Percent increase / decrease
    const original = randomChoice([40, 50, 80, 100, 120]);
    const increasePct = randomChoice([10, 15, 20, 25, 30, 50]);
    const increaseAmount = (increasePct / 100) * original;
    const newPrice = original + increaseAmount;

    return {
      id,
      grade: 7,
      topicKey: 'percentages',
      topicName: 'Percentages',
      difficulty,
      prompt: `The price of a pair of sneakers increased from $${original} to $${newPrice}. What is the percent increase?`,
      correctAnswer: `${increasePct}%`,
      acceptedAnswers: [`${increasePct}%`, increasePct.toString(), (increasePct / 100).toString()],
      answerType: 'percentage',
      placeholder: 'e.g. 25%',
      hints: [
        `Percent Change Formula: (Amount of Change ÷ Original Amount) × 100%.`,
        `Amount of Change = $${newPrice} - $${original} = $${increaseAmount}. Divide by $${original}.`,
      ],
      solution: {
        formula: 'Percent Increase = [(New - Original) ÷ Original] × 100%',
        steps: [
          `Find increase: $${newPrice} - $${original} = $${increaseAmount}.`,
          `Divide by original: $${increaseAmount} ÷ $${original} = ${increasePct / 100}.`,
          `Multiply by 100: ${increasePct / 100} × 100 = ${increasePct}%.`,
        ],
        finalAnswer: `${increasePct}%`,
      },
    };
  }

  // Hard: Simple Interest (I = Prt)
  const principal = randomChoice([400, 500, 600, 800, 1000, 1200]);
  const rate = randomChoice([3, 4, 5, 6]);
  const time = randomChoice([2, 3, 4, 5]);
  const interest = principal * (rate / 100) * time;

  return {
    id,
    grade: 7,
    topicKey: 'percentages',
    topicName: 'Percentages',
    difficulty: 'hard',
    prompt: `Emma deposits $${principal} into a savings account that earns ${rate}% simple annual interest. How much interest will she earn after ${time} years?`,
    correctAnswer: interest.toString(),
    acceptedAnswers: [interest.toString(), `$${interest}`],
    answerType: 'number',
    unit: '$',
    placeholder: 'e.g. 60',
    hints: [
      `Use the Simple Interest Formula: I = P × r × t`,
      `P = $${principal}, r = ${rate}% = ${rate / 100}, t = ${time} years.`,
    ],
    solution: {
      formula: 'I = P × r × t',
      steps: [
        `Convert interest rate to decimal: ${rate}% = ${rate / 100}.`,
        `Substitute values: I = ${principal} × ${rate / 100} × ${time}.`,
        `Calculate: I = $${interest}.`,
      ],
      finalAnswer: `$${interest}`,
    },
  };
}

export function generateGrade7Geometry(difficulty: Difficulty): MathQuestion {
  const id = `g7-geo-${Date.now()}-${randomInt(100, 999)}`;

  if (difficulty === 'easy') {
    // Complementary or Supplementary angles
    const isComp = Math.random() > 0.5;
    const targetSum = isComp ? 90 : 180;
    const angleA = isComp ? randomInt(20, 70) : randomInt(40, 140);
    const angleB = targetSum - angleA;
    const typeName = isComp ? 'complementary' : 'supplementary';

    return {
      id,
      grade: 7,
      topicKey: 'geometry',
      topicName: 'Geometry',
      difficulty,
      prompt: `Two angles are ${typeName}. If one angle measures ${angleA}°, what is the measure of the other angle?`,
      correctAnswer: angleB.toString(),
      acceptedAnswers: [angleB.toString(), `${angleB}°`, `${angleB} degrees`],
      answerType: 'number',
      unit: '°',
      placeholder: 'e.g. 45',
      hints: [
        isComp
          ? `Complementary angles add up to 90°.`
          : `Supplementary angles add up to 180°.`,
        `Subtract ${angleA} from ${targetSum}°.`,
      ],
      solution: {
        steps: [
          `${typeName[0].toUpperCase() + typeName.slice(1)} angles add up to ${targetSum}°.`,
          `Equation: ${angleA}° + x = ${targetSum}°`,
          `Calculate: x = ${targetSum}° - ${angleA}° = ${angleB}°.`,
        ],
        finalAnswer: `${angleB}°`,
      },
    };
  }

  if (difficulty === 'medium') {
    // Circumference or area of a circle with pi = 3.14 or radius
    const isArea = Math.random() > 0.5;
    const radius = randomChoice([3, 4, 5, 6, 7, 10]);
    const ans = isArea ? roundTo(3.14 * radius * radius, 2) : roundTo(2 * 3.14 * radius, 2);
    const formulaStr = isArea ? 'Area = π × r²' : 'Circumference = 2 × π × r';

    return {
      id,
      grade: 7,
      topicKey: 'geometry',
      topicName: 'Geometry',
      difficulty,
      prompt: isArea
        ? `Find the area of a circle with radius r = ${radius} cm. (Use π = 3.14)`
        : `Find the circumference of a circle with radius r = ${radius} cm. (Use π = 3.14)`,
      diagram: {
        type: 'circle',
        title: 'Circle',
        params: { radius, unit: 'cm' },
      },
      correctAnswer: ans.toString(),
      acceptedAnswers: [
        ans.toString(),
        ans.toFixed(2),
        isArea ? `${radius * radius}pi` : `${2 * radius}pi`,
        isArea ? `${radius * radius}π` : `${2 * radius}π`,
      ],
      answerType: 'number',
      unit: isArea ? 'cm²' : 'cm',
      placeholder: 'e.g. 78.5',
      hints: [
        `Formula: ${formulaStr}.`,
        isArea
          ? `Square the radius (${radius}² = ${radius * radius}), then multiply by 3.14.`
          : `Multiply 2 × 3.14 × ${radius}.`,
      ],
      solution: {
        formula: formulaStr,
        steps: isArea
          ? [
              `Radius r = ${radius} cm.`,
              `r² = ${radius} × ${radius} = ${radius * radius}.`,
              `Area = 3.14 × ${radius * radius} = ${ans} cm².`,
            ]
          : [
              `Radius r = ${radius} cm.`,
              `Circumference = 2 × 3.14 × ${radius} = ${ans} cm.`,
            ],
        finalAnswer: `${ans} ${isArea ? 'cm²' : 'cm'}`,
      },
    };
  }

  // Hard: Surface Area of a rectangular prism: SA = 2(lw + lh + wh)
  const l = randomInt(3, 7);
  const w = randomInt(2, 5);
  const h = randomInt(2, 4);
  const sa = 2 * (l * w + l * h + w * h);

  return {
    id,
    grade: 7,
    topicKey: 'geometry',
    topicName: 'Geometry',
    difficulty: 'hard',
    prompt: `Find the total surface area of a rectangular prism with length ${l} m, width ${w} m, and height ${h} m:`,
    diagram: {
      type: 'rectangular-prism',
      title: 'Prism Surface Area',
      params: { length: l, width: w, height: h, unit: 'm' },
    },
    correctAnswer: sa.toString(),
    acceptedAnswers: [sa.toString(), `${sa} m²`, `${sa} sq m`],
    answerType: 'number',
    unit: 'm²',
    placeholder: 'e.g. 52',
    hints: [
      `Surface Area Formula: SA = 2(lw + lh + wh)`,
      `Find the area of each pair of faces and add them all together.`,
    ],
    solution: {
      formula: 'SA = 2(lw + lh + wh)',
      steps: [
        `Top and bottom: 2 × (${l} × ${w}) = ${2 * l * w} m².`,
        `Front and back: 2 × (${l} × ${h}) = ${2 * l * h} m².`,
        `Left and right: 2 × (${w} × ${h}) = ${2 * w * h} m².`,
        `Total Surface Area: ${2 * l * w} + ${2 * l * h} + ${2 * w * h} = ${sa} m².`,
      ],
      finalAnswer: `${sa} m²`,
    },
  };
}

export function generateGrade7Probability(difficulty: Difficulty): MathQuestion {
  const id = `g7-prob-${Date.now()}-${randomInt(100, 999)}`;

  if (difficulty === 'easy') {
    // Simple marble / bag probability
    const red = randomInt(3, 7);
    const blue = randomInt(2, 6);
    const green = randomInt(1, 4);
    const total = red + blue + green;
    const ansStr = formatFraction(red, total);
    const ansDec = roundTo(red / total, 2);

    return {
      id,
      grade: 7,
      topicKey: 'probability',
      topicName: 'Probability',
      difficulty,
      prompt: `A bag contains ${red} red marbles, ${blue} blue marbles, and ${green} green marbles. If one marble is drawn at random, what is the probability of selecting a red marble?`,
      diagram: {
        type: 'marble-bag',
        title: 'Marble Bag',
        params: { red, blue, green, total },
      },
      correctAnswer: ansStr,
      acceptedAnswers: [ansStr, `${red}/${total}`, ansDec.toString()],
      answerType: 'fraction',
      placeholder: 'e.g. 3/8',
      hints: [
        `Probability Formula: P(Event) = (Number of favorable outcomes) / (Total number of outcomes).`,
        `Total marbles = ${red} + ${blue} + ${green} = ${total}. Favorable outcomes (red) = ${red}.`,
      ],
      solution: {
        formula: 'P(Event) = (Favorable Outcomes) ÷ (Total Outcomes)',
        steps: [
          `Find total outcomes: ${red} + ${blue} + ${green} = ${total}.`,
          `Number of red marbles: ${red}.`,
          `Probability: ${red}/${total} = ${ansStr}.`,
        ],
        finalAnswer: ansStr,
      },
    };
  }

  if (difficulty === 'medium') {
    // Spinner complementary probability
    const totalSections = randomChoice([6, 8, 10, 12]);
    const yellow = randomInt(2, totalSections - 3);
    const notYellow = totalSections - yellow;
    const ansStr = formatFraction(notYellow, totalSections);

    return {
      id,
      grade: 7,
      topicKey: 'probability',
      topicName: 'Probability',
      difficulty,
      prompt: `A game spinner is divided into ${totalSections} equal sections. ${yellow} sections are yellow, and the rest are green. What is the probability that the spinner lands on a green (NOT yellow) section?`,
      diagram: {
        type: 'spinner',
        title: 'Spinner',
        params: { sections: totalSections, colored: yellow, colorName: 'yellow' },
      },
      correctAnswer: ansStr,
      acceptedAnswers: [ansStr, `${notYellow}/${totalSections}`, (notYellow / totalSections).toString()],
      answerType: 'fraction',
      placeholder: 'e.g. 5/8',
      hints: [
        `Find how many sections are NOT yellow: ${totalSections} - ${yellow} = ${notYellow}.`,
        `Divide by the total number of sections (${totalSections}) and simplify.`,
      ],
      solution: {
        steps: [
          `Green sections: ${totalSections} - ${yellow} = ${notYellow}.`,
          `Probability: P(Green) = ${notYellow} / ${totalSections}.`,
          `Simplest form: ${ansStr}.`,
        ],
        finalAnswer: ansStr,
      },
    };
  }

  // Hard: Experimental probability & population prediction
  const sampleSurvey = randomChoice([40, 50, 60]);
  const samplePref = randomInt(12, 28);
  const schoolTotal = sampleSurvey * randomChoice([8, 10, 12, 15]);
  const expectedCount = (samplePref / sampleSurvey) * schoolTotal;
  const activity = randomChoice(['play soccer', 'pack their own lunch', 'walk to school', 'play an instrument']);

  return {
    id,
    grade: 7,
    topicKey: 'probability',
    topicName: 'Probability',
    difficulty: 'hard',
    prompt: `In a random survey of ${sampleSurvey} middle school students, ${samplePref} students said they ${activity}. Based on this survey, how many of the school's ${schoolTotal} total students would you predict ${activity}?`,
    correctAnswer: expectedCount.toString(),
    acceptedAnswers: [expectedCount.toString(), `${expectedCount} students`],
    answerType: 'number',
    placeholder: 'e.g. 180',
    hints: [
      `Find the experimental probability from the survey: ${samplePref} / ${sampleSurvey}.`,
      `Multiply that fraction by the total student body of ${schoolTotal}.`,
    ],
    solution: {
      steps: [
        `Survey ratio: ${samplePref} ÷ ${sampleSurvey} = ${samplePref / sampleSurvey}.`,
        `Expected students: (${samplePref} / ${sampleSurvey}) × ${schoolTotal} = ${expectedCount}.`,
      ],
      finalAnswer: `${expectedCount} students`,
    },
  };
}
