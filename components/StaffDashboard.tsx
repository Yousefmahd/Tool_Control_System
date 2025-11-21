import { User, Package, Clock, AlertCircle, CheckCircle, FileText } from 'lucide-react';
import { mockAssignments, mockStudents } from '../data/mockData';
import { StatusBadge } from './StatusBadge';
import { Button } from './ui/button';

export function StaffDashboard() {
  // Simulating logged-in student
  const currentStudent = mockStudents[0];
  const myAssignments = mockAssignments.filter(a => a.studentId === currentStudent.id);
  const activeAssignments = myAssignments.filter(a => a.status === 'Active');
  const completedAssignments = myAssignments.filter(a => a.status === 'Returned');

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-[var(--color-neutral-900)] mb-2">Student Portal</h1>
        <p className="text-[var(--color-neutral-600)]">Welcome, {currentStudent.name}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg border border-[var(--color-border)] shadow-[var(--shadow-sm)] p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-[var(--color-neutral-600)]">Active Tools</p>
            <Package className="w-5 h-5 text-[var(--color-aviation-primary)]" />
          </div>
          <p className="text-3xl text-[var(--color-neutral-900)] mb-1">{activeAssignments.length}</p>
          <p className="text-xs text-[var(--color-neutral-600)]">Currently checked out</p>
        </div>

        <div className="bg-white rounded-lg border border-[var(--color-border)] shadow-[var(--shadow-sm)] p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-[var(--color-neutral-600)]">Completed Returns</p>
            <CheckCircle className="w-5 h-5 text-[var(--color-success)]" />
          </div>
          <p className="text-3xl text-[var(--color-neutral-900)] mb-1">{completedAssignments.length}</p>
          <p className="text-xs text-[var(--color-neutral-600)]">Tools returned on time</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h3 className="text-[var(--color-neutral-900)] mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          <Button className="bg-[var(--color-aviation-primary)] hover:bg-[var(--color-aviation-primary-dark)] text-white">
            <FileText className="w-4 h-4 mr-2" />
            Request Tool
          </Button>
          <Button variant="outline" className="border-[var(--color-border)]">
            <CheckCircle className="w-4 h-4 mr-2" />
            Return Tool
          </Button>
        </div>
      </div>

      {/* Notifications */}
      {activeAssignments.length > 0 && (
        <div className="mb-8">
          <h3 className="text-[var(--color-neutral-900)] mb-4">Notifications</h3>
          <div className="space-y-3">
            {activeAssignments.map((assignment) => (
              <div key={assignment.id} className="bg-[var(--color-danger)] bg-opacity-5 border-l-4 border-[var(--color-danger)] p-4 rounded-r-lg">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[var(--color-danger)] flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h5 className="text-[var(--color-neutral-900)]">Overdue Tool</h5>
                    <p className="text-sm text-[var(--color-neutral-600)] mt-1">
                      {assignment.toolName} (ID: {assignment.toolId}) was due on {assignment.dueDate}
                    </p>
                    <Button 
                      size="sm" 
                      className="mt-3 bg-[var(--color-danger)] hover:bg-[var(--color-danger-dark)] text-white"
                    >
                      Return Now
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* My Tools */}
      <div>
        <h3 className="text-[var(--color-neutral-900)] mb-4">My Assigned Tools</h3>
        <div className="bg-white rounded-lg border border-[var(--color-border)] shadow-[var(--shadow-sm)] overflow-hidden">
          {activeAssignments.length === 0 ? (
            <div className="p-12 text-center">
              <Package className="w-12 h-12 text-[var(--color-neutral-300)] mx-auto mb-3" />
              <p className="text-[var(--color-neutral-600)]">No tools currently assigned</p>
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-[var(--color-neutral-50)] border-b border-[var(--color-border)]">
                <tr>
                  <th className="text-left px-6 py-3 text-xs text-[var(--color-neutral-600)] uppercase tracking-wider">
                    Tool ID
                  </th>
                  <th className="text-left px-6 py-3 text-xs text-[var(--color-neutral-600)] uppercase tracking-wider">
                    Tool Name
                  </th>
                  <th className="text-left px-6 py-3 text-xs text-[var(--color-neutral-600)] uppercase tracking-wider">
                    Checkout Date
                  </th>
                  <th className="text-left px-6 py-3 text-xs text-[var(--color-neutral-600)] uppercase tracking-wider">
                    Due Date
                  </th>
                  <th className="text-left px-6 py-3 text-xs text-[var(--color-neutral-600)] uppercase tracking-wider">
                    Supervisor
                  </th>
                  <th className="text-left px-6 py-3 text-xs text-[var(--color-neutral-600)] uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-left px-6 py-3 text-xs text-[var(--color-neutral-600)] uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border)]">
                {activeAssignments.map((assignment) => (
                  <tr key={assignment.id} className="hover:bg-[var(--color-neutral-50)]">
                    <td className="px-6 py-4">
                      <span className="text-sm text-[var(--color-aviation-primary)]">{assignment.toolId}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-[var(--color-neutral-900)]">{assignment.toolName}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-[var(--color-neutral-700)]">{assignment.checkoutDate}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-[var(--color-neutral-700)]">{assignment.dueDate || 'N/A'}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-[var(--color-neutral-700)]">{assignment.supervisorName}</span>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={assignment.status} size="sm" />
                    </td>
                    <td className="px-6 py-4">
                      <Button size="sm" variant="outline">
                        Return
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Request History */}
      <div className="mt-8">
        <h3 className="text-[var(--color-neutral-900)] mb-4">Request History</h3>
        <div className="bg-white rounded-lg border border-[var(--color-border)] shadow-[var(--shadow-sm)] overflow-hidden">
          <table className="w-full">
            <thead className="bg-[var(--color-neutral-50)] border-b border-[var(--color-border)]">
              <tr>
                <th className="text-left px-6 py-3 text-xs text-[var(--color-neutral-600)] uppercase tracking-wider">
                  Tool
                </th>
                <th className="text-left px-6 py-3 text-xs text-[var(--color-neutral-600)] uppercase tracking-wider">
                  Checkout
                </th>
                <th className="text-left px-6 py-3 text-xs text-[var(--color-neutral-600)] uppercase tracking-wider">
                  Return
                </th>
                <th className="text-left px-6 py-3 text-xs text-[var(--color-neutral-600)] uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {myAssignments.map((assignment) => (
                <tr key={assignment.id} className="hover:bg-[var(--color-neutral-50)]">
                  <td className="px-4 py-3 text-sm text-[var(--color-aviation-primary)]">{assignment.toolId}</td>
                  <td className="px-4 py-3 text-sm text-[var(--color-neutral-900)]">{assignment.toolName}</td>
                  <td className="px-4 py-3 text-sm text-[var(--color-neutral-700)]">{assignment.checkoutDate}</td>
                  <td className="px-4 py-3 text-sm text-[var(--color-neutral-700)]">{assignment.dueDate || 'N/A'}</td>
                  <td className="px-4 py-3"><StatusBadge status={assignment.status} size="sm" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}