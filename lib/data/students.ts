// Mock data for students
export interface Student {
  id: string;
  name: string;
  username: string;
  email: string;
  groups: string[];
  courses: string[];
  enrollmentDate: string;
  progress: CourseProgress[];
  activityDistribution: ActivityDistribution;
  activityLog: ActivityLog[];
}

interface CourseProgress {
  courseId: string;
  progress: number;
  quizzesCompleted: number;
  totalQuizzes: number;
  lessonsCompleted: number;
  totalLessons: number;
  averageScore: number;
  lastActivity: string;
}

interface ActivityDistribution {
  quizzes: number;
  videos: number;
  assignments: number;
  reading: number;
  games: number;
}

interface ActivityLog {
  type: 'quiz' | 'video' | 'assignment' | 'login' | 'forum';
  courseId: string;
  description: string;
  timestamp: string;
  score?: number;
}

export const mockStudents: Student[] = [
  {
    id: "student1",
    name: "Younes Benjelloun",
    username: "younes_benjelloun",
    email: "younes_benjelloun@2pi.ma",
    groups: ["group5"],
    courses: ["course5", "course6"],
    enrollmentDate: "2023-09-05",
    progress: [
      {
        courseId: "course5",
        progress: 75,
        quizzesCompleted: 8,
        totalQuizzes: 12,
        lessonsCompleted: 15,
        totalLessons: 20,
        averageScore: 82,
        lastActivity: "2023-12-18T10:30:00Z"
      },
      {
        courseId: "course6",
        progress: 60,
        quizzesCompleted: 6,
        totalQuizzes: 10,
        lessonsCompleted: 12,
        totalLessons: 18,
        averageScore: 75,
        lastActivity: "2023-12-20T14:15:00Z"
      }
    ],
    activityDistribution: {
      quizzes: 35,
      videos: 25,
      assignments: 20,
      reading: 15,
      games: 5
    },
    activityLog: [
      {
        type: "quiz",
        courseId: "course5",
        description: "Completed Algebra Quiz 8: Solving Equations",
        timestamp: "2023-12-20T09:45:00Z",
        score: 85
      },
      {
        type: "video",
        courseId: "course6",
        description: "Watched 'French Revolution' lecture video",
        timestamp: "2023-12-19T14:30:00Z"
      },
      {
        type: "assignment",
        courseId: "course5",
        description: "Submitted homework on Algebraic Expressions",
        timestamp: "2023-12-18T16:15:00Z"
      },
      {
        type: "quiz",
        courseId: "course6",
        description: "Completed World History Quiz 6",
        timestamp: "2023-12-17T11:00:00Z",
        score: 78
      },
      {
        type: "video",
        courseId: "course5",
        description: "Watched 'Quadratic Equations' tutorial",
        timestamp: "2023-12-16T13:20:00Z"
      }
    ]
  },
  {
    id: "student2",
    name: "Leila Alami",
    username: "leila_alami",
    email: "leila_alami@2pi.ma",
    groups: ["group6"],
    courses: ["course5", "course6"],
    enrollmentDate: "2023-09-03",
    progress: [
      {
        courseId: "course5",
        progress: 85,
        quizzesCompleted: 10,
        totalQuizzes: 12,
        lessonsCompleted: 18,
        totalLessons: 20,
        averageScore: 88,
        lastActivity: "2023-12-21T09:15:00Z"
      },
      {
        courseId: "course6",
        progress: 70,
        quizzesCompleted: 7,
        totalQuizzes: 10,
        lessonsCompleted: 14,
        totalLessons: 18,
        averageScore: 82,
        lastActivity: "2023-12-19T11:45:00Z"
      }
    ],
    activityDistribution: {
      quizzes: 30,
      videos: 30,
      assignments: 20,
      reading: 15,
      games: 5
    },
    activityLog: [
      {
        type: "quiz",
        courseId: "course5",
        description: "Completed Pre-Algebra Final Quiz",
        timestamp: "2023-12-21T09:15:00Z",
        score: 92
      },
      {
        type: "assignment",
        courseId: "course6",
        description: "Submitted essay on Medieval History",
        timestamp: "2023-12-19T15:30:00Z"
      },
      {
        type: "video",
        courseId: "course5",
        description: "Watched all 'Ratios and Proportions' videos",
        timestamp: "2023-12-18T10:45:00Z"
      },
      {
        type: "quiz",
        courseId: "course6",
        description: "Completed World History Quiz 7",
        timestamp: "2023-12-17T14:20:00Z",
        score: 85
      },
      {
        type: "assignment",
        courseId: "course5",
        description: "Completed practice problems on Equations",
        timestamp: "2023-12-16T11:10:00Z"
      }
    ]
  },
  {
    id: "student3",
    name: "Ahmed Chraibi",
    username: "ahmed_chraibi",
    email: "ahmed_chraibi@2pi.ma",
    groups: ["group1"],
    courses: ["course1", "course2"],
    enrollmentDate: "2023-09-07",
    progress: [
      {
        courseId: "course1",
        progress: 65,
        quizzesCompleted: 6,
        totalQuizzes: 10,
        lessonsCompleted: 12,
        totalLessons: 18,
        averageScore: 72,
        lastActivity: "2023-12-19T08:45:00Z"
      },
      {
        courseId: "course2",
        progress: 70,
        quizzesCompleted: 7,
        totalQuizzes: 10,
        lessonsCompleted: 14,
        totalLessons: 20,
        averageScore: 78,
        lastActivity: "2023-12-20T13:30:00Z"
      }
    ],
    activityDistribution: {
      quizzes: 25,
      videos: 30,
      assignments: 15,
      reading: 20,
      games: 10
    },
    activityLog: [
      {
        type: "quiz",
        courseId: "course2",
        description: "Completed French Grammar Quiz 7",
        timestamp: "2023-12-20T13:30:00Z",
        score: 80
      },
      {
        type: "video",
        courseId: "course1",
        description: "Watched 'Basic Multiplication' tutorial",
        timestamp: "2023-12-19T09:20:00Z"
      },
      {
        type: "assignment",
        courseId: "course2",
        description: "Submitted French vocabulary homework",
        timestamp: "2023-12-18T14:45:00Z"
      },
      {
        type: "quiz",
        courseId: "course1",
        description: "Completed Math Quiz 6",
        timestamp: "2023-12-17T10:30:00Z",
        score: 65
      },
      {
        type: "video",
        courseId: "course2",
        description: "Watched 'French Pronunciation' videos",
        timestamp: "2023-12-16T15:15:00Z"
      }
    ]
  },
  {
    id: "student4",
    name: "Sara Benatia",
    username: "sara_benatia",
    email: "sara_benatia@2pi.ma",
    groups: ["group7"],
    courses: ["course7", "course8"],
    enrollmentDate: "2023-09-04",
    progress: [
      {
        courseId: "course7",
        progress: 90,
        quizzesCompleted: 9,
        totalQuizzes: 10,
        lessonsCompleted: 17,
        totalLessons: 18,
        averageScore: 92,
        lastActivity: "2023-12-21T10:45:00Z"
      },
      {
        courseId: "course8",
        progress: 85,
        quizzesCompleted: 8,
        totalQuizzes: 10,
        lessonsCompleted: 16,
        totalLessons: 18,
        averageScore: 88,
        lastActivity: "2023-12-20T14:30:00Z"
      }
    ],
    activityDistribution: {
      quizzes: 35,
      videos: 20,
      assignments: 25,
      reading: 15,
      games: 5
    },
    activityLog: [
      {
        type: "quiz",
        courseId: "course7",
        description: "Completed Algebra Final Assessment",
        timestamp: "2023-12-21T10:45:00Z",
        score: 95
      },
      {
        type: "assignment",
        courseId: "course8",
        description: "Submitted Earth Sciences research project",
        timestamp: "2023-12-20T15:30:00Z"
      },
      {
        type: "video",
        courseId: "course7",
        description: "Watched advanced algebra tutorials",
        timestamp: "2023-12-19T11:15:00Z"
      },
      {
        type: "quiz",
        courseId: "course8",
        description: "Completed Earth Sciences Quiz 8",
        timestamp: "2023-12-18T09:30:00Z",
        score: 90
      },
      {
        type: "assignment",
        courseId: "course7",
        description: "Submitted algebra problem set",
        timestamp: "2023-12-17T14:45:00Z"
      }
    ]
  },
  {
    id: "student5",
    name: "Karim Bouazza",
    username: "karim_bouazza",
    email: "karim_bouazza@2pi.ma",
    groups: ["group9"],
    courses: ["course9", "course10"],
    enrollmentDate: "2023-09-02",
    progress: [
      {
        courseId: "course9",
        progress: 75,
        quizzesCompleted: 6,
        totalQuizzes: 8,
        lessonsCompleted: 12,
        totalLessons: 15,
        averageScore: 78,
        lastActivity: "2023-12-20T09:30:00Z"
      },
      {
        courseId: "course10",
        progress: 70,
        quizzesCompleted: 7,
        totalQuizzes: 10,
        lessonsCompleted: 14,
        totalLessons: 20,
        averageScore: 75,
        lastActivity: "2023-12-19T13:45:00Z"
      }
    ],
    activityDistribution: {
      quizzes: 30,
      videos: 25,
      assignments: 20,
      reading: 10,
      games: 15
    },
    activityLog: [
      {
        type: "quiz",
        courseId: "course9",
        description: "Completed Advanced Math Mid-term Exam",
        timestamp: "2023-12-20T09:30:00Z",
        score: 82
      },
      {
        type: "video",
        courseId: "course10",
        description: "Watched 'Introduction to Forces' video lecture",
        timestamp: "2023-12-19T14:20:00Z"
      },
      {
        type: "assignment",
        courseId: "course9",
        description: "Submitted calculus homework",
        timestamp: "2023-12-18T11:15:00Z"
      },
      {
        type: "quiz",
        courseId: "course10",
        description: "Completed Physics Quiz 7",
        timestamp: "2023-12-17T09:45:00Z",
        score: 70
      },
      {
        type: "video",
        courseId: "course9",
        description: "Watched 'Complex Functions' tutorial",
        timestamp: "2023-12-16T15:30:00Z"
      }
    ]
  }
];