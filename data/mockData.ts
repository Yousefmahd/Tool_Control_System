export interface Tool {
  id: string;
  name: string;
  category: string;
  workshop: 'Aviation' | 'Mechanical' | 'Electrical';
  status: 'Available' | 'Assigned' | 'Under Maintenance' | 'Missing';
  location: {
    room: string;
    shelf: string;
    row: number;
    section: string;
  };
  qrCode: string;
  barcode: string;
  condition: 'Excellent' | 'Good' | 'Fair' | 'Poor';
  imageUrl?: string;
  lastInspection?: string;
  nextInspection?: string;
}

export interface Assignment {
  id: string;
  toolId: string;
  toolName: string;
  studentId: string;
  studentName: string;
  supervisorId: string;
  supervisorName: string;
  checkoutDate: string;
  checkoutTime: string;
  dueDate?: string;
  returnDate?: string;
  returnTime?: string;
  checkoutCondition: string;
  returnCondition?: string;
  status: 'Active' | 'Returned' | 'Overdue';
  notes?: string;
  taskId?: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  username: string;
  role: 'Student' | 'Supervisor' | 'Admin';
  department: string;
  workshop: string;
  avatar?: string;
  studentId?: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  workshop: 'Aviation' | 'Mechanical' | 'Electrical';
  supervisorId: string;
  supervisorName: string;
  assignedStudentId?: string;
  assignedStudentName?: string;
  requiredTools: string[];
  status: 'Not Started' | 'In Progress' | 'Completed' | 'Cancelled' | 'Active' | 'Overdue';
  priority: 'Low' | 'Medium' | 'High';
  estimatedTime: string;
  dueDate?: string;
  createdDate: string;
  completedDate?: string;
  instructions: string;
  safetyNotes?: string;
  learningObjectives?: string[];
  barcode?: string;
}

