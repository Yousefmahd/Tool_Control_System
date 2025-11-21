import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Student, mockStudents } from '../data/mockData';

interface UserContextType {
  currentUser: Student;
  setCurrentUser: (user: Student) => void;
  canAccessWorkshop: (workshop: string) => boolean;
  canEditTool: (toolWorkshop: string) => boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  // Default to an Aviation lab engineer for demo
  const [currentUser, setCurrentUser] = useState<Student>(
    mockStudents.find(s => s.id === 'SUP-001') || mockStudents[0]
  );

  const canAccessWorkshop = (workshop: string): boolean => {
    // Admin can access all workshops
    if (currentUser.role === 'Admin' || currentUser.workshop === 'All') {
      return true;
    }
    // Other users can only access their own workshop
    return currentUser.workshop === workshop;
  };

  const canEditTool = (toolWorkshop: string): boolean => {
    // Admin can edit all tools
    if (currentUser.role === 'Admin' || currentUser.workshop === 'All') {
      return true;
    }
    // Other users can only edit tools from their workshop
    return currentUser.workshop === toolWorkshop;
  };

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, canAccessWorkshop, canEditTool }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}