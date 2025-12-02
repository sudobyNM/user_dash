import { useMemo } from 'react';
import { User, UseUsersOptions, UseUsersResult } from '../types';

export function useUsers({ users, search = '', status = 'all', sortBy = 'name', page = 1, limit = 10 }: UseUsersOptions): UseUsersResult {
  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesSearch = 
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase());
      
      const matchesStatus = status === 'all' || user.status === status;
      
      return matchesSearch && matchesStatus;
    });
  }, [users, search, status]);

  const sortedUsers = useMemo(() => {
    if (!sortBy) return filteredUsers;
    
    return [...filteredUsers].sort((a, b) => {
      if (a[sortBy] < b[sortBy]) return -1;
      if (a[sortBy] > b[sortBy]) return 1;
      return 0;
    });
  }, [filteredUsers, sortBy]);

  const paginatedUsers = useMemo(() => {
    const startIndex = (page - 1) * limit;
    return sortedUsers.slice(startIndex, startIndex + limit);
  }, [sortedUsers, page, limit]);

  return {
    users: paginatedUsers,
    total: filteredUsers.length,
    totalPages: Math.ceil(filteredUsers.length / limit),
  };
}
