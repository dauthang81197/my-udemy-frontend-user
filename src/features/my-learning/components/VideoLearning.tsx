import { useRef } from "react";
import { Typography, Spin } from "antd";

import { useVideoDetail } from "../hooks/useVideos";

const { Text } = Typography;

interface VideoLearningProps {
  videoId: string | null;
}

export function VideoLearning({ videoId }: VideoLearningProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const { data: detail, isLoading } = useVideoDetail(videoId);

  return (
    <>
      {isLoading ? (
        <div style={{ textAlign: "center", padding: "48px 0" }}>
          <Spin size="large" />
        </div>
      ) : detail ? (
        <>
          <video
            ref={videoRef}
            key={detail.presignedUrl}
            src={detail.presignedUrl}
            controls
            autoPlay
            style={{
              width: "100%",
              borderRadius: 8,
              background: "#000",
            }}
          />
          <Text
            type="secondary"
            style={{
              display: "block",
              marginTop: 8,
              fontSize: 12,
              wordBreak: "break-all",
            }}
          >
            {detail.originalFilename}
          </Text>
        </>
      ) : null}
    </>
  );
}
