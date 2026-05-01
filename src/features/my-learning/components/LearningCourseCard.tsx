import { Card, Progress, Tag, Typography, Button, Space } from 'antd';
import {
  PlayCircleOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import type { EnrolledCourse } from '@/types/course.types';
import { formatDate } from '@/utils/helpers';

const { Text, Paragraph } = Typography;

const levelColor: Record<string, string> = {
  BEGINNER: 'green',
  INTERMEDIATE: 'blue',
  ADVANCED: 'red',
};

const statusConfig = {
  NOT_STARTED: { color: 'default', label: 'Not Started', icon: <ClockCircleOutlined /> },
  IN_PROGRESS: { color: 'processing', label: 'In Progress', icon: <PlayCircleOutlined /> },
  COMPLETED: { color: 'success', label: 'Completed', icon: <CheckCircleOutlined /> },
};

interface LearningCourseCardProps {
  enrollment: EnrolledCourse;
}

export function LearningCourseCard({ enrollment }: LearningCourseCardProps) {
  const { course, progress, status, enrolledAt, lastAccessedAt } = enrollment;
  const cfg = statusConfig[status];

  return (
    <Card
      hoverable
      style={{ height: '100%' }}
      styles={{ body: { display: 'flex', flexDirection: 'column', height: '100%' } }}
      cover={
        <div
          style={{
            height: 120,
            background:
              status === 'COMPLETED'
                ? 'linear-gradient(135deg, #52c41a 0%, #389e0d 100%)'
                : status === 'IN_PROGRESS'
                ? 'linear-gradient(135deg, #a435f0 0%, #7928ca 100%)'
                : 'linear-gradient(135deg, #8c8c8c 0%, #595959 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          <PlayCircleOutlined style={{ fontSize: 44, color: 'rgba(255,255,255,0.85)' }} />
          {status === 'COMPLETED' && (
            <div
              style={{
                position: 'absolute',
                top: 8,
                right: 8,
                background: 'rgba(255,255,255,0.2)',
                borderRadius: '50%',
                padding: 4,
              }}
            >
              <CheckCircleOutlined style={{ color: '#fff', fontSize: 20 }} />
            </div>
          )}
        </div>
      }
    >
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Space style={{ marginBottom: 8 }}>
          <Tag color={levelColor[course.level]}>{course.level}</Tag>
          <Tag color={cfg.color} icon={cfg.icon}>{cfg.label}</Tag>
        </Space>

        <Text strong style={{ fontSize: 14, marginBottom: 4, lineHeight: 1.4 }}>
          {course.title}
        </Text>

        <Paragraph
          type="secondary"
          style={{ fontSize: 12, margin: '4px 0 12px', flex: 1 }}
          ellipsis={{ rows: 2 }}
        >
          {course.description || 'No description available.'}
        </Paragraph>

        <div style={{ marginBottom: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
            <Text type="secondary" style={{ fontSize: 12 }}>Progress</Text>
            <Text strong style={{ fontSize: 12, color: '#a435f0' }}>{progress}%</Text>
          </div>
          <Progress
            percent={progress}
            strokeColor={status === 'COMPLETED' ? '#52c41a' : '#a435f0'}
            showInfo={false}
            size="small"
          />
        </div>

        <div style={{ fontSize: 11, color: '#8c8c8c', marginBottom: 12 }}>
          <div>Enrolled: {formatDate(enrolledAt)}</div>
          {lastAccessedAt && <div>Last accessed: {formatDate(lastAccessedAt)}</div>}
        </div>

        <Button
          type={status === 'COMPLETED' ? 'default' : 'primary'}
          block
          icon={status === 'COMPLETED' ? <CheckCircleOutlined /> : <PlayCircleOutlined />}
          style={
            status !== 'COMPLETED'
              ? { backgroundColor: '#a435f0', borderColor: '#a435f0' }
              : {}
          }
        >
          {status === 'COMPLETED' ? 'Review Course' : status === 'IN_PROGRESS' ? 'Continue Learning' : 'Start Learning'}
        </Button>
      </div>
    </Card>
  );
}
