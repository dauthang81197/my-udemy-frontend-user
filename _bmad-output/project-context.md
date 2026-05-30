---
project_name: 'my-udemy-frontend-user'
user_name: 'Thang'
date: '2026-05-30'
sections_completed:
  ['technology_stack', 'language_rules', 'framework_rules', 'quality_rules', 'workflow_rules', 'anti_patterns']
status: 'complete'
rule_count: 52
optimized_for_llm: true
---

# Project Context for AI Agents

_File này chứa các quy tắc và patterns quan trọng mà AI agents phải tuân theo khi implement code trong dự án này. Tập trung vào các chi tiết không rõ ràng mà agents có thể bỏ sót._

---

## Technology Stack & Versions

| Category       | Library / Tool          | Version         |
|----------------|-------------------------|-----------------|
| Runtime        | React                   | 18.3.0          |
| Language       | TypeScript              | 5.4.0           |
| Build Tool     | Vite                    | 5.2.0           |
| UI Components  | Ant Design (antd)       | 5.15.0          |
| UI Icons       | @ant-design/icons       | 5.3.0           |
| Data Fetching  | TanStack React Query    | 5.28.0          |
| State (global) | Zustand                 | 4.5.2           |
| Routing        | React Router            | 7.1.0           |
| Forms          | React Hook Form + Zod   | 7.51.1 + 3.22.4 |
| HTTP Client    | Axios                   | 1.6.8           |
| Styling        | Tailwind CSS            | 4.3.0           |
| Date Utility   | dayjs                   | 1.11.10         |

### Critical Version Constraints

**TypeScript**
- `strict: true`, `noUnusedLocals: true`, `noUnusedParameters: true` — vi phạm là lỗi build cứng, không phải warning
- Dùng prefix `_` cho unused parameter bắt buộc trong signature (ví dụ: `_event`)
- Dùng `import type { Foo }` cho type-only import — bắt buộc vì `isolatedModules: true`

**Vite**
- Dev server chạy port `3001` (không phải mặc định 5173)
- `"type": "module"` trong package.json — toàn bộ ESM; không dùng `require()`, `module.exports`, `__dirname`
- Dependency nặng mới phải được assign vào `manualChunks` trong `vite.config.ts`

**React 18.3.0**
- Dùng `createRoot()` từ `react-dom/client` — `ReactDOM.render()` đã bị xóa hoàn toàn
- `React.FC` không inject `children` implicit — phải khai báo `children: React.ReactNode` explicit trong props
- `StrictMode` double-invoke `useEffect` trong dev — luôn viết cleanup function

**TanStack React Query v5** _(breaking changes từ v4)_
- `useQuery` chỉ nhận object: `useQuery({ queryKey: [...], queryFn: ... })` — KHÔNG dùng positional args
- `onSuccess`/`onError`/`onSettled` đã bị **xóa** khỏi `useQuery` — dùng `useEffect` watch `data`/`error` thay thế
- `cacheTime` đổi tên thành `gcTime`; `isLoading` → `isPending` cho queries chưa có data lần đầu
- Không override global config tùy tiện — xem Architectural Contracts

**Ant Design v5** _(breaking changes từ v4)_
- KHÔNG import `antd/dist/antd.css` — không tồn tại ở v5; CSS-in-JS mặc định
- Theming qua `ConfigProvider` với `theme.token` — KHÔNG dùng LESS variables
- `@ant-design/icons` phải dùng named import: `import { UserOutlined } from '@ant-design/icons'`
- `Form.Item` với `name` prop yêu cầu wrap bởi `<Form>` component

**Tailwind CSS v4** _(breaking changes từ v3)_
- KHÔNG tạo `tailwind.config.js` theo kiểu v3 — sẽ bị ignore hoàn toàn
- Cấu hình theme qua `@theme` directive trong CSS file
- Setup qua `@tailwindcss/postcss` plugin; v4 auto-detect files, không cần `content` array

**Zustand 4.5.2**
- Named import: `import { create } from 'zustand'` — KHÔNG phải default import
- TypeScript pattern bắt buộc: `create<StateType>()(persist(...))` — double call
- Thứ tự middleware nếu kết hợp: `devtools(persist(...))`, không phải ngược lại
- KHÔNG select toàn bộ store: `useStore((s) => s.field)` — luôn chọn field cụ thể

### Project-Specific Conventions

- **Brand color**: `#a435f0` (Udemy purple) — hardcoded literal; không có design token tập trung; không thay bằng CSS variable hay `theme.token`
- **Env vars**: Truy cập DUY NHẤT qua `src/config/env.ts` — KHÔNG dùng `import.meta.env.*` trực tiếp ở nơi khác
- **Zustand access pattern**: Hook (`useStore()`) trong React component; `store.getState()` ngoài React tree (Axios interceptor) — không hoán đổi
- **dayjs locale**: `vi-VN` được set globally — không re-import hoặc reset locale trong file riêng lẻ
- **Testing**: Không có test framework — KHÔNG tự ý thêm; nếu được yêu cầu, dùng **Vitest** (không phải Jest) + **Playwright** cho E2E

