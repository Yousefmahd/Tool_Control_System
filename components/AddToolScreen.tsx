import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Package, CheckCircle, Upload, Image as ImageIcon, Barcode, QrCode, X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { useUser } from '../context/UserContext';
import { mockTools } from '../data/mockData';
import { generateBarcode, generateQRCode, generateToolId, generateBarcodeImage } from '../utils/barcodeGenerator';

interface AddToolScreenProps {
  onNavigate: (page: string) => void;
}

export function AddToolScreen({ onNavigate }: AddToolScreenProps) {
  const { currentUser, canEditTool } = useUser();
  const isAdmin = currentUser.role === 'Admin' || currentUser.workshop === 'All';
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    workshop: isAdmin ? '' : currentUser.workshop,
    status: 'Available',
    room: '',
    shelf: '',
    row: '',
    section: '',
    condition: 'Excellent',
    notes: '',
    imageUrl: '',
    imageFile: null as File | null
  });

  const [generatedCodes, setGeneratedCodes] = useState({
    toolId: '',
    barcode: '',
    qrCode: '',
    barcodeImage: ''
  });

  const [imagePreview, setImagePreview] = useState<string>('');

  // Generate codes when workshop is selected
  useEffect(() => {
    if (formData.workshop) {
      const toolId = generateToolId(formData.workshop, mockTools.map(t => t.id));
      const barcode = generateBarcode(formData.workshop);
      const qrCode = generateQRCode(formData.workshop);
      const barcodeImage = generateBarcodeImage(barcode);
      
      setGeneratedCodes({ toolId, barcode, qrCode, barcodeImage });
    }
  }, [formData.workshop]);

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setFormData(prev => ({ 
          ...prev, 
          imageFile: file,
          imageUrl: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview('');
    setFormData(prev => ({ ...prev, imageFile: null, imageUrl: '' }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!canEditTool(formData.workshop)) {
      alert('You do not have permission to add tools to this workshop');
      return;
    }

    // In a real application, this would send data to the server
    console.log('New Tool Data:', {
      ...generatedCodes,
      ...formData,
      location: {
        room: formData.room,
        shelf: formData.shelf,
        row: parseInt(formData.row) || 0,
        section: formData.section
      }
    });

    alert(`Tool ${generatedCodes.toolId} added successfully!`);
    onNavigate('inventory');
  };

  const categories = [
    'Hand Tools',
    'Power Tools',
    'Electrical Testing',
    'Testing Equipment',
    'Measurement',
    'Heavy Equipment',
    'Machinery',
    'Cutting Tools',
    'Assembly Tools',
    'Inspection Tools',
    'Safety Equipment'
  ];

  const sections = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

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
        <h1 className="text-[var(--color-neutral-900)] mb-2">Add New Tool</h1>
        <p className="text-[var(--color-neutral-600)]">Register a new tool or equipment to the inventory</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tool Information */}
            <div className="bg-white rounded-lg border border-[var(--color-border)] shadow-[var(--shadow-sm)] p-6">
              <h3 className="text-[var(--color-neutral-900)] mb-4">Tool Information</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Tool Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      placeholder="e.g., Torque Wrench"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <Select value={formData.category} onValueChange={(value) => handleChange('category', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(cat => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
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
                    {!isAdmin && (
                      <p className="text-xs text-[var(--color-neutral-600)] mt-1">
                        Locked to your workshop
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="condition">Condition *</Label>
                    <Select value={formData.condition} onValueChange={(value) => handleChange('condition', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Excellent">Excellent</SelectItem>
                        <SelectItem value="Good">Good</SelectItem>
                        <SelectItem value="Fair">Fair</SelectItem>
                        <SelectItem value="Poor">Poor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="notes">Notes / Description</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => handleChange('notes', e.target.value)}
                    placeholder="Additional information about the tool..."
                    rows={3}
                  />
                </div>
              </div>
            </div>

            {/* Location Information */}
            <div className="bg-white rounded-lg border border-[var(--color-border)] shadow-[var(--shadow-sm)] p-6">
              <h3 className="text-[var(--color-neutral-900)] mb-4">Location Details</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="room">Room / Area *</Label>
                    <Input
                      id="room"
                      value={formData.room}
                      onChange={(e) => handleChange('room', e.target.value)}
                      placeholder="e.g., Hangar A, Workshop B"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="shelf">Shelf / Cabinet *</Label>
                    <Input
                      id="shelf"
                      value={formData.shelf}
                      onChange={(e) => handleChange('shelf', e.target.value)}
                      placeholder="e.g., SHELF-01, CAB-10"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="row">Row Number</Label>
                    <Input
                      id="row"
                      type="number"
                      min="1"
                      value={formData.row}
                      onChange={(e) => handleChange('row', e.target.value)}
                      placeholder="e.g., 1, 2, 3, 4..."
                    />
                  </div>

                  <div>
                    <Label htmlFor="section">Section</Label>
                    <Select value={formData.section} onValueChange={(value) => handleChange('section', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select section" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">None</SelectItem>
                        {sections.map(sec => (
                          <SelectItem key={sec} value={`SEC-0${sec.charCodeAt(0) - 64}`}>
                            Section {sec}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                  <p className="text-sm text-blue-800">
                    <strong>Location Preview:</strong> {formData.room || '[Room]'} → {formData.shelf || '[Shelf]'}
                    {formData.row && ` → Row ${formData.row}`}
                    {formData.section && ` → ${formData.section}`}
                  </p>
                </div>
              </div>
            </div>

            {/* Image Upload */}
            <div className="bg-white rounded-lg border border-[var(--color-border)] shadow-[var(--shadow-sm)] p-6">
              <h3 className="text-[var(--color-neutral-900)] mb-4">Tool Image</h3>
              
              {!imagePreview ? (
                <div 
                  className="border-2 border-dashed border-[var(--color-border)] rounded-lg p-8 text-center hover:border-[var(--color-aviation-primary)] transition-colors cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <ImageIcon className="w-12 h-12 text-[var(--color-neutral-400)] mx-auto mb-4" />
                  <h4 className="text-[var(--color-neutral-900)] mb-2">Upload Tool Image</h4>
                  <p className="text-sm text-[var(--color-neutral-600)] mb-4">
                    Click to browse or drag and drop<br />
                    PNG, JPG or WEBP (max. 5MB)
                  </p>
                  <Button type="button" variant="outline" onClick={(e) => e.stopPropagation()}>
                    <Upload className="w-4 h-4 mr-2" />
                    Browse Files
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="relative rounded-lg overflow-hidden border border-[var(--color-border)]">
                    <img 
                      src={imagePreview} 
                      alt="Tool preview" 
                      className="w-full h-64 object-cover"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-lg"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Change Image
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Generated Codes */}
            <div className="bg-white rounded-lg border border-[var(--color-border)] shadow-[var(--shadow-sm)] p-6">
              <h4 className="text-[var(--color-neutral-900)] mb-4">Auto-Generated Codes</h4>
              
              {formData.workshop ? (
                <div className="space-y-4">
                  <div className="p-3 bg-[var(--color-neutral-50)] rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Package className="w-4 h-4 text-[var(--color-aviation-primary)]" />
                      <p className="text-xs text-[var(--color-neutral-600)]">Tool ID</p>
                    </div>
                    <p className="text-sm text-[var(--color-neutral-900)] font-mono">{generatedCodes.toolId}</p>
                  </div>

                  <div className="p-3 bg-[var(--color-neutral-50)] rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Barcode className="w-4 h-4 text-[var(--color-aviation-primary)]" />
                      <p className="text-xs text-[var(--color-neutral-600)]">Barcode</p>
                    </div>
                    <p className="text-sm text-[var(--color-neutral-900)] font-mono mb-3">{generatedCodes.barcode}</p>
                    {generatedCodes.barcodeImage && (
                      <img 
                        src={generatedCodes.barcodeImage} 
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
                    <p className="text-sm text-[var(--color-neutral-900)] font-mono">{generatedCodes.qrCode}</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Package className="w-12 h-12 text-[var(--color-neutral-300)] mx-auto mb-3" />
                  <p className="text-sm text-[var(--color-neutral-600)]">
                    Select a workshop to generate codes
                  </p>
                </div>
              )}
            </div>

            {/* Summary */}
            <div className="bg-white rounded-lg border border-[var(--color-border)] shadow-[var(--shadow-sm)] p-6">
              <h4 className="text-[var(--color-neutral-900)] mb-4">Summary</h4>
              <div className="space-y-3">
                <div className="pb-3 border-b border-[var(--color-border)]">
                  <p className="text-xs text-[var(--color-neutral-600)]">Tool Name</p>
                  <p className="text-sm text-[var(--color-neutral-900)]">
                    {formData.name || 'Not specified'}
                  </p>
                </div>
                <div className="pb-3 border-b border-[var(--color-border)]">
                  <p className="text-xs text-[var(--color-neutral-600)]">Workshop</p>
                  <p className="text-sm text-[var(--color-neutral-900)]">
                    {formData.workshop || 'Not specified'}
                  </p>
                </div>
                <div className="pb-3 border-b border-[var(--color-border)]">
                  <p className="text-xs text-[var(--color-neutral-600)]">Category</p>
                  <p className="text-sm text-[var(--color-neutral-900)]">
                    {formData.category || 'Not specified'}
                  </p>
                </div>
                <div className="pb-3 border-b border-[var(--color-border)]">
                  <p className="text-xs text-[var(--color-neutral-600)]">Location</p>
                  <p className="text-sm text-[var(--color-neutral-900)]">
                    {formData.room && formData.shelf 
                      ? `${formData.room} / ${formData.shelf}` 
                      : 'Not specified'}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[var(--color-neutral-600)]">Image</p>
                  <p className="text-sm text-[var(--color-neutral-900)]">
                    {imagePreview ? 'Uploaded' : 'No image'}
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
                  disabled={!formData.workshop || !formData.name || !formData.category || !formData.room || !formData.shelf}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Add Tool to Inventory
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => onNavigate('inventory')}
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
