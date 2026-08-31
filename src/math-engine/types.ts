export type Grade = 6 | 7 | 8;

export type Difficulty = 'easy' | 'medium' | 'hard';

export type Grade6Topic =
  | 'fractions'
  | 'decimals'
  | 'percentages'
  | 'ratios'
  | 'integers'
  | 'basic-algebra'
  | 'geometry';

export type Grade7Topic =
  | 'rational-numbers'
  | 'expressions'
  | 'equations'
  | 'ratios-proportions'
  | 'percentages'
  | 'geometry'
  | 'probability';

export type Grade8Topic =
  | 'linear-equations'
  | 'exponents'
  | 'functions'
  | 'pythagorean'
  | 'geometry'
  | 'statistics'
  | 'probability';

export type TopicKey = Grade6Topic | Grade7Topic | Grade8Topic;

export interface TopicInfo {
  key: TopicKey;
  grade: Grade;
  name: string;
  shortDesc: string;
  icon: string;
  color: string;
}

export type DiagramType =
  | 'triangle-right'
  | 'triangle-generic'
  | 'rectangle'
  | 'parallelogram'
  | 'circle'
  | 'cylinder'
  | 'cone'
  | 'sphere'
  | 'rectangular-prism'
  | 'number-line'
  | 'spinner'
  | 'marble-bag'
  | 'coordinate-points'
  | 'function-table'
  | 'box-plot'
  | 'pie-chart';

export interface MathDiagramData {
  type: DiagramType;
  title?: string;
  params: Record<string, any>;
}

export interface MathSolution {
  steps: string[];
  formula?: string;
  finalAnswer: string;
  tip?: string;
}

export interface MathQuestion {
  id: string;
  grade: Grade;
  topicKey: TopicKey;
  topicName: string;
  difficulty: Difficulty;
  prompt: string;
  mathExpression?: string;
  diagram?: MathDiagramData;
  correctAnswer: string | number;
  acceptedAnswers?: (string | number)[];
  answerType: 'number' | 'fraction' | 'decimal' | 'percentage' | 'algebra' | 'coordinate' | 'any';
  unit?: string;
  placeholder?: string;
  hints: string[];
  solution: MathSolution;
}

export interface ValidationResult {
  isCorrect: boolean;
  userAnswerRaw: string;
  userAnswerNormalized: string;
  expectedNormalized: string;
  feedback: string;
  details?: string;
}

export interface QuestionSessionRecord {
  question: MathQuestion;
  userAnswer: string;
  isCorrect: boolean;
  attempts: number;
  usedHint: boolean;
  viewedSolution: boolean;
  timeSpentSeconds: number;
}

export interface PracticeSessionResult {
  grade: Grade;
  topicKey: TopicKey;
  topicName: string;
  difficulty: Difficulty;
  totalQuestions: number;
  correctCount: number;
  accuracy: number;
  records: QuestionSessionRecord[];
  strengths: string[];
  growthAreas: string[];
  timeElapsedSeconds: number;
}
