import { useState, useRef, useEffect } from 'react';
import { Scan, X, CheckCircle } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';

interface BarcodeScannerProps {
  onScan: (barcode: string) => void;
  placeholder?: string;
  label: string;
  scannedValue?: string;
  onClear?: () => void;
  autoFocus?: boolean;
}

export function BarcodeScanner({ 
  onScan, 
  placeholder = "Scan or enter barcode...", 
  label,
  scannedValue,
  onClear,
  autoFocus = false
}: BarcodeScannerProps) {
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && value.trim()) {
      onScan(value.trim());
      setValue('');
    }
  };

  const handleClear = () => {
    setValue('');
    if (onClear) onClear();
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-sm text-[var(--color-neutral-700)]">{label}</label>
      <div className="relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
          {scannedValue ? (
            <CheckCircle className="w-5 h-5 text-[var(--color-success)]" />
          ) : (
            <Scan className="w-5 h-5 text-[var(--color-neutral-400)]" />
          )}
        </div>
        <Input
          ref={inputRef}
          type="text"
          value={scannedValue || value}
          onChange={(e) => !scannedValue && setValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          className={`pl-10 ${scannedValue ? 'pr-10 border-[var(--color-success)] bg-green-50' : ''}`}
          disabled={!!scannedValue}
        />
        {scannedValue && onClear && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[var(--color-neutral-400)] hover:text-[var(--color-neutral-600)]"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
      <p className="text-xs text-[var(--color-neutral-500)]">
        {scannedValue ? 'Scanned successfully' : 'Scan barcode or press Enter after typing'}
      </p>
    </div>
  );
}
