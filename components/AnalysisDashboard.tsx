import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Activity, AlertTriangle, Calendar } from 'lucide-react';
import { toolUsageData, maintenanceTrends, workshopDistribution, mockTools } from '../data/mockData';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

export function AnalysisDashboard() {
  const mostBorrowedTools = [
    { name: 'Torque Wrench', count: 45 },
    { name: 'Multimeter', count: 38 },
    { name: 'Socket Set', count: 35 },
    { name: 'Cable Crimper', count: 28 },
    { name: 'Rivet Gun', count: 25 },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[var(--color-neutral-900)] mb-2">Analysis & Reports</h1>
            <p className="text-[var(--color-neutral-600)]">Visual analytics and insights</p>
          </div>
          <div className="flex items-center gap-3">
            <Select defaultValue="6months">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Time Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1month">Last Month</SelectItem>
                <SelectItem value="3months">Last 3 Months</SelectItem>
                <SelectItem value="6months">Last 6 Months</SelectItem>
                <SelectItem value="1year">Last Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg p-6 border border-[var(--color-border)] shadow-[var(--shadow-sm)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[var(--color-neutral-600)] mb-1">Total Checkouts</p>
              <h3 className="text-[var(--color-neutral-900)]">342</h3>
              <p className="text-xs text-[var(--color-success)] mt-1">↑ 12% from last period</p>
            </div>
            <TrendingUp className="w-8 h-8 text-[var(--color-aviation-primary)]" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-[var(--color-border)] shadow-[var(--shadow-sm)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[var(--color-neutral-600)] mb-1">Avg. Usage Time</p>
              <h3 className="text-[var(--color-neutral-900)]">3.2 days</h3>
              <p className="text-xs text-[var(--color-neutral-500)] mt-1">Per tool checkout</p>
            </div>
            <Activity className="w-8 h-8 text-[var(--color-success)]" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-[var(--color-border)] shadow-[var(--shadow-sm)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[var(--color-neutral-600)] mb-1">Late Returns</p>
              <h3 className="text-[var(--color-neutral-900)]">8</h3>
              <p className="text-xs text-[var(--color-danger)] mt-1">↑ 2 from last period</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-[var(--color-warning)]" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-[var(--color-border)] shadow-[var(--shadow-sm)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[var(--color-neutral-600)] mb-1">Maintenance Jobs</p>
              <h3 className="text-[var(--color-neutral-900)]">45</h3>
              <p className="text-xs text-[var(--color-neutral-500)] mt-1">Last 6 months</p>
            </div>
            <Calendar className="w-8 h-8 text-[var(--color-warning)]" />
          </div>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg border border-[var(--color-border)] shadow-[var(--shadow-sm)] p-6">
          <h4 className="text-[var(--color-neutral-900)] mb-4">Tool Usage by Workshop</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={toolUsageData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-neutral-200)" />
              <XAxis dataKey="month" tick={{ fill: 'var(--color-neutral-600)' }} />
              <YAxis tick={{ fill: 'var(--color-neutral-600)' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px'
                }} 
              />
              <Legend />
              <Bar dataKey="aviation" fill="#0066CC" name="Aviation" />
              <Bar dataKey="mechanical" fill="#475569" name="Mechanical" />
              <Bar dataKey="electrical" fill="#10B981" name="Electrical" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg border border-[var(--color-border)] shadow-[var(--shadow-sm)] p-6">
          <h4 className="text-[var(--color-neutral-900)] mb-4">Workshop Distribution</h4>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={workshopDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {workshopDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg border border-[var(--color-border)] shadow-[var(--shadow-sm)] p-6">
          <h4 className="text-[var(--color-neutral-900)] mb-4">Maintenance Trends</h4>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={maintenanceTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-neutral-200)" />
              <XAxis dataKey="month" tick={{ fill: 'var(--color-neutral-600)' }} />
              <YAxis tick={{ fill: 'var(--color-neutral-600)' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px'
                }} 
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="count" 
                stroke="#F59E0B" 
                strokeWidth={2} 
                name="Maintenance Count"
                dot={{ fill: '#F59E0B', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg border border-[var(--color-border)] shadow-[var(--shadow-sm)] p-6">
          <h4 className="text-[var(--color-neutral-900)] mb-4">Most Borrowed Tools</h4>
          <div className="space-y-4">
            {mostBorrowedTools.map((tool, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-[var(--color-aviation-primary)] bg-opacity-10 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm text-[var(--color-aviation-primary)]">{index + 1}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-[var(--color-neutral-900)]">{tool.name}</span>
                    <span className="text-sm text-[var(--color-neutral-600)]">{tool.count} times</span>
                  </div>
                  <div className="w-full bg-[var(--color-neutral-200)] rounded-full h-2">
                    <div
                      className="bg-[var(--color-aviation-primary)] h-2 rounded-full"
                      style={{ width: `${(tool.count / 45) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tool Status Breakdown */}
      <div className="bg-white rounded-lg border border-[var(--color-border)] shadow-[var(--shadow-sm)] p-6">
        <h4 className="text-[var(--color-neutral-900)] mb-4">Tool Status Overview</h4>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center p-4 border border-[var(--color-border)] rounded-lg">
            <div className="w-16 h-16 rounded-full bg-[var(--color-success)] bg-opacity-10 flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl text-[var(--color-success)]">{mockTools.filter(t => t.status === 'Available').length}</span>
            </div>
            <p className="text-sm text-[var(--color-neutral-900)]">Available</p>
            <p className="text-xs text-[var(--color-neutral-600)] mt-1">Ready for use</p>
          </div>
          <div className="text-center p-4 border border-[var(--color-border)] rounded-lg">
            <div className="w-16 h-16 rounded-full bg-[var(--color-aviation-primary)] bg-opacity-10 flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl text-[var(--color-aviation-primary)]">{mockTools.filter(t => t.status === 'Assigned').length}</span>
            </div>
            <p className="text-sm text-[var(--color-neutral-900)]">Assigned</p>
            <p className="text-xs text-[var(--color-neutral-600)] mt-1">Currently in use</p>
          </div>
          <div className="text-center p-4 border border-[var(--color-border)] rounded-lg">
            <div className="w-16 h-16 rounded-full bg-[var(--color-warning)] bg-opacity-10 flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl text-[var(--color-warning)]">{mockTools.filter(t => t.status === 'Under Maintenance').length}</span>
            </div>
            <p className="text-sm text-[var(--color-neutral-900)]">Maintenance</p>
            <p className="text-xs text-[var(--color-neutral-600)] mt-1">Being serviced</p>
          </div>
          <div className="text-center p-4 border border-[var(--color-border)] rounded-lg">
            <div className="w-16 h-16 rounded-full bg-[var(--color-danger)] bg-opacity-10 flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl text-[var(--color-danger)]">{mockTools.filter(t => t.status === 'Missing').length}</span>
            </div>
            <p className="text-sm text-[var(--color-neutral-900)]">Missing</p>
            <p className="text-xs text-[var(--color-neutral-600)] mt-1">Unaccounted for</p>
          </div>
        </div>
      </div>
    </div>
  );
}
