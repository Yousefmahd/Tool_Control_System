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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  ArrowLeft,
  Edit,
  QrCode,
  MapPin,
  Calendar,
  User,
  FileText,
  Download,
  Wrench as WrenchIcon,
} from "lucide-react";

interface ToolDetailProps {
  onNavigate: (page: string) => void;
}

const assignmentHistory = [
  {
    id: 1,
    staff: "Mike Johnson",
    supervisor: "Sarah Chen",
    checkedOut: "2024-11-20 08:30",
    returned: "2024-11-21 16:45",
    duration: "1 day, 8 hours",
    condition: "Good",
    notes: "Used for routine maintenance",
  },
  {
    id: 2,
    staff: "Emma Wilson",
    supervisor: "David Lee",
    checkedOut: "2024-11-15 09:00",
    returned: "2024-11-17 15:30",
    duration: "2 days, 6 hours",
    condition: "Excellent",
    notes: "No issues reported",
  },
  {
    id: 3,
    staff: "Robert Brown",
    supervisor: "Sarah Chen",
    checkedOut: "2024-11-10 11:20",
    returned: "2024-11-12 14:00",
    duration: "2 days, 2 hours",
    condition: "Good",
    notes: "Minor wear observed",
  },
];

const maintenanceLog = [
  {
    id: 1,
    date: "2024-11-18",
    type: "Calibration",
    technician: "John Doe",
    status: "Completed",
    notes: "Annual calibration completed successfully",
    cost: "$125.00",
  },
  {
    id: 2,
    date: "2024-08-15",
    type: "Routine Maintenance",
    technician: "Sarah Chen",
    status: "Completed",
    notes: "Cleaned and lubricated",
    cost: "$45.00",
  },
  {
    id: 3,
    date: "2024-05-10",
    type: "Repair",
    technician: "David Lee",
    status: "Completed",
    notes: "Replaced worn grip",
    cost: "$85.00",
  },
];

