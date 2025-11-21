import { Package, Shield, FileText, X } from 'lucide-react';
import { mockTools, mockStudents, mockTasks } from '../data/mockData';
import { Button } from './ui/button';

interface BarcodeReferenceProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BarcodeReference({ isOpen, onClose }: BarcodeReferenceProps) {
  if (!isOpen) return null;

  const availableTools = mockTools.filter(t => t.status === 'Available');
  const assignedTools = mockTools.filter(t => t.status === 'Assigned');
  const supervisors = mockStudents.filter(s => s.role === 'Supervisor' || s.role === 'Admin');
  const activeTasks = mockTasks.filter(t => t.status === 'Active' || t.status === 'In Progress');

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[var(--color-border)] sticky top-0 bg-white">
          <div>
            <h2 className="text-[var(--color-neutral-900)] mb-1">Barcode Quick Reference</h2>
            <p className="text-sm text-[var(--color-neutral-600)]">
              Use these barcodes for testing the scanning system
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-[var(--color-neutral-400)] hover:text-[var(--color-neutral-600)] transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Available Tools for Checkout */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Package className="w-5 h-5 text-[var(--color-aviation-primary)]" />
              <h3 className="text-[var(--color-neutral-900)]">Available Tools (For Checkout)</h3>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {availableTools.slice(0, 6).map((tool) => (
                  <div key={tool.id} className="flex items-center justify-between bg-white p-3 rounded border border-[var(--color-border)]">
                    <div>
                      <p className="text-sm text-[var(--color-neutral-900)]">{tool.name}</p>
                      <p className="text-xs text-[var(--color-neutral-600)]">{tool.workshop}</p>
                    </div>
                    <code className="text-xs bg-gray-100 px-2 py-1 rounded font-mono">{tool.id}</code>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Assigned Tools for Check-in */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Package className="w-5 h-5 text-[var(--color-warning)]" />
              <h3 className="text-[var(--color-neutral-900)]">Assigned Tools (For Check-in)</h3>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {assignedTools.map((tool) => (
                  <div key={tool.id} className="flex items-center justify-between bg-white p-3 rounded border border-[var(--color-border)]">
                    <div>
                      <p className="text-sm text-[var(--color-neutral-900)]">{tool.name}</p>
                      <p className="text-xs text-[var(--color-neutral-600)]">{tool.workshop}</p>
                    </div>
                    <code className="text-xs bg-gray-100 px-2 py-1 rounded font-mono">{tool.id}</code>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Supervisors */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Shield className="w-5 h-5 text-[var(--color-aviation-primary)]" />
              <h3 className="text-[var(--color-neutral-900)]">Supervisors & Admins</h3>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {supervisors.map((supervisor) => (
                  <div key={supervisor.id} className="flex items-center justify-between bg-white p-3 rounded border border-[var(--color-border)]">
                    <div>
                      <p className="text-sm text-[var(--color-neutral-900)]">{supervisor.name}</p>
                      <p className="text-xs text-[var(--color-neutral-600)]">{supervisor.role} - {supervisor.workshop}</p>
                    </div>
                    <code className="text-xs bg-gray-100 px-2 py-1 rounded font-mono">{supervisor.id}</code>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Active Tasks */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <FileText className="w-5 h-5 text-[var(--color-aviation-primary)]" />
              <h3 className="text-[var(--color-neutral-900)]">Active Tasks</h3>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <div className="grid grid-cols-1 gap-3">
                {activeTasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between bg-white p-3 rounded border border-[var(--color-border)]">
                    <div>
                      <p className="text-sm text-[var(--color-neutral-900)]">{task.title}</p>
                      <p className="text-xs text-[var(--color-neutral-600)]">
                        {task.workshop} - {task.assignedStudentName} - Due: {task.dueDate}
                      </p>
                    </div>
                    <code className="text-xs bg-gray-100 px-2 py-1 rounded font-mono">{task.id}</code>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Usage Instructions */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="text-sm text-[var(--color-neutral-900)] mb-2">How to Use</h4>
            <ul className="text-sm text-[var(--color-neutral-700)] space-y-1 list-disc list-inside">
              <li>Copy the barcode (ID) from above</li>
              <li>Paste it into the barcode scanner input field or type it manually</li>
              <li>Press Enter to scan</li>
              <li>For checkout: Scan an Available tool + Supervisor + Active Task</li>
              <li>For check-in: Scan an Assigned tool + Supervisor</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-[var(--color-border)] sticky bottom-0 bg-white">
          <Button onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
