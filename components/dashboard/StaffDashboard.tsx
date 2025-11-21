import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { StatusBadge } from "../shared/StatusBadge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { 
  User, 
  Mail, 
  Phone, 
  Briefcase, 
  Package, 
  Clock,
  CheckCircle,
  AlertCircle,
  Bell
} from "lucide-react";
import { KPICard } from "../shared/KPICard";

const currentTools = [
  {
    id: "T-023",
    name: "Torque Wrench",
    workshop: "Aviation",
    checkedOut: "2024-11-20 08:30",
    dueDate: "2024-11-22 17:00",
    supervisor: "Sarah Chen",
    location: "Room A, Cabinet 2",
    status: "On Time" as const,
  },
  {
    id: "T-067",
    name: "Digital Multimeter",
    workshop: "Electrical",
    checkedOut: "2024-11-19 14:15",
    dueDate: "2024-11-21 17:00",
    supervisor: "David Lee",
    location: "Room E, Rack 1",
    status: "Due Soon" as const,
  },
];

const toolHistory = [
  {
    id: "T-045",
    name: "Impact Driver",
    workshop: "Mechanical",
    checkedOut: "2024-11-15 09:00",
    returned: "2024-11-17 16:30",
    condition: "Good",
    supervisor: "Mike Johnson",
  },
  {
    id: "T-012",
    name: "Wire Stripper",
    workshop: "Electrical",
    checkedOut: "2024-11-10 11:20",
    returned: "2024-11-12 15:45",
    condition: "Excellent",
    supervisor: "Sarah Chen",
  },
  {
    id: "T-089",
    name: "Hydraulic Jack",
    workshop: "Aviation",
    checkedOut: "2024-11-05 08:00",
    returned: "2024-11-08 17:00",
    condition: "Good",
    supervisor: "David Lee",
  },
];

const notifications = [
  {
    id: 1,
    type: "reminder",
    message: "Digital Multimeter (T-067) is due for return tomorrow",
    time: "2 hours ago",
  },
  {
    id: 2,
    type: "approval",
    message: "Your tool request for Oscilloscope has been approved",
    time: "5 hours ago",
  },
  {
    id: 3,
    type: "info",
    message: "Quarterly safety training scheduled for Nov 25",
    time: "1 day ago",
  },
];

export function StaffDashboard({ onNavigate }: { onNavigate: (page: string) => void }) {
  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-secondary-900">Staff Portal</h2>
          <p className="text-secondary-600 mt-1">Welcome back, Mike Johnson</p>
        </div>
        <div className="flex gap-3">
          <Button onClick={() => onNavigate("request-tool")}>Request Tool</Button>
          <Button variant="outline" onClick={() => onNavigate("return-tool")}>
            Return Tool
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center">
              <User className="w-8 h-8 text-primary-600" />
            </div>
            <div>
              <h3 className="text-secondary-900">Mike Johnson</h3>
              <p className="text-secondary-600">Staff Member</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <Mail className="w-4 h-4 text-secondary-400" />
              <span className="text-secondary-700">mike.johnson@example.com</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Phone className="w-4 h-4 text-secondary-400" />
              <span className="text-secondary-700">+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Briefcase className="w-4 h-4 text-secondary-400" />
              <span className="text-secondary-700">Mechanical Workshop</span>
            </div>
          </div>

          <Button variant="outline" className="w-full mt-6">
            Edit Profile
          </Button>
        </Card>

        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
          <KPICard
            title="Tools in Use"
            value="2"
            icon={Package}
            iconColor="text-primary-600"
            iconBg="bg-primary-100"
          />
          <KPICard
            title="Total Borrowed"
            value="24"
            icon={Clock}
            iconColor="text-secondary-600"
            iconBg="bg-secondary-100"
          />
          <KPICard
            title="On-Time Returns"
            value="96%"
            icon={CheckCircle}
            iconColor="text-success-600"
            iconBg="bg-success-100"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <div className="p-6 border-b border-secondary-200">
              <h3 className="text-secondary-900">Currently Issued Tools</h3>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tool ID</TableHead>
                  <TableHead>Tool Name</TableHead>
                  <TableHead>Checked Out</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Supervisor</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentTools.map((tool) => (
                  <TableRow key={tool.id}>
                    <TableCell className="font-medium">{tool.id}</TableCell>
                    <TableCell>{tool.name}</TableCell>
                    <TableCell className="text-sm text-secondary-600">{tool.checkedOut}</TableCell>
                    <TableCell className="text-sm text-secondary-600">{tool.dueDate}</TableCell>
                    <TableCell>{tool.supervisor}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          tool.status === "On Time"
                            ? "border-success-200 bg-success-50 text-success-700"
                            : "border-warning-200 bg-warning-50 text-warning-700"
                        }
                      >
                        {tool.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {currentTools.length === 0 && (
              <div className="p-12 text-center">
                <Package className="w-12 h-12 text-secondary-300 mx-auto mb-3" />
                <p className="text-secondary-600">No tools currently issued</p>
              </div>
            )}
          </Card>

          <Card className="mt-6">
            <div className="p-6 border-b border-secondary-200">
              <h3 className="text-secondary-900">Tool History</h3>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tool ID</TableHead>
                  <TableHead>Tool Name</TableHead>
                  <TableHead>Checked Out</TableHead>
                  <TableHead>Returned</TableHead>
                  <TableHead>Condition</TableHead>
                  <TableHead>Supervisor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {toolHistory.map((tool) => (
                  <TableRow key={tool.id}>
                    <TableCell className="font-medium">{tool.id}</TableCell>
                    <TableCell>{tool.name}</TableCell>
                    <TableCell className="text-sm text-secondary-600">{tool.checkedOut}</TableCell>
                    <TableCell className="text-sm text-secondary-600">{tool.returned}</TableCell>
                    <TableCell>
                      <span
                        className={`text-sm ${
                          tool.condition === "Excellent"
                            ? "text-success-600"
                            : "text-primary-600"
                        }`}
                      >
                        {tool.condition}
                      </span>
                    </TableCell>
                    <TableCell>{tool.supervisor}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>

        <Card>
          <div className="p-6 border-b border-secondary-200">
            <h3 className="text-secondary-900">Notifications</h3>
          </div>
          <div className="p-6 space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="p-4 rounded-lg border border-secondary-200 bg-secondary-50"
              >
                <div className="flex items-start gap-3">
                  {notification.type === "reminder" && (
                    <AlertCircle className="w-5 h-5 text-warning-600 mt-0.5" />
                  )}
                  {notification.type === "approval" && (
                    <CheckCircle className="w-5 h-5 text-success-600 mt-0.5" />
                  )}
                  {notification.type === "info" && (
                    <Bell className="w-5 h-5 text-primary-600 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <p className="text-sm text-secondary-900">{notification.message}</p>
                    <p className="text-xs text-secondary-500 mt-1">{notification.time}</p>
                  </div>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full">
              View All Notifications
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
