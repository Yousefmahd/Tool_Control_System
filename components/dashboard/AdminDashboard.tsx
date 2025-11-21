import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import { 
  Users, 
  UserPlus, 
  Shield, 
  Settings, 
  FileText, 
  Upload,
  Download,
  Eye,
  Edit,
  Trash2
} from "lucide-react";
import { KPICard } from "../shared/KPICard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Administrator",
    workshop: "All",
    status: "Active",
    lastLogin: "2024-11-21 09:30",
  },
  {
    id: 2,
    name: "Sarah Chen",
    email: "sarah.chen@example.com",
    role: "Supervisor",
    workshop: "Aviation",
    status: "Active",
    lastLogin: "2024-11-21 08:15",
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike.johnson@example.com",
    role: "Staff",
    workshop: "Mechanical",
    status: "Active",
    lastLogin: "2024-11-21 07:45",
  },
  {
    id: 4,
    name: "Emma Wilson",
    email: "emma.wilson@example.com",
    role: "Staff",
    workshop: "Electrical",
    status: "Active",
    lastLogin: "2024-11-20 16:30",
  },
  {
    id: 5,
    name: "David Lee",
    email: "david.lee@example.com",
    role: "Supervisor",
    workshop: "Mechanical",
    status: "Inactive",
    lastLogin: "2024-11-15 14:20",
  },
];

const auditLogs = [
  {
    id: 1,
    timestamp: "2024-11-21 10:30:15",
    user: "John Doe",
    action: "Tool T-045 assigned to Mike Johnson",
    category: "Tool Assignment",
  },
  {
    id: 2,
    timestamp: "2024-11-21 10:15:42",
    user: "Sarah Chen",
    action: "Added new tool: Digital Caliper (T-156)",
    category: "Inventory Update",
  },
  {
    id: 3,
    timestamp: "2024-11-21 09:45:22",
    user: "Admin System",
    action: "User Emma Wilson logged in",
    category: "System Access",
  },
  {
    id: 4,
    timestamp: "2024-11-21 09:30:18",
    user: "John Doe",
    action: "Updated workshop settings for Aviation",
    category: "Configuration",
  },
  {
    id: 5,
    timestamp: "2024-11-21 08:20:55",
    user: "Mike Johnson",
    action: "Tool T-023 returned in good condition",
    category: "Tool Return",
  },
];

const categories = [
  { name: "Hand Tools", count: 342 },
  { name: "Power Tools", count: 186 },
  { name: "Electrical Testing", count: 124 },
  { name: "Assembly Tools", count: 98 },
  { name: "Lifting Equipment", count: 67 },
  { name: "Measuring Tools", count: 156 },
];

export function AdminDashboard() {
  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-secondary-900">Administration</h2>
          <p className="text-secondary-600 mt-1">System configuration and user management</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
          <Button>
            <UserPlus className="w-4 h-4 mr-2" />
            Add User
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <KPICard
          title="Total Users"
          value="48"
          icon={Users}
          trend={{ value: "3 new", isPositive: true }}
        />
        <KPICard
          title="Active Sessions"
          value="24"
          icon={Shield}
          iconColor="text-success-600"
          iconBg="bg-success-100"
        />
        <KPICard
          title="Supervisors"
          value="12"
          icon={Shield}
          iconColor="text-primary-600"
          iconBg="bg-primary-100"
        />
        <KPICard
          title="Staff Members"
          value="34"
          icon={Users}
          iconColor="text-secondary-600"
          iconBg="bg-secondary-100"
        />
      </div>

      <Tabs defaultValue="users" className="space-y-6">
        <TabsList>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="workshops">Workshop Settings</TabsTrigger>
          <TabsTrigger value="categories">Tool Categories</TabsTrigger>
          <TabsTrigger value="audit">Audit Log</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <div className="p-6 border-b border-secondary-200">
              <div className="flex items-center justify-between">
                <h3 className="text-secondary-900">Users & Roles</h3>
                <div className="flex gap-3">
                  <Input placeholder="Search users..." className="w-64" />
                  <Button variant="outline">
                    <Upload className="w-4 h-4 mr-2" />
                    Bulk Import
                  </Button>
                </div>
              </div>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Workshop</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          user.role === "Administrator"
                            ? "border-error-200 bg-error-50 text-error-700"
                            : user.role === "Supervisor"
                            ? "border-primary-200 bg-primary-50 text-primary-700"
                            : "border-secondary-200 bg-secondary-50 text-secondary-700"
                        }
                      >
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.workshop}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          user.status === "Active"
                            ? "border-success-200 bg-success-50 text-success-700"
                            : "border-secondary-200 bg-secondary-50 text-secondary-700"
                        }
                      >
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-secondary-600">{user.lastLogin}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="w-4 h-4 text-error-600" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="workshops" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-secondary-900">Aviation Workshop</h3>
                <Button variant="ghost" size="sm">
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-secondary-600">Total Tools</span>
                  <span className="font-medium">524</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-secondary-600">Supervisors</span>
                  <span className="font-medium">4</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-secondary-600">Staff Members</span>
                  <span className="font-medium">12</span>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  Configure
                </Button>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-secondary-900">Mechanical Workshop</h3>
                <Button variant="ghost" size="sm">
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-secondary-600">Total Tools</span>
                  <span className="font-medium">438</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-secondary-600">Supervisors</span>
                  <span className="font-medium">3</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-secondary-600">Staff Members</span>
                  <span className="font-medium">10</span>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  Configure
                </Button>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-secondary-900">Electrical Workshop</h3>
                <Button variant="ghost" size="sm">
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-secondary-600">Total Tools</span>
                  <span className="font-medium">322</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-secondary-600">Supervisors</span>
                  <span className="font-medium">3</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-secondary-600">Staff Members</span>
                  <span className="font-medium">8</span>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  Configure
                </Button>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          <Card>
            <div className="p-6 border-b border-secondary-200">
              <div className="flex items-center justify-between">
                <h3 className="text-secondary-900">Tool Categories Master List</h3>
                <Button>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add Category
                </Button>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map((category, index) => (
                  <Card key={index} className="p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-secondary-900">{category.name}</h4>
                        <p className="text-sm text-secondary-600 mt-1">{category.count} tools</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="w-4 h-4 text-error-600" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="audit" className="space-y-4">
          <Card>
            <div className="p-6 border-b border-secondary-200">
              <div className="flex items-center justify-between">
                <h3 className="text-secondary-900">System Activity & Audit Log</h3>
                <div className="flex gap-3">
                  <Input placeholder="Search logs..." className="w-64" />
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Export Log
                  </Button>
                </div>
              </div>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Category</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {auditLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="text-sm text-secondary-600">{log.timestamp}</TableCell>
                    <TableCell className="font-medium">{log.user}</TableCell>
                    <TableCell>{log.action}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {log.category}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
