/**
 * Grade 8 Question Generators
 * Topics: Linear Equations, Exponents, Functions, Pythagorean Theorem, Geometry, Statistics, Probability
 */

import { MathQuestion, Difficulty } from '../types';
import {
  randomInt,
  randomChoice,
  formatFraction,
  roundTo,
  getRandomPythagoreanTriple,
} from '../helpers';

export function generateGrade8LinearEquations(difficulty: Difficulty): MathQuestion {
  const id = `g8-lin-${Date.now()}-${randomInt(100, 999)}`;

  if (difficulty === 'easy') {
    // Multi-step with brackets: a(x - b) = c
    const a = randomChoice([2, 3, 4, 5]);
    const xVal = randomInt(4, 15);
    const b = randomInt(1, 8);
    const c = a * (xVal - b);

    return {
      id,
      grade: 8,
      topicKey: 'linear-equations',
      topicName: 'Linear Equations',
      difficulty,
      prompt: `Solve the linear equation for x:`,
      mathExpression: `${a}(x - ${b}) = ${c}`,
      correctAnswer: xVal.toString(),
      acceptedAnswers: [xVal.toString(), `x = ${xVal}`, `x=${xVal}`],
      answerType: 'algebra',
      placeholder: 'e.g. 10',
      hints: [
        `Method 1: Divide both sides by ${a} first: x - ${b} = ${c / a}.`,
        `Then add ${b} to find x.`,
      ],
      solution: {
        steps: [
          `Divide both sides by ${a}: x - ${b} = ${c} ÷ ${a} = ${c / a}`,
          `Add ${b} to both sides: x = ${c / a} + ${b} = ${xVal}`,
        ],
        finalAnswer: xVal.toString(),
      },
    };
  }

  if (difficulty === 'medium') {
    // Variables on both sides: ax + b = cx + d
    const xVal = randomInt(2, 9);
    const c = randomInt(2, 4);
    const diff = randomInt(2, 4);
    const a = c + diff; // a > c
    const b = randomInt(3, 15);
    const d = diff * xVal + b;

    return {
      id,
      grade: 8,
      topicKey: 'linear-equations',
      topicName: 'Linear Equations',
      difficulty,
      prompt: `Solve the equation with variables on both sides:`,
      mathExpression: `${a}x + ${b} = ${c}x + ${d}`,
      correctAnswer: xVal.toString(),
      acceptedAnswers: [xVal.toString(), `x = ${xVal}`, `x=${xVal}`],
      answerType: 'algebra',
      placeholder: 'e.g. 5',
      hints: [
        `Step 1: Subtract ${c}x from both sides to collect x terms on the left: ${diff}x + ${b} = ${d}.`,
        `Step 2: Subtract ${b} from both sides, then divide by ${diff}.`,
      ],
      solution: {
        steps: [
          `Original equation: ${a}x + ${b} = ${c}x + ${d}`,
          `Subtract ${c}x from both sides: ${diff}x + ${b} = ${d}`,
          `Subtract ${b} from both sides: ${diff}x = ${d - b}`,
          `Divide by ${diff}: x = ${d - b} ÷ ${diff} = ${xVal}`,
        ],
        finalAnswer: xVal.toString(),
      },
    };
  }

  // Hard: Finding slope m from two coordinate points: m = (y2 - y1) / (x2 - x1)
  const x1 = randomInt(-5, 3);
  const x2 = x1 + randomChoice([2, 3, 4, 5]);
  const m = randomInt(-3, 4) || 2;
  const y1 = randomInt(-6, 6);
  const y2 = y1 + m * (x2 - x1);

  return {
    id,
    grade: 8,
    topicKey: 'linear-equations',
    topicName: 'Linear Equations',
    difficulty: 'hard',
    prompt: `Find the slope (m) of the line passing through the points (${x1}, ${y1}) and (${x2}, ${y2}):`,
    diagram: {
      type: 'coordinate-points',
      title: 'Slope of Line',
      params: { p1: [x1, y1], p2: [x2, y2] },
    },
    correctAnswer: m.toString(),
    acceptedAnswers: [m.toString(), `m = ${m}`, `m=${m}`],
    answerType: 'algebra',
    placeholder: 'e.g. 2',
    hints: [
      `Slope formula: m = (y₂ - y₁) / (x₂ - x₁) (rise over run).`,
      `Substitute: (${y2} - ${y1}) / (${x2} - ${x1}).`,
    ],
    solution: {
      formula: 'm = (y₂ - y₁) / (x₂ - x₁)',
      steps: [
        `Identify points: (x₁, y₁) = (${x1}, ${y1}) and (x₂, y₂) = (${x2}, ${y2}).`,
        `Change in y (rise): ${y2} - (${y1}) = ${y2 - y1}.`,
        `Change in x (run): ${x2} - (${x1}) = ${x2 - x1}.`,
        `Divide rise by run: ${y2 - y1} ÷ ${x2 - x1} = ${m}.`,
      ],
      finalAnswer: m.toString(),
    },
  };
}

