// Mock data for student groups
export interface Group {
  id: string;
  name: string;
  level: string;
  students: number;
  maxStudents: number;
  schedule: string;
  teacher: string;
}

export const mockGroups: Group[] = [
  {
    id: "group1",
    name: "CM1-A Morning",
    level: "CM1",
    students: 18,
    maxStudents: 20,
    schedule: "Mon, Wed, Fri 8:30-12:00",
    teacher: "Fatima Ouazzani"
  },
  {
    id: "group2",
    name: "CM1-B Afternoon",
    level: "CM1",
    students: 15,
    maxStudents: 20,
    schedule: "Mon, Wed, Fri 13:30-17:00",
    teacher: "Ahmed Tazi"
  },
  {
    id: "group3",
    name: "CM2-A Morning",
    level: "CM2",
    students: 17,
    maxStudents: 20,
    schedule: "Tue, Thu, Sat 8:30-12:00",
    teacher: "Mohammed Alami"
  },
  {
    id: "group4",
    name: "CM2-B Afternoon",
    level: "CM2",
    students: 16,
    maxStudents: 20,
    schedule: "Tue, Thu, Sat 13:30-17:00",
    teacher: "Nadia Chaoui"
  },
  {
    id: "group5",
    name: "6ème-A",
    level: "6ème",
    students: 22,
    maxStudents: 25,
    schedule: "Mon-Fri 8:00-12:30",
    teacher: "Karim Bensouda"
  },
  {
    id: "group6",
    name: "6ème-B",
    level: "6ème",
    students: 21,
    maxStudents: 25,
    schedule: "Mon-Fri 13:00-17:30",
    teacher: "Leila Ziani"
  },
  {
    id: "group7",
    name: "5ème-A",
    level: "5ème",
    students: 24,
    maxStudents: 25,
    schedule: "Mon-Fri 8:00-12:30",
    teacher: "Hassan Alaoui"
  },
  {
    id: "group8",
    name: "5ème-B",
    level: "5ème",
    students: 23,
    maxStudents: 25,
    schedule: "Mon-Fri 13:00-17:30",
    teacher: "Samira Bennani"
  },
  {
    id: "group9",
    name: "4ème-A",
    level: "4ème",
    students: 18,
    maxStudents: 25,
    schedule: "Mon-Fri 8:00-12:30",
    teacher: "Omar Idrissi"
  },
  {
    id: "group10",
    name: "4ème-B",
    level: "4ème",
    students: 17,
    maxStudents: 25,
    schedule: "Mon-Fri 13:00-17:30",
    teacher: "Yasmine Tadlaoui"
  }
];