import { useState } from 'react';
import { X, AlertTriangle, User, FileText, Calendar } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { mockStudents } from '../data/mockData';

interface IncidentReportDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (report: any) => void;
  toolData: any;
  taskData?: any;
}

export function IncidentReportDialog({ 
  isOpen, 
  onClose, 
  onSubmit,
  toolData,
  taskData
}: IncidentReportDialogProps) {
  const [incidentType, setIncidentType] = useState('');
  const [severity, setSeverity] = useState('');
  const [description, setDescription] = useState('');
  const [studentsInvolved, setStudentsInvolved] = useState<string[]>([]);
  const [actionTaken, setActionTaken] = useState('');

  const students = mockStudents.filter(s => s.role === 'Student');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const report = {
      id: `INC-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      toolId: toolData.id,
      toolName: toolData.name,
      taskId: taskData?.id || 'N/A',
      taskName: taskData?.title || 'N/A',
      incidentType,
      severity,
      description,
      studentsInvolved,
      actionTaken,
      reportedBy: 'Current Supervisor',
      reportedDate: new Date().toISOString(),
      status: 'Open'
    };

    onSubmit(report);
    
    // Reset form
    setIncidentType('');
    setSeverity('');
    setDescription('');
    setStudentsInvolved([]);
    setActionTaken('');
    
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[var(--color-border)] bg-red-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h2 className="text-[var(--color-neutral-900)] mb-1">Report Tool Incident</h2>
              <p className="text-sm text-[var(--color-neutral-600)]">
                Document any issues or damage discovered during tool check-in
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[var(--color-neutral-400)] hover:text-[var(--color-neutral-600)] transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tool & Task Info */}
        <div className="p-6 bg-[var(--color-neutral-50)] border-b border-[var(--color-border)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-[var(--color-neutral-600)] mb-1">Tool</p>
              <p className="text-sm text-[var(--color-neutral-900)]">
                {toolData.name} <span className="text-[var(--color-neutral-500)]">({toolData.id})</span>
              </p>
            </div>
            {taskData && (
              <div>
                <p className="text-xs text-[var(--color-neutral-600)] mb-1">Associated Task</p>
                <p className="text-sm text-[var(--color-neutral-900)]">
                  {taskData.title} <span className="text-[var(--color-neutral-500)]">({taskData.id})</span>
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Incident Type & Severity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="incidentType">Incident Type *</Label>
              <Select value={incidentType} onValueChange={setIncidentType} required>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="damage">Tool Damage</SelectItem>
                  <SelectItem value="malfunction">Malfunction</SelectItem>
                  <SelectItem value="missing-parts">Missing Parts</SelectItem>
                  <SelectItem value="safety-issue">Safety Issue</SelectItem>
                  <SelectItem value="misuse">Tool Misuse</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="severity">Severity Level *</Label>
              <Select value={severity} onValueChange={setSeverity} required>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="minor">Minor - Cosmetic only</SelectItem>
                  <SelectItem value="moderate">Moderate - Requires repair</SelectItem>
                  <SelectItem value="major">Major - Tool unusable</SelectItem>
                  <SelectItem value="critical">Critical - Safety hazard</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">Incident Description *</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what happened, when it was discovered, and the condition of the tool..."
              rows={4}
              className="mt-1"
              required
            />
            <p className="text-xs text-[var(--color-neutral-500)] mt-1">
              Be as detailed as possible about the damage or issue
            </p>
          </div>

          {/* Students Involved */}
          <div>
            <Label htmlFor="students">Students Involved</Label>
            <Select 
              value={studentsInvolved.join(',')} 
              onValueChange={(value) => {
                if (value && !studentsInvolved.includes(value)) {
                  setStudentsInvolved([...studentsInvolved, value]);
                }
              }}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select students..." />
              </SelectTrigger>
              <SelectContent>
                {students.map((student) => (
                  <SelectItem key={student.id} value={student.id}>
                    {student.name} - {student.department}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {studentsInvolved.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {studentsInvolved.map((studentId) => {
                  const student = students.find(s => s.id === studentId);
                  return (
                    <div 
                      key={studentId}
                      className="inline-flex items-center gap-2 bg-[var(--color-neutral-100)] text-[var(--color-neutral-900)] px-3 py-1 rounded-md text-sm"
                    >
                      <User className="w-3 h-3" />
                      {student?.name}
                      <button
                        type="button"
                        onClick={() => setStudentsInvolved(studentsInvolved.filter(id => id !== studentId))}
                        className="text-[var(--color-neutral-500)] hover:text-[var(--color-neutral-700)]"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
            <p className="text-xs text-[var(--color-neutral-500)] mt-1">
              Select all students who were using this tool
            </p>
          </div>

          {/* Action Taken */}
          <div>
            <Label htmlFor="actionTaken">Immediate Action Taken *</Label>
            <Textarea
              id="actionTaken"
              value={actionTaken}
              onChange={(e) => setActionTaken(e.target.value)}
              placeholder="Describe what actions were taken immediately (e.g., tool removed from service, students counseled, safety officer notified)..."
              rows={3}
              className="mt-1"
              required
            />
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="text-blue-900 mb-1">Report Processing</p>
                <p className="text-blue-700">
                  This incident will be logged in the system and automatically notify the workshop manager and maintenance team. 
                  The tool status will be updated to "Under Maintenance" pending inspection.
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[var(--color-border)]">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              <AlertTriangle className="w-4 h-4 mr-2" />
              Submit Incident Report
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
