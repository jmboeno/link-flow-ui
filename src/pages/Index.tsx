import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LinksSection } from "@/components/LinksSection";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset, // Importado para o layout principal
} from "@/components/ui/sidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Home, Eye, BarChart, Settings, Link as LinkIcon } from "lucide-react"; // Ícones atualizados

const menuItems = [
  { id: "links", label: "Meus Links", icon: Home },
  { id: "preview", label: "Pré-visualização", icon: Eye },
  { id: "analytics", label: "Analytics", icon: BarChart },
  { id: "settings", label: "Personalização", icon: Settings },
];

const Index = () => {
  const [activeSection, setActiveSection] = useState("links");

  const renderContent = () => {
    switch (activeSection) {
      case "links":
        return <LinksSection />;
      case "preview":
        return (
          <div className="p-8 text-center">
            <h1 className="text-3xl font-bold text-foreground mb-4">Pré-visualização</h1>
            <p className="text-muted-foreground">Em breve - visualize como seus links aparecerão</p>
          </div>
        );
      case "analytics":
        return (
          <div className="p-8 text-center">
            <h1 className="text-3xl font-bold text-foreground mb-4">Analytics</h1>
            <p className="text-muted-foreground">Em breve - análise detalhada dos seus links</p>
          </div>
        );
      case "settings":
        return (
          <div className="p-8 text-center">
            <h1 className="text-3xl font-bold text-foreground mb-4">Personalização</h1>
            <p className="text-muted-foreground">Em breve - personalize seu perfil LinkHub</p>
          </div>
        );
      default:
        return <LinksSection />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex flex-1">
        {/* Sidebar Component: 'variant="inset"' garante que o SidebarInset se alinhe corretamente no desktop */}
        <Sidebar variant="inset">
          <SidebarContent>
            <SidebarHeader className="p-4">
              <h2 className="text-lg font-semibold text-foreground mb-4">Menu</h2>
            </SidebarHeader>
            <SidebarGroup>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuButton
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    isActive={activeSection === item.id}
                    className="gap-3" // Adiciona espaçamento entre o ícone e o texto
                  >
                    <item.icon className="w-5 h-5" /> {/* Renderiza o componente do ícone */}
                    <span className="font-medium">{item.label}</span>
                  </SidebarMenuButton>
                ))}
              </SidebarMenu>
            </SidebarGroup>

            {/* Link Público - movido para SidebarFooter */}
            <SidebarFooter className="p-6 mt-auto">
              <Card className="p-4 bg-gradient-subtle border-border/50">
                <h3 className="text-sm font-semibold text-foreground mb-3">Link Público</h3>
                <div className="flex items-center gap-2 bg-background rounded-lg p-3 border border-border">
                  <LinkIcon className="w-4 h-4 text-primary" />
                  <span className="text-sm text-foreground flex-1">linkhub.com/usuario123</span>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            </SidebarFooter>
          </SidebarContent>
        </Sidebar>

        {/* SidebarInset: Contêiner principal para o conteúdo que se ajusta à barra lateral */}
        <SidebarInset>
          {renderContent()}
        </SidebarInset>
      </div>
      <Footer />
    </div>
  );
};

export default Index;
