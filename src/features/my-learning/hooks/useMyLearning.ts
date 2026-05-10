import { useQuery } from '@tanstack/react-query';
import { courseApi } from '@/api/courseApi';
import type { EnrolledCourse } from '@/types/course.types';

export function useMyLearning() {
  const query = useQuery({
    queryKey: ['courses-enroll'],
    queryFn: () => courseApi.getEnrolled({ size: 100 }).then((r) => r.data),
  });

  const enrollments: EnrolledCourse[] =
    query.data?.data.map((course) => ({
      id: course.id,
      course,
      progress: 0,
      status: 'NOT_STARTED' as const,
      enrolledAt: '',
      lastAccessedAt: null,
    })) ?? [];

  return {
    enrollments,
    isLoading: query.isLoading,
    total: enrollments.length,
    completed: 0,
    inProgress: 0,
    notStarted: enrollments.length,
  };
}
