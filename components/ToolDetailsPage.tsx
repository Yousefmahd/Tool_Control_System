import { ArrowLeft, Package, MapPin, QrCode, Calendar, History, Wrench, Edit, Barcode as BarcodeIcon } from 'lucide-react';
import { Tool, mockAssignments } from '../data/mockData';
import { StatusBadge } from './StatusBadge';
import { Button } from './ui/button';
import { useUser } from '../context/UserContext';
import { generateBarcodeImage } from '../utils/barcodeGenerator';

interface ToolDetailsPageProps {
  tool: Tool;
  onNavigate: (page: string) => void;
}

export function ToolDetailsPage({ tool, onNavigate }: ToolDetailsPageProps) {
  const { canEditTool } = useUser();
  const toolHistory = mockAssignments.filter(a => a.toolId === tool.id);
  const canEdit = canEditTool(tool.workshop);

  // Generate barcode image for display
  const barcodeImage = generateBarcodeImage(tool.barcode);

  return (
    <div className="p-8">
      <div className="mb-8">
        <button
          onClick={() => onNavigate('inventory')}
          className="flex items-center gap-2 text-[var(--color-neutral-600)] hover:text-[var(--color-neutral-900)] mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back to Inventory</span>
        </button>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-[var(--color-neutral-900)] mb-2">{tool.name}</h1>
            <p className="text-[var(--color-neutral-600)]">{tool.id}</p>
          </div>
          <div className="flex items-center gap-3">
            <StatusBadge status={tool.status} />
            <Button 
              className="bg-[var(--color-aviation-primary)] hover:bg-[var(--color-aviation-primary-dark)] text-white"
              disabled={!canEdit}
              title={!canEdit ? 'You can only edit tools from your workshop' : ''}
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Tool
            </Button>
          </div>
        </div>
        {!canEdit && (
          <div className="mt-4 bg-[var(--color-neutral-100)] border border-[var(--color-border)] rounded-lg p-3">
            <p className="text-sm text-[var(--color-neutral-600)]">
              You don't have permission to edit this tool. This tool belongs to the {tool.workshop} workshop.
            </p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tool Image */}
          {tool.imageUrl && (
            <div className="bg-white rounded-lg border border-[var(--color-border)] shadow-[var(--shadow-sm)] overflow-hidden">
              <img 
                src={tool.imageUrl} 
                alt={tool.name} 
                className="w-full h-96 object-cover"
              />
            </div>
          )}

          {/* Basic Information */}
          <div className="bg-white rounded-lg border border-[var(--color-border)] shadow-[var(--shadow-sm)] p-6">
            <h3 className="text-[var(--color-neutral-900)] mb-4 flex items-center gap-2">
              <Package className="w-5 h-5" />
              Basic Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-[var(--color-neutral-600)]">Tool ID</p>
                <p className="text-[var(--color-neutral-900)]">{tool.id}</p>
              </div>
              <div>
                <p className="text-sm text-[var(--color-neutral-600)]">Category</p>
                <p className="text-[var(--color-neutral-900)]">{tool.category}</p>
              </div>
              <div>
                <p className="text-sm text-[var(--color-neutral-600)]">Workshop</p>
                <p className="text-[var(--color-neutral-900)]">{tool.workshop}</p>
              </div>
              <div>
                <p className="text-sm text-[var(--color-neutral-600)]">Condition</p>
                <p className="text-[var(--color-neutral-900)]">{tool.condition}</p>
              </div>
            </div>
          </div>

          {/* Location Information */}
          <div className="bg-white rounded-lg border border-[var(--color-border)] shadow-[var(--shadow-sm)] p-6">
            <h3 className="text-[var(--color-neutral-900)] mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Location Details
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-[var(--color-neutral-600)]">Room / Area</p>
                  <p className="text-[var(--color-neutral-900)]">{tool.location.room}</p>
                </div>
                <div>
                  <p className="text-sm text-[var(--color-neutral-600)]">Shelf / Cabinet</p>
                  <p className="text-[var(--color-neutral-900)]">{tool.location.shelf}</p>
                </div>
                {tool.location.row && (
                  <div>
                    <p className="text-sm text-[var(--color-neutral-600)]">Row</p>
                    <p className="text-[var(--color-neutral-900)]">Row {tool.location.row}</p>
                  </div>
                )}
                {tool.location.section && (
                  <div>
                    <p className="text-sm text-[var(--color-neutral-600)]">Section</p>
                    <p className="text-[var(--color-neutral-900)]">{tool.location.section}</p>
                  </div>
                )}
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>Full Location:</strong> {tool.location.room} → {tool.location.shelf}
                  {tool.location.row && ` → Row ${tool.location.row}`}
                  {tool.location.section && ` → ${tool.location.section}`}
                </p>
              </div>
            </div>
          </div>

          {/* Maintenance Schedule */}
          <div className="bg-white rounded-lg border border-[var(--color-border)] shadow-[var(--shadow-sm)] p-6">
            <h3 className="text-[var(--color-neutral-900)] mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Maintenance Schedule
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-[var(--color-neutral-600)]">Last Inspection</p>
                <p className="text-[var(--color-neutral-900)]">{tool.lastInspection || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-[var(--color-neutral-600)]">Next Inspection</p>
                <p className="text-[var(--color-neutral-900)]">{tool.nextInspection || 'N/A'}</p>
              </div>
            </div>
          </div>

          {/* Usage History */}
          <div className="bg-white rounded-lg border border-[var(--color-border)] shadow-[var(--shadow-sm)] p-6">
            <h3 className="text-[var(--color-neutral-900)] mb-4 flex items-center gap-2">
              <History className="w-5 h-5" />
              Usage History
            </h3>
            {toolHistory.length > 0 ? (
              <div className="space-y-3">
                {toolHistory.map((assignment) => (
                  <div 
                    key={assignment.id} 
                    className="border border-[var(--color-border)] rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm text-[var(--color-neutral-900)]">{assignment.studentName}</p>
                      <StatusBadge status={assignment.status} size="sm" />
                    </div>
                    <div className="text-xs text-[var(--color-neutral-600)] space-y-1">
                      <p>Checkout: {assignment.checkoutDate} at {assignment.checkoutTime}</p>
                      {assignment.returnDate && (
                        <p>Return: {assignment.returnDate} at {assignment.returnTime}</p>
                      )}
                      <p>Supervisor: {assignment.supervisorName}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-[var(--color-neutral-600)]">No usage history available</p>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* QR & Barcode */}
          <div className="bg-white rounded-lg border border-[var(--color-border)] shadow-[var(--shadow-sm)] p-6">
            <h4 className="text-[var(--color-neutral-900)] mb-4">Identification</h4>
            <div className="space-y-4">
              <div className="p-3 bg-[var(--color-neutral-50)] rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <BarcodeIcon className="w-4 h-4 text-[var(--color-aviation-primary)]" />
                  <p className="text-xs text-[var(--color-neutral-600)]">Barcode</p>
                </div>
                <p className="text-sm text-[var(--color-neutral-900)] font-mono mb-3">{tool.barcode}</p>
                {barcodeImage && (
                  <img 
                    src={barcodeImage} 
                    alt="Barcode" 
                    className="w-full border border-[var(--color-border)] rounded"
                  />
                )}
              </div>

              <div className="p-3 bg-[var(--color-neutral-50)] rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <QrCode className="w-4 h-4 text-[var(--color-aviation-primary)]" />
                  <p className="text-xs text-[var(--color-neutral-600)]">QR Code</p>
                </div>
                <p className="text-sm text-[var(--color-neutral-900)] font-mono">{tool.qrCode}</p>
              </div>
            </div>
          </div>

          {/* Maintenance Log */}
          <div className="bg-white rounded-lg border border-[var(--color-border)] shadow-[var(--shadow-sm)] p-6">
            <h3 className="text-[var(--color-neutral-900)] mb-4 flex items-center gap-2">
              <Wrench className="w-5 h-5" />
              Maintenance Log
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-4 pb-3 border-b border-[var(--color-border)]">
                <div className="w-2 h-2 rounded-full bg-[var(--color-warning)] mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm text-[var(--color-neutral-900)]">Routine maintenance completed</p>
                  <p className="text-xs text-[var(--color-neutral-600)] mt-1">
                    Performed by: Maintenance Team · {tool.lastInspection}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 pb-3 border-b border-[var(--color-border)]">
                <div className="w-2 h-2 rounded-full bg-[var(--color-success)] mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm text-[var(--color-neutral-900)]">Inspection passed</p>
                  <p className="text-xs text-[var(--color-neutral-600)] mt-1">
                    Condition: {tool.condition} · {tool.lastInspection}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}