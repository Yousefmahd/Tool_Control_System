import { useState } from 'react';
import { Plus, Search, Filter, Eye, Printer, CheckCircle, Clock, AlertCircle, Calendar } from 'lucide-react';
import { mockTasks, mockStudents, mockTools, Task } from '../data/mockData';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useUser } from '../context/UserContext';
import { Badge } from './ui/badge';

interface SupervisorDashboardProps {
  onNavigate: (page: string, data?: any) => void;
}

export function SupervisorDashboard({ onNavigate }: SupervisorDashboardProps) {
  const { currentUser, canAccessWorkshop } = useUser();
  const isAdmin = currentUser.role === 'Admin' || currentUser.workshop === 'All';
  const isSupervisor = currentUser.role === 'Supervisor' || isAdmin;
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  // Filter tasks based on user's workshop access
  const visibleTasks = mockTasks.filter(task => {
    const hasAccess = isAdmin || canAccessWorkshop(task.workshop);
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    
    return hasAccess && matchesSearch && matchesStatus;
  });

  const activeTasks = visibleTasks.filter(t => t.status === 'In Progress' || t.status === 'Not Started').length;
  const completedTasks = visibleTasks.filter(t => t.status === 'Completed').length;
  const overdueTasks = visibleTasks.filter(t => t.status === 'Overdue').length;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed': return <CheckCircle className="w-4 h-4" />;
      case 'In Progress': return <Clock className="w-4 h-4" />;
      case 'Overdue': return <AlertCircle className="w-4 h-4" />;
      default: return <Calendar className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'In Progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Overdue': return 'bg-red-100 text-red-800 border-red-200';
      case 'Not Started': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handlePrintTaskCard = (task: Task) => {
    setSelectedTask(task);
    // Print functionality will be handled in the TaskCardPrint component
    setTimeout(() => {
      window.print();
    }, 100);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-[var(--color-neutral-900)] mb-2">Supervisor Dashboard</h1>
        <p className="text-[var(--color-neutral-600)]">
          {isSupervisor 
            ? 'Create and manage student tasks' 
            : 'View assigned tasks and requirements'}
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg border border-[var(--color-border)] shadow-[var(--shadow-sm)] p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-[var(--color-neutral-600)]">Active Tasks</p>
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <p className="text-3xl text-[var(--color-neutral-900)]">{activeTasks}</p>
        </div>

        <div className="bg-white rounded-lg border border-[var(--color-border)] shadow-[var(--shadow-sm)] p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-[var(--color-neutral-600)]">Completed</p>
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <p className="text-3xl text-[var(--color-neutral-900)]">{completedTasks}</p>
        </div>

        <div className="bg-white rounded-lg border border-[var(--color-border)] shadow-[var(--shadow-sm)] p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-[var(--color-neutral-600)]">Overdue</p>
            <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-red-600" />
            </div>
          </div>
          <p className="text-3xl text-[var(--color-neutral-900)]">{overdueTasks}</p>
        </div>
      </div>

      {/* Actions Bar */}
      <div className="bg-white rounded-lg border border-[var(--color-border)] p-4 mb-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[300px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[var(--color-neutral-400)]" />
              <Input
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Not Started">Not Started</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>

            {isSupervisor && (
              <Button
                onClick={() => onNavigate('create-task')}
                className="bg-[var(--color-aviation-primary)] hover:bg-[var(--color-aviation-primary-dark)] text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Task
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Tasks Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {visibleTasks.map((task) => (
          <div
            key={task.id}
            className="bg-white rounded-lg border border-[var(--color-border)] shadow-[var(--shadow-sm)] p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-[var(--color-neutral-900)]">{task.title}</h3>
                  <Badge className={getPriorityColor(task.priority)}>
                    {task.priority}
                  </Badge>
                </div>
                <p className="text-sm text-[var(--color-neutral-600)] mb-3">
                  {task.description}
                </p>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[var(--color-neutral-600)]">Workshop:</span>
                <span className="text-[var(--color-neutral-900)]">{task.workshop}</span>
              </div>
              
              {task.assignedStudentName && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[var(--color-neutral-600)]">Student:</span>
                  <span className="text-[var(--color-neutral-900)]">{task.assignedStudentName}</span>
                </div>
              )}

              <div className="flex items-center justify-between text-sm">
                <span className="text-[var(--color-neutral-600)]">Estimated Time:</span>
                <span className="text-[var(--color-neutral-900)]">{task.estimatedTime}</span>
              </div>

              {task.dueDate && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[var(--color-neutral-600)]">Due Date:</span>
                  <span className="text-[var(--color-neutral-900)]">{task.dueDate}</span>
                </div>
              )}

              <div className="flex items-center justify-between text-sm">
                <span className="text-[var(--color-neutral-600)]">Required Tools:</span>
                <span className="text-[var(--color-neutral-900)]">{task.requiredTools.length} tool(s)</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-[var(--color-neutral-600)]">Status:</span>
                <Badge className={`${getStatusColor(task.status)} flex items-center gap-1`}>
                  {getStatusIcon(task.status)}
                  {task.status}
                </Badge>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-4 border-t border-[var(--color-border)]">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onNavigate('task-details', task)}
                className="flex-1"
              >
                <Eye className="w-4 h-4 mr-2" />
                View Details
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePrintTaskCard(task)}
              >
                <Printer className="w-4 h-4 mr-2" />
                Print Card
              </Button>
            </div>
          </div>
        ))}
      </div>

      {visibleTasks.length === 0 && (
        <div className="bg-white rounded-lg border border-[var(--color-border)] p-12 text-center">
          <Calendar className="w-16 h-16 text-[var(--color-neutral-400)] mx-auto mb-4" />
          <h3 className="text-[var(--color-neutral-900)] mb-2">No tasks found</h3>
          <p className="text-[var(--color-neutral-600)] mb-4">
            {isSupervisor 
              ? 'Create your first task to get started' 
              : 'No tasks have been assigned to you yet'}
          </p>
          {isSupervisor && (
            <Button
              onClick={() => onNavigate('create-task')}
              className="bg-[var(--color-aviation-primary)] hover:bg-[var(--color-aviation-primary-dark)] text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Task
            </Button>
          )}
        </div>
      )}

      {/* Hidden print component */}
      {selectedTask && (
        <div className="hidden print:block">
          <TaskCardPrint task={selectedTask} />
        </div>
      )}
    </div>
  );
}

