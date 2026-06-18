import { QuizCardDTO } from '@features/quiz/types';

export type UserRole = 'STUDENT' | 'TEACHER' | 'ADMIN';

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  level: string;
  totalPoints: number;
  dexEntries: number;
}

export interface ClassroomDTO {
  id: number;
  name: string;
  accessCode: string;
  teacherName: string;
  studentCount: number;
}

export interface ClassroomDetailDTO extends ClassroomDTO {
  students: { id: number; name: string; points: number }[];
  quizzes: QuizCardDTO[];
}
