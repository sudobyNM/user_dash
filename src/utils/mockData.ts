import type { User } from "../types";
import type { SignupTrendPoint } from "../types";

// Predefined mock users
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://i.pravatar.cc/150?img=1',
    status: 'active',
    role: 'Admin',
    createdAt: new Date('2025-10-15').toISOString(),
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    avatar: 'https://i.pravatar.cc/150?img=2',
    status: 'active',
    role: 'Manager',
    createdAt: new Date('2025-11-01').toISOString(),
  },
  {
    id: '3',
    name: 'Robert Johnson',
    email: 'robert@example.com',
    avatar: 'https://i.pravatar.cc/150?img=3',
    status: 'inactive',
    role: 'Developer',
    createdAt: new Date('2025-11-20').toISOString(),
  },
];

// Generate random users
export const generateUsers = (count: number): User[] => {
  const statuses = ["active", "inactive"] as const;
  
  return Array.from({ length: count }).map((_, i) => {
    const randomStatus = statuses[Math.floor(Math.random() * 2)];
    return {
      id: (i + 1).toString(),
      name: `User ${i + 1}`,
      email: `user${i + 1}@mail.com`,
      avatar: `https://i.pravatar.cc/150?img=${(i % 70) + 1}`,
      status: randomStatus,
      role: 'User',
      createdAt: new Date(
        Date.now() - Math.floor(Math.random() * 10_000_000_000)
      ).toISOString(),
    };
  });
};


export const users = generateUsers(42);


// Signup Trends (Last 7 Days)
export const signupTrend: SignupTrendPoint[] = Array.from({ length: 7 }).map(
(_, i) => {
const day = new Date(Date.now() - (6 - i) * 86400000).toLocaleDateString(
"en-US",
{ month: "short", day: "numeric" }
);


return {
day,
signups: Math.floor(Math.random() * 30) + 5,
};
}
);