// Printable Task Card Component
function TaskCardPrint({ task }: { task: Task }) {
  const tools = mockTools.filter(t => task.requiredTools.includes(t.id));
  
  return (
    <div className="p-8 bg-white">
      <div className="max-w-4xl mx-auto border-2 border-black p-8">
        {/* Header */}
        <div className="text-center mb-6 pb-6 border-b-2 border-black">
          <h1 className="text-3xl mb-2">TASK CARD</h1>
          <p className="text-xl">{task.workshop} Workshop</p>
        </div>

        {/* Task Information */}
        <div className="mb-6">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm mb-1">Task ID:</p>
              <p className="text-xl">{task.id}</p>
            </div>
            <div>
              <p className="text-sm mb-1">Priority:</p>
              <p className="text-xl">{task.priority}</p>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-sm mb-1">Task Title:</p>
            <p className="text-2xl">{task.title}</p>
          </div>

          <div className="mb-4">
            <p className="text-sm mb-1">Description:</p>
            <p className="text-lg">{task.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm mb-1">Estimated Time:</p>
              <p className="text-lg">{task.estimatedTime}</p>
            </div>
            {task.dueDate && (
              <div>
                <p className="text-sm mb-1">Due Date:</p>
                <p className="text-lg">{task.dueDate}</p>
              </div>
            )}
          </div>
        </div>

        {/* Instructions */}
        <div className="mb-6 pb-6 border-b border-black">
          <h2 className="text-xl mb-3">INSTRUCTIONS</h2>
          <p className="text-base whitespace-pre-line">{task.instructions}</p>
        </div>

        {/* Required Tools */}
        <div className="mb-6 pb-6 border-b border-black">
          <h2 className="text-xl mb-3">REQUIRED TOOLS</h2>
          <div className="space-y-2">
            {tools.map(tool => (
              <div key={tool.id} className="flex items-center justify-between border border-gray-300 p-3">
                <div>
                  <p className="font-medium">{tool.name}</p>
                  <p className="text-sm text-gray-600">{tool.id} - {tool.category}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm">Location: {tool.location.room}</p>
                  <p className="text-sm">{tool.location.shelf}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Safety Notes */}
        {task.safetyNotes && (
          <div className="mb-6 pb-6 border-b border-black">
            <h2 className="text-xl mb-3">SAFETY NOTES</h2>
            <p className="text-base">{task.safetyNotes}</p>
          </div>
        )}

        {/* Learning Objectives */}
        {task.learningObjectives && task.learningObjectives.length > 0 && (
          <div className="mb-6 pb-6 border-b border-black">
            <h2 className="text-xl mb-3">LEARNING OBJECTIVES</h2>
            <ul className="list-disc list-inside space-y-1">
              {task.learningObjectives.map((obj, index) => (
                <li key={index} className="text-base">{obj}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Sign-off Section */}
        <div className="grid grid-cols-2 gap-8 mt-8">
          <div>
            <p className="mb-2">Student Name:</p>
            <div className="border-b-2 border-black h-12"></div>
            <p className="mt-2 text-sm">Print Name</p>
          </div>
          <div>
            <p className="mb-2">Student Signature:</p>
            <div className="border-b-2 border-black h-12"></div>
            <p className="mt-2 text-sm">Signature & Date</p>
          </div>
          <div>
            <p className="mb-2">Supervisor Name:</p>
            <div className="border-b-2 border-black h-12"></div>
            <p className="mt-2 text-sm">{task.supervisorName}</p>
          </div>
          <div>
            <p className="mb-2">Supervisor Signature:</p>
            <div className="border-b-2 border-black h-12"></div>
            <p className="mt-2 text-sm">Signature & Date</p>
          </div>
        </div>
      </div>
    </div>
  );
}