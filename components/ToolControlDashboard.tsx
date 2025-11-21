import { Package, Users, Wrench, AlertTriangle, CheckCircle, Clock, Plus, ArrowRight } from 'lucide-react';
import { Plane, Cog, Zap } from 'lucide-react';
import { KPICard } from './KPICard';
import { WorkshopCard } from './WorkshopCard';
import { AlertCard } from './AlertCard';
import { StatusBadge } from './StatusBadge';
import { mockTools, mockAssignments } from '../data/mockData';
import { Button } from './ui/button';
import { useUser } from '../context/UserContext';

interface ToolControlDashboardProps {
  onNavigate: (page: string) => void;
}

export function ToolControlDashboard({ onNavigate }: ToolControlDashboardProps) {
  const { currentUser, canAccessWorkshop } = useUser();
  const isAdmin = currentUser.role === 'Admin' || currentUser.workshop === 'All';
  
  // Filter tools based on user's workshop access
  const visibleTools = isAdmin 
    ? mockTools 
    : mockTools.filter(t => canAccessWorkshop(t.workshop));
  
  const totalTools = visibleTools.length;
  const assignedTools = visibleTools.filter(t => t.status === 'Assigned').length;
  const availableTools = visibleTools.filter(t => t.status === 'Available').length;
  const maintenanceTools = visibleTools.filter(t => t.status === 'Under Maintenance').length;
  const missingTools = visibleTools.filter(t => t.status === 'Missing').length;

  const aviationTools = visibleTools.filter(t => t.workshop === 'Aviation');
  const mechanicalTools = visibleTools.filter(t => t.workshop === 'Mechanical');
  const electricalTools = visibleTools.filter(t => t.workshop === 'Electrical');

  // Filter assignments based on tool access
  const visibleAssignments = mockAssignments.filter(a => {
    const tool = mockTools.find(t => t.id === a.toolId);
    return isAdmin || (tool && canAccessWorkshop(tool.workshop));
  });
  
  const recentAssignments = visibleAssignments.slice(0, 5);
  const overdueAssignments = visibleAssignments.filter(a => a.status === 'Overdue').length;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-[var(--color-neutral-900)] mb-2">Tool Control Dashboard</h1>
        <p className="text-[var(--color-neutral-600)]">
          {isAdmin 
            ? 'Monitor and manage all tools across workshops' 
            : `Monitor and manage ${currentUser.workshop} workshop tools`}
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <KPICard
          title="Total Tools"
          value={totalTools}
          icon={Package}
          trend={{ value: '12%', isPositive: true }}
          color="var(--color-aviation-primary)"
        />
        <KPICard
          title="Tools Assigned"
          value={assignedTools}
          icon={Users}
          trend={{ value: '8%', isPositive: true }}
          color="var(--color-aviation-primary)"
        />
        <KPICard
          title="Available"
          value={availableTools}
          icon={CheckCircle}
          color="var(--color-success)"
        />
        <KPICard
          title="Under Maintenance"
          value={maintenanceTools}
          icon={Wrench}
          color="var(--color-warning)"
        />
        <KPICard
          title="Missing"
          value={missingTools}
          icon={AlertTriangle}
          color="var(--color-danger)"
        />
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h3 className="text-[var(--color-neutral-900)] mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          <Button
            onClick={() => onNavigate('assign-tool')}
            className="bg-[var(--color-aviation-primary)] hover:bg-[var(--color-aviation-primary-dark)] text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Assign Tool
          </Button>
          <Button
            onClick={() => onNavigate('return-tool')}
            className="bg-[var(--color-success)] hover:bg-[var(--color-success-dark)] text-white"
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Return Tool
          </Button>
          <Button
            onClick={() => onNavigate('inventory')}
            variant="outline"
            className="border-[var(--color-border)] text-[var(--color-neutral-700)]"
          >
            <Package className="w-4 h-4 mr-2" />
            View Inventory
          </Button>
        </div>
      </div>

      {/* Alerts */}
      <div className="mb-8">
        <h3 className="text-[var(--color-neutral-900)] mb-4">Alerts & Notifications</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <AlertCard
            type="overdue"
            title="Overdue Returns"
            description="Tools past their return date"
            count={overdueAssignments}
          />
          <AlertCard
            type="missing"
            title="Missing Tools"
            description="Tools marked as missing"
            count={missingTools}
          />
          <AlertCard
            type="inspection"
            title="Inspection Due"
            description="Tools requiring inspection"
            count={3}
          />
        </div>
      </div>

      {/* Workshop Overview */}
      <div className="mb-8">
        <h3 className="text-[var(--color-neutral-900)] mb-4">Workshop Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <WorkshopCard
            name="Aviation Workshop"
            icon={Plane}
            totalTools={aviationTools.length}
            available={aviationTools.filter(t => t.status === 'Available').length}
            assigned={aviationTools.filter(t => t.status === 'Assigned').length}
            maintenance={aviationTools.filter(t => t.status === 'Under Maintenance').length}
            color="#0066CC"
            onClick={() => onNavigate('aviation')}
          />
          <WorkshopCard
            name="Mechanical Workshop"
            icon={Cog}
            totalTools={mechanicalTools.length}
            available={mechanicalTools.filter(t => t.status === 'Available').length}
            assigned={mechanicalTools.filter(t => t.status === 'Assigned').length}
            maintenance={mechanicalTools.filter(t => t.status === 'Under Maintenance').length}
            color="#475569"
            onClick={() => onNavigate('mechanical')}
          />
          <WorkshopCard
            name="Electrical Workshop"
            icon={Zap}
            totalTools={electricalTools.length}
            available={electricalTools.filter(t => t.status === 'Available').length}
            assigned={electricalTools.filter(t => t.status === 'Assigned').length}
            maintenance={electricalTools.filter(t => t.status === 'Under Maintenance').length}
            color="#10B981"
            onClick={() => onNavigate('electrical')}
          />
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[var(--color-neutral-900)]">Recent Tool Movements</h3>
          <button
            onClick={() => onNavigate('inventory')}
            className="text-sm text-[var(--color-aviation-primary)] hover:text-[var(--color-aviation-primary-dark)] flex items-center gap-1"
          >
            View All
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="bg-white rounded-lg border border-[var(--color-border)] shadow-[var(--shadow-sm)] overflow-hidden">
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
                  Staff
                </th>
                <th className="text-left px-6 py-3 text-xs text-[var(--color-neutral-600)] uppercase tracking-wider">
                  Supervisor
                </th>
                <th className="text-left px-6 py-3 text-xs text-[var(--color-neutral-600)] uppercase tracking-wider">
                  Date
                </th>
                <th className="text-left px-6 py-3 text-xs text-[var(--color-neutral-600)] uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {recentAssignments.map((assignment) => (
                <tr key={assignment.id} className="hover:bg-[var(--color-neutral-50)] transition-colors">
                  <td className="px-6 py-4 text-sm text-[var(--color-neutral-900)]">
                    {assignment.toolId}
                  </td>
                  <td className="px-6 py-4 text-sm text-[var(--color-neutral-900)]">
                    {assignment.toolName}
                  </td>
                  <td className="px-6 py-4 text-sm text-[var(--color-neutral-700)]">
                    {assignment.staffName}
                  </td>
                  <td className="px-6 py-4 text-sm text-[var(--color-neutral-700)]">
                    {assignment.supervisorName}
                  </td>
                  <td className="px-6 py-4 text-sm text-[var(--color-neutral-700)]">
                    {assignment.checkoutDate}
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={assignment.status} size="sm" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}