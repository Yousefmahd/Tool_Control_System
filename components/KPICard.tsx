import { LucideIcon } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  color?: string;
}

export function KPICard({ title, value, icon: Icon, trend, color = 'var(--color-aviation-primary)' }: KPICardProps) {
  return (
    <div className="bg-white rounded-lg p-6 border border-[var(--color-border)] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-[var(--color-neutral-600)] mb-1">{title}</p>
          <h2 className="text-[var(--color-neutral-900)] mb-2">{value}</h2>
          {trend && (
            <div className="flex items-center gap-1">
              <span
                className={`text-xs ${
                  trend.isPositive ? 'text-[var(--color-success)]' : 'text-[var(--color-danger)]'
                }`}
              >
                {trend.isPositive ? '↑' : '↓'} {trend.value}
              </span>
              <span className="text-xs text-[var(--color-neutral-500)]">vs last month</span>
            </div>
          )}
        </div>
        <div
          className="w-12 h-12 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: `${color}15` }}
        >
          <Icon className="w-6 h-6" style={{ color }} />
        </div>
      </div>
    </div>
  );
}
