import { Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="bg-card border-b border-border px-6 py-4 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
          <span className="text-primary-foreground font-bold text-sm">L</span>
        </div>
        <h1 className="text-xl font-bold text-foreground">LinkHub</h1>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full"></div>
        </Button>
        
        <Button variant="ghost" size="icon" className="rounded-full">
          <User className="w-5 h-5" />
        </Button>
      </div>
    </header>
  );
}