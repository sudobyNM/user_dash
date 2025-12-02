import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Card from "../components/Card";
import Table from "../components/Table";
import Pagination from "../components/Pagination";
import Button from "../components/Button";
import Input from "../components/Input.tsx";
import Select from "../components/Select.tsx";

import { useUsers } from "../hooks/useUsers.ts";
import { User, TableColumn } from "../types";
import { mockUsers } from "../utils/mockData";

const statusOptions = [
  { value: 'all', label: 'All Status' },
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'pending', label: 'Pending' },
];

type SortableUserField = 'name' | 'email' | 'status' | 'createdAt';

const sortOptions: { value: SortableUserField; label: string }[] = [
  { value: 'name', label: 'Name (A-Z)' },
  { value: 'email', label: 'Email (A-Z)' },
  { value: 'status', label: 'Status' },
  { value: 'createdAt', label: 'Date Created' },
];

export default function UserListPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState<SortableUserField>("name");
  const [page, setPage] = useState(1);
  const limit = 8;

  // Reset to page 1 when filters change
  useEffect(() => {
    setPage(1);
  }, [search, statusFilter, sortBy]);

  const { users: paginatedUsers, total } = useUsers({
    users: mockUsers,
    search,
    status: statusFilter,
    sortBy,
    page,
    limit,
  });

  const columns: TableColumn<User>[] = [
    {
      key: "avatar",
      label: "",
      render: (user: User) => (
        <img
          src={user.avatar}
          alt={user.name}
          className="w-10 h-10 rounded-full object-cover"
        />
      ),
      className: "w-12",
    },
    { 
      key: "name", 
      label: "Name",
      sortable: true,
      render: (user: User) => (
        <Link 
          to={`/users/${user.id}`}
          className="font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
        >
          {user.name}
        </Link>
      )
    },
    { 
      key: "email", 
      label: "Email",
      render: (user: User) => (
        <a 
          href={`mailto:${user.email}`}
          className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
        >
          {user.email}
        </a>
      )
    },
    {
      key: "status",
      label: "Status",
      render: (row: any) => (
<span
  className={`
    inline-flex px-3 py-1 rounded-full text-xs font-medium

    ${row.status === "active"
      ? "bg-green-100 text-green-600 border border-green-700"
      : "bg-red-100 text-red-600 border border-red-700"
    }

   
  `}
>
  {row.status}
</span>

      ),
    },
    {
      key: "createdAt",
      label: "Created",
      render: (user: User) =>
        new Date(user.createdAt).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "2-digit",
          
        }),
    },
    {
      key: "actions",
      label: "Actions",
      render: (row: any) => (
        <Link to={`/users/${row.id}`}>
          <Button variant="primary">View</Button>
        </Link>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Users</h1>

      <Card className="p-5 space-y-4">
        {/* Filters row */}
        <div className="flex flex-wrap gap-3 items-center">
          <div className="flex-1 min-w-[220px]">
            <Input
              type="text"
              placeholder="Search by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="w-full sm:w-auto flex gap-3">
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              options={statusOptions}
            />

            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortableUserField)}
              options={sortOptions}
            />
          </div>
        </div>

        {/* Table */}
        <Table columns={columns} data={paginatedUsers} />

        {/* Pagination footer */}
        <div className="flex items-center justify-between mt-3 text-sm text-gray-600 dark:text-gray-400">
          <span>
            Page {page} of {Math.max(1, Math.ceil(total / limit))}
          </span>
          <Pagination
            page={page}
            limit={limit}
            total={total}
            onPageChange={(page) => setPage(page)}
          />
        </div>
      </Card>
    </div>
  );
}
