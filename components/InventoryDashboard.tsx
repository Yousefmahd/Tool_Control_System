import { useState } from 'react';
import { Search, Filter, Download, QrCode, Plus, Eye } from 'lucide-react';
import { mockTools, Tool } from '../data/mockData';
import { StatusBadge } from './StatusBadge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useUser } from '../context/UserContext';

interface InventoryDashboardProps {
  onNavigate: (page: string, data?: any) => void;
}

export function InventoryDashboard({ onNavigate }: InventoryDashboardProps) {
  const { currentUser, canAccessWorkshop } = useUser();
  const isAdmin = currentUser.role === 'Admin' || currentUser.workshop === 'All';
  
  const [searchTerm, setSearchTerm] = useState('');
  const [workshopFilter, setWorkshopFilter] = useState<string>(isAdmin ? 'all' : currentUser.workshop);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredTools = mockTools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesWorkshop = workshopFilter === 'all' || tool.workshop === workshopFilter;
    const matchesStatus = statusFilter === 'all' || tool.status === statusFilter;
    
    // Non-admin users can only see their workshop's tools
    const hasAccess = isAdmin || canAccessWorkshop(tool.workshop);
    
    return matchesSearch && matchesWorkshop && matchesStatus && hasAccess;
  });

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-[var(--color-neutral-900)] mb-2">Inventory Management</h1>
        <p className="text-[var(--color-neutral-600)]">
          {isAdmin ? 'Complete tool inventory across all workshops' : `${currentUser.workshop} Workshop Inventory`}
        </p>
      </div>

      {/* Actions Bar */}
      <div className="bg-white rounded-lg border border-[var(--color-border)] p-4 mb-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[300px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[var(--color-neutral-400)]" />
              <Input
                type="text"
                placeholder="Search by tool name or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Select 
              value={workshopFilter} 
              onValueChange={setWorkshopFilter}
              disabled={!isAdmin}
            >
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Workshop" />
              </SelectTrigger>
              <SelectContent>
                {isAdmin && <SelectItem value="all">All Workshops</SelectItem>}
                <SelectItem value="Aviation">Aviation</SelectItem>
                <SelectItem value="Mechanical">Mechanical</SelectItem>
                <SelectItem value="Electrical">Electrical</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Available">Available</SelectItem>
                <SelectItem value="Assigned">Assigned</SelectItem>
                <SelectItem value="Under Maintenance">Maintenance</SelectItem>
                <SelectItem value="Missing">Missing</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              className="border-[var(--color-border)]"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>

            <Button
              onClick={() => onNavigate('add-tool')}
              className="bg-[var(--color-aviation-primary)] hover:bg-[var(--color-aviation-primary-dark)] text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Tool
            </Button>

            <Button
              variant="outline"
              className="border-[var(--color-border)]"
            >
              <QrCode className="w-4 h-4 mr-2" />
              Scan QR
            </Button>
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="mb-4">
        <p className="text-sm text-[var(--color-neutral-600)]">
          Showing {filteredTools.length} of {mockTools.length} tools
        </p>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-lg border border-[var(--color-border)] shadow-[var(--shadow-sm)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[var(--color-neutral-50)] border-b border-[var(--color-border)]">
              <tr>
                <th className="text-left px-6 py-3 text-xs text-[var(--color-neutral-600)] uppercase tracking-wider">
                  Tool ID
                </th>
                <th className="text-left px-6 py-3 text-xs text-[var(--color-neutral-600)] uppercase tracking-wider">
                  Name
                </th>
                <th className="text-left px-6 py-3 text-xs text-[var(--color-neutral-600)] uppercase tracking-wider">
                  Category
                </th>
                <th className="text-left px-6 py-3 text-xs text-[var(--color-neutral-600)] uppercase tracking-wider">
                  Workshop
                </th>
                <th className="text-left px-6 py-3 text-xs text-[var(--color-neutral-600)] uppercase tracking-wider">
                  Location
                </th>
                <th className="text-left px-6 py-3 text-xs text-[var(--color-neutral-600)] uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left px-6 py-3 text-xs text-[var(--color-neutral-600)] uppercase tracking-wider">
                  Condition
                </th>
                <th className="text-left px-6 py-3 text-xs text-[var(--color-neutral-600)] uppercase tracking-wider">
                  QR Code
                </th>
                <th className="text-left px-6 py-3 text-xs text-[var(--color-neutral-600)] uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {filteredTools.map((tool) => (
                <tr key={tool.id} className="hover:bg-[var(--color-neutral-50)] transition-colors">
                  <td className="px-6 py-4">
                    <span className="text-sm text-[var(--color-aviation-primary)]">{tool.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-[var(--color-neutral-900)]">{tool.name}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-[var(--color-neutral-700)]">{tool.category}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-[var(--color-neutral-700)]">{tool.workshop}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-[var(--color-neutral-700)]">
                      <div>{tool.location.room}</div>
                      <div className="text-xs text-[var(--color-neutral-500)]">
                        {tool.location.shelf}
                        {tool.location.row && ` / Row ${tool.location.row}`}
                        {tool.location.section && ` / ${tool.location.section}`}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={tool.status} size="sm" />
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={tool.condition} size="sm" />
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-[var(--color-aviation-primary)] hover:text-[var(--color-aviation-primary-dark)]">
                      <QrCode className="w-4 h-4" />
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => onNavigate('tool-details', tool)}
                      className="text-[var(--color-aviation-primary)] hover:text-[var(--color-aviation-primary-dark)] flex items-center gap-1"
                    >
                      <Eye className="w-4 h-4" />
                      <span className="text-sm">View</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-[var(--color-neutral-600)]">
          Page 1 of 1
        </p>
        <div className="flex items-center gap-2">
          <Button variant="outline" disabled className="border-[var(--color-border)]">
            Previous
          </Button>
          <Button variant="outline" disabled className="border-[var(--color-border)]">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}