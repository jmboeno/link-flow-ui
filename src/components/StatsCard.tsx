import { Card } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: "up" | "down" | "neutral";
}

export function StatsCard({ title, value, icon, trend = "neutral" }: StatsCardProps) {
  const trendColors = {
    up: "text-success",
    down: "text-destructive", 
    neutral: "text-muted-foreground"
  };

  return (
    <Card className="p-6 hover:shadow-elegant transition-all duration-200 bg-gradient-subtle border-border/50">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground font-medium">{title}</p>
          <p className={`text-3xl font-bold ${trendColors[trend]} mt-1`}>{value}</p>
        </div>
        <div className="p-3 bg-primary/10 rounded-lg">
          {icon}
        </div>
      </div>
    </Card>
  );
}