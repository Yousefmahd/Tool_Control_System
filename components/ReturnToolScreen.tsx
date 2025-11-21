import { useState } from 'react';
import { ArrowLeft, Package, Shield, CheckCircle, AlertCircle, AlertTriangle, HelpCircle } from 'lucide-react';
import { mockTools, mockStudents, mockTasks, mockAssignments } from '../data/mockData';
import { Button } from './ui/button';
import { BarcodeScanner } from './BarcodeScanner';
import { StatusBadge } from './StatusBadge';
import { IncidentReportDialog } from './IncidentReportDialog';
import { BarcodeReference } from './BarcodeReference';
import { useUser } from '../context/UserContext';

interface ReturnToolScreenProps {
  onNavigate: (page: string) => void;
}

export function ReturnToolScreen({ onNavigate }: ReturnToolScreenProps) {
  const { currentUser } = useUser();
  
  const [scannedToolBarcode, setScannedToolBarcode] = useState('');
  const [scannedSupervisorBarcode, setScannedSupervisorBarcode] = useState('');
  
  const [toolData, setToolData] = useState<any>(null);
  const [supervisorData, setSupervisorData] = useState<any>(null);
  const [assignmentData, setAssignmentData] = useState<any>(null);
  const [taskData, setTaskData] = useState<any>(null);
  
  const [hasIssue, setHasIssue] = useState(false);
  const [isIncidentDialogOpen, setIsIncidentDialogOpen] = useState(false);
  const [isReferenceOpen, setIsReferenceOpen] = useState(false);
  
  const [error, setError] = useState('');

  const handleToolScan = (barcode: string) => {
    setError('');
    const tool = mockTools.find(t => t.id === barcode || t.barcode === barcode);
    
    if (!tool) {
      setError('Tool not found. Please check the barcode and try again.');
      return;
    }
    
    if (tool.status !== 'Assigned') {
      setError(`This tool is currently ${tool.status}. Only assigned tools can be returned.`);
      return;
    }
    
    // Find the assignment for this tool
    const assignment = mockAssignments.find(a => a.toolId === tool.id && a.status === 'Active');
    
    if (!assignment) {
      setError('No active assignment found for this tool.');
      return;
    }

    // Find the associated task if any
    const task = mockTasks.find(t => t.requiredTools?.includes(tool.id));
    
    setScannedToolBarcode(barcode);
    setToolData(tool);
    setAssignmentData(assignment);
    setTaskData(task || null);
  };

  const handleSupervisorScan = (barcode: string) => {
    setError('');
    const supervisor = mockStudents.find(s => 
      (s.id === barcode || s.id === barcode) && 
      (s.role === 'Supervisor' || s.role === 'Admin')
    );
    
    if (!supervisor) {
      setError('Supervisor not found. Please ensure the barcode belongs to a supervisor or admin.');
      return;
    }
    
    setScannedSupervisorBarcode(barcode);
    setSupervisorData(supervisor);
  };

  const handleClearTool = () => {
    setScannedToolBarcode('');
    setToolData(null);
    setAssignmentData(null);
    setTaskData(null);
    setHasIssue(false);
  };

  const handleClearSupervisor = () => {
    setScannedSupervisorBarcode('');
    setSupervisorData(null);
  };

  const handleCheckin = () => {
    if (hasIssue) {
      // Open incident report dialog
      setIsIncidentDialogOpen(true);
    } else {
      // Complete check-in without incident
      completeCheckin(null);
    }
  };

  const completeCheckin = (incidentReport: any) => {
    const checkinData = {
      toolId: toolData.id,
      toolName: toolData.name,
      supervisorId: supervisorData.id,
      supervisorName: supervisorData.name,
      taskId: taskData?.id || 'N/A',
      taskName: taskData?.title || 'N/A',
      checkinDate: new Date().toISOString(),
      checkedInBy: currentUser.name,
      status: 'Available',
      hasIssue,
      incidentReport: incidentReport || null
    };
    
    console.log('Tool Check-in:', checkinData);
    alert(hasIssue 
      ? 'Tool checked in with incident report. Tool status set to Under Maintenance.'
      : 'Tool checked in successfully!'
    );
    onNavigate('tool-control');
  };

  const handleIncidentReport = (report: any) => {
    console.log('Incident Report:', report);
    completeCheckin(report);
  };

  const allScanned = toolData && supervisorData;

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <button
              onClick={() => onNavigate('tool-control')}
              className="flex items-center gap-2 text-[var(--color-neutral-600)] hover:text-[var(--color-neutral-900)] mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back to Dashboard</span>
            </button>
            <h1 className="text-[var(--color-neutral-900)] mb-2">Check In Tool</h1>
            <p className="text-[var(--color-neutral-600)]">
              Scan tool and supervisor barcodes to complete check-in
            </p>
          </div>
          <Button
            onClick={() => setIsReferenceOpen(true)}
            variant="outline"
            className="flex items-center gap-2"
          >
            <HelpCircle className="w-4 h-4" />
            Barcode Reference
          </Button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-red-800">{error}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Scanning */}
        <div className="space-y-6">
          {/* Scan Tool */}
          <div className="bg-white rounded-lg border border-[var(--color-border)] shadow-[var(--shadow-sm)] p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                toolData ? 'bg-green-100' : 'bg-blue-100'
              }`}>
                <Package className={`w-6 h-6 ${
                  toolData ? 'text-green-600' : 'text-blue-600'
                }`} />
              </div>
              <div>
                <h3 className="text-[var(--color-neutral-900)]">Step 1: Scan Tool</h3>
                <p className="text-sm text-[var(--color-neutral-600)]">Scan the returning tool barcode</p>
              </div>
            </div>
            
            <BarcodeScanner
              label="Tool Barcode"
              placeholder="Scan or enter tool barcode..."
              onScan={handleToolScan}
              scannedValue={scannedToolBarcode}
              onClear={handleClearTool}
              autoFocus={!toolData}
            />

            {toolData && assignmentData && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h5 className="text-[var(--color-neutral-900)]">{toolData.name}</h5>
                    <p className="text-sm text-[var(--color-aviation-primary)]">{toolData.id}</p>
                  </div>
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div className="space-y-1 text-sm">
                  <p className="text-[var(--color-neutral-700)]">
                    <span className="text-[var(--color-neutral-600)]">Workshop:</span> {toolData.workshop}
                  </p>
                  <p className="text-[var(--color-neutral-700)]">
                    <span className="text-[var(--color-neutral-600)]">Assigned to:</span> {assignmentData.staffName}
                  </p>
                  <p className="text-[var(--color-neutral-700)]">
                    <span className="text-[var(--color-neutral-600)]">Checkout Date:</span> {assignmentData.checkoutDate}
                  </p>
                  {taskData && (
                    <p className="text-[var(--color-neutral-700)]">
                      <span className="text-[var(--color-neutral-600)]">Task:</span> {taskData.title}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Scan Supervisor */}
          <div className="bg-white rounded-lg border border-[var(--color-border)] shadow-[var(--shadow-sm)] p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                supervisorData ? 'bg-green-100' : toolData ? 'bg-blue-100' : 'bg-gray-100'
              }`}>
                <Shield className={`w-6 h-6 ${
                  supervisorData ? 'text-green-600' : toolData ? 'text-blue-600' : 'text-gray-400'
                }`} />
              </div>
              <div>
                <h3 className="text-[var(--color-neutral-900)]">Step 2: Scan Supervisor</h3>
                <p className="text-sm text-[var(--color-neutral-600)]">Scan supervisor badge</p>
              </div>
            </div>
            
            <BarcodeScanner
              label="Supervisor Badge"
              placeholder="Scan or enter supervisor ID..."
              onScan={handleSupervisorScan}
              scannedValue={scannedSupervisorBarcode}
              onClear={handleClearSupervisor}
              autoFocus={toolData && !supervisorData}
            />

            {supervisorData && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h5 className="text-[var(--color-neutral-900)]">{supervisorData.name}</h5>
                    <p className="text-sm text-[var(--color-aviation-primary)]">{supervisorData.id}</p>
                  </div>
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div className="space-y-1 text-sm">
                  <p className="text-[var(--color-neutral-700)]">
                    <span className="text-[var(--color-neutral-600)]">Role:</span> {supervisorData.role}
                  </p>
                  <p className="text-[var(--color-neutral-700)]">
                    <span className="text-[var(--color-neutral-600)]">Workshop:</span> {supervisorData.workshop}
                  </p>
                  <p className="text-[var(--color-neutral-700)]">
                    <span className="text-[var(--color-neutral-600)]">Department:</span> {supervisorData.department}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Tool Condition Check */}
          {allScanned && (
            <div className="bg-white rounded-lg border border-[var(--color-border)] shadow-[var(--shadow-sm)] p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  hasIssue ? 'bg-red-100' : 'bg-gray-100'
                }`}>
                  <AlertTriangle className={`w-6 h-6 ${
                    hasIssue ? 'text-red-600' : 'text-gray-400'
                  }`} />
                </div>
                <div>
                  <h3 className="text-[var(--color-neutral-900)]">Step 3: Tool Condition</h3>
                  <p className="text-sm text-[var(--color-neutral-600)]">Report any issues with the tool</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <button
                  onClick={() => setHasIssue(false)}
                  className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                    !hasIssue
                      ? 'border-green-500 bg-green-50'
                      : 'border-[var(--color-border)] hover:border-green-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle className={`w-5 h-5 ${!hasIssue ? 'text-green-600' : 'text-[var(--color-neutral-400)]'}`} />
                    <div>
                      <p className="text-[var(--color-neutral-900)]">No Issues</p>
                      <p className="text-sm text-[var(--color-neutral-600)]">Tool is in good condition</p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setHasIssue(true)}
                  className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                    hasIssue
                      ? 'border-red-500 bg-red-50'
                      : 'border-[var(--color-border)] hover:border-red-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <AlertTriangle className={`w-5 h-5 ${hasIssue ? 'text-red-600' : 'text-[var(--color-neutral-400)]'}`} />
                    <div>
                      <p className="text-[var(--color-neutral-900)]">Report Issue</p>
                      <p className="text-sm text-[var(--color-neutral-600)]">Tool has damage or problems</p>
                    </div>
                  </div>
                </button>
              </div>

              {hasIssue && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-900">
                    You will be asked to fill out an incident report before completing check-in.
                    The tool will be marked as "Under Maintenance" until inspected.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Column - Summary & Actions */}
        <div>
          <div className="bg-white rounded-lg border border-[var(--color-border)] shadow-[var(--shadow-sm)] p-6 sticky top-8">
            <h3 className="text-[var(--color-neutral-900)] mb-4">Check-in Summary</h3>
            
            {!allScanned ? (
              <div className="text-center py-12">
                <Package className="w-16 h-16 text-[var(--color-neutral-300)] mx-auto mb-4" />
                <p className="text-[var(--color-neutral-600)]">
                  Scan tool and supervisor to complete check-in
                </p>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[var(--color-neutral-600)]">Tool</span>
                    {toolData ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-[var(--color-neutral-300)]" />
                    )}
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[var(--color-neutral-600)]">Supervisor</span>
                    {supervisorData ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-[var(--color-neutral-300)]" />
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Tool Summary */}
                <div className="border border-[var(--color-border)] rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Package className="w-4 h-4 text-[var(--color-aviation-primary)]" />
                    <h5 className="text-sm text-[var(--color-neutral-900)]">Returning Tool</h5>
                  </div>
                  <p className="text-[var(--color-neutral-900)]">{toolData.name}</p>
                  <p className="text-xs text-[var(--color-neutral-600)]">{toolData.id}</p>
                </div>

                {/* Supervisor Summary */}
                <div className="border border-[var(--color-border)] rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-4 h-4 text-[var(--color-aviation-primary)]" />
                    <h5 className="text-sm text-[var(--color-neutral-900)]">Verified By</h5>
                  </div>
                  <p className="text-[var(--color-neutral-900)]">{supervisorData.name}</p>
                  <p className="text-xs text-[var(--color-neutral-600)]">{supervisorData.role}</p>
                </div>

                {/* Assignment Info */}
                {assignmentData && (
                  <div className="border border-[var(--color-border)] rounded-lg p-4">
                    <h5 className="text-sm text-[var(--color-neutral-900)] mb-2">Assignment Info</h5>
                    <p className="text-sm text-[var(--color-neutral-700)]">
                      <span className="text-[var(--color-neutral-600)]">Student:</span> {assignmentData.staffName}
                    </p>
                    <p className="text-sm text-[var(--color-neutral-700)]">
                      <span className="text-[var(--color-neutral-600)]">Checked out:</span> {assignmentData.checkoutDate}
                    </p>
                    {taskData && (
                      <p className="text-sm text-[var(--color-neutral-700)]">
                        <span className="text-[var(--color-neutral-600)]">Task:</span> {taskData.title}
                      </p>
                    )}
                  </div>
                )}

                {/* Tool Condition Status */}
                <div className={`border-2 rounded-lg p-4 ${
                  hasIssue ? 'border-red-500 bg-red-50' : 'border-green-500 bg-green-50'
                }`}>
                  <div className="flex items-center gap-2 mb-1">
                    {hasIssue ? (
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                    ) : (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    )}
                    <h5 className={`text-sm ${hasIssue ? 'text-red-900' : 'text-green-900'}`}>
                      Tool Condition
                    </h5>
                  </div>
                  <p className={`text-sm ${hasIssue ? 'text-red-800' : 'text-green-800'}`}>
                    {hasIssue ? 'Issue reported - Incident form required' : 'No issues - Good condition'}
                  </p>
                </div>

                {/* Check-in Info */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-xs text-blue-900 mb-1">Check-in Time</p>
                  <p className="text-sm text-blue-900">
                    {new Date().toLocaleString()}
                  </p>
                </div>

                {/* Action Button */}
                <Button
                  onClick={handleCheckin}
                  className={`w-full h-12 text-white ${
                    hasIssue
                      ? 'bg-red-600 hover:bg-red-700'
                      : 'bg-[var(--color-success)] hover:bg-[var(--color-success-dark)]'
                  }`}
                >
                  {hasIssue ? (
                    <>
                      <AlertTriangle className="w-5 h-5 mr-2" />
                      Complete with Incident Report
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Complete Check-in
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Incident Report Dialog */}
      <IncidentReportDialog
        isOpen={isIncidentDialogOpen}
        onClose={() => setIsIncidentDialogOpen(false)}
        onSubmit={handleIncidentReport}
        toolData={toolData}
        taskData={taskData}
      />

      {/* Barcode Reference Dialog */}
      <BarcodeReference
        isOpen={isReferenceOpen}
        onClose={() => setIsReferenceOpen(false)}
      />
    </div>
  );
}