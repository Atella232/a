export enum SectionType {
  INTRO = 'intro',
  NUMBER_LINE = 'number_line',
  OPERATIONS = 'operations',
  PROBLEMS = 'problems',
  GAMES = 'games'
}

export interface Exercise {
  id: string;
  question: string;
  correctAnswer: number;
  options?: number[];
  type: 'compare' | 'add' | 'subtract' | 'multiply' | 'divide' | 'combined';
}

export interface PyramidCell {
  id: string;
  value: number | null;
  isInput: boolean;
  row: number;
  col: number;
}

export interface WordProblem {
  id: string;
  text: string;
  correctAnswer: number;
  unit: string;
  hint?: string;
}

export interface NumberLinePoint {
  id: string;
  label: string;
  value: number;
}

export interface TrueFalseQuestion {
  id: string;
  statement: string;
  isTrue: boolean;
  explanation: string;
}

export interface MemoryCard {
  id: string;
  content: string;
  matchId: number; // Use the numeric value to match pairs (e.g. "-5" matches with "-2 - 3")
  isFlipped: boolean;
  isMatched: boolean;
  type: 'question' | 'answer';
}