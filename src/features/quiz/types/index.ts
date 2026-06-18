export interface QuizCardDTO {
  id: number;
  title: string;
  speciesName: string;
  speciesId: number;
  questionCount: number;
  totalPoints: number;
  quizType?: 'species' | 'general' | 'classroom';
  rarity?: string;
  conservationStatus?: string;
  started?: boolean;
  progress?: number;
}

export interface QuestionDTO {
  id: number;
  statement: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: string;
  points: number;
}

export interface QuizDTO {
  id: number;
  title: string;
  classroomId: number;
  speciesId: number;
  questions: QuestionDTO[];
}
