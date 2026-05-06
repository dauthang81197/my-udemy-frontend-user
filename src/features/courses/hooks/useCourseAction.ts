import { courseApi } from "@/api/courseApi";
import { getApiErrorMessage } from "@/utils/helpers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";

export function useErrollCourse() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: courseApi.enrollCourse,
    onSuccess: () => {
      //   qc.invalidateQueries({ queryKey: [COURSES_QUERY_KEY] });
      message.success("Course enrolled");
    },
    onError: (err) => message.error(getApiErrorMessage(err)),
  });
}
