import { Package, UserCheck, CheckCircle, Wrench, AlertTriangle, Plane, Settings as SettingsIcon, Zap } from "lucide-react";
import { KPICard } from "../shared/KPICard";
import { WorkshopCard } from "../shared/WorkshopCard";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { StatusBadge, ToolStatus } from "../shared/StatusBadge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

interface ToolControlDashboardProps {
  onNavigate: (page: string) => void;
}

const recentActivity = [
  {
    id: "T-001",
    name: "Torque Wrench",
    workshop: "Aviation",
    staff: "Mike Johnson",
    action: "Checked Out",
    time: "2 hours ago",
    status: "assigned" as ToolStatus,
  },
  {
    id: "T-045",
    name: "Multimeter",
    workshop: "Electrical",
    staff: "Sarah Chen",
    action: "Returned",
    time: "3 hours ago",
    status: "available" as ToolStatus,
  },
  {
    id: "T-089",
    name: "Drill Press",
    workshop: "Mechanical",
    staff: "David Lee",
    action: "Under Maintenance",
    time: "5 hours ago",
    status: "maintenance" as ToolStatus,
  },
  {
    id: "T-034",
    name: "Wire Stripper",
    workshop: "Electrical",
    staff: "Emma Wilson",
    action: "Checked Out",
    time: "6 hours ago",
    status: "assigned" as ToolStatus,
  },
];

const alerts = [
  {
    id: 1,
    type: "overdue",
    message: "Tool T-012 (Hydraulic Jack) is 2 days overdue",
    severity: "high",
  },
  {
    id: 2,
    type: "missing",
    message: "Tool T-056 (Impact Driver) marked as missing",
    severity: "critical",
  },
  {
    id: 3,
    type: "inspection",
    message: "5 tools require quarterly safety inspection",
    severity: "medium",
  },
];

export function ToolControlDashboard({ onNavigate }: ToolControlDashboardProps) {
  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-secondary-900">Overview</h2>
          <p className="text-secondary-600 mt-1">Real-time tool tracking and management</p>
        </div>
        <div className="flex gap-3">
          <Button onClick={() => onNavigate("assign-tool")}>Assign Tool</Button>
          <Button variant="outline" onClick={() => onNavigate("return-tool")}>Return Tool</Button>
          <Button variant="outline" onClick={() => onNavigate("inventory")}>
            <Package className="w-4 h-4 mr-2" />
            Add Tool
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <KPICard
          title="Total Tools"
          value="1,284"
          icon={Package}
          trend={{ value: "12 this month", isPositive: true }}
        />
        <KPICard
          title="Tools Assigned"
          value="342"
          icon={UserCheck}
          iconColor="text-primary-600"
          iconBg="bg-primary-100"
        />
        <KPICard
          title="Available"
          value="856"
          icon={CheckCircle}
          iconColor="text-success-600"
          iconBg="bg-success-100"
        />
        <KPICard
          title="Under Maintenance"
          value="68"
          icon={Wrench}
          iconColor="text-warning-600"
          iconBg="bg-warning-100"
        />
        <KPICard
          title="Missing"
          value="18"
          icon={AlertTriangle}
          iconColor="text-error-600"
          iconBg="bg-error-100"
        />
      </div>

      <div>
        <h3 className="text-secondary-900 mb-4">Workshops</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <WorkshopCard
            name="Aviation"
            icon={Plane}
            totalTools={524}
            available={342}
            assigned={145}
            color="#0ea5e9"
            onView={() => onNavigate("aviation")}
          />
          <WorkshopCard
            name="Mechanical"
            icon={SettingsIcon}
            totalTools={438}
            available={298}
            assigned={112}
            color="#f97316"
            onView={() => onNavigate("mechanical")}
          />
          <WorkshopCard
            name="Electrical"
            icon={Zap}
            totalTools={322}
            available={216}
            assigned={85}
            color="#eab308"
            onView={() => onNavigate("electrical")}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <div className="p-6 border-b border-secondary-200">
              <h3 className="text-secondary-900">Recent Activity</h3>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tool ID</TableHead>
                  <TableHead>Tool Name</TableHead>
                  <TableHead>Workshop</TableHead>
                  <TableHead>Staff</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentActivity.map((activity) => (
                  <TableRow key={activity.id}>
                    <TableCell className="font-medium">{activity.id}</TableCell>
                    <TableCell>{activity.name}</TableCell>
                    <TableCell>{activity.workshop}</TableCell>
                    <TableCell>{activity.staff}</TableCell>
                    <TableCell className="text-secondary-600">{activity.action}</TableCell>
                    <TableCell>
                      <StatusBadge status={activity.status} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>

        <Card>
          <div className="p-6 border-b border-secondary-200">
            <h3 className="text-secondary-900">Alerts & Notifications</h3>
          </div>
          <div className="p-6 space-y-4">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className="p-4 rounded-lg border border-secondary-200 bg-secondary-50"
              >
                <div className="flex items-start gap-3">
                  <AlertTriangle
                    className={`w-5 h-5 mt-0.5 ${
                      alert.severity === "critical"
                        ? "text-error-600"
                        : alert.severity === "high"
                        ? "text-warning-600"
                        : "text-primary-600"
                    }`}
                  />
                  <div className="flex-1">
                    <p className="text-sm text-secondary-900">{alert.message}</p>
                    <Button variant="link" className="h-auto p-0 text-xs mt-1">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full">
              View All Alerts
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
