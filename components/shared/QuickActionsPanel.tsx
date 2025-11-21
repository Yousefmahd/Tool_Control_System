import { Card } from "../ui/card";
import { Button } from "../ui/button";
import {
  Package,
  UserPlus,
  LogIn,
  LogOut,
  BarChart3,
  Settings,
  QrCode,
  FileText,
} from "lucide-react";

interface QuickActionsPanelProps {
  onNavigate: (page: string) => void;
}

const quickActions = [
  {
    id: "assign-tool",
    label: "Assign Tool",
    description: "Issue a tool to staff",
    icon: LogIn,
    color: "bg-primary-50 text-primary-600 border-primary-200",
  },
  {
    id: "return-tool",
    label: "Return Tool",
    description: "Process tool return",
    icon: LogOut,
    color: "bg-success-50 text-success-600 border-success-200",
  },
  {
    id: "inventory",
    label: "Add Tool",
    description: "Add new tool to inventory",
    icon: Package,
    color: "bg-secondary-50 text-secondary-600 border-secondary-200",
  },
  {
    id: "admin",
    label: "Add User",
    description: "Create new user account",
    icon: UserPlus,
    color: "bg-secondary-50 text-secondary-600 border-secondary-200",
  },
  {
    id: "inventory",
    label: "Scan QR Code",
    description: "Quick tool lookup",
    icon: QrCode,
    color: "bg-secondary-50 text-secondary-600 border-secondary-200",
  },
  {
    id: "analysis",
    label: "View Reports",
    description: "Analytics and insights",
    icon: BarChart3,
    color: "bg-secondary-50 text-secondary-600 border-secondary-200",
  },
  {
    id: "admin",
    label: "Settings",
    description: "System configuration",
    icon: Settings,
    color: "bg-secondary-50 text-secondary-600 border-secondary-200",
  },
  {
    id: "inventory",
    label: "Export Data",
    description: "Download inventory report",
    icon: FileText,
    color: "bg-secondary-50 text-secondary-600 border-secondary-200",
  },
];

export function QuickActionsPanel({ onNavigate }: QuickActionsPanelProps) {
  return (
    <Card>
      <div className="p-6 border-b border-secondary-200">
        <h3 className="text-secondary-900">Quick Actions</h3>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.id + action.label}
                onClick={() => onNavigate(action.id)}
                className="flex items-start gap-4 p-4 rounded-lg border border-secondary-200 hover:border-primary-300 hover:bg-primary-50 transition-colors text-left"
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${action.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-secondary-900 text-sm">{action.label}</p>
                  <p className="text-xs text-secondary-600 mt-1">{action.description}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
