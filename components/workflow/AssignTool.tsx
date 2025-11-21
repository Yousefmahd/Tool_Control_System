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
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Checkbox } from "../ui/checkbox";
import { ArrowLeft, Calendar as CalendarIcon, Search, Check } from "lucide-react";
import { cn } from "../../lib/utils";

interface AssignToolProps {
  onNavigate: (page: string) => void;
}

const staffMembers = [
  { id: 1, name: "Mike Johnson", workshop: "Mechanical" },
  { id: 2, name: "Sarah Chen", workshop: "Aviation" },
  { id: 3, name: "Emma Wilson", workshop: "Electrical" },
  { id: 4, name: "David Lee", workshop: "Mechanical" },
];

const supervisors = [
  { id: 1, name: "John Doe", workshop: "All" },
  { id: 2, name: "Jane Smith", workshop: "Aviation" },
  { id: 3, name: "Robert Brown", workshop: "Mechanical" },
];

const tools = [
  { id: "T-001", name: "Torque Wrench", category: "Hand Tools", workshop: "Aviation", location: "Room A, Cabinet 2" },
  { id: "T-002", name: "Digital Multimeter", category: "Electrical Testing", workshop: "Electrical", location: "Room E, Rack 1" },
  { id: "T-008", name: "Rivet Gun", category: "Assembly Tools", workshop: "Aviation", location: "Room A, Cabinet 7" },
  { id: "T-015", name: "Impact Wrench", category: "Power Tools", workshop: "Mechanical", location: "Room M, Cabinet 3" },
];

export function AssignTool({ onNavigate }: AssignToolProps) {
  const [date, setDate] = useState<Date>(new Date());
  const [selectedTool, setSelectedTool] = useState("");
  const [selectedStaff, setSelectedStaff] = useState("");
  const [selectedSupervisor, setSelectedSupervisor] = useState("");

  const conditionChecks = [
    { id: "visual", label: "Visual inspection completed" },
    { id: "functional", label: "Functional test passed" },
    { id: "calibration", label: "Calibration verified" },
    { id: "safety", label: "Safety features checked" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigate("tool-control");
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => onNavigate("tool-control")}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h2 className="text-secondary-900">Assign Tool</h2>
          <p className="text-secondary-600 mt-1">Issue a tool to a staff member</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <h3 className="text-secondary-900 mb-6">Staff Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="staff">Select Staff Member *</Label>
                  <Select value={selectedStaff} onValueChange={setSelectedStaff} required>
                    <SelectTrigger id="staff">
                      <SelectValue placeholder="Choose staff member" />
                    </SelectTrigger>
                    <SelectContent>
                      {staffMembers.map((staff) => (
                        <SelectItem key={staff.id} value={staff.id.toString()}>
                          {staff.name} - {staff.workshop}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="supervisor">Approving Supervisor *</Label>
                  <Select value={selectedSupervisor} onValueChange={setSelectedSupervisor} required>
                    <SelectTrigger id="supervisor">
                      <SelectValue placeholder="Choose supervisor" />
                    </SelectTrigger>
                    <SelectContent>
                      {supervisors.map((supervisor) => (
                        <SelectItem key={supervisor.id} value={supervisor.id.toString()}>
                          {supervisor.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-secondary-900 mb-6">Tool Selection</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="workshop">Workshop *</Label>
                  <Select required>
                    <SelectTrigger id="workshop">
                      <SelectValue placeholder="Select workshop" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="aviation">Aviation</SelectItem>
                      <SelectItem value="mechanical">Mechanical</SelectItem>
                      <SelectItem value="electrical">Electrical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category (optional)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hand">Hand Tools</SelectItem>
                      <SelectItem value="power">Power Tools</SelectItem>
                      <SelectItem value="testing">Electrical Testing</SelectItem>
                      <SelectItem value="assembly">Assembly Tools</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tool">Select Tool *</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary-400" />
                    <Input
                      id="tool"
                      placeholder="Search by tool name or ID..."
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="border border-secondary-200 rounded-lg divide-y divide-secondary-200 max-h-64 overflow-y-auto">
                  {tools.map((tool) => (
                    <div
                      key={tool.id}
                      className={cn(
                        "p-4 cursor-pointer hover:bg-secondary-50 transition-colors",
                        selectedTool === tool.id && "bg-primary-50 border-primary-300"
                      )}
                      onClick={() => setSelectedTool(tool.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <div className={cn(
                              "w-8 h-8 rounded-full flex items-center justify-center",
                              selectedTool === tool.id ? "bg-primary-600" : "bg-secondary-200"
                            )}>
                              {selectedTool === tool.id && (
                                <Check className="w-4 h-4 text-white" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium text-secondary-900">{tool.name}</p>
                              <p className="text-sm text-secondary-600">{tool.id} • {tool.category}</p>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-secondary-900">{tool.workshop}</p>
                          <p className="text-xs text-secondary-500">{tool.location}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-secondary-900 mb-6">Date & Time</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Issue Date *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? date.toLocaleDateString() : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={date} onSelect={(d) => d && setDate(d)} />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time">Issue Time *</Label>
                  <Input id="time" type="time" defaultValue="09:00" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="expected-return">Expected Return Date</Label>
                  <Input id="expected-return" type="date" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration">Estimated Duration</Label>
                  <Select>
                    <SelectTrigger id="duration">
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 day</SelectItem>
                      <SelectItem value="3">3 days</SelectItem>
                      <SelectItem value="7">1 week</SelectItem>
                      <SelectItem value="14">2 weeks</SelectItem>
                      <SelectItem value="30">1 month</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-secondary-900 mb-6">Condition Checklist</h3>
              <div className="space-y-4">
                {conditionChecks.map((check) => (
                  <div key={check.id} className="flex items-center space-x-2">
                    <Checkbox id={check.id} />
                    <Label
                      htmlFor={check.id}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {check.label}
                    </Label>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Enter any special conditions or notes..."
                  rows={4}
                />
              </div>
            </Card>

            <Card className="p-6 bg-secondary-50">
              <h4 className="text-secondary-900 mb-4">Summary</h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-secondary-600">Tool:</span>
                  <span className="font-medium text-secondary-900">
                    {selectedTool || "Not selected"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary-600">Staff:</span>
                  <span className="font-medium text-secondary-900">
                    {selectedStaff
                      ? staffMembers.find((s) => s.id.toString() === selectedStaff)?.name
                      : "Not selected"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary-600">Supervisor:</span>
                  <span className="font-medium text-secondary-900">
                    {selectedSupervisor
                      ? supervisors.find((s) => s.id.toString() === selectedSupervisor)?.name
                      : "Not selected"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary-600">Issue Date:</span>
                  <span className="font-medium text-secondary-900">
                    {date.toLocaleDateString()}
                  </span>
                </div>
              </div>
            </Card>

            <div className="space-y-3">
              <Button type="submit" className="w-full">
                Assign Tool
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
