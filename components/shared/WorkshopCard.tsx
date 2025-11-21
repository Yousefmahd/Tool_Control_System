import { LucideIcon } from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { cn } from "../../lib/utils";

interface WorkshopCardProps {
  name: string;
  icon: LucideIcon;
  totalTools: number;
  available: number;
  assigned: number;
  color: string;
  onView: () => void;
}

export function WorkshopCard({
  name,
  icon: Icon,
  totalTools,
  available,
  assigned,
  color,
  onView,
}: WorkshopCardProps) {
  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center", `bg-${color}-100`)}>
          <Icon className={cn("w-6 h-6", `text-${color}-600`)} style={{ color }} />
        </div>
        <Button variant="ghost" size="sm" onClick={onView}>
          View <ArrowRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
      
      <h3 className="text-secondary-900 mb-4">{name} Workshop</h3>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-secondary-600">Total Tools</span>
          <span className="text-sm font-semibold text-secondary-900">{totalTools}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-secondary-600">Available</span>
          <span className="text-sm font-semibold text-success-600">{available}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-secondary-600">Assigned</span>
          <span className="text-sm font-semibold text-primary-600">{assigned}</span>
        </div>
      </div>
    </Card>
  );
}
