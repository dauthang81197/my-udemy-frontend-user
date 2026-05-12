export type CourseLevel = "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
export type CourseStatus = "DRAFT" | "PUBLISHED";
export type LessonType = "VIDEO" | "TEXT" | "QUIZ";
export type LessonStatus = "DRAFT" | "PUBLISHED";

export interface Course {
  id: string;
  title: string;
  description: string;
  level: CourseLevel;
  status: CourseStatus;
}

export interface UserLessonProgressResponse {
  id: string;
  userId: string;
  lessonId: string;
  currentTime: number;
  isCompleted: boolean;
}

export interface LessonDetailResponse {
  id: string;
  title: string;
  description: string;
  type: LessonType;
  videoFileId: string | null;
  isPreview: boolean;
  sortOrder: number;
  status: LessonStatus;
  progress: UserLessonProgressResponse | null;
}

export interface SectionDetailResponse {
  id: string;
  title: string;
  lessons: LessonDetailResponse[];
}

export interface CourseDetail extends Course {
  sections: SectionDetailResponse[];
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
