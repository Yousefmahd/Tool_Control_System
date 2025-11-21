import { AlertTriangle, Clock, Wrench, X } from 'lucide-react';

interface AlertCardProps {
  type: 'overdue' | 'missing' | 'inspection';
  title: string;
  description: string;
  count?: number;
  onDismiss?: () => void;
}

export function AlertCard({ type, title, description, count, onDismiss }: AlertCardProps) {
  const getAlertStyles = () => {
    switch (type) {
      case 'overdue':
        return {
          bgColor: 'bg-[var(--color-danger)] bg-opacity-5',
          borderColor: 'border-[var(--color-danger)]',
          iconColor: 'text-[var(--color-danger)]',
          icon: Clock
        };
      case 'missing':
        return {
          bgColor: 'bg-[var(--color-danger)] bg-opacity-5',
          borderColor: 'border-[var(--color-danger)]',
          iconColor: 'text-[var(--color-danger)]',
          icon: AlertTriangle
        };
      case 'inspection':
        return {
          bgColor: 'bg-[var(--color-warning)] bg-opacity-5',
          borderColor: 'border-[var(--color-warning)]',
          iconColor: 'text-[var(--color-warning)]',
          icon: Wrench
        };
      default:
        return {
          bgColor: 'bg-[var(--color-neutral-100)]',
          borderColor: 'border-[var(--color-neutral-300)]',
          iconColor: 'text-[var(--color-neutral-600)]',
          icon: AlertTriangle
        };
    }
  };

  const styles = getAlertStyles();
  const Icon = styles.icon;

  return (
    <div className={`${styles.bgColor} border-l-4 ${styles.borderColor} p-4 rounded-r-lg`}>
      <div className="flex items-start gap-3">
        <Icon className={`w-5 h-5 ${styles.iconColor} flex-shrink-0 mt-0.5`} />
        <div className="flex-1">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h5 className="text-[var(--color-neutral-900)]">{title}</h5>
              <p className="text-sm text-[var(--color-neutral-600)] mt-1">{description}</p>
              {count !== undefined && (
                <p className={`text-sm mt-2 ${styles.iconColor}`}>
                  {count} {count === 1 ? 'item' : 'items'}
                </p>
              )}
            </div>
            {onDismiss && (
              <button
                onClick={onDismiss}
                className="text-[var(--color-neutral-400)] hover:text-[var(--color-neutral-600)] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
