import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { StatusBadge } from "./StatusBadge";
import { KPICard } from "./KPICard";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Alert, AlertDescription } from "../ui/alert";
import { Checkbox } from "../ui/checkbox";
import { Switch } from "../ui/switch";
import { Slider } from "../ui/slider";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {
  Package,
  UserCheck,
  CheckCircle,
  Wrench,
  AlertCircle,
  Download,
  Upload,
  Plus,
  Search,
  Filter,
} from "lucide-react";

export function ComponentLibrary() {
  return (
    <div className="p-8 space-y-12">
      <div>
        <h1 className="text-secondary-900 mb-2">Component Library</h1>
        <p className="text-secondary-600">
          Reusable components for the Tool Control & Inventory Management System
        </p>
      </div>

      <section>
        <h2 className="text-secondary-900 mb-6">Color Palette</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-secondary-900 mb-4">Primary Colors (Aviation Blue)</h3>
            <div className="grid grid-cols-5 gap-4">
              <div className="space-y-2">
                <div className="h-24 rounded-lg bg-primary-100"></div>
                <p className="text-xs text-secondary-600">primary-100</p>
              </div>
              <div className="space-y-2">
                <div className="h-24 rounded-lg bg-primary-300"></div>
                <p className="text-xs text-secondary-600">primary-300</p>
              </div>
              <div className="space-y-2">
                <div className="h-24 rounded-lg bg-primary-500"></div>
                <p className="text-xs text-secondary-600">primary-500</p>
              </div>
              <div className="space-y-2">
                <div className="h-24 rounded-lg bg-primary-700"></div>
                <p className="text-xs text-secondary-600">primary-700</p>
              </div>
              <div className="space-y-2">
                <div className="h-24 rounded-lg bg-primary-900"></div>
                <p className="text-xs text-secondary-600">primary-900</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-secondary-900 mb-4">Secondary Colors (Greys)</h3>
            <div className="grid grid-cols-5 gap-4">
              <div className="space-y-2">
                <div className="h-24 rounded-lg bg-secondary-100 border border-secondary-200"></div>
                <p className="text-xs text-secondary-600">secondary-100</p>
              </div>
              <div className="space-y-2">
                <div className="h-24 rounded-lg bg-secondary-300"></div>
                <p className="text-xs text-secondary-600">secondary-300</p>
              </div>
              <div className="space-y-2">
                <div className="h-24 rounded-lg bg-secondary-500"></div>
                <p className="text-xs text-secondary-600">secondary-500</p>
              </div>
              <div className="space-y-2">
                <div className="h-24 rounded-lg bg-secondary-700"></div>
                <p className="text-xs text-secondary-600">secondary-700</p>
              </div>
              <div className="space-y-2">
                <div className="h-24 rounded-lg bg-secondary-900"></div>
                <p className="text-xs text-secondary-600">secondary-900</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-secondary-900 mb-4">Workshop Colors</h3>
            <div className="grid grid-cols-3 gap-4">
              <Card className="p-6">
                <div className="h-16 rounded-lg mb-3" style={{ backgroundColor: "#0ea5e9" }}></div>
                <p className="font-medium text-secondary-900">Aviation</p>
                <p className="text-xs text-secondary-600">#0ea5e9</p>
              </Card>
              <Card className="p-6">
                <div className="h-16 rounded-lg mb-3" style={{ backgroundColor: "#f97316" }}></div>
                <p className="font-medium text-secondary-900">Mechanical</p>
                <p className="text-xs text-secondary-600">#f97316</p>
              </Card>
              <Card className="p-6">
                <div className="h-16 rounded-lg mb-3" style={{ backgroundColor: "#eab308" }}></div>
                <p className="font-medium text-secondary-900">Electrical</p>
                <p className="text-xs text-secondary-600">#eab308</p>
              </Card>
            </div>
          </div>

          <div>
            <h3 className="text-secondary-900 mb-4">Status Colors</h3>
            <div className="grid grid-cols-4 gap-4">
              <Card className="p-6">
                <div className="h-16 rounded-lg mb-3 bg-success-500"></div>
                <p className="font-medium text-secondary-900">Success/Available</p>
                <p className="text-xs text-secondary-600">success-500</p>
              </Card>
              <Card className="p-6">
                <div className="h-16 rounded-lg mb-3 bg-warning-500"></div>
                <p className="font-medium text-secondary-900">Warning/Maintenance</p>
                <p className="text-xs text-secondary-600">warning-500</p>
              </Card>
              <Card className="p-6">
                <div className="h-16 rounded-lg mb-3 bg-error-500"></div>
                <p className="font-medium text-secondary-900">Error/Missing</p>
                <p className="text-xs text-secondary-600">error-500</p>
              </Card>
              <Card className="p-6">
                <div className="h-16 rounded-lg mb-3 bg-primary-500"></div>
                <p className="font-medium text-secondary-900">Info/Assigned</p>
                <p className="text-xs text-secondary-600">primary-500</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-secondary-900 mb-6">Typography</h2>
        <Card className="p-6 space-y-4">
          <div>
            <h1 className="text-secondary-900">Heading 1</h1>
            <p className="text-xs text-secondary-500 mt-1">2rem / 32px, font-weight: 700</p>
          </div>
          <div>
            <h2 className="text-secondary-900">Heading 2</h2>
            <p className="text-xs text-secondary-500 mt-1">1.5rem / 24px, font-weight: 600</p>
          </div>
          <div>
            <h3 className="text-secondary-900">Heading 3</h3>
            <p className="text-xs text-secondary-500 mt-1">1.25rem / 20px, font-weight: 600</p>
          </div>
          <div>
            <h4 className="text-secondary-900">Heading 4</h4>
            <p className="text-xs text-secondary-500 mt-1">1.125rem / 18px, font-weight: 600</p>
          </div>
          <div>
            <p className="text-secondary-900">Body Text</p>
            <p className="text-xs text-secondary-500 mt-1">0.875rem / 14px</p>
          </div>
          <div>
            <p className="text-xs text-secondary-600">Small Text</p>
            <p className="text-xs text-secondary-500 mt-1">0.75rem / 12px</p>
          </div>
        </Card>
      </section>

      <section>
        <h2 className="text-secondary-900 mb-6">Buttons</h2>
        <Card className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-3">
              <p className="text-sm font-medium text-secondary-900">Primary</p>
              <Button>Default Button</Button>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                With Icon
              </Button>
            </div>
            <div className="space-y-3">
              <p className="text-sm font-medium text-secondary-900">Secondary</p>
              <Button variant="secondary">Secondary</Button>
              <Button variant="secondary">
                <Download className="w-4 h-4 mr-2" />
                With Icon
              </Button>
            </div>
            <div className="space-y-3">
              <p className="text-sm font-medium text-secondary-900">Outline</p>
              <Button variant="outline">Outline</Button>
              <Button variant="outline">
                <Upload className="w-4 h-4 mr-2" />
                With Icon
              </Button>
            </div>
            <div className="space-y-3">
              <p className="text-sm font-medium text-secondary-900">Ghost</p>
              <Button variant="ghost">Ghost</Button>
              <Button variant="ghost">
                <Filter className="w-4 h-4 mr-2" />
                With Icon
              </Button>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <p className="text-sm font-medium text-secondary-900">Sizes</p>
              <div className="space-y-2">
                <Button size="sm">Small</Button>
                <Button>Default</Button>
                <Button size="lg">Large</Button>
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-sm font-medium text-secondary-900">States</p>
              <div className="space-y-2">
                <Button disabled>Disabled</Button>
                <Button variant="destructive">Destructive</Button>
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-sm font-medium text-secondary-900">Icon Only</p>
              <div className="flex gap-2">
                <Button size="icon">
                  <Search className="w-4 h-4" />
                </Button>
                <Button size="icon" variant="outline">
                  <Filter className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </section>

      <section>
        <h2 className="text-secondary-900 mb-6">KPI Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
        </div>
      </section>

      <section>
        <h2 className="text-secondary-900 mb-6">Status Badges</h2>
        <Card className="p-6">
          <div className="flex flex-wrap gap-3">
            <StatusBadge status="available" />
            <StatusBadge status="assigned" />
            <StatusBadge status="maintenance" />
            <StatusBadge status="missing" />
          </div>
          <div className="mt-6">
            <p className="text-sm font-medium text-secondary-900 mb-3">Other Badge Variants</p>
            <div className="flex flex-wrap gap-3">
              <Badge>Default</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="destructive">Destructive</Badge>
            </div>
          </div>
        </Card>
      </section>

      <section>
        <h2 className="text-secondary-900 mb-6">Form Inputs</h2>
        <Card className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="text-input">Text Input</Label>
              <Input id="text-input" placeholder="Enter text..." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="search-input">Search Input</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary-400" />
                <Input id="search-input" placeholder="Search..." className="pl-10" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="select">Select Dropdown</Label>
              <Select>
                <SelectTrigger id="select">
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Option 1</SelectItem>
                  <SelectItem value="2">Option 2</SelectItem>
                  <SelectItem value="3">Option 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date Input</Label>
              <Input id="date" type="date" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="textarea">Textarea</Label>
              <Textarea id="textarea" placeholder="Enter notes..." rows={3} />
            </div>
          </div>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <Label>Checkbox</Label>
              <div className="flex items-center space-x-2">
                <Checkbox id="check1" />
                <Label htmlFor="check1" className="font-normal cursor-pointer">
                  Option 1
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="check2" />
                <Label htmlFor="check2" className="font-normal cursor-pointer">
                  Option 2
                </Label>
              </div>
            </div>
            <div className="space-y-3">
              <Label>Switch</Label>
              <div className="flex items-center space-x-2">
                <Switch id="switch1" />
                <Label htmlFor="switch1" className="font-normal cursor-pointer">
                  Enable feature
                </Label>
              </div>
            </div>
            <div className="space-y-3">
              <Label>Slider</Label>
              <Slider defaultValue={[50]} max={100} step={1} />
            </div>
          </div>
        </Card>
      </section>

      <section>
        <h2 className="text-secondary-900 mb-6">Tables</h2>
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tool ID</TableHead>
                <TableHead>Tool Name</TableHead>
                <TableHead>Workshop</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">T-001</TableCell>
                <TableCell>Torque Wrench</TableCell>
                <TableCell>Aviation</TableCell>
                <TableCell>
                  <StatusBadge status="available" />
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">T-002</TableCell>
                <TableCell>Digital Multimeter</TableCell>
                <TableCell>Electrical</TableCell>
                <TableCell>
                  <StatusBadge status="assigned" />
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">T-003</TableCell>
                <TableCell>Hydraulic Jack</TableCell>
                <TableCell>Aviation</TableCell>
                <TableCell>
                  <StatusBadge status="maintenance" />
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Card>
      </section>

      <section>
        <h2 className="text-secondary-900 mb-6">Tabs</h2>
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
            <TabsTrigger value="tab3">Tab 3</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">
            <Card className="p-6">
              <p className="text-secondary-600">Content for Tab 1</p>
            </Card>
          </TabsContent>
          <TabsContent value="tab2">
            <Card className="p-6">
              <p className="text-secondary-600">Content for Tab 2</p>
            </Card>
          </TabsContent>
          <TabsContent value="tab3">
            <Card className="p-6">
              <p className="text-secondary-600">Content for Tab 3</p>
            </Card>
          </TabsContent>
        </Tabs>
      </section>

      <section>
        <h2 className="text-secondary-900 mb-6">Alerts</h2>
        <div className="space-y-4">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>This is a default alert message.</AlertDescription>
          </Alert>
          <Alert className="border-success-300 bg-success-50">
            <CheckCircle className="h-4 w-4 text-success-600" />
            <AlertDescription className="text-success-800">
              This is a success alert message.
            </AlertDescription>
          </Alert>
          <Alert className="border-warning-300 bg-warning-50">
            <AlertCircle className="h-4 w-4 text-warning-600" />
            <AlertDescription className="text-warning-800">
              This is a warning alert message.
            </AlertDescription>
          </Alert>
          <Alert className="border-error-300 bg-error-50">
            <AlertCircle className="h-4 w-4 text-error-600" />
            <AlertDescription className="text-error-800">
              This is an error alert message.
            </AlertDescription>
          </Alert>
        </div>
      </section>

      <section>
        <h2 className="text-secondary-900 mb-6">Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
            <h3 className="text-secondary-900 mb-2">Basic Card</h3>
            <p className="text-secondary-600">
              This is a basic card component with padding and rounded corners.
            </p>
          </Card>
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <h3 className="text-secondary-900 mb-2">Interactive Card</h3>
            <p className="text-secondary-600">
              This card has a hover effect with shadow transition.
            </p>
          </Card>
          <Card className="overflow-hidden">
            <div className="p-6 border-b border-secondary-200 bg-primary-50">
              <h3 className="text-secondary-900">Card with Header</h3>
            </div>
            <div className="p-6">
              <p className="text-secondary-600">This card has a distinct header section.</p>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
