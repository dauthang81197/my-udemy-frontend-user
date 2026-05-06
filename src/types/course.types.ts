export type CourseLevel = "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
export type CourseStatus = "DRAFT" | "PUBLISHED";

export interface Course {
  id: string;
  title: string;
  description: string;
  level: CourseLevel;
  status: CourseStatus;
}

export type EnrollmentStatus = "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";

export interface EnrolledCourse {
  id: string;
  course: Course;
  progress: number;
  status: EnrollmentStatus;
  enrolledAt: string;
  lastAccessedAt: string | null;
}

export interface EnrollCourseRequest {
  courseId: string;
}
