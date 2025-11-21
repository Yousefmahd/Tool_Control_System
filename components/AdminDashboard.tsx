import { useState } from 'react';
import { Users, UserPlus, Shield, Settings, Download, Upload, FileText, Activity } from 'lucide-react';
import { mockStudents } from '../data/mockData';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { CreateUserDialog } from './CreateUserDialog';

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('staff');
  const [isCreateStaffDialogOpen, setIsCreateStaffDialogOpen] = useState(false);
  const [isCreateStudentDialogOpen, setIsCreateStudentDialogOpen] = useState(false);
  const [users, setUsers] = useState(mockStudents);

  const staff = users.filter(s => s.role === 'Supervisor' || s.role === 'Admin');
  const students = users.filter(s => s.role === 'Student');
  const admins = users.filter(s => s.role === 'Admin');
  const supervisors = users.filter(s => s.role === 'Supervisor');

  const handleCreateUser = (newUser: any) => {
    setUsers([...users, newUser]);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-[var(--color-neutral-900)] mb-2">Admin Dashboard</h1>
        <p className="text-[var(--color-neutral-600)]">System administration and user management</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg border border-[var(--color-border)] shadow-[var(--shadow-sm)] p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[var(--color-neutral-600)] mb-1">Total Users</p>
              <h3 className="text-[var(--color-neutral-900)]">{users.length}</h3>
            </div>
            <Users className="w-8 h-8 text-[var(--color-aviation-primary)]" />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-[var(--color-border)] shadow-[var(--shadow-sm)] p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[var(--color-neutral-600)] mb-1">Students</p>
              <h3 className="text-[var(--color-neutral-900)]">{students.length}</h3>
            </div>
            <Users className="w-8 h-8 text-[var(--color-success)]" />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-[var(--color-border)] shadow-[var(--shadow-sm)] p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[var(--color-neutral-600)] mb-1">Staff Members</p>
              <h3 className="text-[var(--color-neutral-900)]">{staff.length}</h3>
            </div>
            <Shield className="w-8 h-8 text-[var(--color-success)]" />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-[var(--color-border)] shadow-[var(--shadow-sm)] p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[var(--color-neutral-600)] mb-1">Administrators</p>
              <h3 className="text-[var(--color-neutral-900)]">{admins.length}</h3>
            </div>
            <Shield className="w-8 h-8 text-[var(--color-warning)]" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-lg border border-[var(--color-border)] shadow-[var(--shadow-sm)]">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="border-b border-[var(--color-border)] px-6">
            <TabsList className="bg-transparent border-0 h-auto p-0">
              <TabsTrigger 
                value="staff" 
                className="data-[state=active]:border-b-2 data-[state=active]:border-[var(--color-aviation-primary)] rounded-none px-4 py-3"
              >
                Staff Management
              </TabsTrigger>
              <TabsTrigger 
                value="students"
                className="data-[state=active]:border-b-2 data-[state=active]:border-[var(--color-aviation-primary)] rounded-none px-4 py-3"
              >
                Student Management
              </TabsTrigger>
              <TabsTrigger 
                value="workshops"
                className="data-[state=active]:border-b-2 data-[state=active]:border-[var(--color-aviation-primary)] rounded-none px-4 py-3"
              >
                Workshop Config
              </TabsTrigger>
              <TabsTrigger 
                value="categories"
                className="data-[state=active]:border-b-2 data-[state=active]:border-[var(--color-aviation-primary)] rounded-none px-4 py-3"
              >
                Tool Categories
              </TabsTrigger>
              <TabsTrigger 
                value="audit"
                className="data-[state=active]:border-b-2 data-[state=active]:border-[var(--color-aviation-primary)] rounded-none px-4 py-3"
              >
                Audit Log
              </TabsTrigger>
              <TabsTrigger 
                value="import"
                className="data-[state=active]:border-b-2 data-[state=active]:border-[var(--color-aviation-primary)] rounded-none px-4 py-3"
              >
                Import/Export
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="staff" className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <h4 className="text-[var(--color-neutral-900)]">Staff Accounts</h4>
              <Button className="bg-[var(--color-aviation-primary)] hover:bg-[var(--color-aviation-primary-dark)] text-white" onClick={() => setIsCreateStaffDialogOpen(true)}>
                <UserPlus className="w-4 h-4 mr-2" />
                Add Staff
              </Button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[var(--color-neutral-50)] border-b border-[var(--color-border)]">
                  <tr>
                    <th className="text-left px-4 py-3 text-xs text-[var(--color-neutral-600)] uppercase tracking-wider">
                      Name
                    </th>
                    <th className="text-left px-4 py-3 text-xs text-[var(--color-neutral-600)] uppercase tracking-wider">
                      Email
                    </th>
                    <th className="text-left px-4 py-3 text-xs text-[var(--color-neutral-600)] uppercase tracking-wider">
                      Role
                    </th>
                    <th className="text-left px-4 py-3 text-xs text-[var(--color-neutral-600)] uppercase tracking-wider">
                      Department
                    </th>
                    <th className="text-left px-4 py-3 text-xs text-[var(--color-neutral-600)] uppercase tracking-wider">
                      Workshop
                    </th>
                    <th className="text-left px-4 py-3 text-xs text-[var(--color-neutral-600)] uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-border)]">
                  {staff.map((user) => (
                    <tr key={user.id} className="hover:bg-[var(--color-neutral-50)]">
                      <td className="px-4 py-3 text-sm text-[var(--color-neutral-900)]">{user.name}</td>
                      <td className="px-4 py-3 text-sm text-[var(--color-neutral-700)]">{user.email}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs ${
                          user.role === 'Admin' 
                            ? 'bg-purple-100 text-purple-800' 
                            : user.role === 'Supervisor'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-[var(--color-neutral-700)]">{user.department}</td>
                      <td className="px-4 py-3 text-sm text-[var(--color-neutral-700)]">{user.workshop}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="students" className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <h4 className="text-[var(--color-neutral-900)]">Student Accounts</h4>
              <Button className="bg-[var(--color-aviation-primary)] hover:bg-[var(--color-aviation-primary-dark)] text-white" onClick={() => setIsCreateStudentDialogOpen(true)}>
                <UserPlus className="w-4 h-4 mr-2" />
                Add Student
              </Button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[var(--color-neutral-50)] border-b border-[var(--color-border)]">
                  <tr>
                    <th className="text-left px-4 py-3 text-xs text-[var(--color-neutral-600)] uppercase tracking-wider">
                      Name
                    </th>
                    <th className="text-left px-4 py-3 text-xs text-[var(--color-neutral-600)] uppercase tracking-wider">
                      Email
                    </th>
                    <th className="text-left px-4 py-3 text-xs text-[var(--color-neutral-600)] uppercase tracking-wider">
                      Role
                    </th>
                    <th className="text-left px-4 py-3 text-xs text-[var(--color-neutral-600)] uppercase tracking-wider">
                      Department
                    </th>
                    <th className="text-left px-4 py-3 text-xs text-[var(--color-neutral-600)] uppercase tracking-wider">
                      Workshop
                    </th>
                    <th className="text-left px-4 py-3 text-xs text-[var(--color-neutral-600)] uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-border)]">
                  {students.map((user) => (
                    <tr key={user.id} className="hover:bg-[var(--color-neutral-50)]">
                      <td className="px-4 py-3 text-sm text-[var(--color-neutral-900)]">{user.name}</td>
                      <td className="px-4 py-3 text-sm text-[var(--color-neutral-700)]">{user.email}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs ${
                          user.role === 'Admin' 
                            ? 'bg-purple-100 text-purple-800' 
                            : user.role === 'Supervisor'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-[var(--color-neutral-700)]">{user.department}</td>
                      <td className="px-4 py-3 text-sm text-[var(--color-neutral-700)]">{user.workshop}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="workshops" className="p-6">
            <h4 className="text-[var(--color-neutral-900)] mb-4">Workshop Configuration</h4>
            <div className="space-y-4">
              {['Aviation', 'Mechanical', 'Electrical'].map((workshop) => (
                <div key={workshop} className="border border-[var(--color-border)] rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h5 className="text-[var(--color-neutral-900)]">{workshop} Workshop</h5>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-[var(--color-neutral-600)]">Location:</p>
                      <p className="text-[var(--color-neutral-900)]">Building {workshop.charAt(0)}</p>
                    </div>
                    <div>
                      <p className="text-[var(--color-neutral-600)]">Capacity:</p>
                      <p className="text-[var(--color-neutral-900)]">50 tools</p>
                    </div>
                    <div>
                      <p className="text-[var(--color-neutral-600)]">Supervisor:</p>
                      <p className="text-[var(--color-neutral-900)]">{supervisors.find(s => s.workshop === workshop)?.name || 'Not assigned'}</p>
                    </div>
                    <div>
                      <p className="text-[var(--color-neutral-600)]">Status:</p>
                      <p className="text-[var(--color-success)]">Active</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="categories" className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <h4 className="text-[var(--color-neutral-900)]">Tool Category Master List</h4>
              <Button className="bg-[var(--color-aviation-primary)] hover:bg-[var(--color-aviation-primary-dark)] text-white">
                Add Category
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['Hand Tools', 'Power Tools', 'Electrical Testing', 'Measurement', 'Cutting Tools', 'Assembly Tools', 'Heavy Equipment', 'Machinery', 'Testing Equipment', 'Inspection Tools'].map((category) => (
                <div key={category} className="border border-[var(--color-border)] rounded-lg p-4 hover:border-[var(--color-aviation-primary)] transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[var(--color-neutral-900)]">{category}</span>
                    <button className="text-sm text-[var(--color-aviation-primary)] hover:text-[var(--color-aviation-primary-dark)]">
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="audit" className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <h4 className="text-[var(--color-neutral-900)]">System Activity Log</h4>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export Log
              </Button>
            </div>
            <div className="space-y-3">
              {[
                { time: '2025-11-21 14:30', user: 'Admin User', action: 'Added new tool: Torque Wrench', type: 'create' },
                { time: '2025-11-21 13:15', user: 'Michael Brown', action: 'Approved tool assignment for John Smith', type: 'approve' },
                { time: '2025-11-21 12:00', user: 'Sarah Johnson', action: 'Returned tool: Socket Set', type: 'return' },
                { time: '2025-11-21 10:45', user: 'Admin User', action: 'Updated workshop configuration', type: 'update' },
                { time: '2025-11-21 09:30', user: 'Robert Garcia', action: 'Checked out Cable Crimping Tool', type: 'checkout' },
              ].map((log, index) => (
                <div key={index} className="flex items-start gap-4 p-3 border border-[var(--color-border)] rounded-lg">
                  <Activity className="w-5 h-5 text-[var(--color-aviation-primary)] flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-[var(--color-neutral-900)]">{log.action}</p>
                    <p className="text-xs text-[var(--color-neutral-600)] mt-1">
                      {log.user} · {log.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="import" className="p-6">
            <h4 className="text-[var(--color-neutral-900)] mb-6">Bulk Import / Export Tools</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border-2 border-dashed border-[var(--color-border)] rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 text-[var(--color-neutral-400)] mx-auto mb-4" />
                <h5 className="text-[var(--color-neutral-900)] mb-2">Import Tools</h5>
                <p className="text-sm text-[var(--color-neutral-600)] mb-4">
                  Upload a CSV or Excel file to bulk import tools
                </p>
                <Button className="bg-[var(--color-aviation-primary)] hover:bg-[var(--color-aviation-primary-dark)] text-white">
                  Select File
                </Button>
              </div>
              <div className="border-2 border-dashed border-[var(--color-border)] rounded-lg p-8 text-center">
                <Download className="w-12 h-12 text-[var(--color-neutral-400)] mx-auto mb-4" />
                <h5 className="text-[var(--color-neutral-900)] mb-2">Export Tools</h5>
                <p className="text-sm text-[var(--color-neutral-600)] mb-4">
                  Download complete tool inventory as CSV or Excel
                </p>
                <Button variant="outline">
                  Export to CSV
                </Button>
              </div>
            </div>

            <div className="mt-8">
              <h5 className="text-[var(--color-neutral-900)] mb-4">Import Template</h5>
              <p className="text-sm text-[var(--color-neutral-600)] mb-4">
                Download the import template to ensure your data is formatted correctly
              </p>
              <Button variant="outline">
                <FileText className="w-4 h-4 mr-2" />
                Download Template
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Create User Dialogs */}
      <CreateUserDialog
        isOpen={isCreateStaffDialogOpen}
        onClose={() => setIsCreateStaffDialogOpen(false)}
        onCreateUser={handleCreateUser}
        userType="staff"
      />
      <CreateUserDialog
        isOpen={isCreateStudentDialogOpen}
        onClose={() => setIsCreateStudentDialogOpen(false)}
        onCreateUser={handleCreateUser}
        userType="student"
      />
    </div>
  );
}