export function generateGrade8Exponents(difficulty: Difficulty): MathQuestion {
  const id = `g8-exp-${Date.now()}-${randomInt(100, 999)}`;

  if (difficulty === 'easy') {
    // Product rule: x^a * x^b = x^(a+b)
    const base = randomChoice(['x', 'y', 'a', 'm']);
    const p1 = randomInt(2, 6);
    const p2 = randomInt(2, 7);
    const sumP = p1 + p2;
    const ansStr = `${base}^${sumP}`;

    return {
      id,
      grade: 8,
      topicKey: 'exponents',
      topicName: 'Exponents',
      difficulty,
      prompt: `Simplify using the Product of Powers rule:`,
      mathExpression: `${base}^${p1} · ${base}^${p2}`,
      correctAnswer: ansStr,
      acceptedAnswers: [ansStr, `${base}^(${sumP})`],
      answerType: 'algebra',
      placeholder: `e.g. ${base}^8`,
      hints: [
        `Product of Powers rule: When multiplying like bases, add the exponents! (bᵃ · bᵇ = bᵃ⁺ᵇ)`,
        `Add the powers: ${p1} + ${p2} = ${sumP}.`,
      ],
      solution: {
        formula: 'bᵃ · bᵇ = bᵃ⁺ᵇ',
        steps: [
          `Both terms have the base '${base}'.`,
          `Add the exponents: ${p1} + ${p2} = ${sumP}.`,
          `Simplified expression: ${ansStr}.`,
        ],
        finalAnswer: ansStr,
      },
    };
  }

  if (difficulty === 'medium') {
    // Power of a power: (x^a)^b = x^(a*b)
    const base = randomChoice(['x', 'y', 'k', 'n']);
    const p1 = randomInt(2, 5);
    const p2 = randomInt(2, 4);
    const prodP = p1 * p2;
    const ansStr = `${base}^${prodP}`;

    return {
      id,
      grade: 8,
      topicKey: 'exponents',
      topicName: 'Exponents',
      difficulty,
      prompt: `Simplify using the Power of a Power rule:`,
      mathExpression: `(${base}^${p1})^${p2}`,
      correctAnswer: ansStr,
      acceptedAnswers: [ansStr, `${base}^(${prodP})`],
      answerType: 'algebra',
      placeholder: `e.g. ${base}^12`,
      hints: [
        `Power of a Power rule: (bᵃ)ᵇ = bᵃ·ᵇ. Multiply the inner and outer exponents.`,
        `Multiply ${p1} × ${p2} = ${prodP}.`,
      ],
      solution: {
        formula: '(bᵃ)ᵇ = bᵃ·ᵇ',
        steps: [
          `Multiply the powers together: ${p1} × ${p2} = ${prodP}.`,
          `Keep the base '${base}': ${ansStr}.`,
        ],
        finalAnswer: ansStr,
      },
    };
  }

  // Hard: Scientific notation or negative exponents
  const isScientific = Math.random() > 0.5;
  if (isScientific) {
    const coeff = roundTo(randomInt(2, 8) + randomInt(1, 9) * 0.1, 1);
    const power = randomInt(3, 6);
    const standardVal = coeff * Math.pow(10, power);

    return {
      id,
      grade: 8,
      topicKey: 'exponents',
      topicName: 'Exponents',
      difficulty: 'hard',
      prompt: `Write in standard decimal notation:`,
      mathExpression: `${coeff} × 10^${power}`,
      correctAnswer: standardVal.toString(),
      acceptedAnswers: [standardVal.toString(), standardVal.toLocaleString()],
      answerType: 'number',
      placeholder: 'e.g. 45000',
      hints: [
        `Multiplying by 10^${power} shifts the decimal point ${power} places to the right.`,
        `Move the decimal ${power} places right and fill in zeros.`,
      ],
      solution: {
        steps: [
          `10^${power} = ${Math.pow(10, power).toLocaleString()}.`,
          `Multiply: ${coeff} × ${Math.pow(10, power).toLocaleString()} = ${standardVal.toLocaleString()}.`,
        ],
        finalAnswer: standardVal.toString(),
      },
    };
  } else {
    // Negative exponent: e.g. 5^-2 = 1/25
    const base = randomChoice([2, 3, 4, 5]);
    const exp = randomChoice([2, 3]);
    const denominator = Math.pow(base, exp);
    const ansStr = `1/${denominator}`;

    return {
      id,
      grade: 8,
      topicKey: 'exponents',
      topicName: 'Exponents',
      difficulty: 'hard',
      prompt: `Evaluate and write as a simplified fraction:`,
      mathExpression: `${base}^(-${exp})`,
      correctAnswer: ansStr,
      acceptedAnswers: [ansStr, (1 / denominator).toString()],
      answerType: 'fraction',
      placeholder: `e.g. 1/${denominator}`,
      hints: [
        `Negative exponent rule: b^(-n) = 1 / (b^n).`,
        `Calculate ${base}^${exp} and place it in the denominator.`,
      ],
      solution: {
        formula: 'b^(-n) = 1 / b^n',
        steps: [
          `Rewrite using the rule: 1 / (${base}^${exp}).`,
          `Calculate ${base}^${exp} = ${denominator}.`,
          `Result: ${ansStr}.`,
        ],
        finalAnswer: ansStr,
      },
    };
  }
}

