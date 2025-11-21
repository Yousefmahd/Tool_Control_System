import { 
  LayoutDashboard, 
  Package, 
  Users, 
  BarChart3, 
  Settings,
  Wrench,
  ClipboardList,
  Plane,
  Cog,
  Zap,
  LogOut
} from 'lucide-react';
import { useUser } from '../context/UserContext';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogout?: () => void;
}

export function Sidebar({ currentPage, onNavigate, onLogout }: SidebarProps) {
  const { currentUser } = useUser();
  
  const menuItems = [
    { id: 'tool-control', label: 'Tool Control', icon: LayoutDashboard },
    { id: 'inventory', label: 'Inventory', icon: Package },
    { id: 'staff', label: 'Staff Portal', icon: ClipboardList },
    { id: 'analysis', label: 'Analysis', icon: BarChart3 },
    { id: 'admin', label: 'Admin', icon: Settings },
  ];

  const workshopItems = [
    { id: 'aviation', label: 'Aviation', icon: Plane },
    { id: 'mechanical', label: 'Mechanical', icon: Cog },
    { id: 'electrical', label: 'Electrical', icon: Zap },
  ];

  return (
    <aside className="w-64 h-screen bg-white border-r border-[var(--color-border)] flex flex-col">
      <div className="p-6 border-b border-[var(--color-border)]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[var(--color-aviation-primary)] flex items-center justify-center">
            <Wrench className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-[var(--color-neutral-900)]">Tool Control</h3>
            <p className="text-xs text-[var(--color-neutral-500)]">Management System</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto p-4">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-[var(--color-aviation-primary)] text-white'
                    : 'text-[var(--color-neutral-700)] hover:bg-[var(--color-neutral-100)]'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm">{item.label}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-8">
          <h6 className="px-4 mb-3 text-xs text-[var(--color-neutral-500)] uppercase tracking-wider">
            Workshops
          </h6>
          <div className="space-y-1">
            {workshopItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-[var(--color-neutral-700)] hover:bg-[var(--color-neutral-100)] transition-colors"
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-8">
          <h6 className="px-4 mb-3 text-xs text-[var(--color-neutral-500)] uppercase tracking-wider">
            Design System
          </h6>
          <div className="space-y-1">
            <button
              onClick={() => onNavigate('component-library')}
              className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-[var(--color-neutral-700)] hover:bg-[var(--color-neutral-100)] transition-colors"
            >
              <Wrench className="w-4 h-4" />
              <span className="text-sm">Components</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="p-4 border-t border-[var(--color-border)]">
        <div className="flex items-center gap-3 px-4 py-3 mb-2">
          <div className="w-8 h-8 rounded-full bg-[var(--color-aviation-primary)] flex items-center justify-center">
            <Users className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-[var(--color-neutral-900)]">{currentUser.name}</p>
            <p className="text-xs text-[var(--color-neutral-500)]">{currentUser.role} • {currentUser.workshop}</p>
          </div>
        </div>
        {onLogout && (
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-2 px-4 py-2 rounded-lg text-[var(--color-neutral-700)] hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm">Sign Out</span>
          </button>
        )}
      </div>
    </aside>
  );
}