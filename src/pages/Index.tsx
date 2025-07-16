import { useState } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { LinksSection } from "@/components/LinksSection";
import { Footer } from "@/components/Footer";

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
        <Sidebar 
          activeSection={activeSection} 
          onSectionChange={setActiveSection} 
        />
        <main className="flex-1 overflow-auto">
          {renderContent()}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Index;
