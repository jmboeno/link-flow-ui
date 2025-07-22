import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { StatsCard } from "./StatsCard";
import { LinkCard } from "./LinkCard";
import { Plus, Link as LinkIcon, MousePointerClick, TrendingUp, Trash2, Edit2, Filter, ArrowDownWideNarrow, Search } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { Skeleton } from "@/components/ui/skeleton";
import React, { useState, useMemo, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";


// Tipagem para os dados (idealmente viria de um schema de API)
interface LinkItem {
  id: string;
  title: string;
  url: string;
  clicks: number;
  createdAt: string; // Manter como string para simplificar, mas idealmente seria Date
  isActive: boolean;
}

interface StatsData {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: "up" | "down" | "neutral";
}

// Schema de validação para o formulário de novo link e edição
const linkFormSchema = z.object({
  title: z.string().min(1, "O título é obrigatório").max(50, "O título deve ter no máximo 50 caracteres"),
  url: z.string().url("URL inválida").min(1, "A URL é obrigatória"),
  isActive: z.boolean().default(true),
});

type LinkFormValues = z.infer<typeof linkFormSchema>; // Tipo para formulário de criação e edição

// Funções simuladas para API (substituir por chamadas reais à API)
const fetchLinks = async (): Promise<LinkItem[]> => {
  // Simula um delay de rede
  await new Promise(resolve => setTimeout(resolve, 800));
  // Dados simulados com mais variedade para ordenação e filtro
  return [
    { id: "1", title: "Meu Instagram", url: "instagram.com/usuario123", clicks: 89, createdAt: "2025-01-15", isActive: true },
    { id: "2", title: "Meu YouTube", url: "youtube.com/channel/abc123", clicks: 156, createdAt: "2025-01-12", isActive: true },
    { id: "3", title: "Meu Site Pessoal", url: "meusite.com.br", clicks: 34, createdAt: "2025-01-10", isActive: false }, // Link inativo
    { id: "4", title: "LinkedIn", url: "linkedin.com/in/usuario123", clicks: 67, createdAt: "2025-01-08", isActive: true },
    { id: "5", title: "Portfólio Behance", url: "behance.net/meuportfolio", clicks: 20, createdAt: "2025-02-01", isActive: true },
    { id: "6", title: "Twitter Profile", url: "twitter.com/mytweets", clicks: 120, createdAt: "2025-01-20", isActive: false }, // Link inativo
    { id: "7", title: "Blog Pessoal", url: "blog.com/posts", clicks: 50, createdAt: "2025-02-10", isActive: true },
  ];
};

const fetchStats = async (): Promise<StatsData[]> => {
  await new Promise(resolve => setTimeout(resolve, 600));
  return [
    { title: "Total de Links", value: 12, icon: <LinkIcon className="w-6 h-6 text-primary" />, trend: "neutral" },
    { title: "Cliques Hoje", value: 247, icon: <MousePointerClick className="w-6 h-6 text-primary" />, trend: "up" },
    { title: "Taxa de Clique", value: "8.3%", icon: <TrendingUp className="w-6 h-6 text-primary" />, trend: "up" }
  ];
};

const createLinkApi = async (newLink: LinkFormValues): Promise<LinkItem> => {
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simula delay de rede
  const id = (Math.random() * 1000).toFixed(0); // ID simples para simulação
  const createdAt = new Date().toISOString().split('T')[0]; // Data atual
  if (Math.random() > 0.1) { // 90% de chance de sucesso
    return { ...newLink, id, clicks: 0, createdAt };
  } else {
    throw new Error("Erro ao criar link. Tente novamente.");
  }
};

const updateLinkApi = async (updatedLink: LinkItem): Promise<LinkItem> => {
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simula delay de rede
  if (Math.random() > 0.1) { // 90% de chance de sucesso
    return updatedLink;
  } else {
    throw new Error("Erro ao atualizar link. Tente novamente.");
  }
};

const deleteLinkApi = async (id: string) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  // Simular sucesso/falha
  if (Math.random() > 0.1) { // 90% de chance de sucesso
    return { success: true, id };
  } else {
    throw new Error("Erro ao deletar link.");
  }
};