export function generateGrade8Functions(difficulty: Difficulty): MathQuestion {
  const id = `g8-fun-${Date.now()}-${randomInt(100, 999)}`;

  if (difficulty === 'easy') {
    // Evaluating linear functions: f(x) = mx + b for given x
    const m = randomInt(2, 6);
    const b = randomInt(-8, 8);
    const xVal = randomInt(2, 7);
    const result = m * xVal + b;
    const sign = b >= 0 ? '+' : '-';
    const absB = Math.abs(b);

    return {
      id,
      grade: 8,
      topicKey: 'functions',
      topicName: 'Functions',
      difficulty,
      prompt: `Given the function f(x) = ${m}x ${sign} ${absB}, evaluate f(${xVal}):`,
      mathExpression: `f(${xVal}) = ?`,
      correctAnswer: result.toString(),
      acceptedAnswers: [result.toString(), `f(${xVal}) = ${result}`],
      answerType: 'number',
      placeholder: 'e.g. 17',
      hints: [
        `Substitute ${xVal} in place of x in the function definition.`,
        `Calculate: (${m} × ${xVal}) ${sign} ${absB}.`,
      ],
      solution: {
        steps: [
          `Substitute x = ${xVal}: f(${xVal}) = ${m}(${xVal}) ${sign} ${absB}`,
          `Multiply: ${m * xVal} ${sign} ${absB}`,
          `Calculate: ${result}.`,
        ],
        finalAnswer: result.toString(),
      },
    };
  }

  if (difficulty === 'medium') {
    // Finding input x given output f(x): f(x) = mx + b, f(x) = Y, find x
    const m = randomInt(2, 5);
    const b = randomInt(2, 10);
    const xTarget = randomInt(3, 9);
    const yVal = m * xTarget + b;

    return {
      id,
      grade: 8,
      topicKey: 'functions',
      topicName: 'Functions',
      difficulty,
      prompt: `For the function f(x) = ${m}x + ${b}, find the value of x when f(x) = ${yVal}:`,
      correctAnswer: xTarget.toString(),
      acceptedAnswers: [xTarget.toString(), `x = ${xTarget}`, `x=${xTarget}`],
      answerType: 'algebra',
      placeholder: 'e.g. 4',
      hints: [
        `Set the equation ${m}x + ${b} = ${yVal}.`,
        `Subtract ${b} from both sides and then divide by ${m}.`,
      ],
      solution: {
        steps: [
          `Set f(x) equal to ${yVal}: ${m}x + ${b} = ${yVal}`,
          `Subtract ${b}: ${m}x = ${yVal - b}`,
          `Divide by ${m}: x = ${yVal - b} ÷ ${m} = ${xTarget}`,
        ],
        finalAnswer: xTarget.toString(),
      },
    };
  }

  // Hard: Rate of change (slope) from an input-output table
  const m = randomInt(3, 7);
  const startY = randomInt(2, 10);
  const rows = [
    { x: 1, y: startY + m },
    { x: 2, y: startY + 2 * m },
    { x: 3, y: startY + 3 * m },
    { x: 4, y: startY + 4 * m },
  ];

  return {
    id,
    grade: 8,
    topicKey: 'functions',
    topicName: 'Functions',
    difficulty: 'hard',
    prompt: `Find the constant rate of change (slope) for the linear function shown in the table below:`,
    diagram: {
      type: 'function-table',
      title: 'Input / Output Table',
      params: { rows },
    },
    correctAnswer: m.toString(),
    acceptedAnswers: [m.toString(), `m = ${m}`, `m=${m}`],
    answerType: 'number',
    placeholder: 'e.g. 5',
    hints: [
      `Rate of change = (Change in y) ÷ (Change in x).`,
      `Compare row 2 to row 1: (${rows[1].y} - ${rows[0].y}) ÷ (${rows[1].x} - ${rows[0].x}).`,
    ],
    solution: {
      formula: 'Rate of Change = Δy / Δx',
      steps: [
        `Find Δy: ${rows[1].y} - ${rows[0].y} = ${m}.`,
        `Find Δx: ${rows[1].x} - ${rows[0].x} = 1.`,
        `Divide: ${m} ÷ 1 = ${m}.`,
      ],
      finalAnswer: m.toString(),
    },
  };
}

