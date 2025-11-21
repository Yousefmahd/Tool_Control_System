import { LucideIcon } from "lucide-react";
import { Card } from "../ui/card";
import { cn } from "../../lib/utils";

interface KPICardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  iconColor?: string;
  iconBg?: string;
}

export function KPICard({
  title,
  value,
  icon: Icon,
  trend,
  iconColor = "text-primary-600",
  iconBg = "bg-primary-100",
}: KPICardProps) {
  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-secondary-600 text-sm mb-2">{title}</p>
          <p className="text-3xl font-semibold text-secondary-900 mb-1">{value}</p>
          {trend && (
            <p className={cn(
              "text-sm",
              trend.isPositive ? "text-success-600" : "text-error-600"
            )}>
              {trend.isPositive ? "+" : ""}{trend.value}
            </p>
          )}
        </div>
        <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center", iconBg)}>
          <Icon className={cn("w-6 h-6", iconColor)} />
        </div>
      </div>
    </Card>
  );
}
