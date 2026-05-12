import {
  ReadOutlined,
  DownOutlined,
  RightOutlined,
  PlayCircleOutlined,
  FileTextOutlined,
  CheckCircleFilled,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { Tabs } from "antd";
import { useState } from "react";
import { VideoLearning } from "../components/VideoLearning";
import { useCourseDetail } from "@/features/courses/hooks/useCourses";
import { useParams } from "react-router";
import type { LessonType } from "@/types/course.types";

type FilterTab = "COURSE_CONTENT" | "OVERVIEW";

function LessonIcon({ type }: { type: LessonType }) {
  if (type === "VIDEO")
    return <PlayCircleOutlined className="text-gray-500 text-xs mt-0.5" />;
  return <FileTextOutlined className="text-gray-500 text-xs mt-0.5" />;
}

export function DetailMyLearningPage() {
  const [activeTab, setActiveTab] = useState<FilterTab>("COURSE_CONTENT");
  const { id = "" } = useParams<{ id: string }>();
  const { data: courseDetail, isLoading: isCourseDetailLoading } =
    useCourseDetail(id);
  const [video, setVideo] = useState<string | null>(null);
  const [openSections, setOpenSections] = useState<Set<string>>(new Set());

  const toggleSection = (sectionId: string) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      next.has(sectionId) ? next.delete(sectionId) : next.add(sectionId);
      return next;
    });
  };

  const tabItems = [
    {
      key: "COURSE_CONTENT",
      label: (
        <span>
          <ReadOutlined /> Course Content
        </span>
      ),
    },
    {
      key: "OVERVIEW",
      label: (
        <span>
          <ReadOutlined /> Overview
        </span>
      ),
    },
  ];

  return (
    <div className="h-screen flex flex-col overflow-hidden p-4">
      <h1 className="text-2xl font-bold mb-4 shrink-0">
        {courseDetail?.title || "Course Detail"}
      </h1>
      <div className="flex gap-4 flex-1 overflow-hidden">
        <div className="flex-1 overflow-hidden">
          <VideoLearning videoId={video} />
        </div>
        <div className="w-100 shrink-0 flex flex-col overflow-hidden border-l border-gray-200">
          <div className="shrink-0 px-2">
            <Tabs
              activeKey={activeTab}
              onChange={(k) => setActiveTab(k as FilterTab)}
              items={tabItems}
            />
          </div>
          {activeTab === "COURSE_CONTENT" && (
            <div className="flex-1 overflow-y-auto">
              {isCourseDetailLoading && (
                <p className="text-gray-500 px-4 py-3">Loading...</p>
              )}
              {courseDetail?.sections?.map((section, sectionIndex) => {
                const isOpen = openSections.has(section.id);
                const completedCount = section.lessons.filter(
                  (l) => l.progress?.isCompleted,
                ).length;

                return (
                  <div key={section.id} className="border-b border-gray-200">
                    <div
                      className="flex items-start justify-between px-4 py-3 cursor-pointer hover:bg-gray-50 select-none"
                      onClick={() => toggleSection(section.id)}
                    >
                      <div className="flex-1 pr-2">
                        <p className="font-bold text-sm text-gray-900 leading-snug">
                          {section.title}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {completedCount} / {section.lessons.length} |{" "}
                          {section.lessons.length} lectures
                        </p>
                      </div>
                      {isOpen ? (
                        <DownOutlined className="text-xs mt-1 shrink-0" />
                      ) : (
                        <RightOutlined className="text-xs mt-1 shrink-0" />
                      )}
                    </div>

                    {isOpen && (
                      <ul>
                        {section.lessons.map((lesson, lessonIndex) => {
                          const completed = lesson.progress?.isCompleted;
                          return (
                            <li
                              key={lesson.id}
                              className="flex items-start gap-3 px-4 py-3 cursor-pointer hover:bg-gray-50 border-t border-gray-100"
                              onClick={() => setVideo(lesson.videoFileId)}
                            >
                              <div className="mt-0.5 shrink-0">
                                {completed ? (
                                  <CheckCircleFilled className="text-blue-600 text-base" />
                                ) : (
                                  <CheckCircleOutlined className="text-gray-400 text-base" />
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm text-purple-700 leading-snug">
                                  {lessonIndex + 1}. {lesson.title}
                                </p>
                                <div className="flex items-center gap-1 mt-0.5">
                                  <LessonIcon type={lesson.type} />
                                </div>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
