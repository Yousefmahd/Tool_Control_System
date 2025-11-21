interface StatusBadgeProps {
  status: 'Available' | 'Assigned' | 'Under Maintenance' | 'Missing' | 'Active' | 'Returned' | 'Overdue' | 'Excellent' | 'Good' | 'Fair' | 'Poor';
  size?: 'sm' | 'md';
}

export function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const getStatusStyles = () => {
    switch (status) {
      case 'Available':
        return 'bg-[var(--color-success-light)] bg-opacity-10 text-[var(--color-success-dark)] border-[var(--color-success-light)]';
      case 'Assigned':
      case 'Active':
        return 'bg-[var(--color-aviation-primary)] bg-opacity-10 text-[var(--color-aviation-primary-dark)] border-[var(--color-aviation-primary-light)]';
      case 'Under Maintenance':
        return 'bg-[var(--color-warning)] bg-opacity-10 text-[var(--color-warning-dark)] border-[var(--color-warning)]';
      case 'Missing':
      case 'Overdue':
      case 'Poor':
        return 'bg-[var(--color-danger)] bg-opacity-10 text-[var(--color-danger-dark)] border-[var(--color-danger)]';
      case 'Returned':
        return 'bg-[var(--color-neutral-400)] bg-opacity-10 text-[var(--color-neutral-700)] border-[var(--color-neutral-400)]';
      case 'Excellent':
        return 'bg-[var(--color-success)] bg-opacity-10 text-[var(--color-success-dark)] border-[var(--color-success)]';
      case 'Good':
        return 'bg-[var(--color-aviation-primary)] bg-opacity-10 text-[var(--color-aviation-primary-dark)] border-[var(--color-aviation-primary)]';
      case 'Fair':
        return 'bg-[var(--color-warning)] bg-opacity-10 text-[var(--color-warning-dark)] border-[var(--color-warning)]';
      default:
        return 'bg-[var(--color-neutral-200)] text-[var(--color-neutral-700)] border-[var(--color-neutral-300)]';
    }
  };

  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm';

  return (
    <span
      className={`inline-flex items-center rounded-full border ${sizeClasses} ${getStatusStyles()}`}
    >
      {status}
    </span>
  );
}
