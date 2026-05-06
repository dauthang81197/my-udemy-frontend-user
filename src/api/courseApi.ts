import axiosInstance from "./axiosInstance";
import { env } from "@/config/env";
import type { PaginatedResponse, PaginationParams } from "@/types/api.types";
import type { Course, EnrollCourseRequest } from "@/types/course.types";

const BASE = env.courseServicePrefix;

export const courseApi = {
  getAll: (params?: PaginationParams & { level?: string }) =>
    axiosInstance.get<PaginatedResponse<Course>>(`${BASE}/courses`, { params }),

  enrollCourse: (body: EnrollCourseRequest) =>
    axiosInstance.post(`${BASE}/user-courses`, body),
};
