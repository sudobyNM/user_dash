import { Routes, Route, Navigate } from "react-router-dom";
import UsersListPage from "../pages/UserList";
import UserDetailPage from "../pages/UserDetail";
import AnalyticsPage from "../pages/Analytics";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/users" replace />} />
      <Route path="/users" element={<UsersListPage />} />
      <Route path="/users/:id" element={<UserDetailPage />} />
      <Route path="/analytics" element={<AnalyticsPage />} />
      <Route path="*" element={<div className="text-red-500 p-6">Page Not Found</div>} />
    </Routes>
  );
}