### Architectural Contracts

Các hợp đồng ngầm không được ghi trong code — vi phạm gây lỗi khó trace:

| Contract | Quy tắc |
|----------|---------|
| **Axios interceptor** | Dùng `store.getState()`, không dùng hook — hook không hoạt động ngoài React tree |
| **Xử lý 401** | Chỉ xử lý tại interceptor trong `axiosInstance.ts` — component KHÔNG tự handle 401 |
| **React Query config** | Kế thừa global config (`staleTime: 30s`, `refetchOnWindowFocus: false`) — không override tùy tiện |
| **Type definitions** | Types sống tại `src/types/` — không inline type tại feature layer dù TypeScript không cấm |
| **Dependency direction** | `features → api → store → types` — không import ngược chiều; `@/` alias không enforce điều này |
| **JWT in localStorage** | Lưu token qua Zustand persist là **quyết định có chủ đích** — không "cải thiện" sang httpOnly cookie |

### Canonical Import Patterns

```typescript
// React Query
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

// Zustand
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// React Hook Form + Zod
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

// React Router v7
import { useNavigate, useParams, Link, Outlet } from 'react-router'

// Ant Design Icons
import { UserOutlined, LockOutlined } from '@ant-design/icons'
```

---

## Critical Implementation Rules

### Folder & File Structure

- Feature-based structure bắt buộc: `src/features/[feature]/{pages,components,hooks,schemas}`
- API calls trong `src/api/[feature]Api.ts` — không viết fetch/axios trực tiếp trong component
- Types trong `src/types/[domain].types.ts` — không inline type tại feature layer
- Shared components trong `src/components/common/` hoặc `src/components/layout/`
- Routes định nghĩa tập trung tại `src/routes/AppRoutes.tsx`

### Naming Conventions

- Components/Pages: PascalCase, **named export** — không dùng `export default` cho component
- Hooks: camelCase với prefix `use` — `useLogin`, `useCourses`
- API objects: camelCase với suffix `Api` — `courseApi`, `authApi`
- Stores: camelCase với prefix `use` + suffix `Store` — `useAuthStore`, `useThemeStore`
- Schemas: camelCase với suffix `Schema` — `loginSchema`, `registerSchema`
- Types/Interfaces: PascalCase — `CourseDetail`, `ApiResponse<T>`, `LoginFormValues`

### Component Pattern

- Named export cho tất cả components — KHÔNG dùng `export default` cho React component
- Ant Design cho tất cả UI elements — không mix với HTML thuần hay thư viện UI khác
- Inline styles dùng `style={{ }}` prop hoặc Tailwind classes — không tạo CSS module mới
- Ant Design CSS token vars cho dynamic theming: `var(--ant-color-bg-container)`, `var(--ant-color-border)`

### Form Pattern (bắt buộc toàn dự án)

- React Hook Form + Zod resolver cho mọi form — không dùng Ant Design Form validation built-in
- Ant Design `Form.Item` + `Controller` để render field:
  ```tsx
  <Form.Item label="Email" validateStatus={errors.email ? 'error' : ''} help={errors.email?.message}>
    <Controller name="email" control={control} render={({ field }) => <Input {...field} />} />
  </Form.Item>
  ```
- Schema và inferred type đặt cùng file trong `schemas/`:
  ```typescript
  export const loginSchema = z.object({ ... })
  export type LoginFormValues = z.infer<typeof loginSchema>
  ```

### API & Data Fetching Pattern

- `useQuery` cho GET, `useMutation` cho POST/PUT/DELETE — không gọi API trực tiếp trong component
- Query key convention: `["resource-name", ...params]` — ví dụ: `["user-courses", page, pageSize, level]`
- API functions trả về raw axios response; hook unwrap với `.then((r) => r.data)`:
  ```typescript
  queryFn: () => courseApi.getAll({ page }).then((r) => r.data)
  ```
- Error handling dùng `getApiErrorMessage(error, 'fallback message')` từ `src/utils/helpers.ts`
- User notifications: `message.success()` / `message.error()` từ Ant Design — không dùng alert/toast khác
- API base URL lấy từ `env.courseServicePrefix` hoặc `env.authServicePrefix` — không hardcode URL

### State Management Pattern

- Zustand cho global state (auth, theme) — không dùng React Context cho global state
- Local UI state dùng `useState` trong component
- Zustand selector luôn chọn field cụ thể: `useAuthStore((s) => s.accessToken)` — không select toàn bộ store

### Routing Pattern

- React Router v7 library mode với `createBrowserRouter` + `RouterProvider`
- Protected routes qua `PrivateRoute` component (kiểm tra `isAuthenticated` từ Zustand)
- Routes lồng nhau sử dụng `<Outlet>` — thiếu `<Outlet>` ở parent component thì child route không render
- Navigation dùng `useNavigate()` trong component; `window.location.href` trong interceptor (ngoài React tree)

### Code Quality & Style Rules

