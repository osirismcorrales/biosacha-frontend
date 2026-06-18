import { User, ClassroomDTO } from '@features/profile/types';

export const mockUser: User = {
  id: 1,
  name: 'Valentina S.',
  email: 'valentina@example.com',
  role: 'STUDENT',
  level: 'SAPLING',
  totalPoints: 340,
  dexEntries: 17,
};

export const mockClassrooms: ClassroomDTO[] = [
  {
    id: 1,
    name: '4to Grado B · Escuela Belgrano',
    accessCode: '4GB',
    teacherName: 'Prof. Marcos Beltrán',
    studentCount: 24,
  },
  {
    id: 2,
    name: 'Ecología Local',
    accessCode: 'ECO1',
    teacherName: 'Prof. Laura Sánchez',
    studentCount: 18,
  },
];
