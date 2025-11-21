import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Checkbox } from "../ui/checkbox";
import { ArrowLeft, QrCode, Search, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "../ui/alert";

interface ReturnToolProps {
  onNavigate: (page: string) => void;
}

const assignedTools = [
  {
    id: "T-023",
    name: "Torque Wrench",
    staff: "Mike Johnson",
    checkedOut: "2024-11-20 08:30",
    supervisor: "Sarah Chen",
    location: "Room A, Cabinet 2, Drawer 3",
  },
  {
    id: "T-067",
    name: "Digital Multimeter",
    staff: "Mike Johnson",
    checkedOut: "2024-11-19 14:15",
    supervisor: "David Lee",
    location: "Room E, Rack 1, Shelf 2",
  },
];

export function ReturnTool({ onNavigate }: ReturnToolProps) {
  const [selectedTool, setSelectedTool] = useState("");
  const [condition, setCondition] = useState("");
  const [maintenanceRequired, setMaintenanceRequired] = useState(false);

  const inspectionChecks = [
    { id: "physical", label: "Physical condition verified" },
    { id: "functional", label: "Functional test completed" },
    { id: "clean", label: "Tool cleaned and ready for storage" },
    { id: "complete", label: "All accessories returned" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigate("tool-control");
  };

  const selectedToolData = assignedTools.find((t) => t.id === selectedTool);

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => onNavigate("tool-control")}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h2 className="text-secondary-900">Return Tool</h2>
          <p className="text-secondary-600 mt-1">Process tool return and update inventory</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-secondary-900">Tool Identification</h3>
                <Button type="button" variant="outline" size="sm">
                  <QrCode className="w-4 h-4 mr-2" />
                  Scan QR Code
                </Button>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="tool-search">Search Tool</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary-400" />
                    <Input
                      id="tool-search"
                      placeholder="Enter tool ID or name..."
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Or select from currently assigned tools</Label>
                  <RadioGroup value={selectedTool} onValueChange={setSelectedTool}>
                    {assignedTools.map((tool) => (
                      <div
                        key={tool.id}
                        className="flex items-start space-x-3 p-4 border border-secondary-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors cursor-pointer"
                      >
                        <RadioGroupItem value={tool.id} id={tool.id} className="mt-1" />
                        <Label htmlFor={tool.id} className="flex-1 cursor-pointer">
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="font-medium text-secondary-900">{tool.name}</p>
                              <p className="text-sm text-secondary-600 mt-1">
                                ID: {tool.id} • Checked out: {tool.checkedOut}
                              </p>
                              <p className="text-sm text-secondary-500 mt-1">
                                Supervisor: {tool.supervisor}
                              </p>
                            </div>
                          </div>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </div>
            </Card>

            {selectedToolData && (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Tool will be returned to: <span className="font-medium">{selectedToolData.location}</span>
                </AlertDescription>
              </Alert>
            )}

            <Card className="p-6">
              <h3 className="text-secondary-900 mb-6">Return Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="return-date">Return Date *</Label>
                  <Input
                    id="return-date"
                    type="date"
                    defaultValue={new Date().toISOString().split("T")[0]}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="return-time">Return Time *</Label>
                  <Input
                    id="return-time"
                    type="time"
                    defaultValue={new Date().toTimeString().slice(0, 5)}
                    required
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="supervisor">Receiving Supervisor *</Label>
                  <Select required>
                    <SelectTrigger id="supervisor">
                      <SelectValue placeholder="Select supervisor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">John Doe</SelectItem>
                      <SelectItem value="2">Sarah Chen</SelectItem>
                      <SelectItem value="3">David Lee</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-secondary-900 mb-6">Condition Assessment</h3>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="condition">Tool Condition *</Label>
                  <Select value={condition} onValueChange={setCondition} required>
                    <SelectTrigger id="condition">
                      <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="excellent">Excellent - Like new</SelectItem>
                      <SelectItem value="good">Good - Normal wear</SelectItem>
                      <SelectItem value="fair">Fair - Signs of wear</SelectItem>
                      <SelectItem value="poor">Poor - Requires attention</SelectItem>
                      <SelectItem value="damaged">Damaged - Needs repair</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {(condition === "poor" || condition === "damaged") && (
                  <Alert className="border-warning-300 bg-warning-50">
                    <AlertCircle className="h-4 w-4 text-warning-600" />
                    <AlertDescription className="text-warning-800">
                      This tool will be automatically marked for maintenance review.
                    </AlertDescription>
                  </Alert>
                )}

                <div className="space-y-4">
                  <h4 className="text-secondary-900">Return Inspection Checklist</h4>
                  {inspectionChecks.map((check) => (
                    <div key={check.id} className="flex items-center space-x-2">
                      <Checkbox id={check.id} />
                      <Label htmlFor={check.id} className="text-sm font-normal cursor-pointer">
                        {check.label}
                      </Label>
                    </div>
                  ))}
                </div>

                <div className="flex items-center space-x-2 p-4 bg-secondary-50 rounded-lg">
                  <Checkbox
                    id="maintenance"
                    checked={maintenanceRequired}
                    onCheckedChange={(checked) => setMaintenanceRequired(checked as boolean)}
                  />
                  <Label htmlFor="maintenance" className="text-sm font-medium cursor-pointer">
                    Schedule for maintenance
                  </Label>
                </div>

                {maintenanceRequired && (
                  <div className="space-y-2">
                    <Label htmlFor="maintenance-type">Maintenance Type</Label>
                    <Select>
                      <SelectTrigger id="maintenance-type">
                        <SelectValue placeholder="Select maintenance type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="routine">Routine Maintenance</SelectItem>
                        <SelectItem value="calibration">Calibration</SelectItem>
                        <SelectItem value="repair">Repair Required</SelectItem>
                        <SelectItem value="inspection">Safety Inspection</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="notes">Return Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Enter any observations, damages, or special notes..."
                    rows={4}
                  />
                </div>
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            {selectedToolData && (
              <Card className="p-6">
                <h3 className="text-secondary-900 mb-4">Tool Details</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-secondary-600">Tool ID</p>
                    <p className="font-medium text-secondary-900">{selectedToolData.id}</p>
                  </div>
                  <div>
                    <p className="text-secondary-600">Tool Name</p>
                    <p className="font-medium text-secondary-900">{selectedToolData.name}</p>
                  </div>
                  <div>
                    <p className="text-secondary-600">Borrowed By</p>
                    <p className="font-medium text-secondary-900">{selectedToolData.staff}</p>
                  </div>
                  <div>
                    <p className="text-secondary-600">Checked Out</p>
                    <p className="font-medium text-secondary-900">{selectedToolData.checkedOut}</p>
                  </div>
                  <div>
                    <p className="text-secondary-600">Duration</p>
                    <p className="font-medium text-secondary-900">
                      {Math.floor(
                        (new Date().getTime() - new Date(selectedToolData.checkedOut).getTime()) /
                          (1000 * 60 * 60 * 24)
                      )}{" "}
                      days
                    </p>
                  </div>
                  <div>
                    <p className="text-secondary-600">Return Location</p>
                    <p className="font-medium text-secondary-900">{selectedToolData.location}</p>
                  </div>
                </div>
              </Card>
            )}

            <Card className="p-6 bg-secondary-50">
              <h4 className="text-secondary-900 mb-4">Return Summary</h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-secondary-600">Tool Selected:</span>
                  <span className="font-medium text-secondary-900">
                    {selectedTool ? "Yes" : "No"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary-600">Condition:</span>
                  <span className="font-medium text-secondary-900">
                    {condition ? condition.charAt(0).toUpperCase() + condition.slice(1) : "Not set"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary-600">Maintenance:</span>
                  <span className="font-medium text-secondary-900">
                    {maintenanceRequired ? "Required" : "Not required"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary-600">Return Date:</span>
                  <span className="font-medium text-secondary-900">
                    {new Date().toLocaleDateString()}
                  </span>
                </div>
              </div>
            </Card>

            <div className="space-y-3">
              <Button type="submit" className="w-full" disabled={!selectedTool || !condition}>
                Complete Return
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => onNavigate("tool-control")}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
