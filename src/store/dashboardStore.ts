import { create } from 'zustand';
import { User } from '../types';

type DashboardState = {
  // UI State
  sidebarOpen: boolean;
  activePage: string;
  loading: boolean;
  error: string | null;
  
  // Data
  users: User[];
  
  // Actions
  toggleSidebar: () => void;
  setActivePage: (page: string) => void;
  updateUser: (id: string, updates: Partial<Pick<User, 'name' | 'status'>>) => void;
  fetchUsers: () => Promise<void>;
};

const useDashboardStore = create<DashboardState>((set) => ({
  // Initial state
  sidebarOpen: true,
  activePage: 'overview',
  loading: false,
  error: null,
  users: [],
  
  // Actions
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  
  setActivePage: (page: string) => set({ activePage: page }),

  updateUser: (id, updates) =>
    set((state) => ({
      users: state.users.map((u) =>
        String(u.id) === String(id) ? { ...u, ...updates } : u
      ),
    })),
  
  fetchUsers: async () => {
    set({ loading: true, error: null });
    try {
      // Mock data - replace with actual API call
      const mockUsers: User[] = [
        { 
          id: '1', 
          name: 'John Doe', 
          email: 'john@example.com',
          avatar: 'https://i.pravatar.cc/150?img=1',
          status: 'active',
          role: 'Admin',
          lastActive: new Date().toISOString(),
          createdAt: new Date('2025-10-15').toISOString()
        },
        { 
          id: '2', 
          name: 'Jane Smith', 
          email: 'jane@example.com',
          avatar: 'https://i.pravatar.cc/150?img=2',
          status: 'active',
          role: 'User',
          lastActive: new Date(Date.now() - 86400000).toISOString(),
          createdAt: new Date('2025-11-01').toISOString()
        },
      ];
      set({ users: mockUsers });
    } catch (err) {
      set({ error: 'Failed to fetch users' });
      console.error('Error fetching users:', err);
    } finally {
      set({ loading: false });
    }
  },
}));

export default useDashboardStore;
