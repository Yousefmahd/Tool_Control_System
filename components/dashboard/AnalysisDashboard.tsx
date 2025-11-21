import { Card } from "../ui/card";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Download, TrendingUp, TrendingDown } from "lucide-react";

const toolUsageData = [
  { month: "Jan", aviation: 245, mechanical: 198, electrical: 156 },
  { month: "Feb", aviation: 268, mechanical: 210, electrical: 172 },
  { month: "Mar", aviation: 289, mechanical: 225, electrical: 188 },
  { month: "Apr", aviation: 312, mechanical: 242, electrical: 205 },
  { month: "May", aviation: 298, mechanical: 235, electrical: 198 },
  { month: "Jun", aviation: 325, mechanical: 258, electrical: 215 },
  { month: "Jul", aviation: 342, mechanical: 272, electrical: 228 },
  { month: "Aug", aviation: 356, mechanical: 285, electrical: 242 },
  { month: "Sep", aviation: 338, mechanical: 268, electrical: 232 },
  { month: "Oct", aviation: 365, mechanical: 292, electrical: 248 },
  { month: "Nov", aviation: 378, mechanical: 305, electrical: 262 },
];

const mostBorrowedTools = [
  { name: "Torque Wrench", count: 156 },
  { name: "Digital Multimeter", count: 142 },
  { name: "Impact Driver", count: 128 },
  { name: "Wire Stripper", count: 115 },
  { name: "Hydraulic Jack", count: 98 },
  { name: "Drill Press", count: 87 },
  { name: "Oscilloscope", count: 76 },
];

const statusDistribution = [
  { name: "Available", value: 856, color: "#22c55e" },
  { name: "Assigned", value: 342, color: "#3b82f6" },
  { name: "Maintenance", value: 68, color: "#f59e0b" },
  { name: "Missing", value: 18, color: "#ef4444" },
];

const maintenanceTrends = [
  { month: "Jun", scheduled: 24, emergency: 8 },
  { month: "Jul", scheduled: 28, emergency: 6 },
  { month: "Aug", scheduled: 22, emergency: 10 },
  { month: "Sep", scheduled: 26, emergency: 7 },
  { month: "Oct", scheduled: 30, emergency: 5 },
  { month: "Nov", scheduled: 25, emergency: 9 },
];

export function AnalysisDashboard() {
  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-secondary-900">Analytics & Reports</h2>
          <p className="text-secondary-600 mt-1">Tool usage insights and trends</p>
        </div>
        <div className="flex gap-3">
          <Select defaultValue="30">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
              <SelectItem value="365">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-secondary-600 text-sm mb-2">Total Checkouts</p>
              <p className="text-3xl font-semibold text-secondary-900">945</p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="w-4 h-4 text-success-600" />
                <span className="text-sm text-success-600">+12.5%</span>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-secondary-600 text-sm mb-2">Avg. Usage Time</p>
              <p className="text-3xl font-semibold text-secondary-900">2.4d</p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingDown className="w-4 h-4 text-success-600" />
                <span className="text-sm text-success-600">-8.2%</span>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-secondary-600 text-sm mb-2">Utilization Rate</p>
              <p className="text-3xl font-semibold text-secondary-900">73%</p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="w-4 h-4 text-success-600" />
                <span className="text-sm text-success-600">+5.3%</span>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-secondary-600 text-sm mb-2">Late Returns</p>
              <p className="text-3xl font-semibold text-secondary-900">23</p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingDown className="w-4 h-4 text-success-600" />
                <span className="text-sm text-success-600">-15.8%</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <div className="p-6 border-b border-secondary-200">
            <h3 className="text-secondary-900">Monthly Tool Usage by Workshop</h3>
          </div>
          <div className="p-6">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={toolUsageData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Bar dataKey="aviation" fill="#0ea5e9" name="Aviation" radius={[4, 4, 0, 0]} />
                <Bar dataKey="mechanical" fill="#f97316" name="Mechanical" radius={[4, 4, 0, 0]} />
                <Bar dataKey="electrical" fill="#eab308" name="Electrical" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <div className="p-6 border-b border-secondary-200">
            <h3 className="text-secondary-900">Tool Status Distribution</h3>
          </div>
          <div className="p-6">
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={statusDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <div className="p-6 border-b border-secondary-200">
            <h3 className="text-secondary-900">Most Borrowed Tools</h3>
          </div>
          <div className="p-6">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={mostBorrowedTools} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis type="number" stroke="#64748b" />
                <YAxis dataKey="name" type="category" stroke="#64748b" width={120} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="count" fill="#3b82f6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <div className="p-6 border-b border-secondary-200">
            <h3 className="text-secondary-900">Maintenance Trends</h3>
          </div>
          <div className="p-6">
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={maintenanceTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="scheduled"
                  stroke="#22c55e"
                  strokeWidth={2}
                  name="Scheduled"
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="emergency"
                  stroke="#ef4444"
                  strokeWidth={2}
                  name="Emergency"
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card>
        <div className="p-6 border-b border-secondary-200">
          <div className="flex items-center justify-between">
            <h3 className="text-secondary-900">Workshop Performance Comparison</h3>
            <Select defaultValue="checkouts">
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="checkouts">Total Checkouts</SelectItem>
                <SelectItem value="utilization">Utilization Rate</SelectItem>
                <SelectItem value="maintenance">Maintenance Events</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-24 h-24 rounded-full bg-[#0ea5e9] bg-opacity-10 flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-semibold" style={{ color: "#0ea5e9" }}>378</span>
              </div>
              <h4 className="text-secondary-900 mb-1">Aviation Workshop</h4>
              <p className="text-sm text-secondary-600">Monthly checkouts</p>
              <div className="flex items-center justify-center gap-1 mt-2">
                <TrendingUp className="w-4 h-4 text-success-600" />
                <span className="text-sm text-success-600">+8.5%</span>
              </div>
            </div>

            <div className="text-center">
              <div className="w-24 h-24 rounded-full bg-[#f97316] bg-opacity-10 flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-semibold" style={{ color: "#f97316" }}>305</span>
              </div>
              <h4 className="text-secondary-900 mb-1">Mechanical Workshop</h4>
              <p className="text-sm text-secondary-600">Monthly checkouts</p>
              <div className="flex items-center justify-center gap-1 mt-2">
                <TrendingUp className="w-4 h-4 text-success-600" />
                <span className="text-sm text-success-600">+6.2%</span>
              </div>
            </div>

            <div className="text-center">
              <div className="w-24 h-24 rounded-full bg-[#eab308] bg-opacity-10 flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-semibold" style={{ color: "#eab308" }}>262</span>
              </div>
              <h4 className="text-secondary-900 mb-1">Electrical Workshop</h4>
              <p className="text-sm text-secondary-600">Monthly checkouts</p>
              <div className="flex items-center justify-center gap-1 mt-2">
                <TrendingUp className="w-4 h-4 text-success-600" />
                <span className="text-sm text-success-600">+5.6%</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