export function generateGrade8Pythagorean(difficulty: Difficulty): MathQuestion {
  const id = `g8-pyth-${Date.now()}-${randomInt(100, 999)}`;
  const triple = getRandomPythagoreanTriple();

  if (difficulty === 'easy') {
    // Finding hypotenuse c given legs a and b
    const { a, b, c } = triple;

    return {
      id,
      grade: 8,
      topicKey: 'pythagorean',
      topicName: 'Pythagorean Theorem',
      difficulty,
      prompt: `In a right triangle, the two legs have lengths a = ${a} and b = ${b}. Find the length of the hypotenuse (c):`,
      diagram: {
        type: 'triangle-right',
        title: 'Right Triangle',
        params: { a, b, c: '?', findHypotenuse: true },
      },
      correctAnswer: c.toString(),
      acceptedAnswers: [c.toString(), `c = ${c}`, `c=${c}`],
      answerType: 'number',
      placeholder: 'e.g. 5',
      hints: [
        `Pythagorean Theorem: a² + b² = c²`,
        `Substitute legs: ${a}² + ${b}² = ${a * a} + ${b * b} = ${c * c}. Now take the square root of ${c * c}.`,
      ],
      solution: {
        formula: 'a² + b² = c²',
        steps: [
          `Substitute legs: ${a}² + ${b}² = c²`,
          `Calculate squares: ${a * a} + ${b * b} = ${c * c}`,
          `Take square root: c = √${c * c} = ${c}.`,
        ],
        finalAnswer: c.toString(),
      },
    };
  }

  if (difficulty === 'medium') {
    // Finding missing leg a given leg b and hypotenuse c
    const { a, b, c } = triple;

    return {
      id,
      grade: 8,
      topicKey: 'pythagorean',
      topicName: 'Pythagorean Theorem',
      difficulty,
      prompt: `A right triangle has hypotenuse c = ${c} and one leg b = ${b}. Find the length of the missing leg (a):`,
      diagram: {
        type: 'triangle-right',
        title: 'Right Triangle',
        params: { a: '?', b, c, findHypotenuse: false },
      },
      correctAnswer: a.toString(),
      acceptedAnswers: [a.toString(), `a = ${a}`, `a=${a}`],
      answerType: 'number',
      placeholder: 'e.g. 12',
      hints: [
        `Pythagorean Theorem: a² + b² = c²  -->  a² = c² - b²`,
        `Calculate: ${c}² - ${b}² = ${c * c} - ${b * b} = ${a * a}. Take the square root.`,
      ],
      solution: {
        formula: 'a² = c² - b²',
        steps: [
          `Rearrange formula: a² = ${c}² - ${b}²`,
          `Calculate squares: a² = ${c * c} - ${b * b} = ${a * a}`,
          `Take square root: a = √${a * a} = ${a}.`,
        ],
        finalAnswer: a.toString(),
      },
    };
  }

  // Hard: Real-world ladder / distance word problem
  const { a, b, c } = triple;
  const ladderLength = c;
  const baseDistance = b;
  const wallHeight = a;

  return {
    id,
    grade: 8,
    topicKey: 'pythagorean',
    topicName: 'Pythagorean Theorem',
    difficulty: 'hard',
    prompt: `A ${ladderLength}-foot ladder is leaning against a vertical wall. The base of the ladder is placed ${baseDistance} feet away from the wall. How many feet up the wall does the top of the ladder reach?`,
    correctAnswer: wallHeight.toString(),
    acceptedAnswers: [wallHeight.toString(), `${wallHeight} feet`, `${wallHeight} ft`],
    answerType: 'number',
    unit: 'ft',
    placeholder: 'e.g. 12',
    hints: [
      `The ladder forms the hypotenuse (c = ${ladderLength} ft) and the ground distance is one leg (b = ${baseDistance} ft).`,
      `Use a² + b² = c² to find the height (a): a² = ${ladderLength}² - ${baseDistance}².`,
    ],
    solution: {
      formula: 'Height² + Base² = Ladder²',
      steps: [
        `Identify values: Hypotenuse c = ${ladderLength} ft, Base b = ${baseDistance} ft.`,
        `Height² = ${ladderLength}² - ${baseDistance}² = ${ladderLength * ladderLength} - ${baseDistance * baseDistance} = ${wallHeight * wallHeight}.`,
        `Height = √${wallHeight * wallHeight} = ${wallHeight} ft.`,
      ],
      finalAnswer: `${wallHeight} ft`,
    },
  };
}

