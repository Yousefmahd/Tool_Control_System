import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { StatusBadge, ToolStatus } from "../shared/StatusBadge";
import { Search, Filter, Download, Upload, Plus, QrCode, Eye } from "lucide-react";
import { Badge } from "../ui/badge";

interface Tool {
  id: string;
  name: string;
  category: string;
  workshop: string;
  location: string;
  status: ToolStatus;
  condition: string;
  lastChecked: string;
}

const inventoryData: Tool[] = [
  {
    id: "T-001",
    name: "Torque Wrench",
    category: "Hand Tools",
    workshop: "Aviation",
    location: "Room A, Cabinet 2, Drawer 3",
    status: "assigned",
    condition: "Excellent",
    lastChecked: "2024-11-18",
  },
  {
    id: "T-002",
    name: "Digital Multimeter",
    category: "Electrical Testing",
    workshop: "Electrical",
    location: "Room E, Rack 1, Shelf 2",
    status: "available",
    condition: "Good",
    lastChecked: "2024-11-20",
  },
  {
    id: "T-003",
    name: "Hydraulic Jack",
    category: "Lifting Equipment",
    workshop: "Aviation",
    location: "Room A, Floor Station 1",
    status: "maintenance",
    condition: "Fair",
    lastChecked: "2024-11-15",
  },
  {
    id: "T-004",
    name: "Impact Driver",
    category: "Power Tools",
    workshop: "Mechanical",
    location: "Room M, Cabinet 5, Shelf 1",
    status: "missing",
    condition: "Unknown",
    lastChecked: "2024-11-10",
  },
  {
    id: "T-005",
    name: "Wire Stripper",
    category: "Hand Tools",
    workshop: "Electrical",
    location: "Room E, Drawer Unit 3",
    status: "available",
    condition: "Excellent",
    lastChecked: "2024-11-21",
  },
  {
    id: "T-006",
    name: "Drill Press",
    category: "Power Tools",
    workshop: "Mechanical",
    location: "Room M, Workstation 2",
    status: "assigned",
    condition: "Good",
    lastChecked: "2024-11-19",
  },
  {
    id: "T-007",
    name: "Oscilloscope",
    category: "Electrical Testing",
    workshop: "Electrical",
    location: "Room E, Bench 4",
    status: "available",
    condition: "Excellent",
    lastChecked: "2024-11-20",
  },
  {
    id: "T-008",
    name: "Rivet Gun",
    category: "Assembly Tools",
    workshop: "Aviation",
    location: "Room A, Cabinet 7, Drawer 1",
    status: "available",
    condition: "Good",
    lastChecked: "2024-11-21",
  },
];

export function InventoryDashboard({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [workshopFilter, setWorkshopFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredData = inventoryData.filter((tool) => {
    const matchesSearch =
      tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesWorkshop = workshopFilter === "all" || tool.workshop === workshopFilter;
    const matchesStatus = statusFilter === "all" || tool.status === statusFilter;
    return matchesSearch && matchesWorkshop && matchesStatus;
  });

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-secondary-900">Inventory Management</h2>
          <p className="text-secondary-600 mt-1">Complete tool catalog with advanced filtering</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <QrCode className="w-4 h-4 mr-2" />
            Scan Tool
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Import
          </Button>
          <Button onClick={() => onNavigate("add-tool")}>
            <Plus className="w-4 h-4 mr-2" />
            Add Tool
          </Button>
        </div>
      </div>

      <Card>
        <div className="p-6 border-b border-secondary-200">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary-400" />
              <Input
                placeholder="Search by tool name, ID, or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={workshopFilter} onValueChange={setWorkshopFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Workshop" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Workshops</SelectItem>
                <SelectItem value="Aviation">Aviation</SelectItem>
                <SelectItem value="Mechanical">Mechanical</SelectItem>
                <SelectItem value="Electrical">Electrical</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="assigned">Assigned</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="missing">Missing</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="icon">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-secondary-600">
              Showing {filteredData.length} of {inventoryData.length} tools
            </p>
            <div className="flex items-center gap-2">
              <span className="text-sm text-secondary-600">Sort by:</span>
              <Select defaultValue="name">
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Tool Name</SelectItem>
                  <SelectItem value="id">Tool ID</SelectItem>
                  <SelectItem value="workshop">Workshop</SelectItem>
                  <SelectItem value="status">Status</SelectItem>
                  <SelectItem value="lastChecked">Last Checked</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tool ID</TableHead>
                <TableHead>Tool Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Workshop</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Condition</TableHead>
                <TableHead>Last Checked</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((tool) => (
                <TableRow key={tool.id}>
                  <TableCell className="font-medium">{tool.id}</TableCell>
                  <TableCell>{tool.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {tool.category}
                    </Badge>
                  </TableCell>
                  <TableCell>{tool.workshop}</TableCell>
                  <TableCell className="max-w-xs truncate">{tool.location}</TableCell>
                  <TableCell>
                    <StatusBadge status={tool.status} />
                  </TableCell>
                  <TableCell>
                    <span
                      className={`text-sm ${
                        tool.condition === "Excellent"
                          ? "text-success-600"
                          : tool.condition === "Good"
                          ? "text-primary-600"
                          : tool.condition === "Fair"
                          ? "text-warning-600"
                          : "text-secondary-600"
                      }`}
                    >
                      {tool.condition}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm text-secondary-600">{tool.lastChecked}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onNavigate(`tool-detail-${tool.id}`)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="flex items-center justify-between mt-6">
            <p className="text-sm text-secondary-600">Page 1 of 16</p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm">
                1
              </Button>
              <Button variant="outline" size="sm">
                2
              </Button>
              <Button variant="outline" size="sm">
                3
              </Button>
              <Button variant="outline" size="sm">
                ...
              </Button>
              <Button variant="outline" size="sm">
                16
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
