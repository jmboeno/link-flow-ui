import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2, ExternalLink, TrendingUp } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import React from "react"; // Importado React para React.memo

interface LinkCardProps {
  title: string;
  url: string;
  clicks: number;
  createdAt: string;
  isActive?: boolean;
  onDelete: () => void; // Adicionar prop para lidar com a deleção
  onEdit: () => void; // Nova prop para lidar com a edição
}

export const LinkCard = React.memo(function LinkCard({ title, url, clicks, createdAt, isActive = true, onDelete, onEdit }: LinkCardProps) {
  const { isPending: isDeleting } = useMutation({ mutationKey: ['deleteLink'] }); // Hook para o estado da mutação

  return (
    <Card className={`p-6 transition-all duration-200 hover:shadow-elegant ${
      isActive ? "border-border" : "border-border/50 opacity-60"
    }`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="font-semibold text-foreground">{title}</h3>
            {isActive && (
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-success/10 text-success">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                Ativo
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
            <ExternalLink className="w-4 h-4" />
            <span className="hover:text-primary cursor-pointer transition-colors">{url}</span>
          </div>

          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              <span className="font-medium text-foreground">{clicks} cliques</span>
            </div>
            <span className="text-muted-foreground">Criado em {createdAt}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 ml-4">
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 hover:bg-accent"
            onClick={(e) => {
              e.stopPropagation(); // Impede que eventos de clique de elementos pai sejam disparados
              console.log("Botão de edição clicado para o link:", title); // Log para confirmar o clique
              onEdit(); // Chama a função onEdit
            }}
          >
            <Edit2 className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 hover:bg-destructive/10 hover:text-destructive"
            onClick={onDelete}
            disabled={isDeleting} // Desabilitar botão durante a deleção
          >
            {isDeleting ? (
              <span className="animate-spin">🌀</span> // Feedback visual de carregamento
            ) : (
              <Trash2 className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
});
