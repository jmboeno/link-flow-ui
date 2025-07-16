import { Button } from "@/components/ui/button";
import { StatsCard } from "./StatsCard";
import { LinkCard } from "./LinkCard";
import { Plus, Link as LinkIcon, MousePointerClick, TrendingUp } from "lucide-react";

const statsData = [
  {
    title: "Total de Links",
    value: 12,
    icon: <LinkIcon className="w-6 h-6 text-primary" />,
    trend: "neutral" as const
  },
  {
    title: "Cliques Hoje", 
    value: 247,
    icon: <MousePointerClick className="w-6 h-6 text-primary" />,
    trend: "up" as const
  },
  {
    title: "Taxa de Clique",
    value: "8.3%",
    icon: <TrendingUp className="w-6 h-6 text-primary" />,
    trend: "up" as const
  }
];

const linksData = [
  {
    title: "Meu Instagram",
    url: "instagram.com/usuario123",
    clicks: 89,
    createdAt: "15/01/2025",
    isActive: true
  },
  {
    title: "Meu YouTube", 
    url: "youtube.com/channel/abc123",
    clicks: 156,
    createdAt: "12/01/2025",
    isActive: true
  },
  {
    title: "Meu Site Pessoal",
    url: "meusite.com.br", 
    clicks: 34,
    createdAt: "10/01/2025",
    isActive: true
  },
  {
    title: "LinkedIn",
    url: "linkedin.com/in/usuario123",
    clicks: 67,
    createdAt: "08/01/2025",
    isActive: true
  }
];

export function LinksSection() {
  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Meus Links</h1>
        <Button variant="glow" className="gap-2">
          <Plus className="w-4 h-4" />
          Novo Link
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statsData.map((stat, index) => (
          <StatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            trend={stat.trend}
          />
        ))}
      </div>

      {/* Links Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">Links Ativos</h2>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              Ordenar
            </Button>
            <Button variant="outline" size="sm">
              Filtrar
            </Button>
          </div>
        </div>

        {/* Links List */}
        <div className="space-y-4">
          {linksData.map((link, index) => (
            <LinkCard
              key={index}
              title={link.title}
              url={link.url}
              clicks={link.clicks}
              createdAt={link.createdAt}
              isActive={link.isActive}
            />
          ))}
        </div>
      </div>
    </div>
  );
}