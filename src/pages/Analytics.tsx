import Card from "../components/Card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  type PieLabelRenderProps,
} from "recharts";
import { mockUsers, signupTrend } from "../utils/mockData";

export default function AnalyticsPage() {
  // Use mock users data
  const users = mockUsers;

  // Use mock signup trend data
  const signupData = signupTrend.map((trend) => ({
    day: trend.day,
    signups: trend.signups,
  }));

  // Calculate active vs inactive users
  const activeCount = users.filter((u) => u.status === "active").length;
  const inactiveCount = users.length - activeCount;

  const statusData = [
    { name: "Active", value: activeCount },
    { name: "Inactive", value: inactiveCount },
  ];

  const COLORS = ["#2ec766ff", "#e75c5cff"]; // green + red

  return (
    <div className="space-y-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h1 className="text-xl sm:text-2xl font-semibold">Analytics Overview</h1>

      {/* Signup Chart */}
      <Card className="p-3 sm:p-4">
        <h2 className="font-semibold text-sm sm:text-base mb-3 sm:mb-4">User Signups (Last 7 Days)</h2>
        <div className="h-48 sm:h-64">
          <ResponsiveContainer width="100%" height="100%" className="mx-auto">
            <LineChart data={signupData}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="signups" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Pie Chart */}
      <Card className="p-3 sm:p-4">
        <h2 className="font-semibold text-sm sm:text-base mb-3 sm:mb-4">Active vs Inactive Users</h2>
        <div className="h-64 sm:h-80">
          <ResponsiveContainer width="100%" height="100%" className="mx-auto">
            <PieChart>
              <Pie
                data={statusData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={window.innerWidth < 640 ? 50 : 65}
                label={({ name = '', percent = 0 }: PieLabelRenderProps) => 
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
              >
                {statusData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