export const mockTools: Tool[] = [
  {
    id: 'AVT-001',
    name: 'Torque Wrench 3/8"',
    category: 'Hand Tools',
    workshop: 'Aviation',
    status: 'Assigned',
    location: { room: 'Hangar A', shelf: 'SHELF-01', row: 1, section: 'SEC-03' },
    qrCode: 'QR-AVT-001',
    barcode: 'BC-AVT-001',
    condition: 'Excellent',
    lastInspection: '2025-11-15',
    nextInspection: '2026-02-15'
  },
  {
    id: 'AVT-002',
    name: 'Digital Multimeter',
    category: 'Electrical Testing',
    workshop: 'Aviation',
    status: 'Available',
    location: { room: 'Hangar A', shelf: 'SHELF-02', row: 2, section: 'SEC-01' },
    qrCode: 'QR-AVT-002',
    barcode: 'BC-AVT-002',
    condition: 'Good',
    lastInspection: '2025-11-10',
    nextInspection: '2026-02-10'
  },
  {
    id: 'AVT-003',
    name: 'Rivet Gun Kit',
    category: 'Power Tools',
    workshop: 'Aviation',
    status: 'Under Maintenance',
    location: { room: 'Hangar A', shelf: 'SHELF-03', row: 1 },
    qrCode: 'QR-AVT-003',
    barcode: 'BC-AVT-003',
    condition: 'Fair',
    lastInspection: '2025-10-20',
    nextInspection: '2026-01-20'
  },
  {
    id: 'MCH-001',
    name: 'Hydraulic Press 20T',
    category: 'Heavy Equipment',
    workshop: 'Mechanical',
    status: 'Available',
    location: { room: 'Workshop B', shelf: 'FLOOR-01' },
    qrCode: 'QR-MCH-001',
    barcode: 'BC-MCH-001',
    condition: 'Good',
    lastInspection: '2025-11-01',
    nextInspection: '2026-02-01'
  },
  {
    id: 'MCH-002',
    name: 'Socket Set 1/2" Drive',
    category: 'Hand Tools',
    workshop: 'Mechanical',
    status: 'Assigned',
    location: { room: 'Workshop B', shelf: 'CAB-10', section: 'SEC-02' },
    qrCode: 'QR-MCH-002',
    barcode: 'BC-MCH-002',
    condition: 'Excellent',
    lastInspection: '2025-11-18',
    nextInspection: '2026-02-18'
  },
  {
    id: 'MCH-003',
    name: 'Lathe Machine',
    category: 'Machinery',
    workshop: 'Mechanical',
    status: 'Available',
    location: { room: 'Workshop B', shelf: 'FLOOR-02' },
    qrCode: 'QR-MCH-003',
    barcode: 'BC-MCH-003',
    condition: 'Good',
    lastInspection: '2025-11-05',
    nextInspection: '2026-02-05'
  },
  {
    id: 'ELC-001',
    name: 'Oscilloscope 100MHz',
    category: 'Testing Equipment',
    workshop: 'Electrical',
    status: 'Available',
    location: { room: 'Lab C', shelf: 'CAB-20', row: 1 },
    qrCode: 'QR-ELC-001',
    barcode: 'BC-ELC-001',
    condition: 'Excellent',
    lastInspection: '2025-11-12',
    nextInspection: '2026-02-12'
  },
  {
    id: 'ELC-002',
    name: 'Cable Crimping Tool',
    category: 'Hand Tools',
    workshop: 'Electrical',
    status: 'Assigned',
    location: { room: 'Lab C', shelf: 'CAB-21', section: 'SEC-01' },
    qrCode: 'QR-ELC-002',
    barcode: 'BC-ELC-002',
    condition: 'Good',
    lastInspection: '2025-11-08',
    nextInspection: '2026-02-08'
  },
  {
    id: 'ELC-003',
    name: 'Power Supply 0-30V',
    category: 'Testing Equipment',
    workshop: 'Electrical',
    status: 'Available',
    location: { room: 'Lab C', shelf: 'CAB-22', row: 2 },
    qrCode: 'QR-ELC-003',
    barcode: 'BC-ELC-003',
    condition: 'Excellent',
    lastInspection: '2025-11-14',
    nextInspection: '2026-02-14'
  },
  {
    id: 'AVT-004',
    name: 'Safety Wire Pliers',
    category: 'Hand Tools',
    workshop: 'Aviation',
    status: 'Missing',
    location: { room: 'Hangar A', shelf: 'CAB-04', section: 'SEC-01' },
    qrCode: 'QR-AVT-004',
    barcode: 'BC-AVT-004',
    condition: 'Good',
    lastInspection: '2025-10-15',
    nextInspection: '2026-01-15'
  },
  {
    id: 'AVT-005',
    name: 'Aviation Snips Set',
    category: 'Cutting Tools',
    workshop: 'Aviation',
    status: 'Available',
    location: { room: 'Hangar A', shelf: 'CAB-05', section: 'SEC-02' },
    qrCode: 'QR-AVT-005',
    barcode: 'BC-AVT-005',
    condition: 'Excellent',
    lastInspection: '2025-11-16',
    nextInspection: '2026-02-16'
  },
  {
    id: 'MCH-004',
    name: 'Micrometer Set',
    category: 'Measurement',
    workshop: 'Mechanical',
    status: 'Available',
    location: { room: 'Workshop B', shelf: 'CAB-11', section: 'SEC-01' },
    qrCode: 'QR-MCH-004',
    barcode: 'BC-MCH-004',
    condition: 'Good',
    lastInspection: '2025-11-19',
    nextInspection: '2026-02-19'
  },
  {
    id: 'ELC-004',
    name: 'Soldering Station',
    category: 'Assembly Tools',
    workshop: 'Electrical',
    status: 'Assigned',
    location: { room: 'Lab C', shelf: 'CAB-23', row: 1 },
    qrCode: 'QR-ELC-004',
    barcode: 'BC-ELC-004',
    condition: 'Good',
    lastInspection: '2025-11-11',
    nextInspection: '2026-02-11'
  },
  {
    id: 'AVT-006',
    name: 'Inspection Mirror Set',
    category: 'Inspection Tools',
    workshop: 'Aviation',
    status: 'Available',
    location: { room: 'Hangar A', shelf: 'CAB-06', section: 'SEC-03' },
    qrCode: 'QR-AVT-006',
    barcode: 'BC-AVT-006',
    condition: 'Excellent',
    lastInspection: '2025-11-17',
    nextInspection: '2026-02-17'
  },
  {
    id: 'MCH-005',
    name: 'Angle Grinder',
    category: 'Power Tools',
    workshop: 'Mechanical',
    status: 'Under Maintenance',
    location: { room: 'Workshop B', shelf: 'CAB-12' },
    qrCode: 'QR-MCH-005',
    barcode: 'BC-MCH-005',
    condition: 'Poor',
    lastInspection: '2025-10-25',
    nextInspection: '2026-01-25'
  }
];

