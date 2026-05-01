import type { EnrolledCourse } from '@/types/course.types';

// Placeholder: replace with real API call when user enrollment endpoint is available
const mockEnrollments: EnrolledCourse[] = [
  {
    id: 'e1',
    course: {
      id: 'c1',
      title: 'Java Spring Boot từ cơ bản đến nâng cao',
      description: 'Học Spring Boot từ zero đến hero với các dự án thực tế',
      level: 'BEGINNER',
      status: 'PUBLISHED',
    },
    progress: 72,
    status: 'IN_PROGRESS',
    enrolledAt: '2026-03-01T00:00:00',
    lastAccessedAt: '2026-04-30T08:00:00',
  },
  {
    id: 'e2',
    course: {
      id: 'c2',
      title: 'React 18 & TypeScript Masterclass',
      description: 'Master React hooks, context, and TypeScript for production-ready apps',
      level: 'INTERMEDIATE',
      status: 'PUBLISHED',
    },
    progress: 45,
    status: 'IN_PROGRESS',
    enrolledAt: '2026-03-15T00:00:00',
    lastAccessedAt: '2026-04-28T14:30:00',
  },
  {
    id: 'e3',
    course: {
      id: 'c3',
      title: 'Java Core Complete',
      description: 'Complete Java fundamentals with OOP, Collections, and Streams',
      level: 'BEGINNER',
      status: 'PUBLISHED',
    },
    progress: 100,
    status: 'COMPLETED',
    enrolledAt: '2026-01-10T00:00:00',
    lastAccessedAt: '2026-03-20T10:00:00',
  },
  {
    id: 'e4',
    course: {
      id: 'c4',
      title: 'Docker & Kubernetes cho Developer',
      description: 'Containerize and orchestrate your applications with Docker and K8s',
      level: 'ADVANCED',
      status: 'PUBLISHED',
    },
    progress: 20,
    status: 'IN_PROGRESS',
    enrolledAt: '2026-04-01T00:00:00',
    lastAccessedAt: '2026-04-25T09:00:00',
  },
  {
    id: 'e5',
    course: {
      id: 'c5',
      title: 'SQL & Database Design',
      description: 'Learn SQL from basics to advanced query optimization',
      level: 'BEGINNER',
      status: 'PUBLISHED',
    },
    progress: 0,
    status: 'NOT_STARTED',
    enrolledAt: '2026-04-20T00:00:00',
    lastAccessedAt: null,
  },
];

export function useMyLearning() {
  return {
    enrollments: mockEnrollments,
    isLoading: false,
    total: mockEnrollments.length,
    completed: mockEnrollments.filter((e) => e.status === 'COMPLETED').length,
    inProgress: mockEnrollments.filter((e) => e.status === 'IN_PROGRESS').length,
    notStarted: mockEnrollments.filter((e) => e.status === 'NOT_STARTED').length,
  };
}
