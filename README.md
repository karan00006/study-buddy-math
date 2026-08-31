# 📐 Study Buddy — Middle School Math Practice & Problem Generation

**“Practice smarter. Learn better.”**

**Study Buddy** is a clean, modern, educational web application designed for middle-school students (**Grades 6–8**, ages ~11–14). It empowers students to practice math independently with **dynamically generated problems**, **smart answer evaluation**, **progressive hints**, **step-by-step solutions**, and an **interactive on-screen scratchpad**.

---

## 🌟 Key Features

1. **Procedural Question Generator**:
   - Generates randomized numbers, scenarios, and word problems dynamically rather than relying on static question banks.
   - Tailored to **Grade 6, Grade 7, and Grade 8** standards.
   - Provides 3 calibrated difficulty levels (**Easy, Medium, Hard**) per topic.
   - Guaranteed solvable problems with verified single clear answers.

2. **Smart Answer Normalization & Equivalence Checking**:
   - Accepts diverse valid mathematical formats seamlessly:
     - **Fractions**: `1/2`, `2/4`, `3/6`, ` 1 / 2 `
     - **Decimals**: `0.5`, `.5`, `0.50`
     - **Percentages**: `50%`, `50`, `0.5`
     - **Mixed Numbers**: `1 1/2`, `1.5`, `3/2`
     - **Negative Numbers**: `-5`, `- 5`
     - **Variable Equations**: `x = 4`, `x=4`, `4`
     - **Units & Currencies**: `$25`, `25 dollars`, `12 cm²`, `12 sq cm`, `12`
     - **Coordinate Pairs**: `(2, 3)`, `2, 3`, `(2,3)`

3. **Step-by-Step "Show Me How" Solutions & Progressive Hints**:
   - Clear, age-appropriate step-by-step explanations for every generated problem.
   - Progressive hints that guide students without immediately spoiling the answer.
   - Key formula and concept callouts.

4. **Dynamic Math Visuals & Diagrams**:
   - Custom SVG diagrams rendered dynamically:
     - Right triangles with labeled legs and hypotenuse markers (Pythagorean Theorem)
     - Triangles with altitude heights and labeled bases
     - Rectangles, circles, cylinders, cones, and 3D rectangular prisms
     - Probability spinners with colored sectors and marble bags
     - Input-output function tables
     - Box plots showing quartiles ($Q_1, \text{Median}, Q_3$)

5. **Interactive On-Screen Scratchpad / Whiteboard**:
   - Built-in canvas workspace where students can work out calculations, draw diagrams, and write notes.
   - Multi-color pens, eraser tool, stroke sizing, and instant canvas clearing.

6. **Audio & Celebration Feedback**:
   - Synthesized gentle sound chimes on correct answers (toggleable).
   - Milestone celebration confetti for scores $\ge 70\%$.

---

## 🚀 Running the Project Locally

### Prerequisites
- **Node.js** (v18+ or v20+)
- **npm** (v9+)

### Installation & Execution

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173` to start practicing!

3. **Run the automated unit test suite**:
   ```bash
   npm test
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

---

## ⚙️ How the Question-Generation System Works

The math engine (`src/math-engine/`) is structured modularly:

```
src/math-engine/
├── types.ts           # Type definitions for Grades, Difficulties, Questions, Diagrams, and Results
├── helpers.ts         # GCD, LCM, fraction simplifier, Pythagorean triples, random utilities
├── normalizer.ts      # Multi-format answer parsing and mathematical equivalence evaluator
├── generators/
│   ├── grade6.ts      # Generator templates for all 7 Grade 6 topics
│   ├── grade7.ts      # Generator templates for all 7 Grade 7 topics
│   └── grade8.ts      # Generator templates for all 7 Grade 8 topics
├── index.ts           # Unified generator facade and practice set builder
└── tests/             # Comprehensive Vitest test suite
```

### Problem Generation Lifecycle:
1. **Selection**: The student selects their grade, topic, difficulty (`easy`, `medium`, `hard`), and count (5, 10, or 15).
2. **Procedural Creation**: `generateQuestion(grade, topic, difficulty)` selects a math template, randomizes coefficients and variables within mathematically sound ranges (e.g. integer roots, non-zero denominators, integer triples), and computes the exact answer.
3. **Structured Explanation**: Concurrently generates 2 progressive hints, formula badges, and a step-by-step numbered breakdown.
4. **Practice Set Assembly**: `generatePracticeSet()` ensures no duplicate problem signatures in the same practice session.
5. **Answer Evaluation**: `checkAnswer(userInput, question)` normalizes student input, compares numeric and structural equivalents, and returns immediate feedback.

---

## 📚 Currently Supported Topics & Question Types

### 📘 Grade 6
1. **Fractions**:
   - *Easy*: Adding and subtracting like denominators, simplifying fractions to lowest terms.
   - *Medium*: Unlike denominators (LCD), real-world pizza/recipe multiplication word problems.
   - *Hard*: Fraction division ("Keep, Change, Flip") and mixed number operations.
2. **Decimals**:
   - *Easy*: Decimal addition and subtraction, line-up money values.
   - *Medium*: Decimal multiplication and unit price shopping word problems.
   - *Hard*: Multi-step budget and change calculation.
3. **Percentages**:
   - *Easy*: Benchmark percents (10%, 25%, 50%, 75% of whole numbers).
   - *Medium*: Finding part-of-whole percentages ($x\%$ of $y$, what $\%$ is $a$ of $b$).
   - *Hard*: Percent discounts, sales prices, and multi-step tax problems.
