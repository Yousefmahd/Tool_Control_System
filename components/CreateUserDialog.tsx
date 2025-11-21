import { useState } from 'react';
import { X, User, Mail, Lock, Briefcase, Building } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface CreateUserDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateUser: (user: any) => void;
  userType: 'staff' | 'student';
}

export function CreateUserDialog({ isOpen, onClose, onCreateUser, userType }: CreateUserDialogProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    role: userType === 'staff' ? 'Supervisor' : 'Student',
    department: '',
    workshop: 'Aviation',
    studentId: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate ID based on role
    let idPrefix = 'STF';
    if (formData.role === 'Admin') idPrefix = 'ADM';
    else if (formData.role === 'Supervisor') idPrefix = 'SUP';
    else if (formData.role === 'Student') idPrefix = 'STU';
    
    const newUser = {
      ...formData,
      id: `${idPrefix}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
    };

    onCreateUser(newUser);
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      username: '',
      password: '',
      role: userType === 'staff' ? 'Supervisor' : 'Student',
      department: '',
      workshop: 'Aviation',
      studentId: ''
    });
    
    onClose();
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[var(--color-border)]">
          <div>
            <h2 className="text-[var(--color-neutral-900)] mb-1">
              {userType === 'staff' ? 'Add New Staff Member' : 'Add New Student'}
            </h2>
            <p className="text-sm text-[var(--color-neutral-600)]">
              {userType === 'staff' 
                ? 'Create a new teacher, lab engineer, or supervisor account' 
                : 'Register a new student in the system'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-[var(--color-neutral-400)] hover:text-[var(--color-neutral-600)] transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-sm text-[var(--color-neutral-900)] uppercase tracking-wider">
              Personal Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <div className="relative mt-1">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[var(--color-neutral-400)]" />
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder="John Doe"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email Address *</Label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[var(--color-neutral-400)]" />
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="john.doe@example.com"
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            </div>

            {userType === 'student' && (
              <div>
                <Label htmlFor="studentId">Student ID</Label>
                <Input
                  id="studentId"
                  value={formData.studentId}
                  onChange={(e) => handleChange('studentId', e.target.value)}
                  placeholder="S2025001"
                  className="mt-1"
                />
              </div>
            )}
          </div>

          {/* Account Information */}
          <div className="space-y-4">
            <h3 className="text-sm text-[var(--color-neutral-900)] uppercase tracking-wider">
              Account Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="username">Username *</Label>
                <div className="relative mt-1">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[var(--color-neutral-400)]" />
                  <Input
                    id="username"
                    value={formData.username}
                    onChange={(e) => handleChange('username', e.target.value)}
                    placeholder="john.doe"
                    className="pl-10"
                    required
                  />
                </div>
                <p className="text-xs text-[var(--color-neutral-500)] mt-1">
                  Used for system login
                </p>
              </div>

              <div>
                <Label htmlFor="password">Password *</Label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[var(--color-neutral-400)]" />
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => handleChange('password', e.target.value)}
                    placeholder="••••••••"
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            </div>

            {userType === 'staff' && (
              <div>
                <Label htmlFor="role">Role *</Label>
                <Select value={formData.role} onValueChange={(value) => handleChange('role', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Supervisor">Supervisor/Teacher</SelectItem>
                    <SelectItem value="Admin">Administrator</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          {/* Department & Workshop */}
          <div className="space-y-4">
            <h3 className="text-sm text-[var(--color-neutral-900)] uppercase tracking-wider">
              Assignment
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="department">Department *</Label>
                <div className="relative mt-1">
                  <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[var(--color-neutral-400)]" />
                  <Input
                    id="department"
                    value={formData.department}
                    onChange={(e) => handleChange('department', e.target.value)}
                    placeholder="Maintenance"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="workshop">Workshop *</Label>
                <div className="relative mt-1">
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[var(--color-neutral-400)]" />
                  <Select value={formData.workshop} onValueChange={(value) => handleChange('workshop', value)}>
                    <SelectTrigger className="pl-10">
                      <SelectValue placeholder="Select workshop" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Aviation">Aviation</SelectItem>
                      <SelectItem value="Mechanical">Mechanical</SelectItem>
                      <SelectItem value="Electrical">Electrical</SelectItem>
                      {userType === 'staff' && formData.role === 'Admin' && (
                        <SelectItem value="All">All Workshops</SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </div>
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
              className="bg-[var(--color-aviation-primary)] hover:bg-[var(--color-aviation-primary-dark)] text-white"
            >
              Create {userType === 'staff' ? 'Staff Member' : 'Student'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