export function generateGrade8Geometry(difficulty: Difficulty): MathQuestion {
  const id = `g8-geo-${Date.now()}-${randomInt(100, 999)}`;

  if (difficulty === 'easy') {
    // Volume of a cylinder: V = pi * r^2 * h
    const r = randomChoice([2, 3, 4, 5]);
    const h = randomInt(4, 10);
    const volExact = r * r * h;
    const volDec = roundTo(3.14 * volExact, 2);

    return {
      id,
      grade: 8,
      topicKey: 'geometry',
      topicName: 'Geometry',
      difficulty,
      prompt: `Find the volume of a cylinder with radius r = ${r} cm and height h = ${h} cm. (Use π = 3.14)`,
      diagram: {
        type: 'cylinder',
        title: 'Cylinder',
        params: { radius: r, height: h, unit: 'cm' },
      },
      correctAnswer: volDec.toString(),
      acceptedAnswers: [
        volDec.toString(),
        `${volExact}pi`,
        `${volExact}π`,
        `${volDec} cm³`,
        `${volDec} cubic cm`,
      ],
      answerType: 'number',
      unit: 'cm³',
      placeholder: 'e.g. 150.72',
      hints: [
        `Cylinder Volume Formula: V = π × r² × h`,
        `First calculate base area: π × ${r}² = 3.14 × ${r * r}. Then multiply by height ${h}.`,
      ],
      solution: {
        formula: 'V = π × r² × h',
        steps: [
          `Base Area = π × r² = 3.14 × ${r}² = ${3.14 * r * r}.`,
          `Volume = Base Area × Height = ${3.14 * r * r} × ${h} = ${volDec} cm³.`,
        ],
        finalAnswer: `${volDec} cm³`,
      },
    };
  }

  if (difficulty === 'medium') {
    // Volume of a cone: V = 1/3 * pi * r^2 * h
    const r = randomChoice([3, 6]);
    const h = randomChoice([4, 5, 7, 8, 10]);
    const rSquaredH = r * r * h;
    const volExact = rSquaredH / 3;
    const volDec = roundTo(3.14 * volExact, 2);

    return {
      id,
      grade: 8,
      topicKey: 'geometry',
      topicName: 'Geometry',
      difficulty,
      prompt: `Find the volume of a cone with radius r = ${r} m and height h = ${h} m. (Use π = 3.14)`,
      diagram: {
        type: 'cone',
        title: 'Cone',
        params: { radius: r, height: h, unit: 'm' },
      },
      correctAnswer: volDec.toString(),
      acceptedAnswers: [volDec.toString(), `${volExact}pi`, `${volExact}π`, `${volDec} m³`],
      answerType: 'number',
      unit: 'm³',
      placeholder: 'e.g. 75.36',
      hints: [
        `Cone Volume Formula: V = (1/3) × π × r² × h`,
        `Notice that a cone is 1/3 the volume of a cylinder with the same radius and height!`,
      ],
      solution: {
        formula: 'V = (1/3) × π × r² × h',
        steps: [
          `Calculate r² × h: ${r}² × ${h} = ${r * r * h}.`,
          `Divide by 3: ${r * r * h} ÷ 3 = ${volExact}.`,
          `Multiply by π (3.14): ${volExact} × 3.14 = ${volDec} m³.`,
        ],
        finalAnswer: `${volDec} m³`,
      },
    };
  }

  // Hard: Parallel lines cut by a transversal / angle relationships
  const givenAngle = randomInt(45, 80);
  const supplAngle = 180 - givenAngle;

  return {
    id,
    grade: 8,
    topicKey: 'geometry',
    topicName: 'Geometry',
    difficulty: 'hard',
    prompt: `Two parallel lines are intersected by a transversal line. One acute interior angle measures ${givenAngle}°. What is the measure of the consecutive interior (supplementary) angle?`,
    correctAnswer: supplAngle.toString(),
    acceptedAnswers: [supplAngle.toString(), `${supplAngle}°`, `${supplAngle} degrees`],
    answerType: 'number',
    unit: '°',
    placeholder: 'e.g. 115',
    hints: [
      `Consecutive interior angles on the same side of a transversal are supplementary (they sum to 180°).`,
      `Subtract ${givenAngle}° from 180°.`,
    ],
    solution: {
      steps: [
        `Consecutive interior angles sum to 180°.`,
        `Equation: ${givenAngle}° + x = 180°`,
        `Calculate: x = 180° - ${givenAngle}° = ${supplAngle}°.`,
      ],
      finalAnswer: `${supplAngle}°`,
    },
  };
}

