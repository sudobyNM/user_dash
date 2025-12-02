import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { z } from "zod";
import { format } from "date-fns";

import Card from "../components/Card";
import Button from "../components/Button";
import Modal from "../components/Modal";
import useDashboardStore from "../store/dashboardStore";

const editUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  status: z.enum(["active", "inactive"]),
});

// Static list of recent actions
const recentActions = [
  { id: 1, action: 'Updated profile', timestamp: '2023-06-15T10:30:00' },
  { id: 2, action: 'Changed password', timestamp: '2023-06-14T15:45:00' },
  { id: 3, action: 'Viewed dashboard', timestamp: '2023-06-14T09:15:00' },
  { id: 4, action: 'Logged in', timestamp: '2023-06-14T09:00:00' },
  { id: 5, action: 'Logged out', timestamp: '2023-06-13T18:30:00' },
];

export default function UserDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { users, updateUser } = useDashboardStore();

  const user = users.find((u) => String(u.id) === String(id));

  const [isOpen, setIsOpen] = useState(false);
  const [editName, setEditName] = useState(user?.name || "");
  const [editStatus, setEditStatus] = useState<"active" | "inactive" | "pending">(user?.status || "active");
  const [error, setError] = useState<string | null>(null);
  const [avatarError, setAvatarError] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  if (!user) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-semibold mb-2">User Not Found</h2>
        <Link to="/users" className="text-blue-600 underline">
          Back to Users
        </Link>
      </div>
    );
  }

  const saveChanges = async () => {
    const result = editUserSchema.safeParse({ 
      name: editName.trim(), 
      status: editStatus 
    });
    
    if (!result.success) {
      const firstError = result.error.issues[0]?.message || "Invalid data";
      setError(firstError);
      return;
    }

    setIsSaving(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      updateUser(user.id, {
        name: result.data.name,
        status: result.data.status,
      });
      
      setError(null);
      setIsOpen(false);
    } catch (err) {
      setError("Failed to update user. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-4 max-w-4xl mx-auto">
      <Link 
        to="/users" 
        className="inline-flex items-center group text-ui-text hover:text-ui-text dark:text-gray-400 dark:hover:text-gray-300 text-sm font-medium transition-colors"
      >
        <svg 
          className="w-4 h-4 mr-1.5 group-hover:-translate-x-0.5 transition-transform" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Users
      </Link>

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">User Details</h1>
       <Button onClick={() => setIsEditModalOpen(true)}>Edit User</Button>

      </div>

      {/* User Profile Card */}
      <Card className="p-4">
        <div className="flex items-start gap-4">
          <div className="relative flex-shrink-0">
            <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden border-2 border-white dark:border-gray-800 shadow-sm">
              <img
                src={avatarError ? 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user.name) + '&background=4f46e5&color=fff' : user.avatar}
                alt={user.name}
                className="w-full h-full object-cover"
                onError={() => setAvatarError(true)}
              />
            </div>
            <span className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white dark:border-gray-800 ${
              user.status === 'active' ? 'bg-green-500' : 'bg-red-500'
            }`}></span>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-baseline justify-between gap-2">
              <h2 className="text-lg font-semibold truncate">{user.name}</h2>
              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${
                user.status === 'active' 
                  ? '!bg-green-500 !text-gray-50 dark:bg-green-900/30 dark:text-green-300' 
                  : '!bg-red-500 !text-gray-50 dark:bg-red-900/30 dark:text-red-300'
              }`}>
                {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{user.email}</p>
          </div>
        </div>
      </Card>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activity Summary */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Activity Summary</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Logins</p>
              <p className="text-lg font-medium">42</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Last Login</p>
              <p className="text-lg font-medium">{format(new Date(recentActions[0].timestamp), 'MMM d, yyyy h:mm a')}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Active Sessions</p>
              <p className="text-lg font-medium">1</p>
            </div>
          </div>
        </Card>

        {/* Recent Actions */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Actions</h2>
          <div className="space-y-4">
            {recentActions.map((action) => (
              <div key={action.id} className="flex items-start">
                <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-blue-500"></div>
                <div className="ml-3">
                  <p className="text-sm font-medium">{action.action}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {format(new Date(action.timestamp), 'MMM d, yyyy h:mm a')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Edit Modal */}
      <Modal open={isOpen} onClose={() => !isSaving && setIsOpen(false)} title="Edit User">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            saveChanges();
          }}
          className="space-y-4"
        >
          {error && (
            <div className="p-3 text-sm text-red-700 bg-red-100 rounded-md dark:bg-red-900/30 dark:text-red-200">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Full Name
            </label>
            <input
              type="text"
              className={`w-full px-3 py-2 border rounded-md ${
                editName.trim().length < 2 && editName.length > 0
                  ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100'
              }`}
              value={editName}
              onChange={(e) => {
                setEditName(e.target.value);
                if (error) setError(null);
              }}
              minLength={2}
              required
              autoFocus
              disabled={isSaving}
            />
            {editName.trim().length < 2 && editName.length > 0 && (
              <p className="mt-1 text-sm text-red-600">Name must be at least 2 characters</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Status
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
              value={editStatus}
              onChange={(e) => {
                setEditStatus(e.target.value as "active" | "inactive");
                if (error) setError(null);
              }}
              disabled={isSaving}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => !isSaving && setIsOpen(false)}
              disabled={isSaving}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSaving || editName.trim().length < 2}
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </Modal>


      <Modal 
  open={isEditModalOpen} 
  onClose={() => setIsEditModalOpen(false)} 
  title="Edit User"
>
  <form
    onSubmit={(e) => {
      e.preventDefault();

      // basic validation
      if (editName.trim().length < 2) {
        setError("Name must be at least 2 characters");
        return;
      }

      updateUser(user.id, {
        name: editName.trim(),
        status: editStatus,
      });

      setIsEditModalOpen(false);
    }}
    className="space-y-4"
  >
    {error && (
      <div className="p-2 text-red-600 bg-red-100 rounded">
        {error}
      </div>
    )}

    {/* Name Field */}
    <div>
      <label className="block text-sm font-medium mb-1">Full Name</label>
      <input
        type="text"
        className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-300 bg-white text-gray-700 dark:bg-white dark:text-gray-700"
        value={editName}
        onChange={(e) => {
          setEditName(e.target.value);
          setError(null);
        }}
      />
    </div>

    {/* Status Field */}
    <div>
      <label className="block text-sm font-medium mb-1">Status</label>
      <select
        className="w-full px-3 py-2 border rounded-md bg-white text-gray-700 dark:bg-white dark:text-gray-700"
        value={editStatus}
        onChange={(e) => setEditStatus(e.target.value as "active" | "inactive")}
      >
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
    </div>

    {/* Buttons */}
    <div className="flex justify-end gap-2 pt-4">
      <Button 
        type="button" 
        variant="secondary" 
        onClick={() => setIsEditModalOpen(false)}
      >
        Cancel
      </Button>

      <Button type="submit">
        Save Changes
      </Button>
    </div>
  </form>
</Modal>
    </div>
  );
}
