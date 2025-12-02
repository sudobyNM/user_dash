export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string; // Made optional with ?
  status: 'active' | 'inactive' | 'pending';
  role?: string;
  lastActive?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface UserActivity {
  date: string;
  count: number;
}

export interface SignupTrendPoint {
  day: string;
  signups: number;
}

export interface TableColumn<T> {
  key: keyof T | string;
  label: string;
  render?: (item: T) => React.ReactNode;
  sortable?: boolean;
  className?: string;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export interface UseUsersOptions {
  users: User[];
  search?: string;
  status?: string;
  sortBy?: string;
  page: number;
  limit: number;
}

export interface UseUsersResult {
  users: User[];
  total: number;
  totalPages: number;
}