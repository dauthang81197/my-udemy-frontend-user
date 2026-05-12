import { createBrowserRouter, RouterProvider, Navigate } from "react-router";
import { AppLayout } from "@/components/layout/AppLayout";
import { PrivateRoute } from "./PrivateRoute";
import { LoginPage } from "@/features/auth/pages/LoginPage";
import { RegisterPage } from "@/features/auth/pages/RegisterPage";
import { DashboardPage } from "@/features/dashboard/pages/DashboardPage";
import { CourseListPage } from "@/features/courses/pages/CourseListPage";
import { MyLearningPage } from "@/features/my-learning/pages/MyLearningPage";
import { DetailMyLearningPage } from "@/features/my-learning/pages/DetailMyLearningPage";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/",
    element: <PrivateRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { index: true, element: <Navigate to="/dashboard" replace /> },
          { path: "dashboard", element: <DashboardPage /> },
          { path: "courses", element: <CourseListPage /> },
          { path: "my-learning", element: <MyLearningPage /> },
          { path: "my-learning/:id", element: <DetailMyLearningPage /> },
        ],
      },
    ],
  },
]);

export function AppRoutes() {
  return <RouterProvider router={router} />;
}
