import { Badge } from "../ui/badge";
import { cn } from "../../lib/utils";

export type ToolStatus = "available" | "assigned" | "maintenance" | "missing";

interface StatusBadgeProps {
  status: ToolStatus;
  className?: string;
}

const statusConfig: Record<ToolStatus, { label: string; className: string }> = {
  available: {
    label: "Available",
    className: "bg-success-100 text-success-700 border-success-200",
  },
  assigned: {
    label: "Assigned",
    className: "bg-primary-100 text-primary-700 border-primary-200",
  },
  maintenance: {
    label: "Maintenance",
    className: "bg-warning-100 text-warning-700 border-warning-200",
  },
  missing: {
    label: "Missing",
    className: "bg-error-100 text-error-700 border-error-200",
  },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  
  return (
    <Badge 
      variant="outline" 
      className={cn("text-xs font-medium", config.className, className)}
    >
      {config.label}
    </Badge>
  );
}
