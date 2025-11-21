import { LucideIcon } from 'lucide-react';

interface WorkshopCardProps {
  name: string;
  icon: LucideIcon;
  totalTools: number;
  available: number;
  assigned: number;
  maintenance: number;
  color: string;
  onClick?: () => void;
}

export function WorkshopCard({
  name,
  icon: Icon,
  totalTools,
  available,
  assigned,
  maintenance,
  color,
  onClick
}: WorkshopCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg p-6 border border-[var(--color-border)] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-all cursor-pointer"
    >
      <div className="flex items-center gap-4 mb-4">
        <div
          className="w-14 h-14 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: `${color}15` }}
        >
          <Icon className="w-8 h-8" style={{ color }} />
        </div>
        <div>
          <h4 className="text-[var(--color-neutral-900)]">{name}</h4>
          <p className="text-sm text-[var(--color-neutral-600)]">{totalTools} Total Tools</p>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-[var(--color-neutral-600)]">Available</span>
          <span className="text-sm text-[var(--color-success)]">{available}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-[var(--color-neutral-600)]">Assigned</span>
          <span className="text-sm text-[var(--color-aviation-primary)]">{assigned}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-[var(--color-neutral-600)]">Maintenance</span>
          <span className="text-sm text-[var(--color-warning)]">{maintenance}</span>
        </div>
      </div>
    </div>
  );
}
