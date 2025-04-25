// Mock data for courses
export interface Course {
  id: string;
  name: string;
  level: string;
  description: string;
  enrollments: number;
  maxEnrollments: number;
  startDate: string;
  endDate: string;
  instructor: string;
}

export const mockCourses: Course[] = [
  {
    id: "course1",
    name: "Mathematics Foundations",
    level: "CM1",
    description: "Basic mathematics concepts for primary education",
    enrollments: 18,
    maxEnrollments: 25,
    startDate: "2024-01-15",
    endDate: "2024-06-30",
    instructor: "Fatima Ouazzani"
  },
  {
    id: "course2",
    name: "French Language",
    level: "CM1",
    description: "Introduction to French grammar and vocabulary",
    enrollments: 22,
    maxEnrollments: 25,
    startDate: "2024-01-15",
    endDate: "2024-06-30",
    instructor: "Pierre Dubois"
  },
  {
    id: "course3",
    name: "Arabic Literature",
    level: "CM2",
    description: "Introduction to Arabic literature and poetry",
    enrollments: 15,
    maxEnrollments: 20,
    startDate: "2024-01-15",
    endDate: "2024-06-30",
    instructor: "Ahmed Benjelloun"
  },
  {
    id: "course4",
    name: "Science Exploration",
    level: "CM2",
    description: "Discovering the world of science through experiments",
    enrollments: 19,
    maxEnrollments: 22,
    startDate: "2024-01-15",
    endDate: "2024-06-30",
    instructor: "Nadia Chaoui"
  },
  {
    id: "course5",
    name: "Pre-Algebra",
    level: "6ème",
    description: "Preparation for algebraic concepts",
    enrollments: 24,
    maxEnrollments: 30,
    startDate: "2024-01-15",
    endDate: "2024-06-30",
    instructor: "Karim Bensouda"
  },
  {
    id: "course6",
    name: "World History",
    level: "6ème",
    description: "Introduction to major historical events",
    enrollments: 21,
    maxEnrollments: 30,
    startDate: "2024-01-15",
    endDate: "2024-06-30",
    instructor: "Sophie Martin"
  },
  {
    id: "course7",
    name: "Algebra Fundamentals",
    level: "5ème",
    description: "Core algebraic concepts and problem solving",
    enrollments: 27,
    maxEnrollments: 30,
    startDate: "2024-01-15",
    endDate: "2024-06-30",
    instructor: "Hassan Alaoui"
  },
  {
    id: "course8",
    name: "Earth Sciences",
    level: "5ème",
    description: "Study of the earth, environment and natural resources",
    enrollments: 23,
    maxEnrollments: 28,
    startDate: "2024-01-15",
    endDate: "2024-06-30",
    instructor: "Leila Bennani"
  },
  {
    id: "course9",
    name: "Advanced Mathematics",
    level: "4ème",
    description: "Complex mathematical concepts and applications",
    enrollments: 18,
    maxEnrollments: 25,
    startDate: "2024-01-15",
    endDate: "2024-06-30",
    instructor: "Omar Idrissi"
  },
  {
    id: "course10",
    name: "Physics Introduction",
    level: "4ème",
    description: "Fundamentals of physical sciences",
    enrollments: 16,
    maxEnrollments: 24,
    startDate: "2024-01-15",
    endDate: "2024-06-30",
    instructor: "Younes Tazi"
  }
];