import { Package, Users, CheckCircle, AlertTriangle, Plane, Calendar, Mail } from 'lucide-react';
import { KPICard } from './KPICard';
import { StatusBadge } from './StatusBadge';
import { WorkshopCard } from './WorkshopCard';
import { AlertCard } from './AlertCard';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

export function ComponentLibrary() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-[var(--color-neutral-900)] mb-2">Component Library</h1>
        <p className="text-[var(--color-neutral-600)]">Reusable components for the Tool Control System</p>
      </div>

      {/* Color Palette */}
      <section className="mb-12">
        <h2 className="text-[var(--color-neutral-900)] mb-6">Color Palette</h2>
        <div className="bg-white rounded-lg border border-[var(--color-border)] shadow-[var(--shadow-sm)] p-6">
          <div className="space-y-6">
            <div>
              <h4 className="text-[var(--color-neutral-900)] mb-3">Primary Colors</h4>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="h-24 rounded-lg bg-[var(--color-aviation-primary)] mb-2"></div>
                  <p className="text-sm text-[var(--color-neutral-900)]">Aviation Primary</p>
                  <p className="text-xs text-[var(--color-neutral-600)]">#0066CC</p>
                </div>
                <div>
                  <div className="h-24 rounded-lg bg-[var(--color-aviation-primary-dark)] mb-2"></div>
                  <p className="text-sm text-[var(--color-neutral-900)]">Primary Dark</p>
                  <p className="text-xs text-[var(--color-neutral-600)]">#004C99</p>
                </div>
                <div>
                  <div className="h-24 rounded-lg bg-[var(--color-aviation-primary-light)] mb-2"></div>
                  <p className="text-sm text-[var(--color-neutral-900)]">Primary Light</p>
                  <p className="text-xs text-[var(--color-neutral-600)]">#3385D6</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-[var(--color-neutral-900)] mb-3">Status Colors</h4>
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <div className="h-24 rounded-lg bg-[var(--color-success)] mb-2"></div>
                  <p className="text-sm text-[var(--color-neutral-900)]">Success</p>
                  <p className="text-xs text-[var(--color-neutral-600)]">#10B981</p>
                </div>
                <div>
                  <div className="h-24 rounded-lg bg-[var(--color-warning)] mb-2"></div>
                  <p className="text-sm text-[var(--color-neutral-900)]">Warning</p>
                  <p className="text-xs text-[var(--color-neutral-600)]">#F59E0B</p>
                </div>
                <div>
                  <div className="h-24 rounded-lg bg-[var(--color-danger)] mb-2"></div>
                  <p className="text-sm text-[var(--color-neutral-900)]">Danger</p>
                  <p className="text-xs text-[var(--color-neutral-600)]">#EF4444</p>
                </div>
                <div>
                  <div className="h-24 rounded-lg bg-[var(--color-aviation-secondary)] mb-2"></div>
                  <p className="text-sm text-[var(--color-neutral-900)]">Secondary</p>
                  <p className="text-xs text-[var(--color-neutral-600)]">#475569</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-[var(--color-neutral-900)] mb-3">Neutral Colors</h4>
              <div className="grid grid-cols-5 gap-4">
                {[100, 300, 500, 700, 900].map(shade => (
                  <div key={shade}>
                    <div className={`h-24 rounded-lg bg-[var(--color-neutral-${shade})] mb-2 ${shade >= 700 ? 'border border-[var(--color-border)]' : ''}`}></div>
                    <p className="text-sm text-[var(--color-neutral-900)]">Neutral {shade}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Typography */}
      <section className="mb-12">
        <h2 className="text-[var(--color-neutral-900)] mb-6">Typography</h2>
        <div className="bg-white rounded-lg border border-[var(--color-border)] shadow-[var(--shadow-sm)] p-6">
          <div className="space-y-4">
            <div>
              <h1>Heading 1 - Large Page Titles</h1>
              <p className="text-xs text-[var(--color-neutral-600)] mt-1">2rem / 32px</p>
            </div>
            <div>
              <h2>Heading 2 - Section Titles</h2>
              <p className="text-xs text-[var(--color-neutral-600)] mt-1">1.5rem / 24px</p>
            </div>
            <div>
              <h3>Heading 3 - Subsection Titles</h3>
              <p className="text-xs text-[var(--color-neutral-600)] mt-1">1.25rem / 20px</p>
            </div>
            <div>
              <h4>Heading 4 - Card Headers</h4>
              <p className="text-xs text-[var(--color-neutral-600)] mt-1">1.125rem / 18px</p>
            </div>
            <div>
              <h5>Heading 5 - Small Headers</h5>
              <p className="text-xs text-[var(--color-neutral-600)] mt-1">1rem / 16px</p>
            </div>
            <div>
              <p>Body text - Default paragraph text used throughout the application</p>
              <p className="text-xs text-[var(--color-neutral-600)] mt-1">0.875rem / 14px</p>
            </div>
            <div>
              <small>Small text - Used for captions and secondary information</small>
              <p className="text-xs text-[var(--color-neutral-600)] mt-1">0.75rem / 12px</p>
            </div>
          </div>
        </div>
      </section>

      {/* Buttons */}
      <section className="mb-12">
        <h2 className="text-[var(--color-neutral-900)] mb-6">Buttons</h2>
        <div className="bg-white rounded-lg border border-[var(--color-border)] shadow-[var(--shadow-sm)] p-6">
          <div className="space-y-6">
            <div>
              <h4 className="text-[var(--color-neutral-900)] mb-3">Primary Buttons</h4>
              <div className="flex flex-wrap gap-3">
                <Button className="bg-[var(--color-aviation-primary)] hover:bg-[var(--color-aviation-primary-dark)] text-white">
                  Primary Button
                </Button>
                <Button className="bg-[var(--color-success)] hover:bg-[var(--color-success-dark)] text-white">
                  Success Button
                </Button>
                <Button className="bg-[var(--color-danger)] hover:bg-[var(--color-danger-dark)] text-white">
                  Danger Button
                </Button>
              </div>
            </div>

            <div>
              <h4 className="text-[var(--color-neutral-900)] mb-3">Outline Buttons</h4>
              <div className="flex flex-wrap gap-3">
                <Button variant="outline">Outline Button</Button>
                <Button variant="outline" disabled>Disabled Button</Button>
              </div>
            </div>

            <div>
              <h4 className="text-[var(--color-neutral-900)] mb-3">Buttons with Icons</h4>
              <div className="flex flex-wrap gap-3">
                <Button className="bg-[var(--color-aviation-primary)] hover:bg-[var(--color-aviation-primary-dark)] text-white">
                  <Package className="w-4 h-4 mr-2" />
                  With Icon
                </Button>
                <Button variant="outline">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Outline with Icon
                </Button>
              </div>
            </div>

            <div>
              <h4 className="text-[var(--color-neutral-900)] mb-3">Button Sizes</h4>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="sm">Small</Button>
                <Button>Default</Button>
                <Button size="lg">Large</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* KPI Cards */}
      <section className="mb-12">
        <h2 className="text-[var(--color-neutral-900)] mb-6">KPI Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <KPICard
            title="Total Tools"
            value={156}
            icon={Package}
            trend={{ value: '12%', isPositive: true }}
            color="var(--color-aviation-primary)"
          />
          <KPICard
            title="Available Tools"
            value={89}
            icon={CheckCircle}
            color="var(--color-success)"
          />
          <KPICard
            title="Missing Tools"
            value={3}
            icon={AlertTriangle}
            trend={{ value: '5%', isPositive: false }}
            color="var(--color-danger)"
          />
        </div>
      </section>

      {/* Status Badges */}
      <section className="mb-12">
        <h2 className="text-[var(--color-neutral-900)] mb-6">Status Badges</h2>
        <div className="bg-white rounded-lg border border-[var(--color-border)] shadow-[var(--shadow-sm)] p-6">
          <div className="space-y-6">
            <div>
              <h4 className="text-[var(--color-neutral-900)] mb-3">Tool Status</h4>
              <div className="flex flex-wrap gap-3">
                <StatusBadge status="Available" />
                <StatusBadge status="Assigned" />
                <StatusBadge status="Under Maintenance" />
                <StatusBadge status="Missing" />
              </div>
            </div>

            <div>
              <h4 className="text-[var(--color-neutral-900)] mb-3">Assignment Status</h4>
              <div className="flex flex-wrap gap-3">
                <StatusBadge status="Active" />
                <StatusBadge status="Returned" />
                <StatusBadge status="Overdue" />
              </div>
            </div>

            <div>
              <h4 className="text-[var(--color-neutral-900)] mb-3">Condition Status</h4>
              <div className="flex flex-wrap gap-3">
                <StatusBadge status="Excellent" />
                <StatusBadge status="Good" />
                <StatusBadge status="Fair" />
                <StatusBadge status="Poor" />
              </div>
            </div>

            <div>
              <h4 className="text-[var(--color-neutral-900)] mb-3">Small Size</h4>
              <div className="flex flex-wrap gap-3">
                <StatusBadge status="Available" size="sm" />
                <StatusBadge status="Assigned" size="sm" />
                <StatusBadge status="Under Maintenance" size="sm" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Workshop Cards */}
      <section className="mb-12">
        <h2 className="text-[var(--color-neutral-900)] mb-6">Workshop Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <WorkshopCard
            name="Aviation Workshop"
            icon={Plane}
            totalTools={50}
            available={32}
            assigned={15}
            maintenance={3}
            color="#0066CC"
          />
          <WorkshopCard
            name="Mechanical Workshop"
            icon={Package}
            totalTools={60}
            available={38}
            assigned={18}
            maintenance={4}
            color="#475569"
          />
          <WorkshopCard
            name="Electrical Workshop"
            icon={CheckCircle}
            totalTools={46}
            available={28}
            assigned={14}
            maintenance={4}
            color="#10B981"
          />
        </div>
      </section>

      {/* Alert Cards */}
      <section className="mb-12">
        <h2 className="text-[var(--color-neutral-900)] mb-6">Alert Cards</h2>
        <div className="space-y-4">
          <AlertCard
            type="overdue"
            title="Overdue Returns"
            description="Tools past their return date require immediate attention"
            count={5}
          />
          <AlertCard
            type="missing"
            title="Missing Tools"
            description="Tools marked as missing need to be located"
            count={2}
          />
          <AlertCard
            type="inspection"
            title="Inspection Due"
            description="Regular maintenance inspection is required for these tools"
            count={8}
          />
        </div>
      </section>

      {/* Form Inputs */}
      <section className="mb-12">
        <h2 className="text-[var(--color-neutral-900)] mb-6">Form Inputs</h2>
        <div className="bg-white rounded-lg border border-[var(--color-border)] shadow-[var(--shadow-sm)] p-6">
          <div className="space-y-6 max-w-2xl">
            <div>
              <Label htmlFor="input1">Text Input</Label>
              <Input id="input1" placeholder="Enter text..." />
            </div>

            <div>
              <Label htmlFor="input2">Input with Icon</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[var(--color-neutral-400)]" />
                <Input id="input2" placeholder="email@example.com" className="pl-10" />
              </div>
            </div>

            <div>
              <Label htmlFor="select1">Select Dropdown</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="option1">Option 1</SelectItem>
                  <SelectItem value="option2">Option 2</SelectItem>
                  <SelectItem value="option3">Option 3</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="textarea1">Textarea</Label>
              <Textarea id="textarea1" placeholder="Enter multiple lines of text..." rows={4} />
            </div>
          </div>
        </div>
      </section>

      {/* Tables */}
      <section className="mb-12">
        <h2 className="text-[var(--color-neutral-900)] mb-6">Data Tables</h2>
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
                  Workshop
                </th>
                <th className="text-left px-6 py-3 text-xs text-[var(--color-neutral-600)] uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              <tr className="hover:bg-[var(--color-neutral-50)] transition-colors">
                <td className="px-6 py-4 text-sm text-[var(--color-aviation-primary)]">AVT-001</td>
                <td className="px-6 py-4 text-sm text-[var(--color-neutral-900)]">Torque Wrench</td>
                <td className="px-6 py-4 text-sm text-[var(--color-neutral-700)]">Aviation</td>
                <td className="px-6 py-4"><StatusBadge status="Available" size="sm" /></td>
              </tr>
              <tr className="hover:bg-[var(--color-neutral-50)] transition-colors">
                <td className="px-6 py-4 text-sm text-[var(--color-aviation-primary)]">MCH-002</td>
                <td className="px-6 py-4 text-sm text-[var(--color-neutral-900)]">Socket Set</td>
                <td className="px-6 py-4 text-sm text-[var(--color-neutral-700)]">Mechanical</td>
                <td className="px-6 py-4"><StatusBadge status="Assigned" size="sm" /></td>
              </tr>
              <tr className="hover:bg-[var(--color-neutral-50)] transition-colors">
                <td className="px-6 py-4 text-sm text-[var(--color-aviation-primary)]">ELC-003</td>
                <td className="px-6 py-4 text-sm text-[var(--color-neutral-900)]">Multimeter</td>
                <td className="px-6 py-4 text-sm text-[var(--color-neutral-700)]">Electrical</td>
                <td className="px-6 py-4"><StatusBadge status="Under Maintenance" size="sm" /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Tabs */}
      <section className="mb-12">
        <h2 className="text-[var(--color-neutral-900)] mb-6">Tabs</h2>
        <div className="bg-white rounded-lg border border-[var(--color-border)] shadow-[var(--shadow-sm)]">
          <Tabs defaultValue="tab1">
            <div className="border-b border-[var(--color-border)] px-6">
              <TabsList className="bg-transparent border-0 h-auto p-0">
                <TabsTrigger 
                  value="tab1" 
                  className="data-[state=active]:border-b-2 data-[state=active]:border-[var(--color-aviation-primary)] rounded-none px-4 py-3"
                >
                  Tab 1
                </TabsTrigger>
                <TabsTrigger 
                  value="tab2"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-[var(--color-aviation-primary)] rounded-none px-4 py-3"
                >
                  Tab 2
                </TabsTrigger>
                <TabsTrigger 
                  value="tab3"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-[var(--color-aviation-primary)] rounded-none px-4 py-3"
                >
                  Tab 3
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="tab1" className="p-6">
              <p>Content for Tab 1</p>
            </TabsContent>
            <TabsContent value="tab2" className="p-6">
              <p>Content for Tab 2</p>
            </TabsContent>
            <TabsContent value="tab3" className="p-6">
              <p>Content for Tab 3</p>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
