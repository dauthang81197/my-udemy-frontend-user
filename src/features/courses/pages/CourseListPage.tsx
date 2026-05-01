import { Row, Col, Typography, Select, Space, Spin, Empty, Alert } from 'antd';
import { BookOutlined } from '@ant-design/icons';
import { CourseCard } from '../components/CourseCard';
import { useCourses } from '../hooks/useCourses';
import { AppPagination } from '@/components/common/AppPagination';

const { Title, Text } = Typography;

const levelOptions = [
  { value: undefined, label: 'All Levels' },
  { value: 'BEGINNER', label: 'Beginner' },
  { value: 'INTERMEDIATE', label: 'Intermediate' },
  { value: 'ADVANCED', label: 'Advanced' },
];

export function CourseListPage() {
  const { data, isLoading, isError, page, pageSize, level, setLevel, onPageChange } = useCourses();

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <Title level={3} style={{ margin: 0 }}>
          <BookOutlined style={{ marginRight: 8, color: '#a435f0' }} />
          Browse Courses
        </Title>
        <Text type="secondary">Discover courses to expand your knowledge</Text>
      </div>

      {/* Filters */}
      <div
        style={{
          background: 'var(--ant-color-bg-container)',
          borderRadius: 8,
          padding: '16px',
          marginBottom: 20,
          border: '1px solid var(--ant-color-border)',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <Text strong>Filter by level:</Text>
        <Space wrap>
          {levelOptions.map((opt) => (
            <Select
              key={String(opt.value)}
              value={level}
              onChange={setLevel}
              style={{ width: 150 }}
              options={levelOptions.filter((o) => o.value !== undefined).map((o) => ({
                value: o.value,
                label: o.label,
              }))}
              placeholder="All Levels"
              allowClear
              onClear={() => setLevel(undefined)}
            />
          ))}
        </Space>
        {data && (
          <Text type="secondary" style={{ marginLeft: 'auto' }}>
            {data.totalItems} courses found
          </Text>
        )}
      </div>

      {isError && (
        <Alert
          type="error"
          message="Failed to load courses. Please try again."
          style={{ marginBottom: 16 }}
          showIcon
        />
      )}

      {isLoading ? (
        <div style={{ textAlign: 'center', padding: '80px 0' }}>
          <Spin size="large" />
        </div>
      ) : data?.data.length === 0 ? (
        <Empty description="No courses found" style={{ padding: '80px 0' }} />
      ) : (
        <>
          <Row gutter={[20, 20]}>
            {data?.data.map((course) => (
              <Col key={course.id} xs={24} sm={12} lg={8}>
                <CourseCard course={course} />
              </Col>
            ))}
          </Row>

          {data && data.totalItems > pageSize && (
            <AppPagination
              page={page}
              pageSize={pageSize}
              total={data.totalItems}
              onChange={onPageChange}
            />
          )}
        </>
      )}
    </div>
  );
}
