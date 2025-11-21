import { Bell, Search, HelpCircle } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export function Header({ title, subtitle }: HeaderProps) {
  return (
    <div className="bg-white border-b border-secondary-200 px-8 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-secondary-900">{title}</h1>
          {subtitle && <p className="text-secondary-500 mt-1">{subtitle}</p>}
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary-400" />
            <Input
              placeholder="Search tools, staff, or workshops..."
              className="pl-10 bg-secondary-50 border-secondary-200"
            />
          </div>
          
          <Button variant="ghost" size="icon" className="relative">
            <HelpCircle className="w-5 h-5 text-secondary-600" />
          </Button>
          
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5 text-secondary-600" />
            <Badge 
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-error-500 text-white text-xs"
            >
              3
            </Badge>
          </Button>
        </div>
      </div>
    </div>
  );
}
