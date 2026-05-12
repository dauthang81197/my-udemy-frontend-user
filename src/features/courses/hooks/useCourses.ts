import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { courseApi } from "@/api/courseApi";

export function useCourses() {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(9);
  const [level, setLevel] = useState<string | undefined>(undefined);

  const query = useQuery({
    queryKey: ["user-courses", page, pageSize, level],
    queryFn: () =>
      courseApi.getAll({ page, size: pageSize, level }).then((r) => r.data),
  });

  return {
    ...query,
    page,
    pageSize,
    level,
    setLevel,
    onPageChange: (p: number, ps: number) => {
      setPage(p);
      setPageSize(ps);
    },
  };
}

export function useCourseDetail(id: string | null) {
  return useQuery({
    queryKey: ["course-detail", id],
    queryFn: () => courseApi.getDetailCourse(id!).then((r) => r.data),
    enabled: !!id,
    select: (res) => res.data,
  });
}
