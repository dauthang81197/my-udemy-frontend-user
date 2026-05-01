import { Row, Col, Card, Statistic, Progress, Typography, List, Tag, Avatar, Space } from 'antd';
import {
  BookOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  TrophyOutlined,
  FireOutlined,
  RightCircleOutlined,
} from '@ant-design/icons';
import { useAuthStore } from '@/store/authStore';

const { Title, Text } = Typography;

const mockEnrolledCourses = [
  { id: '1', title: 'Java Spring Boot từ cơ bản đến nâng cao', progress: 72, level: 'BEGINNER', lastAccessed: '2026-04-30' },
  { id: '2', title: 'React 18 & TypeScript Masterclass', progress: 45, level: 'INTERMEDIATE', lastAccessed: '2026-04-28' },
  { id: '3', title: 'Docker & Kubernetes cho Developer', progress: 20, level: 'ADVANCED', lastAccessed: '2026-04-25' },
];

const mockActivity = [
  { id: '1', action: 'Completed lesson', title: 'Spring Boot Security JWT', time: '2 hours ago' },
  { id: '2', action: 'Started course', title: 'React 18 & TypeScript Masterclass', time: 'Yesterday' },
  { id: '3', action: 'Completed lesson', title: 'Docker Fundamentals', time: '3 days ago' },
  { id: '4', action: 'Earned certificate', title: 'Java Core Complete', time: '1 week ago' },
];

const levelColor: Record<string, string> = {
  BEGINNER: 'green',
  INTERMEDIATE: 'blue',
  ADVANCED: 'red',
};

export function DashboardPage() {
  const user = useAuthStore((s) => s.user);

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <Title level={3} style={{ margin: 0 }}>
          Welcome back, {user?.full_name ?? user?.username}!
        </Title>
        <Text type="secondary">Continue your learning journey</Text>
      </div>

      {/* Stats */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Enrolled Courses"
              value={3}
              prefix={<BookOutlined style={{ color: '#a435f0' }} />}
              valueStyle={{ color: '#a435f0' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Completed"
              value={1}
              prefix={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="In Progress"
              value={2}
              prefix={<ClockCircleOutlined style={{ color: '#1677ff' }} />}
              valueStyle={{ color: '#1677ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Learning Streak"
              value={7}
              suffix="days"
              prefix={<FireOutlined style={{ color: '#ff4d4f' }} />}
              valueStyle={{ color: '#ff4d4f' }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        {/* In-progress courses */}
        <Col xs={24} lg={14}>
          <Card
            title={
              <Space>
                <TrophyOutlined style={{ color: '#a435f0' }} />
                <span>My Progress</span>
              </Space>
            }
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {mockEnrolledCourses.map((course) => (
                <div key={course.id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <div>
                      <Text strong style={{ fontSize: 14 }}>{course.title}</Text>
                      <div>
                        <Tag color={levelColor[course.level]} style={{ marginTop: 4 }}>
                          {course.level}
                        </Tag>
                        <Text type="secondary" style={{ fontSize: 12 }}>
                          Last accessed: {course.lastAccessed}
                        </Text>
                      </div>
                    </div>
                    <Text strong style={{ color: '#a435f0', minWidth: 40, textAlign: 'right' }}>
                      {course.progress}%
                    </Text>
                  </div>
                  <Progress
                    percent={course.progress}
                    strokeColor="#a435f0"
                    showInfo={false}
                    size="small"
                  />
                </div>
              ))}
            </div>
          </Card>
        </Col>

        {/* Recent Activity */}
        <Col xs={24} lg={10}>
          <Card
            title={
              <Space>
                <RightCircleOutlined style={{ color: '#a435f0' }} />
                <span>Recent Activity</span>
              </Space>
            }
          >
            <List
              dataSource={mockActivity}
              renderItem={(item) => (
                <List.Item style={{ padding: '10px 0' }}>
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        size="small"
                        style={{
                          backgroundColor:
                            item.action.includes('Completed') ? '#f6ffed' :
                            item.action.includes('Earned') ? '#fff7e6' : '#f0f5ff',
                        }}
                        icon={
                          item.action.includes('Completed') ? <CheckCircleOutlined style={{ color: '#52c41a' }} /> :
                          item.action.includes('Earned') ? <TrophyOutlined style={{ color: '#fa8c16' }} /> :
                          <BookOutlined style={{ color: '#1677ff' }} />
                        }
                      />
                    }
                    title={<Text style={{ fontSize: 13 }}>{item.title}</Text>}
                    description={
                      <Space>
                        <Tag color="default" style={{ fontSize: 11 }}>{item.action}</Tag>
                        <Text type="secondary" style={{ fontSize: 12 }}>{item.time}</Text>
                      </Space>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