4. **Ratios**:
   - *Easy*: Simplifying ratios ($a:b \rightarrow s_1:s_2$).
   - *Medium*: Part-to-part ratio scaling and proportion word problems.
   - *Hard*: Part-to-whole distribution between two recipients.
5. **Integers**:
   - *Easy*: Absolute value ($|-15| = 15$) and same-sign integer addition.
   - *Medium*: Mixed-sign subtraction (subtracting negatives) and temperature change word problems.
   - *Hard*: Multi-step PEMDAS with negative integer multiplication and addition.
6. **Basic Algebra**:
   - *Easy*: One-step addition/subtraction equations ($x + a = b$).
   - *Medium*: One-step multiplication/division equations ($ax = b, x/a = b$).
   - *Hard*: Evaluating linear expressions with given variable values ($ax + b$).
7. **Geometry**:
   - *Easy*: Perimeter and area of rectangles ($A = l \times w, P = 2(l + w)$) with SVG diagram.
   - *Medium*: Area of triangles ($A = \frac{1}{2}bh$) with height/base SVG diagram.
   - *Hard*: Volume of 3D rectangular prisms ($V = l \times w \times h$).

---

### 📙 Grade 7
1. **Rational Numbers**:
   - *Easy*: Adding and subtracting negative rational fractions.
   - *Medium*: Multiplying and dividing positive/negative rational numbers.
   - *Hard*: Multi-step PEMDAS order of operations with negative rational powers.
2. **Expressions**:
   - *Easy*: Distributive property expansion ($a(bx + c) \rightarrow abx + ac$).
   - *Medium*: Combining linear like terms ($ax + b + cx - d$).
   - *Hard*: Factoring linear expressions by extracting the greatest common factor (GCF).
3. **Equations**:
   - *Easy*: Two-step linear equations ($ax + b = c$).
   - *Medium*: Equations with fractional terms ($x/a - b = c$).
   - *Hard*: Real-world rental deposit and hourly rate 2-step word problems.
4. **Ratios and Proportions**:
   - *Easy*: Solving direct proportions ($a/b = x/d$).
   - *Medium*: Unit rate, speed ($v = d/t$), and proportional travel distances.
   - *Hard*: Scale map drawings and actual distance calculations.
5. **Percentages**:
   - *Easy*: Restaurant bill sales tax and tip calculations.
   - *Medium*: Percent increase and percent decrease formulas.
   - *Hard*: Simple annual interest calculations ($I = P \cdot r \cdot t$).
6. **Geometry**:
   - *Easy*: Complementary ($90^\circ$) and Supplementary ($180^\circ$) angle equations.
   - *Medium*: Circle area and circumference ($A = \pi r^2, C = 2\pi r$) with SVG diagrams.
   - *Hard*: Total surface area of rectangular prisms ($SA = 2(lw + lh + wh)$).
7. **Probability**:
   - *Easy*: Single-event marble bag probability ($P(\text{event}) = \text{favorable}/\text{total}$).
   - *Medium*: Game spinner complementary probability ($P(\text{not yellow})$).
   - *Hard*: Experimental survey probability and population prediction.

---

### 📗 Grade 8
1. **Linear Equations**:
   - *Easy*: Multi-step linear equations with parentheses ($a(x - b) = c$).
   - *Medium*: Variables on both sides of the equation ($ax + b = cx + d$).
   - *Hard*: Calculating slope ($m = \frac{y_2 - y_1}{x_2 - x_1}$) from coordinate points with graph diagram.
2. **Exponents**:
   - *Easy*: Product of powers rule ($x^a \cdot x^b = x^{a+b}$).
   - *Medium*: Power of a power rule ($(x^a)^b = x^{ab}$).
   - *Hard*: Scientific notation conversion ($a \times 10^b$) and negative exponents ($b^{-n} = 1/b^n$).
3. **Functions**:
   - *Easy*: Evaluating linear function values ($f(x) = mx + b$ for given $x$).
   - *Medium*: Finding input $x$ given function output $f(x) = y$.
   - *Hard*: Constant rate of change (slope) from $(x, y)$ input-output tables.
4. **Pythagorean Theorem**:
   - *Easy*: Finding hypotenuse ($c = \sqrt{a^2 + b^2}$) with right triangle SVG diagrams.
   - *Medium*: Finding missing legs ($a = \sqrt{c^2 - b^2}$).
   - *Hard*: Real-world leaning ladder and vertical wall height word problems.
5. **Geometry**:
   - *Easy*: Volume of cylinders ($V = \pi r^2 h$) with 3D diagram.
   - *Medium*: Volume of cones ($V = \frac{1}{3}\pi r^2 h$) with 3D diagram.
   - *Hard*: Transversals and consecutive interior angles with parallel lines.
6. **Statistics**:
   - *Easy*: Mean, Median, Mode, and Range of 5-number data sets.
   - *Medium*: Calculating the required missing quiz score to reach a target mean.
   - *Hard*: Interquartile Range (IQR = $Q_3 - Q_1$) and Box Plot quartile interpretations.
7. **Probability**:
   - *Easy*: Compound independent events (coin flip AND 6-sided die roll).
   - *Medium*: Dependent 2-stage marble draws without replacement.
   - *Hard*: Standard 52-card deck multi-draw compound probability without replacement.

---

## 🎨 Design & Accessibility

- **Middle-School Centered Aesthetics**: Clean, readable, friendly typography utilizing *Plus Jakarta Sans*, *Space Grotesk*, and *JetBrains Mono*.
- **Touch & Keyboard Friendly**: Quick math keypad for fractions, roots, powers, and variables; full physical keyboard support with `Enter` to submit.
- **Mobile Responsive**: Flexibly adapts across mobile phones (375px+), tablets, and desktop displays.
