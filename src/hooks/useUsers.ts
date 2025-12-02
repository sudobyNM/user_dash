import { useMemo } from 'react';
import { UseUsersOptions, UseUsersResult } from '../types';

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
      const valueA = a[sortBy];
      const valueB = b[sortBy];
      
      // Handle undefined/null cases
      if (valueA == null && valueB == null) return 0;
      if (valueA == null) return 1;  // nulls/undefined go to the end
      if (valueB == null) return -1;
      
      // Compare the values
      if (valueA < valueB) return -1;
      if (valueA > valueB) return 1;
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
