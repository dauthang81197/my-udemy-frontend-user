import { Pagination } from 'antd';

interface AppPaginationProps {
  page: number;
  pageSize: number;
  total: number;
  onChange: (page: number, pageSize: number) => void;
}

export function AppPagination({ page, pageSize, total, onChange }: AppPaginationProps) {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
      <Pagination
        current={page + 1}
        pageSize={pageSize}
        total={total}
        onChange={(p, ps) => onChange(p - 1, ps)}
        showSizeChanger
        showTotal={(t) => `Total ${t} items`}
      />
    </div>
  );
}
