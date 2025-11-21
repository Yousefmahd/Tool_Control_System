import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { LoginScreen } from './components/LoginScreen';
import { ToolControlDashboard } from './components/ToolControlDashboard';
import { InventoryDashboard } from './components/InventoryDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { StaffDashboard } from './components/StaffDashboard';
import { AnalysisDashboard } from './components/AnalysisDashboard';
import { SupervisorDashboard } from './components/SupervisorDashboard';
import { CreateTaskScreen } from './components/CreateTaskScreen';
import { AssignToolScreen } from './components/AssignToolScreen';
import { ReturnToolScreen } from './components/ReturnToolScreen';
import { ToolDetailsPage } from './components/ToolDetailsPage';
import { AddToolScreen } from './components/AddToolScreen';
import { ComponentLibrary } from './components/ComponentLibrary';
import { Tool } from './data/mockData';
import { UserProvider } from './context/UserContext';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState('tool-control');
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [selectedTask, setSelectedTask] = useState<any>(null);

  const handleLogin = (username: string, password: string) => {
    // In a real application, this would validate against a backend
    // For demo purposes, we accept any user from mockUsers with password "password"
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage('tool-control');
    setSelectedTool(null);
    setSelectedTask(null);
  };

  const handleNavigate = (page: string, data?: any) => {
    if (page === 'tool-details' && data) {
      setSelectedTool(data);
    }
    if (page === 'task-details' && data) {
      setSelectedTask(data);
    }
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'tool-control':
        return <ToolControlDashboard onNavigate={handleNavigate} />;
      case 'inventory':
        return <InventoryDashboard onNavigate={handleNavigate} />;
      case 'admin':
        return <AdminDashboard />;
      case 'staff':
        return <StaffDashboard />;
      case 'supervisor':
        return <SupervisorDashboard onNavigate={handleNavigate} />;
      case 'create-task':
        return <CreateTaskScreen onNavigate={handleNavigate} />;
      case 'analysis':
        return <AnalysisDashboard />;
      case 'assign-tool':
        return <AssignToolScreen onNavigate={handleNavigate} />;
      case 'return-tool':
        return <ReturnToolScreen onNavigate={handleNavigate} />;
      case 'tool-details':
        return selectedTool ? <ToolDetailsPage tool={selectedTool} onNavigate={handleNavigate} /> : <ToolControlDashboard onNavigate={handleNavigate} />;
      case 'add-tool':
        return <AddToolScreen onNavigate={handleNavigate} />;
      case 'component-library':
        return <ComponentLibrary />;
      default:
        return <ToolControlDashboard onNavigate={handleNavigate} />;
    }
  };

  // Show login screen if not authenticated
  if (!isAuthenticated) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <UserProvider>
      <div className="flex h-screen bg-[var(--color-background)]">
        <Sidebar currentPage={currentPage} onNavigate={handleNavigate} onLogout={handleLogout} />
        <main className="flex-1 overflow-y-auto">
          {renderPage()}
        </main>
      </div>
    </UserProvider>
  );
}