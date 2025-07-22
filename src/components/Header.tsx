import { Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"; // Importação nova

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
        {/* Botão para abrir/fechar a Sidebar no mobile, visível apenas em telas pequenas */}
        <div className="md:hidden">
          <SidebarTrigger />
        </div>
        <ThemeToggle />

        {/* Popover para notificações */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full"></div>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-4">
            <div className="font-semibold text-foreground mb-2">Notificações</div>
            <div className="text-sm text-muted-foreground">
              <p>Você tem 3 novas notificações!</p>
              <p className="mt-2 text-xs">
                - Seu link "Meu Instagram" recebeu 10 novos cliques.
              </p>
              <p className="text-xs">
                - Nova funcionalidade "Analytics" disponível.
              </p>
              <p className="text-xs">
                - Lembrete: Atualize seu perfil para obter mais visibilidade.
              </p>
            </div>
          </PopoverContent>
        </Popover>

        <Button variant="ghost" size="icon" className="rounded-full">
          <User className="w-5 h-5" />
        </Button>
      </div>
    </header>
  );
}