export function generateGrade8Statistics(difficulty: Difficulty): MathQuestion {
  const id = `g8-stat-${Date.now()}-${randomInt(100, 999)}`;

  if (difficulty === 'easy') {
    // Mean, Median, Mode, or Range of simple 5-number dataset
    const type = randomChoice(['mean', 'median', 'range']);
    const numbers = [
      randomInt(60, 75),
      randomInt(76, 85),
      randomInt(86, 92),
      randomInt(93, 98),
    ];
    // Ensure clean mean
    const sum4 = numbers.reduce((a, b) => a + b, 0);
    const targetMean = randomInt(75, 90);
    const fifth = targetMean * 5 - sum4;
    numbers.push(fifth);
    numbers.sort((a, b) => a - b);

    let ans = 0;
    if (type === 'mean') ans = targetMean;
    else if (type === 'median') ans = numbers[2];
    else ans = numbers[4] - numbers[0];

    return {
      id,
      grade: 8,
      topicKey: 'statistics',
      topicName: 'Statistics',
      difficulty,
      prompt: `Find the ${type.toUpperCase()} of the following data set:\n${numbers.join(', ')}`,
      correctAnswer: ans.toString(),
      acceptedAnswers: [ans.toString()],
      answerType: 'number',
      placeholder: 'e.g. 84',
      hints: [
        type === 'mean'
          ? `Add all 5 numbers together and divide the total by 5.`
          : type === 'median'
          ? `List numbers in order from least to greatest and pick the exact middle number.`
          : `Subtract the minimum value (${numbers[0]}) from the maximum value (${numbers[4]}).`,
      ],
      solution: {
        steps: [
          `Ordered data: ${numbers.join(', ')}`,
          type === 'mean'
            ? `Sum = ${numbers.join(' + ')} = ${targetMean * 5}. Mean = ${targetMean * 5} ÷ 5 = ${targetMean}.`
            : type === 'median'
            ? `The 3rd (middle) value is ${numbers[2]}.`
            : `Range = Maximum - Minimum = ${numbers[4]} - ${numbers[0]} = ${ans}.`,
        ],
        finalAnswer: ans.toString(),
      },
    };
  }

  if (difficulty === 'medium') {
    // Missing score to achieve target mean
    const s1 = randomInt(75, 90);
    const s2 = randomInt(75, 90);
    const s3 = randomInt(75, 90);
    const targetMean = Math.max(s1, s2, s3) + randomInt(1, 4);
    const s4Required = targetMean * 4 - (s1 + s2 + s3);
    const name = randomChoice(['Leo', 'Maya', 'Chloe', 'Noah', 'Zoe']);

    return {
      id,
      grade: 8,
      topicKey: 'statistics',
      topicName: 'Statistics',
      difficulty,
      prompt: `${name} scored ${s1}, ${s2}, and ${s3} on the first three math quizzes. What score must ${name} earn on the 4th quiz to have an overall mean of ${targetMean}?`,
      correctAnswer: s4Required.toString(),
      acceptedAnswers: [s4Required.toString()],
      answerType: 'number',
      placeholder: 'e.g. 92',
      hints: [
        `For 4 quizzes to average ${targetMean}, the total points needed is 4 × ${targetMean} = ${targetMean * 4}.`,
        `Subtract the sum of the first 3 scores (${s1} + ${s2} + ${s3} = ${s1 + s2 + s3}) from ${targetMean * 4}.`,
      ],
      solution: {
        steps: [
          `Total points needed for 4 tests: 4 × ${targetMean} = ${targetMean * 4}.`,
          `Current total points: ${s1} + ${s2} + ${s3} = ${s1 + s2 + s3}.`,
          `Score required: ${targetMean * 4} - ${s1 + s2 + s3} = ${s4Required}.`,
        ],
        finalAnswer: s4Required.toString(),
      },
    };
  }

  // Hard: Interquartile Range (IQR) from a 7-number ordered dataset
  const q1 = randomInt(20, 35);
  const q3 = q1 + randomChoice([12, 14, 16, 18, 20]);
  const data = [
    q1 - randomInt(8, 12),
    q1,
    q1 + randomInt(2, 5),
    randomInt(q1 + 6, q3 - 6),
    q3 - randomInt(2, 5),
    q3,
    q3 + randomInt(8, 14),
  ].sort((a, b) => a - b);

  return {
    id,
    grade: 8,
    topicKey: 'statistics',
    topicName: 'Statistics',
    difficulty: 'hard',
    prompt: `Find the Interquartile Range (IQR) for the data set:\n${data.join(', ')}`,
    diagram: {
      type: 'box-plot',
      title: 'Data Distribution',
      params: { data, q1: data[1], median: data[3], q3: data[5] },
    },
    correctAnswer: (data[5] - data[1]).toString(),
    acceptedAnswers: [(data[5] - data[1]).toString()],
    answerType: 'number',
    placeholder: 'e.g. 15',
    hints: [
      `IQR = Q3 (Upper Quartile) - Q1 (Lower Quartile).`,
      `Find the median (${data[3]}). Q1 is the median of the lower half (${data[1]}), and Q3 is the median of the upper half (${data[5]}).`,
    ],
    solution: {
      formula: 'IQR = Q3 - Q1',
      steps: [
        `Median of entire set = ${data[3]}.`,
        `Lower Quartile (Q1) = ${data[1]}.`,
        `Upper Quartile (Q3) = ${data[5]}.`,
        `Calculate IQR: ${data[5]} - ${data[1]} = ${data[5] - data[1]}.`,
      ],
      finalAnswer: (data[5] - data[1]).toString(),
    },
  };
}