export const mockAssignments: Assignment[] = [
  {
    id: 'ASG-001',
    toolId: 'AVT-001',
    toolName: 'Torque Wrench 3/8"',
    studentId: 'STF-001',
    studentName: 'John Smith',
    supervisorId: 'SUP-001',
    supervisorName: 'Michael Brown',
    checkoutDate: '2025-11-20',
    checkoutTime: '09:30',
    dueDate: '2025-11-22',
    checkoutCondition: 'Excellent',
    status: 'Active',
    notes: 'For aircraft maintenance task'
  },
  {
    id: 'ASG-002',
    toolId: 'MCH-002',
    toolName: 'Socket Set 1/2" Drive',
    studentId: 'STF-002',
    studentName: 'Sarah Johnson',
    supervisorId: 'SUP-002',
    supervisorName: 'David Wilson',
    checkoutDate: '2025-11-19',
    checkoutTime: '08:15',
    dueDate: '2025-11-21',
    checkoutCondition: 'Excellent',
    status: 'Overdue',
    notes: 'Engine repair'
  },
  {
    id: 'ASG-003',
    toolId: 'ELC-002',
    toolName: 'Cable Crimping Tool',
    studentId: 'STF-003',
    studentName: 'Robert Garcia',
    supervisorId: 'SUP-003',
    supervisorName: 'Jennifer Davis',
    checkoutDate: '2025-11-21',
    checkoutTime: '10:00',
    checkoutCondition: 'Good',
    status: 'Active',
    notes: 'Wiring project'
  },
  {
    id: 'ASG-004',
    toolId: 'ELC-004',
    toolName: 'Soldering Station',
    studentId: 'STF-004',
    studentName: 'Emily Martinez',
    supervisorId: 'SUP-003',
    supervisorName: 'Jennifer Davis',
    checkoutDate: '2025-11-18',
    checkoutTime: '14:20',
    returnDate: '2025-11-20',
    returnTime: '16:30',
    checkoutCondition: 'Good',
    returnCondition: 'Good',
    status: 'Returned',
    notes: 'Circuit board repair'
  }
];

export const mockStudents: Student[] = [
  {
    id: 'STF-001',
    name: 'John Smith',
    email: 'john.smith@company.com',
    username: 'john.smith',
    role: 'Student',
    department: 'Maintenance',
    workshop: 'Aviation'
  },
  {
    id: 'STF-002',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    username: 'sarah.johnson',
    role: 'Student',
    department: 'Maintenance',
    workshop: 'Mechanical'
  },
  {
    id: 'STF-003',
    name: 'Robert Garcia',
    email: 'robert.garcia@company.com',
    username: 'robert.garcia',
    role: 'Student',
    department: 'Electrical',
    workshop: 'Electrical'
  },
  {
    id: 'STF-004',
    name: 'Emily Martinez',
    email: 'emily.martinez@company.com',
    username: 'emily.martinez',
    role: 'Student',
    department: 'Electrical',
    workshop: 'Electrical'
  },
  {
    id: 'STF-005',
    name: 'Mike Wilson',
    email: 'mike.wilson@company.com',
    username: 'mike.wilson',
    role: 'Student',
    department: 'Electrical',
    workshop: 'Electrical'
  },
  {
    id: 'LAB-001',
    name: 'John Doe',
    email: 'john.doe@company.com',
    username: 'john.doe',
    role: 'Supervisor',
    department: 'Maintenance',
    workshop: 'Aviation'
  },
  {
    id: 'SUP-001',
    name: 'Sarah Chen',
    email: 'sarah.chen@company.com',
    username: 'sarah.chen',
    role: 'Supervisor',
    department: 'Maintenance',
    workshop: 'Mechanical'
  },
  {
    id: 'SUP-002',
    name: 'David Wilson',
    email: 'david.wilson@company.com',
    username: 'david.wilson',
    role: 'Supervisor',
    department: 'Maintenance',
    workshop: 'Electrical'
  },
  {
    id: 'ADM-001',
    name: 'Admin User',
    email: 'admin@company.com',
    username: 'admin',
    role: 'Admin',
    department: 'Administration',
    workshop: 'All'
  }
];

// Export mockUsers as an alias for compatibility with LoginScreen
export const mockUsers = mockStudents;

