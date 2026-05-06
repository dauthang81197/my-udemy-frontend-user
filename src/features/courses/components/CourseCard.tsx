import { Card, Tag, Typography, Button, Space } from "antd";
import { BookOutlined, RightCircleOutlined } from "@ant-design/icons";
import type { Course } from "@/types/course.types";
import { useErrollCourse } from "../hooks/useCourseAction";

const { Text, Paragraph } = Typography;

const levelColor: Record<string, string> = {
  BEGINNER: "green",
  INTERMEDIATE: "blue",
  ADVANCED: "red",
};

const levelLabel: Record<string, string> = {
  BEGINNER: "Beginner",
  INTERMEDIATE: "Intermediate",
  ADVANCED: "Advanced",
};

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const { mutate: errollCourse, isPending: updating } = useErrollCourse();

  const handleEnroll = () => {
    errollCourse({ courseId: course.id });
  };
  return (
    <Card
      hoverable
      style={{ height: "100%", display: "flex", flexDirection: "column" }}
      styles={{ body: { flex: 1, display: "flex", flexDirection: "column" } }}
      cover={
        <div
          style={{
            height: 140,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <BookOutlined
            style={{ fontSize: 48, color: "rgba(255,255,255,0.8)" }}
          />
        </div>
      }
    >
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Space style={{ marginBottom: 8 }}>
          <Tag color={levelColor[course.level]}>{levelLabel[course.level]}</Tag>
          {course.status === "PUBLISHED" && <Tag color="purple">Published</Tag>}
        </Space>

        <Text strong style={{ fontSize: 15, marginBottom: 8, lineHeight: 1.4 }}>
          {course.title}
        </Text>

        <Paragraph
          type="secondary"
          style={{ fontSize: 13, flex: 1, margin: "4px 0 16px" }}
          ellipsis={{ rows: 2 }}
        >
          {course.description || "No description available."}
        </Paragraph>

        <Button
          type="primary"
          loading={updating}
          onClick={handleEnroll}
          block
          icon={<RightCircleOutlined />}
          style={{
            backgroundColor: "#a435f0",
            borderColor: "#a435f0",
            marginTop: "auto",
          }}
        >
          Enroll Course
        </Button>
      </div>
    </Card>
  );
}
