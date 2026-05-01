import { useState } from 'react';
import { Row, Col, Typography, Tabs, Statistic, Card, Spin, Empty } from 'antd';
import {
  ReadOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  PlayCircleOutlined,
} from '@ant-design/icons';
import { LearningCourseCard } from '../components/LearningCourseCard';
import { useMyLearning } from '../hooks/useMyLearning';
import type { EnrollmentStatus } from '@/types/course.types';

const { Title, Text } = Typography;

type FilterTab = 'ALL' | EnrollmentStatus;

export function MyLearningPage() {
  const [activeTab, setActiveTab] = useState<FilterTab>('ALL');
  const { enrollments, isLoading, total, completed, inProgress, notStarted } = useMyLearning();

  const filtered =
    activeTab === 'ALL'
      ? enrollments
      : enrollments.filter((e) => e.status === activeTab);

  const tabItems = [
    {
      key: 'ALL',
      label: (
        <span>
          <ReadOutlined /> All ({total})
        </span>
      ),
    },
    {
      key: 'IN_PROGRESS',
      label: (
        <span>
          <PlayCircleOutlined /> In Progress ({inProgress})
        </span>
      ),
    },
    {
      key: 'COMPLETED',
      label: (
        <span>
          <CheckCircleOutlined /> Completed ({completed})
        </span>
      ),
    },
    {
      key: 'NOT_STARTED',
      label: (
        <span>
          <ClockCircleOutlined /> Not Started ({notStarted})
        </span>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <Title level={3} style={{ margin: 0 }}>
          <ReadOutlined style={{ marginRight: 8, color: '#a435f0' }} />
          My Learning
        </Title>
        <Text type="secondary">Track and manage your enrolled courses</Text>
      </div>

      {/* Summary stats */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={12} sm={6}>
          <Card size="small" style={{ textAlign: 'center' }}>
            <Statistic
              title="Total Enrolled"
              value={total}
              valueStyle={{ color: '#a435f0', fontSize: 24 }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card size="small" style={{ textAlign: 'center' }}>
            <Statistic
              title="In Progress"
              value={inProgress}
              valueStyle={{ color: '#1677ff', fontSize: 24 }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card size="small" style={{ textAlign: 'center' }}>
            <Statistic
              title="Completed"
              value={completed}
              valueStyle={{ color: '#52c41a', fontSize: 24 }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card size="small" style={{ textAlign: 'center' }}>
            <Statistic
              title="Not Started"
              value={notStarted}
              valueStyle={{ color: '#8c8c8c', fontSize: 24 }}
            />
          </Card>
        </Col>
      </Row>

      <Tabs
        activeKey={activeTab}
        onChange={(k) => setActiveTab(k as FilterTab)}
        items={tabItems}
        style={{ marginBottom: 20 }}
      />

      {isLoading ? (
        <div style={{ textAlign: 'center', padding: '80px 0' }}>
          <Spin size="large" />
        </div>
      ) : filtered.length === 0 ? (
        <Empty description="No courses in this category" style={{ padding: '80px 0' }} />
      ) : (
        <Row gutter={[20, 20]}>
          {filtered.map((enrollment) => (
            <Col key={enrollment.id} xs={24} sm={12} lg={8}>
              <LearningCourseCard enrollment={enrollment} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}