export function LinksSection() {
  const queryClient = useQueryClient();
  const [sortCriteria, setSortCriteria] = useState<'clicks' | 'createdAt' | 'title' | 'none'>('none');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const [isNewLinkDialogOpen, setIsNewLinkDialogOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<LinkItem | null>(null); // Estado para o link sendo editado
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false); // Estado para controlar o modal de edição


  const newLinkForm = useForm<LinkFormValues>({ // Renomeado para newLinkForm
    resolver: zodResolver(linkFormSchema),
    defaultValues: {
      title: "",
      url: "",
      isActive: true,
    },
  });

  const editLinkForm = useForm<LinkFormValues>({ // Novo useForm para edição
    resolver: zodResolver(linkFormSchema),
    defaultValues: {
      title: "",
      url: "",
      isActive: true,
    },
  });

  // Efeito para preencher o formulário de edição quando editingLink muda
  useEffect(() => {
    console.log("useEffect for editingLink fired. editingLink:", editingLink);
    if (editingLink) {
      editLinkForm.reset(editingLink); // Preenche o formulário com os dados do link
      setIsEditDialogOpen(true); // Abre o modal de edição
      console.log("Modal should open, isEditDialogOpen set to true");
    } else {
      editLinkForm.reset(); // Limpa o formulário se nenhum link estiver sendo editado
      setIsEditDialogOpen(false); // Garante que o modal de edição feche se editingLink for null
      console.log("editingLink is null, form reset and dialog closed.");
    }
  }, [editingLink, editLinkForm]); // Adicionado editLinkForm para a dependência para garantir estabilidade, embora seja um ref estável

  const { data: statsData, isLoading: isLoadingStats, isError: isErrorStats } = useQuery<StatsData[]>({
    queryKey: ['stats'],
    queryFn: fetchStats,
  });

  const { data: linksData, isLoading: isLoadingLinks, isError: isErrorLinks } = useQuery<LinkItem[]>({
    queryKey: ['links'],
    queryFn: fetchLinks,
  });

  const createLinkMutation = useMutation({
    mutationFn: createLinkApi,
    onSuccess: (newLink) => {
      queryClient.setQueryData<LinkItem[]>(['links'], (oldLinks) => {
        return oldLinks ? [...oldLinks, newLink] : [newLink];
      });
      toast.success("Link criado com sucesso!");
      newLinkForm.reset(); // Limpa o formulário de criação
      setIsNewLinkDialogOpen(false); // Fecha o modal de criação
    },
    onError: (error: any) => {
      toast.error(`Falha ao criar link: ${error.message}`);
    },
  });

  const updateLinkMutation = useMutation({
    mutationFn: updateLinkApi,
    onSuccess: (updatedLink) => {
      queryClient.setQueryData<LinkItem[]>(['links'], (oldLinks) => {
        return oldLinks ? oldLinks.map(link => link.id === updatedLink.id ? updatedLink : link) : [];
      });
      toast.success("Link atualizado com sucesso!");
      setEditingLink(null); // Limpa o link em edição, o que fechará o modal via useEffect
    },
    onError: (error: any) => {
      toast.error(`Falha ao atualizar link: ${error.message}`);
    },
  });

  const deleteLinkMutation = useMutation({
    mutationFn: deleteLinkApi,
    onSuccess: (_, id) => {
      queryClient.setQueryData<LinkItem[]>(['links'], (oldLinks) => oldLinks?.filter(link => link.id !== id));
      toast.success("Link excluído com sucesso!");
    },
    onError: (error) => {
      toast.error(`Falha ao excluir link: ${error.message}`);
    },
  });

  const handleDeleteLink = (id: string) => {
    deleteLinkMutation.mutate(id);
  };

  const handleCreateLink = (values: LinkFormValues) => {
    createLinkMutation.mutate(values);
  };

  const handleEditLink = (link: LinkItem) => {
    console.log("handleEditLink called with:", link);
    setEditingLink(link); // Define o link a ser editado
  };

  const handleUpdateLink = (values: LinkFormValues) => {
    if (editingLink) {
      // Converte LinkFormValues para LinkItem para incluir o ID e outras props
      const updatedLink: LinkItem = {
        ...editingLink, // Mantém o ID e outras props que não estão no formulário
        title: values.title,
        url: values.url,
        isActive: values.isActive,
      };
      updateLinkMutation.mutate(updatedLink);
    }
  };

  // Lógica de ordenação e filtro otimizada com useMemo
  const sortedAndFilteredLinks = useMemo(() => {
    if (!linksData) return [];

    let filtered = linksData.filter(link => {
      // Filtro por termo de busca
      const matchesSearchTerm = searchTerm === '' ||
        link.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        link.url.toLowerCase().includes(searchTerm.toLowerCase());

      // Filtro por status
      const matchesStatus = filterStatus === 'all' ||
        (filterStatus === 'active' && link.isActive) ||
        (filterStatus === 'inactive' && !link.isActive);

      return matchesSearchTerm && matchesStatus;
    });

    // Ordenação
    if (sortCriteria === 'clicks') {
      filtered.sort((a, b) => b.clicks - a.clicks); // Mais cliques primeiro
    } else if (sortCriteria === 'createdAt') {
      filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()); // Mais recente primeiro
    } else if (sortCriteria === 'title') {
      filtered.sort((a, b) => a.title.localeCompare(b.title)); // Ordem alfabética
    }

    return filtered;
  }, [linksData, sortCriteria, filterStatus, searchTerm]);

  if (isLoadingStats || isLoadingLinks) {
    return (
      <div className="w-full py-8 space-y-8">
        <div className="px-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground">Meus Links</h1>
          <Button variant="glow" className="gap-2" disabled>
            <Plus className="w-4 h-4" />
            Novo Link
          </Button>
        </div>

        <div className="px-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-32 w-full rounded-lg" />
          ))}
        </div>

        <div className="px-8 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">Links Ativos</h2>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                Ordenar
              </Button>
              <Button variant="outline" size="sm" disabled>
                Filtrar
              </Button>
            </div>
          </div>
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-28 w-full rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isErrorStats || isErrorLinks) {
    return (
      <div className="px-8 py-8 text-center text-destructive">
        <h1 className="text-3xl font-bold mb-4">Erro ao Carregar Dados</h1>
        <p className="text-lg">Não foi possível carregar os dados. Por favor, tente novamente.</p>
      </div>
    );
  }

  return (
    <div className="w-full py-8 space-y-8">
      {/* Header */}
      <div className="px-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Meus Links</h1>
        {/* Botão para abrir o modal de novo link */}
        <Dialog open={isNewLinkDialogOpen} onOpenChange={setIsNewLinkDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="glow" className="gap-2">
              <Plus className="w-4 h-4" />
              Novo Link
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Criar Novo Link</DialogTitle>
              <DialogDescription>
                Preencha os detalhes para adicionar um novo link.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={newLinkForm.handleSubmit(handleCreateLink)} className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Título
                </Label>
                <Input
                  id="title"
                  {...newLinkForm.register("title")}
                  className="col-span-3"
                />
                {newLinkForm.formState.errors.title && (
                  <p className="col-span-4 text-right text-sm text-destructive">
                    {newLinkForm.formState.errors.title.message}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="url" className="text-right">
                  URL
                </Label>
                <Input
                  id="url"
                  {...newLinkForm.register("url")}
                  className="col-span-3"
                  placeholder="https://exemplo.com"
                />
                {newLinkForm.formState.errors.url && (
                  <p className="col-span-4 text-right text-sm text-destructive">
                    {newLinkForm.formState.errors.url.message}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="isActive" className="text-right">
                  Ativo
                </Label>
                <Checkbox
                  id="isActive"
                  checked={newLinkForm.watch("isActive")}
                  onCheckedChange={(checked) => newLinkForm.setValue("isActive", !!checked)}
                  className="col-span-3"
                />
              </div>
              <DialogFooter>
                <Button type="submit" disabled={createLinkMutation.isPending}>
                  {createLinkMutation.isPending ? "Criando..." : "Criar Link"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Modal de Edição de Link */}
      <Dialog open={isEditDialogOpen} onOpenChange={(open) => {
        setIsEditDialogOpen(open);
        if (!open) {
          setEditingLink(null); // Limpa o link em edição ao fechar o modal
        }
      }}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Editar Link</DialogTitle>
            <DialogDescription>
              Edite os detalhes do seu link.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={editLinkForm.handleSubmit(handleUpdateLink)} className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-title" className="text-right">
                Título
              </Label>
              <Input
                id="edit-title"
                {...editLinkForm.register("title")}
                className="col-span-3"
              />
              {editLinkForm.formState.errors.title && (
                <p className="col-span-4 text-right text-sm text-destructive">
                  {editLinkForm.formState.errors.title.message}
                </p>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-url" className="text-right">
                URL
              </Label>
              <Input
                id="edit-url"
                {...editLinkForm.register("url")}
                className="col-span-3"
                placeholder="https://exemplo.com"
              />
              {editLinkForm.formState.errors.url && (
                <p className="col-span-4 text-right text-sm text-destructive">
                  {editLinkForm.formState.errors.url.message}
                </p>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-isActive" className="text-right">
                Ativo
              </Label>
              <Checkbox
                id="edit-isActive"
                checked={editLinkForm.watch("isActive")}
                onCheckedChange={(checked) => editLinkForm.setValue("isActive", !!checked)}
                className="col-span-3"
              />
            </div>
            <DialogFooter>
              <Button type="submit" disabled={updateLinkMutation.isPending}>
                {updateLinkMutation.isPending ? "Salvando..." : "Salvar Alterações"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>


      {/* Stats Cards */}
      <div className="px-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {statsData?.map((stat, index) => (
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
      <div className="px-8 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">Links Ativos</h2>
          <div className="flex items-center gap-2">
            {/* Dropdown para Ordenar */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <ArrowDownWideNarrow className="w-4 h-4 mr-2" />
                  Ordenar
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Ordenar por</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setSortCriteria('createdAt')}>
                  Mais Recentes
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortCriteria('clicks')}>
                  Mais Cliques
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortCriteria('title')}>
                  Nome (A-Z)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortCriteria('none')}>
                  Padrão
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Botão para Abrir Filtro (Dialog) */}
            <Button variant="outline" size="sm" onClick={() => setIsFilterDialogOpen(true)}>
              <Filter className="w-4 h-4 mr-2" />
              Filtrar
            </Button>

            {/* Dialog de Filtro */}
            <Dialog open={isFilterDialogOpen} onOpenChange={setIsFilterDialogOpen}>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Filtrar Links</DialogTitle>
                  <DialogDescription>
                    Defina os critérios para filtrar seus links.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="search" className="text-right">
                      Buscar
                    </Label>
                    <Input
                      id="search"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="col-span-3"
                      placeholder="Buscar por título ou URL..."
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">
                      Status
                    </Label>
                    <RadioGroup
                      value={filterStatus}
                      onValueChange={(value: 'all' | 'active' | 'inactive') => setFilterStatus(value)}
                      className="col-span-3 flex space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="all" id="r1" />
                        <Label htmlFor="r1">Todos</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="active" id="r2" />
                        <Label htmlFor="r2">Ativos</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="inactive" id="r3" />
                        <Label htmlFor="r3">Inativos</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" onClick={() => setIsFilterDialogOpen(false)}>Fechar</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

          </div>
        </div>

        {/* Links List */}
        <div className="space-y-4">
          {sortedAndFilteredLinks && sortedAndFilteredLinks.length > 0 ? (
            sortedAndFilteredLinks.map((link) => (
              <LinkCard
                key={link.id}
                title={link.title}
                url={link.url}
                clicks={link.clicks}
                createdAt={link.createdAt}
                isActive={link.isActive}
                onDelete={() => handleDeleteLink(link.id)}
                onEdit={() => handleEditLink(link)} // Passa a função de edição
              />
            ))
          ) : (
            <div className="text-center text-muted-foreground py-10">
              <p>Nenhum link encontrado com os critérios selecionados.</p>
              <p>Tente ajustar seus filtros ou adicionar novos links!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