export function generateGrade8Probability(difficulty: Difficulty): MathQuestion {
  const id = `g8-prob-${Date.now()}-${randomInt(100, 999)}`;

  if (difficulty === 'easy') {
    // Independent compound events: Coin flip + Die roll
    const coinSide = randomChoice(['Heads', 'Tails']);
    const dieRoll = randomChoice(['an even number', 'a number greater than 4', 'a 5']);
    let pDieNum = 1;
    let pDieDen = 6;
    if (dieRoll === 'an even number') {
      pDieNum = 3;
    } else if (dieRoll === 'a number greater than 4') {
      pDieNum = 2;
    }

    // P(Coin) = 1/2
    const totalNum = 1 * pDieNum;
    const totalDen = 2 * pDieDen;
    const ansStr = formatFraction(totalNum, totalDen);

    return {
      id,
      grade: 8,
      topicKey: 'probability',
      topicName: 'Probability',
      difficulty,
      prompt: `You flip a fair coin and roll a standard 6-sided die. What is the probability of flipping ${coinSide} AND rolling ${dieRoll}?`,
      correctAnswer: ansStr,
      acceptedAnswers: [ansStr, `${totalNum}/${totalDen}`, (totalNum / totalDen).toString()],
      answerType: 'fraction',
      placeholder: 'e.g. 1/12',
      hints: [
        `For independent events: P(A and B) = P(A) × P(B).`,
        `P(${coinSide}) = 1/2. P(${dieRoll}) = ${formatFraction(pDieNum, pDieDen)}. Multiply the two probabilities.`,
      ],
      solution: {
        formula: 'P(A and B) = P(A) × P(B)',
        steps: [
          `P(Coin is ${coinSide}) = 1/2.`,
          `P(Die is ${dieRoll}) = ${pDieNum}/6 = ${formatFraction(pDieNum, pDieDen)}.`,
          `Multiply: (1/2) × (${pDieNum}/6) = ${totalNum}/${totalDen} = ${ansStr}.`,
        ],
        finalAnswer: ansStr,
      },
    };
  }

  if (difficulty === 'medium') {
    // Dependent events without replacement
    const red = randomInt(4, 7);
    const blue = randomInt(4, 6);
    const total1 = red + blue;
    // Drawing two reds in a row: (red / total1) * ((red - 1) / (total1 - 1))
    const num = red * (red - 1);
    const den = total1 * (total1 - 1);
    const ansStr = formatFraction(num, den);

    return {
      id,
      grade: 8,
      topicKey: 'probability',
      topicName: 'Probability',
      difficulty,
      prompt: `A jar contains ${red} red marbles and ${blue} blue marbles. If two marbles are drawn one after another WITHOUT replacement, what is the probability that BOTH marbles are red?`,
      diagram: {
        type: 'marble-bag',
        title: 'Two-Stage Draw',
        params: { red, blue, total: total1 },
      },
      correctAnswer: ansStr,
      acceptedAnswers: [ansStr, `${num}/${den}`, (num / den).toString()],
      answerType: 'fraction',
      placeholder: 'e.g. 2/9',
      hints: [
        `First draw: P(1st Red) = ${red} / ${total1}.`,
        `Second draw: There are now ${red - 1} reds left out of ${total1 - 1} total marbles.`,
        `Multiply: (${red}/${total1}) × (${red - 1}/${total1 - 1}).`,
      ],
      solution: {
        formula: 'P(A and B) = P(A) × P(B | A)',
        steps: [
          `P(1st Red) = ${red}/${total1}.`,
          `After drawing 1 red without replacement: ${red - 1} red and ${total1 - 1} total remaining.`,
          `P(2nd Red) = ${red - 1}/${total1 - 1}.`,
          `Multiply: (${red}/${total1}) × (${red - 1}/${total1 - 1}) = ${num}/${den} = ${ansStr}.`,
        ],
        finalAnswer: ansStr,
      },
    };
  }

  // Hard: Multi-step compound probability with tree/event logic
  const cardCount = 52;
  const pAce = 4; // 4 aces
  const pKing = 4; // 4 kings
  // Probability of drawing an Ace then a King without replacement: (4/52) * (4/51) = 16 / 2652 = 4 / 663
  const num = pAce * pKing;
  const den = cardCount * (cardCount - 1);
  const ansStr = formatFraction(num, den);

  return {
    id,
    grade: 8,
    topicKey: 'probability',
    topicName: 'Probability',
    difficulty: 'hard',
    prompt: `From a standard deck of 52 playing cards, two cards are drawn at random without replacement. What is the probability that the first card is an Ace and the second card is a King?`,
    correctAnswer: ansStr,
    acceptedAnswers: [ansStr, `${num}/${den}`],
    answerType: 'fraction',
    placeholder: 'e.g. 4/663',
    hints: [
      `There are 4 Aces in a 52-card deck: P(1st is Ace) = 4/52 = 1/13.`,
      `There are still 4 Kings, but now only 51 cards left: P(2nd is King) = 4/51.`,
      `Multiply the two probabilities.`,
    ],
    solution: {
      steps: [
        `P(Ace on 1st draw) = 4/52 = 1/13.`,
        `P(King on 2nd draw) = 4/51.`,
        `Multiply: (1/13) × (4/51) = 4 / 663 (${ansStr}).`,
      ],
      finalAnswer: ansStr,
    },
  };
}
