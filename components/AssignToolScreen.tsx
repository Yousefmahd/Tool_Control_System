import { useState } from 'react';
import { ArrowLeft, Package, User, Shield, FileText, CheckCircle, AlertCircle, HelpCircle } from 'lucide-react';
import { mockTools, mockStudents, mockTasks } from '../data/mockData';
import { Button } from './ui/button';
import { BarcodeScanner } from './BarcodeScanner';
import { StatusBadge } from './StatusBadge';
import { BarcodeReference } from './BarcodeReference';
import { useUser } from '../context/UserContext';

interface AssignToolScreenProps {
  onNavigate: (page: string) => void;
}

export function AssignToolScreen({ onNavigate }: AssignToolScreenProps) {
  const { currentUser } = useUser();
  
  const [scannedToolBarcode, setScannedToolBarcode] = useState('');
  const [scannedSupervisorBarcode, setScannedSupervisorBarcode] = useState('');
  const [scannedTaskBarcode, setScannedTaskBarcode] = useState('');
  
  const [toolData, setToolData] = useState<any>(null);
  const [supervisorData, setSupervisorData] = useState<any>(null);
  const [taskData, setTaskData] = useState<any>(null);
  
  const [error, setError] = useState('');
  const [isReferenceOpen, setIsReferenceOpen] = useState(false);

  const handleToolScan = (barcode: string) => {
    setError('');
    const tool = mockTools.find(t => t.id === barcode || t.barcode === barcode);
    
    if (!tool) {
      setError('Tool not found. Please check the barcode and try again.');
      return;
    }
    
    if (tool.status !== 'Available') {
      setError(`This tool is currently ${tool.status}. Only available tools can be assigned.`);
      return;
    }
    
    setScannedToolBarcode(barcode);
    setToolData(tool);
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

  const handleTaskScan = (barcode: string) => {
    setError('');
    const task = mockTasks.find(t => t.id === barcode);
    
    if (!task) {
      setError('Task not found. Please check the task card barcode and try again.');
      return;
    }
    
    if (task.status === 'Completed') {
      setError('This task is already completed. Cannot assign tools to completed tasks.');
      return;
    }
    
    // Verify tool matches task workshop if tool is already scanned
    if (toolData && task.workshop !== toolData.workshop) {
      setError(`Task is for ${task.workshop} workshop but tool is from ${toolData.workshop} workshop.`);
      return;
    }
    
    setScannedTaskBarcode(barcode);
    setTaskData(task);
  };

  const handleClearTool = () => {
    setScannedToolBarcode('');
    setToolData(null);
  };

  const handleClearSupervisor = () => {
    setScannedSupervisorBarcode('');
    setSupervisorData(null);
  };

  const handleClearTask = () => {
    setScannedTaskBarcode('');
    setTaskData(null);
  };

  const handleCheckout = () => {
    // In a real app, this would submit to a backend
    const checkoutData = {
      toolId: toolData.id,
      toolName: toolData.name,
      supervisorId: supervisorData.id,
      supervisorName: supervisorData.name,
      taskId: taskData.id,
      taskName: taskData.title,
      checkoutDate: new Date().toISOString(),
      checkedOutBy: currentUser.name,
      status: 'Assigned'
    };
    
    console.log('Tool Checkout:', checkoutData);
    alert('Tool checked out successfully!');
    onNavigate('tool-control');
  };

  const allScanned = toolData && supervisorData && taskData;

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
            <h1 className="text-[var(--color-neutral-900)] mb-2">Check Out Tool</h1>
            <p className="text-[var(--color-neutral-600)]">
              Scan tool, supervisor, and task barcodes to complete checkout
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
                <p className="text-sm text-[var(--color-neutral-600)]">Scan the tool barcode</p>
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

            {toolData && (
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
                    <span className="text-[var(--color-neutral-600)]">Category:</span> {toolData.category}
                  </p>
                  <p className="text-[var(--color-neutral-700)]">
                    <span className="text-[var(--color-neutral-600)]">Location:</span> {toolData.location.room} / {toolData.location.shelf}
                  </p>
                  <div className="pt-2">
                    <StatusBadge status={toolData.condition} size="sm" />
                  </div>
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

          {/* Scan Task */}
          <div className="bg-white rounded-lg border border-[var(--color-border)] shadow-[var(--shadow-sm)] p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                taskData ? 'bg-green-100' : (toolData && supervisorData) ? 'bg-blue-100' : 'bg-gray-100'
              }`}>
                <FileText className={`w-6 h-6 ${
                  taskData ? 'text-green-600' : (toolData && supervisorData) ? 'text-blue-600' : 'text-gray-400'
                }`} />
              </div>
              <div>
                <h3 className="text-[var(--color-neutral-900)]">Step 3: Scan Task Card</h3>
                <p className="text-sm text-[var(--color-neutral-600)]">Scan task card barcode</p>
              </div>
            </div>
            
            <BarcodeScanner
              label="Task Card Barcode"
              placeholder="Scan or enter task ID..."
              onScan={handleTaskScan}
              scannedValue={scannedTaskBarcode}
              onClear={handleClearTask}
              autoFocus={toolData && supervisorData && !taskData}
            />

            {taskData && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h5 className="text-[var(--color-neutral-900)]">{taskData.title}</h5>
                    <p className="text-sm text-[var(--color-aviation-primary)]">{taskData.id}</p>
                  </div>
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div className="space-y-1 text-sm">
                  <p className="text-[var(--color-neutral-700)]">
                    <span className="text-[var(--color-neutral-600)]">Workshop:</span> {taskData.workshop}
                  </p>
                  <p className="text-[var(--color-neutral-700)]">
                    <span className="text-[var(--color-neutral-600)]">Student:</span> {taskData.assignedStudentName}
                  </p>
                  <p className="text-[var(--color-neutral-700)]">
                    <span className="text-[var(--color-neutral-600)]">Due Date:</span> {taskData.dueDate}
                  </p>
                  <p className="text-[var(--color-neutral-700)]">
                    <span className="text-[var(--color-neutral-600)]">Priority:</span> {taskData.priority}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Summary & Actions */}
        <div>
          <div className="bg-white rounded-lg border border-[var(--color-border)] shadow-[var(--shadow-sm)] p-6 sticky top-8">
            <h3 className="text-[var(--color-neutral-900)] mb-4">Checkout Summary</h3>
            
            {!allScanned ? (
              <div className="text-center py-12">
                <Package className="w-16 h-16 text-[var(--color-neutral-300)] mx-auto mb-4" />
                <p className="text-[var(--color-neutral-600)]">
                  Scan all three items to complete checkout
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
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[var(--color-neutral-600)]">Task</span>
                    {taskData ? (
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
                    <h5 className="text-sm text-[var(--color-neutral-900)]">Tool</h5>
                  </div>
                  <p className="text-[var(--color-neutral-900)]">{toolData.name}</p>
                  <p className="text-xs text-[var(--color-neutral-600)]">{toolData.id}</p>
                </div>

                {/* Supervisor Summary */}
                <div className="border border-[var(--color-border)] rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-4 h-4 text-[var(--color-aviation-primary)]" />
                    <h5 className="text-sm text-[var(--color-neutral-900)]">Approved By</h5>
                  </div>
                  <p className="text-[var(--color-neutral-900)]">{supervisorData.name}</p>
                  <p className="text-xs text-[var(--color-neutral-600)]">{supervisorData.role}</p>
                </div>

                {/* Task Summary */}
                <div className="border border-[var(--color-border)] rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="w-4 h-4 text-[var(--color-aviation-primary)]" />
                    <h5 className="text-sm text-[var(--color-neutral-900)]">Assigned to Task</h5>
                  </div>
                  <p className="text-[var(--color-neutral-900)]">{taskData.title}</p>
                  <p className="text-xs text-[var(--color-neutral-600)]">{taskData.id}</p>
                  <p className="text-xs text-[var(--color-neutral-600)] mt-1">
                    Student: {taskData.assignedStudentName}
                  </p>
                </div>

                {/* Checkout Info */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-xs text-blue-900 mb-1">Checkout Time</p>
                  <p className="text-sm text-blue-900">
                    {new Date().toLocaleString()}
                  </p>
                </div>

                {/* Action Button */}
                <Button
                  onClick={handleCheckout}
                  className="w-full bg-[var(--color-success)] hover:bg-[var(--color-success-dark)] text-white h-12"
                >
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Complete Checkout
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Barcode Reference */}
      <BarcodeReference
        isOpen={isReferenceOpen}
        onClose={() => setIsReferenceOpen(false)}
      />
    </div>
  );
}