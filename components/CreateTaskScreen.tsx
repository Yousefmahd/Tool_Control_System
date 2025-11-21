import { useState } from 'react';
import { ArrowLeft, Plus, Trash2, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { useUser } from '../context/UserContext';
import { mockTools, mockStudents } from '../data/mockData';

interface CreateTaskScreenProps {
  onNavigate: (page: string) => void;
}

export function CreateTaskScreen({ onNavigate }: CreateTaskScreenProps) {
  const { currentUser } = useUser();
  const isAdmin = currentUser.role === 'Admin' || currentUser.workshop === 'All';
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    workshop: isAdmin ? '' : currentUser.workshop,
    assignedStudentId: '',
    priority: 'Medium',
    estimatedTime: '',
    dueDate: '',
    instructions: '',
    safetyNotes: '',
    learningObjectives: [''],
    requiredTools: [] as string[]
  });

  // Filter tools and students based on workshop
  const availableTools = mockTools.filter(t => 
    !formData.workshop || t.workshop === formData.workshop
  );
  
  const availableStudents = mockStudents.filter(s => 
    s.role === 'Student' && (!formData.workshop || s.workshop === formData.workshop)
  );

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddLearningObjective = () => {
    setFormData(prev => ({
      ...prev,
      learningObjectives: [...prev.learningObjectives, '']
    }));
  };

  const handleRemoveLearningObjective = (index: number) => {
    setFormData(prev => ({
      ...prev,
      learningObjectives: prev.learningObjectives.filter((_, i) => i !== index)
    }));
  };

  const handleUpdateLearningObjective = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      learningObjectives: prev.learningObjectives.map((obj, i) => i === index ? value : obj)
    }));
  };

  const handleToggleTool = (toolId: string) => {
    setFormData(prev => ({
      ...prev,
      requiredTools: prev.requiredTools.includes(toolId)
        ? prev.requiredTools.filter(id => id !== toolId)
        : [...prev.requiredTools, toolId]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Task created successfully!');
    onNavigate('supervisor');
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <button
          onClick={() => onNavigate('supervisor')}
          className="flex items-center gap-2 text-[var(--color-neutral-600)] hover:text-[var(--color-neutral-900)] mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back to Supervisor Dashboard</span>
        </button>
        <h1 className="text-[var(--color-neutral-900)] mb-2">Create New Task</h1>
        <p className="text-[var(--color-neutral-600)]">Create a task card for student assignment</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <div className="bg-white rounded-lg border border-[var(--color-border)] shadow-[var(--shadow-sm)] p-6">
              <h3 className="text-[var(--color-neutral-900)] mb-4">Basic Information</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Task Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleChange('title', e.target.value)}
                    placeholder="e.g., Aircraft Maintenance Task"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    placeholder="Brief description of the task..."
                    rows={3}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="workshop">Workshop *</Label>
                    <Select 
                      value={formData.workshop} 
                      onValueChange={(value) => handleChange('workshop', value)}
                      disabled={!isAdmin}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select workshop" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Aviation">Aviation</SelectItem>
                        <SelectItem value="Mechanical">Mechanical</SelectItem>
                        <SelectItem value="Electrical">Electrical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="priority">Priority *</Label>
                    <Select value={formData.priority} onValueChange={(value) => handleChange('priority', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Low">Low</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="estimatedTime">Estimated Time *</Label>
                    <Input
                      id="estimatedTime"
                      value={formData.estimatedTime}
                      onChange={(e) => handleChange('estimatedTime', e.target.value)}
                      placeholder="e.g., 2 hours"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="dueDate">Due Date</Label>
                    <Input
                      id="dueDate"
                      type="date"
                      value={formData.dueDate}
                      onChange={(e) => handleChange('dueDate', e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="assignedStudent">Assign to Student (Optional)</Label>
                  <Select 
                    value={formData.assignedStudentId} 
                    onValueChange={(value) => handleChange('assignedStudentId', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select student" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Unassigned</SelectItem>
                      {availableStudents.map(student => (
                        <SelectItem key={student.id} value={student.id}>
                          {student.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-white rounded-lg border border-[var(--color-border)] shadow-[var(--shadow-sm)] p-6">
              <h3 className="text-[var(--color-neutral-900)] mb-4">Instructions</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="instructions">Step-by-Step Instructions *</Label>
                  <Textarea
                    id="instructions"
                    value={formData.instructions}
                    onChange={(e) => handleChange('instructions', e.target.value)}
                    placeholder="Enter detailed instructions for the task..."
                    rows={6}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="safetyNotes">Safety Notes</Label>
                  <Textarea
                    id="safetyNotes"
                    value={formData.safetyNotes}
                    onChange={(e) => handleChange('safetyNotes', e.target.value)}
                    placeholder="Important safety information..."
                    rows={3}
                  />
                </div>
              </div>
            </div>

            {/* Learning Objectives */}
            <div className="bg-white rounded-lg border border-[var(--color-border)] shadow-[var(--shadow-sm)] p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[var(--color-neutral-900)]">Learning Objectives</h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAddLearningObjective}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Objective
                </Button>
              </div>
              <div className="space-y-3">
                {formData.learningObjectives.map((obj, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={obj}
                      onChange={(e) => handleUpdateLearningObjective(index, e.target.value)}
                      placeholder={`Learning objective ${index + 1}`}
                    />
                    {formData.learningObjectives.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handleRemoveLearningObjective(index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Required Tools */}
            <div className="bg-white rounded-lg border border-[var(--color-border)] shadow-[var(--shadow-sm)] p-6">
              <h3 className="text-[var(--color-neutral-900)] mb-4">Required Tools</h3>
              {formData.workshop ? (
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {availableTools.map(tool => (
                    <label
                      key={tool.id}
                      className="flex items-center gap-3 p-3 border border-[var(--color-border)] rounded-lg hover:bg-[var(--color-neutral-50)] cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={formData.requiredTools.includes(tool.id)}
                        onChange={() => handleToggleTool(tool.id)}
                        className="w-4 h-4"
                      />
                      <div className="flex-1">
                        <p className="text-sm text-[var(--color-neutral-900)]">{tool.name}</p>
                        <p className="text-xs text-[var(--color-neutral-600)]">
                          {tool.id} - {tool.category} - {tool.location.room}
                        </p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded ${
                        tool.status === 'Available' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {tool.status}
                      </span>
                    </label>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-[var(--color-neutral-600)]">
                  Please select a workshop first to see available tools
                </p>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Summary */}
            <div className="bg-white rounded-lg border border-[var(--color-border)] shadow-[var(--shadow-sm)] p-6">
              <h4 className="text-[var(--color-neutral-900)] mb-4">Task Summary</h4>
              <div className="space-y-3">
                <div className="pb-3 border-b border-[var(--color-border)]">
                  <p className="text-xs text-[var(--color-neutral-600)]">Title</p>
                  <p className="text-sm text-[var(--color-neutral-900)]">
                    {formData.title || 'Not specified'}
                  </p>
                </div>
                <div className="pb-3 border-b border-[var(--color-border)]">
                  <p className="text-xs text-[var(--color-neutral-600)]">Workshop</p>
                  <p className="text-sm text-[var(--color-neutral-900)]">
                    {formData.workshop || 'Not specified'}
                  </p>
                </div>
                <div className="pb-3 border-b border-[var(--color-border)]">
                  <p className="text-xs text-[var(--color-neutral-600)]">Priority</p>
                  <p className="text-sm text-[var(--color-neutral-900)]">
                    {formData.priority}
                  </p>
                </div>
                <div className="pb-3 border-b border-[var(--color-border)]">
                  <p className="text-xs text-[var(--color-neutral-600)]">Estimated Time</p>
                  <p className="text-sm text-[var(--color-neutral-900)]">
                    {formData.estimatedTime || 'Not specified'}
                  </p>
                </div>
                <div className="pb-3 border-b border-[var(--color-border)]">
                  <p className="text-xs text-[var(--color-neutral-600)]">Required Tools</p>
                  <p className="text-sm text-[var(--color-neutral-900)]">
                    {formData.requiredTools.length} selected
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[var(--color-neutral-600)]">Learning Objectives</p>
                  <p className="text-sm text-[var(--color-neutral-900)]">
                    {formData.learningObjectives.filter(obj => obj.trim()).length} added
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-lg border border-[var(--color-border)] shadow-[var(--shadow-sm)] p-6">
              <div className="space-y-3">
                <Button
                  type="submit"
                  className="w-full bg-[var(--color-aviation-primary)] hover:bg-[var(--color-aviation-primary-dark)] text-white"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Create Task
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => onNavigate('supervisor')}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
