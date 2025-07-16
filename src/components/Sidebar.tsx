import { Link } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const menuItems = [
  { id: "links", label: "Meus Links", icon: "📋" },
  { id: "preview", label: "Pré-visualização", icon: "👁️" },
  { id: "analytics", label: "Analytics", icon: "📊" },
  { id: "settings", label: "Personalização", icon: "⚙️" },
];

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  return (
    <aside className="w-80 bg-card border-r border-border h-full flex flex-col">
      {/* Menu */}
      <div className="p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Menu</h2>
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                activeSection === item.id
                  ? "bg-primary text-primary-foreground shadow-elegant"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Link Público */}
      <div className="p-6 mt-auto">
        <Card className="p-4 bg-gradient-subtle border-border/50">
          <h3 className="text-sm font-semibold text-foreground mb-3">Link Público</h3>
          <div className="flex items-center gap-2 bg-background rounded-lg p-3 border border-border">
            <Link className="w-4 h-4 text-primary" />
            <span className="text-sm text-foreground flex-1">linkhub.com/usuario123</span>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Copy className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      </div>
    </aside>
  );
}