export function ToolDetail({ onNavigate }: ToolDetailProps) {
  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => onNavigate("inventory")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-secondary-900">Torque Wrench</h2>
              <StatusBadge status="available" />
            </div>
            <p className="text-secondary-600 mt-1">Tool ID: T-001</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <QrCode className="w-4 h-4 mr-2" />
            View QR Code
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button>
            <Edit className="w-4 h-4 mr-2" />
            Edit Tool
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="aspect-square bg-secondary-100 rounded-lg flex items-center justify-center mb-6">
            <WrenchIcon className="w-24 h-24 text-secondary-400" />
          </div>
          
          <div className="space-y-4">
            <div>
              <p className="text-xs text-secondary-600 uppercase tracking-wide mb-1">Tool ID</p>
              <p className="font-medium text-secondary-900">T-001</p>
            </div>
            <div>
              <p className="text-xs text-secondary-600 uppercase tracking-wide mb-1">Barcode</p>
              <div className="font-mono text-sm bg-secondary-50 px-3 py-2 rounded border border-secondary-200">
                123456789012
              </div>
            </div>
            <div>
              <p className="text-xs text-secondary-600 uppercase tracking-wide mb-1">Category</p>
              <Badge variant="outline">Hand Tools</Badge>
            </div>
            <div>
              <p className="text-xs text-secondary-600 uppercase tracking-wide mb-1">Workshop</p>
              <p className="font-medium text-secondary-900">Aviation</p>
            </div>
            <div>
              <p className="text-xs text-secondary-600 uppercase tracking-wide mb-1">Manufacturer</p>
              <p className="font-medium text-secondary-900">Snap-on Tools</p>
            </div>
            <div>
              <p className="text-xs text-secondary-600 uppercase tracking-wide mb-1">Model Number</p>
              <p className="font-medium text-secondary-900">QJR3238</p>
            </div>
            <div>
              <p className="text-xs text-secondary-600 uppercase tracking-wide mb-1">Purchase Date</p>
              <p className="font-medium text-secondary-900">January 15, 2023</p>
            </div>
            <div>
              <p className="text-xs text-secondary-600 uppercase tracking-wide mb-1">Purchase Cost</p>
              <p className="font-medium text-secondary-900">$485.00</p>
            </div>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <h3 className="text-secondary-900 mb-6">Current Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary-600 mt-0.5" />
                  <div>
                    <p className="text-xs text-secondary-600 uppercase tracking-wide mb-1">Location</p>
                    <p className="font-medium text-secondary-900">Room A, Cabinet 2, Drawer 3</p>
                    <p className="text-sm text-secondary-600 mt-1">Aviation Workshop</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-primary-600 mt-0.5" />
                  <div>
                    <p className="text-xs text-secondary-600 uppercase tracking-wide mb-1">Last Checked</p>
                    <p className="font-medium text-secondary-900">November 18, 2024</p>
                    <p className="text-sm text-secondary-600 mt-1">3 days ago</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-primary-600 mt-0.5" />
                  <div>
                    <p className="text-xs text-secondary-600 uppercase tracking-wide mb-1">Assigned To</p>
                    <p className="font-medium text-secondary-900">Not assigned</p>
                    <p className="text-sm text-secondary-600 mt-1">Available for checkout</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <WrenchIcon className="w-5 h-5 text-primary-600 mt-0.5" />
                  <div>
                    <p className="text-xs text-secondary-600 uppercase tracking-wide mb-1">Condition</p>
                    <p className="font-medium text-success-600">Excellent</p>
                    <p className="text-sm text-secondary-600 mt-1">Last calibrated: Nov 18, 2024</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start gap-3 mb-4">
              <FileText className="w-5 h-5 text-primary-600 mt-0.5" />
              <div>
                <h3 className="text-secondary-900">Description & Specifications</h3>
                <p className="text-secondary-600 mt-2">
                  Professional-grade torque wrench with 1/2" drive. Range: 30-250 ft-lbs. Features a
                  reversible ratcheting head and dual-range scale for precision torque applications in
                  aviation maintenance and assembly.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-secondary-200">
              <h4 className="text-secondary-900 mb-4">Technical Specifications</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-secondary-600">Drive Size</p>
                  <p className="font-medium text-secondary-900">1/2 inch</p>
                </div>
                <div>
                  <p className="text-secondary-600">Torque Range</p>
                  <p className="font-medium text-secondary-900">30-250 ft-lbs</p>
                </div>
                <div>
                  <p className="text-secondary-600">Accuracy</p>
                  <p className="font-medium text-secondary-900">±3%</p>
                </div>
                <div>
                  <p className="text-secondary-600">Length</p>
                  <p className="font-medium text-secondary-900">24 inches</p>
                </div>
                <div>
                  <p className="text-secondary-600">Weight</p>
                  <p className="font-medium text-secondary-900">4.2 lbs</p>
                </div>
                <div>
                  <p className="text-secondary-600">Calibration Interval</p>
                  <p className="font-medium text-secondary-900">12 months</p>
                </div>
              </div>
            </div>
          </Card>

          <Tabs defaultValue="history" className="space-y-4">
            <TabsList>
              <TabsTrigger value="history">Assignment History</TabsTrigger>
              <TabsTrigger value="maintenance">Maintenance Log</TabsTrigger>
              <TabsTrigger value="statistics">Usage Statistics</TabsTrigger>
            </TabsList>

            <TabsContent value="history">
              <Card>
                <div className="p-6 border-b border-secondary-200">
                  <h3 className="text-secondary-900">Assignment History</h3>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Staff Member</TableHead>
                      <TableHead>Supervisor</TableHead>
                      <TableHead>Checked Out</TableHead>
                      <TableHead>Returned</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Condition</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {assignmentHistory.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell className="font-medium">{record.staff}</TableCell>
                        <TableCell>{record.supervisor}</TableCell>
                        <TableCell className="text-sm text-secondary-600">
                          {record.checkedOut}
                        </TableCell>
                        <TableCell className="text-sm text-secondary-600">
                          {record.returned}
                        </TableCell>
                        <TableCell className="text-sm text-secondary-600">
                          {record.duration}
                        </TableCell>
                        <TableCell>
                          <span
                            className={`text-sm ${
                              record.condition === "Excellent"
                                ? "text-success-600"
                                : "text-primary-600"
                            }`}
                          >
                            {record.condition}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </TabsContent>

            <TabsContent value="maintenance">
              <Card>
                <div className="p-6 border-b border-secondary-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-secondary-900">Maintenance Log</h3>
                    <Button size="sm">
                      <WrenchIcon className="w-4 h-4 mr-2" />
                      Schedule Maintenance
                    </Button>
                  </div>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Technician</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Notes</TableHead>
                      <TableHead>Cost</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {maintenanceLog.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell className="text-sm text-secondary-600">{record.date}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{record.type}</Badge>
                        </TableCell>
                        <TableCell>{record.technician}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className="border-success-200 bg-success-50 text-success-700"
                          >
                            {record.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-secondary-600">{record.notes}</TableCell>
                        <TableCell className="font-medium">{record.cost}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </TabsContent>

            <TabsContent value="statistics">
              <Card className="p-6">
                <h3 className="text-secondary-900 mb-6">Usage Statistics</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-secondary-50 rounded-lg">
                    <p className="text-4xl font-semibold text-primary-600 mb-2">24</p>
                    <p className="text-sm text-secondary-600">Total Assignments</p>
                  </div>
                  <div className="text-center p-6 bg-secondary-50 rounded-lg">
                    <p className="text-4xl font-semibold text-primary-600 mb-2">96%</p>
                    <p className="text-sm text-secondary-600">Utilization Rate</p>
                  </div>
                  <div className="text-center p-6 bg-secondary-50 rounded-lg">
                    <p className="text-4xl font-semibold text-primary-600 mb-2">2.8d</p>
                    <p className="text-sm text-secondary-600">Avg. Checkout Duration</p>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-secondary-200">
                  <h4 className="text-secondary-900 mb-4">Maintenance Summary</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex justify-between p-4 bg-secondary-50 rounded-lg">
                      <span className="text-secondary-600">Total Maintenance Events</span>
                      <span className="font-semibold text-secondary-900">8</span>
                    </div>
                    <div className="flex justify-between p-4 bg-secondary-50 rounded-lg">
                      <span className="text-secondary-600">Total Maintenance Cost</span>
                      <span className="font-semibold text-secondary-900">$645.00</span>
                    </div>
                    <div className="flex justify-between p-4 bg-secondary-50 rounded-lg">
                      <span className="text-secondary-600">Next Calibration Due</span>
                      <span className="font-semibold text-warning-600">Nov 18, 2025</span>
                    </div>
                    <div className="flex justify-between p-4 bg-secondary-50 rounded-lg">
                      <span className="text-secondary-600">Days in Service</span>
                      <span className="font-semibold text-secondary-900">675 days</span>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
