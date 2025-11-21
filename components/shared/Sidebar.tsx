import { 
  LayoutDashboard, 
  Settings, 
  Users, 
  Package, 
  BarChart3, 
  Tool, 
  Wrench,
  Plane,
  Zap,
  ChevronDown,
  ClipboardList
} from "lucide-react";
import { cn } from "../../lib/utils";
import atsLogo from "figma:asset/9ea0d3c793b26d00ad15fbd859a0f927d5855328.png";
import { useUser } from "../../context/UserContext";
import { mockStudents } from "../../data/mockData";
import { useState } from "react";
import { Button } from "../ui/button";

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const menuItems = [
  { id: "tool-control", label: "Tool Control", icon: Tool },
  { id: "inventory", label: "Inventory", icon: Package },
  { id: "supervisor", label: "Supervisor", icon: ClipboardList },
  { id: "staff", label: "Student Portal", icon: Users },
  { id: "analysis", label: "Analysis", icon: BarChart3 },
  { id: "admin", label: "Admin", icon: Settings },
];

const workshopItems = [
  { id: "aviation", label: "Aviation", icon: Plane, color: "text-[#0ea5e9]" },
  { id: "mechanical", label: "Mechanical", icon: Wrench, color: "text-[#f97316]" },
  { id: "electrical", label: "Electrical", icon: Zap, color: "text-[#eab308]" },
];

export function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  const { currentUser, setCurrentUser } = useUser();
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Filter available users - only show students and supervisors
  const availableUsers = mockStudents.filter(s => s.role !== 'Admin' || s.id === 'ADM-001');

  return (
    <div className="sidebar">
      <div className="p-6 border-b border-secondary-200">
        <div className="flex items-center justify-center">
          <img 
            src={atsLogo} 
            alt="Applied Technology Schools" 
            className="h-16 w-auto object-contain"
          />
        </div>
      </div>

      <nav className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                  isActive
                    ? "bg-primary-50 text-primary-700"
                    : "text-secondary-600 hover:bg-secondary-100"
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-6 pt-6 border-t border-secondary-200">
          <p className="px-4 text-xs text-secondary-500 uppercase tracking-wide mb-3">
            Workshops
          </p>
          <div className="space-y-1">
            {workshopItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-secondary-600 hover:bg-secondary-100 transition-colors"
                >
                  <Icon className={cn("w-5 h-5", item.color)} />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      <div className="p-4 border-t border-secondary-200">
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="w-full flex items-center gap-3 p-3 rounded-lg bg-secondary-100 hover:bg-secondary-200 transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center text-white">
              {currentUser.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="flex-1 min-w-0 text-left">
              <p className="text-sm font-medium text-secondary-900 truncate">{currentUser.name}</p>
              <p className="text-xs text-secondary-500">{currentUser.role} - {currentUser.workshop}</p>
            </div>
            <ChevronDown className={cn(
              "w-4 h-4 text-secondary-500 transition-transform",
              showUserMenu && "rotate-180"
            )} />
          </button>
          
          {showUserMenu && (
            <div className="absolute bottom-full left-0 right-0 mb-2 bg-white rounded-lg shadow-lg border border-secondary-200 max-h-80 overflow-y-auto">
              <div className="p-2">
                <p className="px-3 py-2 text-xs text-secondary-500 uppercase tracking-wide">
                  Switch User (Demo)
                </p>
                {availableUsers.map((user) => (
                  <button
                    key={user.id}
                    onClick={() => {
                      setCurrentUser(user);
                      setShowUserMenu(false);
                    }}
                    className={cn(
                      "w-full flex items-center gap-3 p-3 rounded-lg transition-colors text-left",
                      currentUser.id === user.id
                        ? "bg-primary-50 text-primary-700"
                        : "hover:bg-secondary-100"
                    )}
                  >
                    <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white text-xs">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{user.name}</p>
                      <p className="text-xs text-secondary-500">{user.role} - {user.workshop}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}