**ESLint**
- Config: `plugin:@typescript-eslint/recommended` + `plugin:react-hooks/recommended`
- `@typescript-eslint/no-unused-vars`: error — prefix `_` để bỏ qua (ví dụ: `_event`)
- `react-refresh/only-export-components`: warn — không export non-component từ component file
- Max warnings: 0 — build fail nếu còn bất kỳ warning nào

**TypeScript Patterns**
- Luôn type API response với generic: `axiosInstance.get<ApiResponse<T>>(url)`
- String union thay cho enum: `type CourseLevel = "BEGINNER" | "INTERMEDIATE" | "ADVANCED"`
- Optional chaining bắt buộc cho nullable data: `error.response?.data?.message`
- Không dùng `any` — dùng `unknown` rồi narrow type hoặc cast có chủ đích

**Comments**
- Không viết comment giải thích WHAT code làm — tên biến/hàm đã nói điều đó
- Chỉ comment khi WHY không rõ ràng (constraint ẩn, workaround cụ thể)

**Date Formatting**
- Dùng `formatDate()` từ `src/utils/helpers.ts` — locale `vi-VN` đã được set
- Không tự tạo `new Date().toLocaleDateString()` trực tiếp trong component

### Development Workflow Rules

**Build & Scripts**
- `npm run dev` — dev server tại port 3001
- `npm run build` — chạy `tsc && vite build`; build fail nếu có TS error hoặc ESLint warning
- `npm run lint` — `eslint . --max-warnings 0`; phải pass trước khi commit
- Không dùng `// @ts-ignore` hay `// eslint-disable` để bypass lỗi — fix gốc rễ

**Environment Variables**
- Prefix `VITE_` bắt buộc cho mọi env var expose ra client
- File `.env` cho local dev; không commit `.env` vào git
- Thêm env var mới phải cập nhật đồng thời `src/config/env.ts`

**Git & Branch**
- Branch chính: `main`; convention từ history: `feat:`, `fix:`, `ci:` prefix (Conventional Commits)

**Docker & Deployment**
- Có Dockerfile và nginx config cho production build
- Build output là static files phục vụ qua nginx
- Environment variables được inject lúc build — không runtime config

### Critical Anti-Patterns — KHÔNG được làm

**React & TypeScript**
- ❌ Dùng `ReactDOM.render()` — đã bị xóa; dùng `createRoot()`
- ❌ Dùng `export default` cho React component — dùng named export
- ❌ Để unused import/variable — TS6133 block build cứng
- ❌ Khai báo `children` implicit qua `React.FC` — phải explicit `children: React.ReactNode`

**React Query v5**
- ❌ `useQuery(key, fn, options)` — positional args đã bị xóa ở v5
- ❌ `onSuccess`/`onError` trong `useQuery` options — đã bị xóa ở v5
- ❌ `cacheTime` — đã đổi tên thành `gcTime`
- ❌ Override `staleTime`/`refetchOnWindowFocus` tùy tiện — kế thừa global config

**Ant Design v5**
- ❌ `import 'antd/dist/antd.css'` — file không tồn tại ở v5
- ❌ Dùng LESS variable để theming — dùng `ConfigProvider` với `theme.token`
- ❌ Default import icons — dùng named import từ `@ant-design/icons`

**Tailwind CSS v4**
- ❌ Tạo `tailwind.config.js` với `content`/`theme.extend` kiểu v3 — bị ignore hoàn toàn ở v4

**Zustand**
- ❌ `import create from 'zustand'` — phải named import `{ create }`
- ❌ `useStore()` select toàn bộ store — chọn field cụ thể: `useStore((s) => s.field)`
- ❌ Dùng hook `useAuthStore()` trong Axios interceptor — ngoài React tree, phải dùng `getState()`

**Architecture**
- ❌ Gọi API trực tiếp trong component — phải qua `src/api/` + React Query hook
- ❌ Dùng `import.meta.env.VITE_*` trực tiếp — phải qua `src/config/env.ts`
- ❌ Xử lý 401 ở component level — chỉ xử lý tại `axiosInstance.ts` interceptor
- ❌ Import từ feature layer vào api/store layer — vi phạm dependency direction
- ❌ Inline type definition tại feature layer — đặt tại `src/types/[domain].types.ts`
- ❌ Thêm test framework (Jest, Vitest) mà không được yêu cầu rõ ràng

---

## Usage Guidelines

**Dành cho AI Agents:**
- Đọc file này trước khi implement bất kỳ code nào
- Tuân thủ TẤT CẢ quy tắc — đặc biệt là Architectural Contracts và Anti-Patterns
- Khi không chắc, chọn option hạn chế hơn
- Các quy tắc có ❌ là lỗi thường gặp nhất — ưu tiên kiểm tra

**Dành cho Humans:**
- Cập nhật file này khi technology stack hoặc patterns thay đổi
- Giữ nội dung lean — xóa rule nào đã trở nên hiển nhiên
- Review định kỳ để đảm bảo còn phù hợp với codebase

_Last Updated: 2026-05-30_