export const mockTasks: Task[] = [
  {
    id: 'TSK-001',
    title: 'Aircraft Maintenance Task',
    description: 'Perform routine maintenance on aircraft.',
    workshop: 'Aviation',
    supervisorId: 'SUP-001',
    supervisorName: 'Michael Brown',
    assignedStudentId: 'STF-001',
    assignedStudentName: 'John Smith',
    requiredTools: ['AVT-001'],
    status: 'In Progress',
    priority: 'High',
    estimatedTime: '2 hours',
    dueDate: '2025-11-22',
    createdDate: '2025-11-20',
    instructions: 'Follow the maintenance checklist provided.',
    safetyNotes: 'Wear safety goggles and gloves.',
    learningObjectives: ['Understand aircraft maintenance procedures', 'Use torque wrench correctly'],
    barcode: 'TSK-001'
  },
  {
    id: 'TSK-002',
    title: 'Engine Repair',
    description: 'Repair a faulty engine.',
    workshop: 'Mechanical',
    supervisorId: 'SUP-002',
    supervisorName: 'David Wilson',
    assignedStudentId: 'STF-002',
    assignedStudentName: 'Sarah Johnson',
    requiredTools: ['MCH-002'],
    status: 'Overdue',
    priority: 'Medium',
    estimatedTime: '3 hours',
    dueDate: '2025-11-21',
    createdDate: '2025-11-19',
    instructions: 'Follow the repair manual provided.',
    safetyNotes: 'Wear safety goggles and gloves.',
    learningObjectives: ['Understand engine repair procedures', 'Use socket set correctly'],
    barcode: 'TSK-002'
  },
  {
    id: 'TSK-003',
    title: 'Wiring Project',
    description: 'Install new wiring in a device.',
    workshop: 'Electrical',
    supervisorId: 'SUP-003',
    supervisorName: 'Jennifer Davis',
    assignedStudentId: 'STF-003',
    assignedStudentName: 'Robert Garcia',
    requiredTools: ['ELC-002'],
    status: 'Active',
    priority: 'Low',
    estimatedTime: '1 hour',
    dueDate: '2025-11-22',
    createdDate: '2025-11-21',
    instructions: 'Follow the wiring diagram provided.',
    safetyNotes: 'Wear safety goggles and gloves.',
    learningObjectives: ['Understand wiring procedures', 'Use cable crimping tool correctly'],
    barcode: 'TSK-003'
  },
  {
    id: 'TSK-004',
    title: 'Circuit Board Repair',
    description: 'Repair a faulty circuit board.',
    workshop: 'Electrical',
    supervisorId: 'SUP-003',
    supervisorName: 'Jennifer Davis',
    assignedStudentId: 'STF-004',
    assignedStudentName: 'Emily Martinez',
    requiredTools: ['ELC-004'],
    status: 'Completed',
    priority: 'High',
    estimatedTime: '2 hours',
    dueDate: '2025-11-20',
    createdDate: '2025-11-18',
    completedDate: '2025-11-20',
    instructions: 'Follow the repair manual provided.',
    safetyNotes: 'Wear safety goggles and gloves.',
    learningObjectives: ['Understand circuit board repair procedures', 'Use soldering station correctly'],
    barcode: 'TSK-004'
  }
];

export const toolUsageData = [
  { month: 'Jun', aviation: 45, mechanical: 52, electrical: 38 },
  { month: 'Jul', aviation: 52, mechanical: 48, electrical: 42 },
  { month: 'Aug', aviation: 48, mechanical: 55, electrical: 45 },
  { month: 'Sep', aviation: 58, mechanical: 50, electrical: 48 },
  { month: 'Oct', aviation: 55, mechanical: 58, electrical: 52 },
  { month: 'Nov', aviation: 62, mechanical: 60, electrical: 55 }
];

export const maintenanceTrends = [
  { month: 'Jun', count: 8 },
  { month: 'Jul', count: 6 },
  { month: 'Aug', count: 10 },
  { month: 'Sep', count: 7 },
  { month: 'Oct', count: 9 },
  { month: 'Nov', count: 5 }
];

export const workshopDistribution = [
  { name: 'Aviation', value: 35, color: '#0066CC' },
  { name: 'Mechanical', value: 40, color: '#475569' },
  { name: 'Electrical', value: 25, color: '#10B981' }
];