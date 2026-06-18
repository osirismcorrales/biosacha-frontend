import { QuizCardDTO, QuizDTO } from '@features/quiz/types';

export const mockQuizCards: QuizCardDTO[] = [
  {
    id: 1,
    title: 'Felinos de Sudamérica',
    speciesName: 'Jaguar',
    speciesId: 1,
    questionCount: 5,
    totalPoints: 50,
    quizType: 'species',
    rarity: 'EPIC',
    conservationStatus: 'VU',
    started: true,
    progress: 2,
  },
  {
    id: 2,
    title: 'Aves del Amazonas',
    speciesName: 'Guacamayo Rojo',
    speciesId: 2,
    questionCount: 4,
    totalPoints: 40,
    quizType: 'species',
    rarity: 'RARE',
  },
  {
    id: 3,
    title: 'Flora Acuática',
    speciesName: 'Victoria Regia',
    speciesId: 8,
    questionCount: 3,
    totalPoints: 30,
    quizType: 'species',
    rarity: 'COMMON',
  },
  {
    id: 4,
    title: 'Ecosistemas del Chaco',
    speciesName: 'General',
    speciesId: 0,
    questionCount: 10,
    totalPoints: 100,
    quizType: 'general',
  },
  {
    id: 5,
    title: 'Tatú Carreta',
    speciesName: 'Tatú Carreta',
    speciesId: 0,
    questionCount: 5,
    totalPoints: 50,
    quizType: 'species',
    rarity: 'RARE',
  },
];

export const mockQuizHistory: {
  id: number;
  speciesName: string;
  totalPoints: number;
  stars: number;
  completedAt: string;
  correctCount: number;
  totalCount: number;
  percentage: number;
}[] = [
  { id: 1, speciesName: 'Águila Coronada', totalPoints: 40, stars: 3, completedAt: 'hace 2 días', correctCount: 4, totalCount: 5, percentage: 80 },
  { id: 2, speciesName: 'Biomas argentinos', totalPoints: 60, stars: 2, completedAt: 'hace 5 días', correctCount: 6, totalCount: 10, percentage: 60 },
  { id: 3, speciesName: 'Victoria Regia', totalPoints: 20, stars: 1, completedAt: 'hace 1 semana', correctCount: 2, totalCount: 3, percentage: 67 },
];

export const mockQuiz: QuizDTO = {
  id: 1,
  title: 'Felinos de Sudamérica',
  classroomId: 1,
  speciesId: 1,
  questions: [
    {
      id: 1,
      statement: '¿Cuál es el felino más grande de América?',
      optionA: 'Puma',
      optionB: 'Jaguar',
      optionC: 'Ocelote',
      optionD: 'Gato Andino',
      correctAnswer: 'B',
      points: 10,
    },
    {
      id: 2,
      statement: '¿En qué tipo de hábitat vive principalmente el jaguar?',
      optionA: 'Desiertos',
      optionB: 'Tundra',
      optionC: 'Selvas tropicales',
      optionD: 'Praderas árticas',
      correctAnswer: 'C',
      points: 10,
    },
    {
      id: 3,
      statement: '¿Cuál es el nombre científico del jaguar?',
      optionA: 'Panthera leo',
      optionB: 'Panthera onca',
      optionC: 'Puma concolor',
      optionD: 'Leopardus pardalis',
      correctAnswer: 'B',
      points: 10,
    },
    {
      id: 4,
      statement: '¿Qué característica distingue al jaguar de otros felinos grandes?',
      optionA: 'Su cola larga',
      optionB: 'Su melena',
      optionC: 'Sus rosetas con punto central',
      optionD: 'Sus rayas',
      correctAnswer: 'C',
      points: 10,
    },
    {
      id: 5,
      statement: '¿Cuál es el estado de conservación del jaguar según la UICN?',
      optionA: 'Preocupación Menor',
      optionB: 'Casi Amenazada',
      optionC: 'En Peligro',
      optionD: 'Extinta',
      correctAnswer: 'B',
      points: 10,
    },
  ],
};
