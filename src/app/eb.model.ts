export interface Question {
  question: string;
  answer: string;
  timedelay: number;
}

export interface State {
  'question-number': number;
  'init-timestamp': number;
  fails: number;
}
