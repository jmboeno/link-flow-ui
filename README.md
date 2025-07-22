# LinkHub: Plataforma de Gerenciamento de Links

Bem-vindo ao LinkHub! Este projeto é uma plataforma moderna e responsiva para gerenciar seus links de forma eficiente. Com uma interface de usuário intuitiva e estatísticas detalhadas, você pode acompanhar o desempenho dos seus links, personalizá-los e organizá-los facilmente.

## Sobre o Projeto

O LinkHub é uma aplicação front-end construída com tecnologias modernas de desenvolvimento web, focada em oferecer uma experiência de usuário fluida e um código bem estruturado. Ele permite que os usuários criem, editem e excluam links, visualizem estatísticas de cliques e filtrem seus links por diferentes critérios.

## Funcionalidades

* **Gerenciamento de Links**: Crie, edite e delete seus links de forma simples.
* **Estatísticas de Cliques**: Monitore o número de cliques em cada um dos seus links.
* **Links Ativos/Inativos**: Controle a visibilidade dos seus links.
* **Filtragem e Ordenação**: Organize seus links por título, data de criação, cliques ou status (ativos/inativos).
* **Layout Responsivo**: Desfrute de uma experiência consistente em dispositivos desktop e mobile.
* **Notificações**: Receba alertas sobre as atividades da sua conta.
* **Alternância de Tema**: Alterne entre os temas claro e escuro para uma visualização confortável.

## Tecnologias Utilizadas

Este projeto é construído com um stack de tecnologias moderno para desenvolvimento de aplicações web:

* **Vite**: Um empacotador de projetos (bundler) rápido para desenvolvimento front-end, que oferece uma experiência de desenvolvimento ágil.
* **React**: Biblioteca JavaScript para a construção de interfaces de usuário reativas e componentizadas.
* **TypeScript**: Superconjunto do JavaScript que adiciona tipagem estática, melhorando a robustez e a manutenibilidade do código.
* **Tailwind CSS**: Um framework CSS utilitário que permite construir designs personalizados rapidamente, diretamente no seu HTML.
* **shadcn/ui**: Uma coleção de componentes de interface de usuário reutilizáveis e acessíveis, estilizados com Tailwind CSS.
* **React Router DOM**: Biblioteca para roteamento declarativo no React, permitindo a navegação entre diferentes seções da aplicação.
* **TanStack Query (React Query)**: Biblioteca para gerenciamento de estado de servidor assíncrono, facilitando a busca, cache e atualização de dados.
* **React Hook Form**: Uma biblioteca para gerenciamento de formulários no React com validação simplificada.
* **Zod**: Biblioteca de validação de schemas baseada em TypeScript, utilizada para garantir a integridade dos dados dos formulários.
* **Lucide React**: Uma coleção de ícones personalizáveis e de alta qualidade.
* **Next.js Themes**: (Embora o projeto não seja Next.js, a biblioteca é usada para gerenciar temas). Gerencia a alternância de temas (claro/escuro).
* **Sonner**: Uma biblioteca para exibir toasts (notificações) bonitos e personalizáveis.

## Como Editar Este Código

Você tem diversas opções para editar este projeto:

### Usando o Lovable

Visite diretamente o [Projeto Lovable](https://lovable.dev/projects/69129963-6b99-4863-a0a6-f25f059bc649) e comece a interagir com o código diretamente da plataforma. As alterações feitas no Lovable serão automaticamente sincronizadas com este repositório.

### Usando Sua IDE Preferida (Localmente)

Se você prefere trabalhar em seu ambiente de desenvolvimento local, siga os passos abaixo. Você precisará ter o Node.js e o npm instalados (recomendamos o uso do [nvm](https://github.com/nvm-sh/nvm#installing-and-updating) para gerenciar as versões do Node.js).

1.  **Clone o repositório**:
    ```bash
    git clone <YOUR_GIT_URL> # Substitua <YOUR_GIT_URL> pelo URL do seu repositório Git
    ```
2.  **Navegue até o diretório do projeto**:
    ```bash
    cd <YOUR_PROJECT_NAME> # Substitua <YOUR_PROJECT_NAME> pelo nome da pasta clonada
    ```
3.  **Instale as dependências**:
    ```bash
    npm install
    # Ou se preferir usar o Bun:
    # bun install
    ```
4.  **Inicie o servidor de desenvolvimento**:
    ```bash
    npm run dev
    # Ou se preferir usar o Bun:
    # bun run dev
    ```
    Isso iniciará o servidor de desenvolvimento, e você poderá ver a aplicação em `http://localhost:8080`.

### Editando um Arquivo Diretamente no GitHub

Para pequenas alterações, você pode editar arquivos diretamente na interface do GitHub:

1.  Navegue até o arquivo desejado no repositório.
2.  Clique no botão "Edit" (ícone de lápis) no canto superior direito da visualização do arquivo.
3.  Faça suas alterações e, em seguida, faça um commit para salvá-las.

### Usando o GitHub Codespaces

Para um ambiente de desenvolvimento completo no navegador:

1.  Navegue até a página principal do seu repositório no GitHub.
2.  Clique no botão "Code" (botão verde) próximo ao canto superior direito.
3.  Selecione a aba "Codespaces".
4.  Clique em "New codespace" para iniciar um novo ambiente Codespace.
5.  Você pode editar os arquivos diretamente no Codespace e fazer commit e push de suas alterações quando terminar.

## Estrutura do Projeto

O projeto segue uma estrutura de pastas modular, facilitando a organização e a escalabilidade:

```
link-flow-ui-main/
├── public/                 # Arquivos estáticos (imagens, favicon, robots.txt)
├── src/                    # Código-fonte principal da aplicação
│   ├── App.css             # Estilos CSS globais da aplicação
│   ├── App.tsx             # Componente raiz da aplicação, configura roteamento e provedores
│   ├── index.css           # Arquivo CSS principal para Tailwind e variáveis CSS
│   ├── main.tsx            # Ponto de entrada da aplicação React
│   ├── vite-env.d.ts       # Definições de tipo para o ambiente Vite
│   ├── components/         # Componentes reutilizáveis
│   │   ├── ui/             # Componentes da biblioteca shadcn/ui
│   │   │   ├── accordion.tsx
│   │   │   ├── alert-dialog.tsx
│   │   │   ├── ... (outros componentes de UI)
│   │   │   └── toast.tsx
│   │   ├── Footer.tsx      # Componente de rodapé da aplicação
│   │   ├── Header.tsx      # Componente de cabeçalho da aplicação
│   │   ├── LinkCard.tsx    # Componente para exibir um único link
│   │   ├── LinksSection.tsx# Seção principal que exibe e gerencia os links
│   │   ├── Sidebar.tsx     # Componente da barra lateral de navegação
│   │   └── StatsCard.tsx   # Componente para exibir cartões de estatísticas
│   ├── hooks/              # Hooks React personalizados
│   │   ├── use-mobile.tsx  # Hook para detectar se o dispositivo é mobile
│   │   └── use-toast.ts    # Hook para gerenciar notificações (toasts)
│   ├── lib/                # Funções utilitárias
│   │   └── utils.ts        # Funções de utilidade, incluindo cn para classes Tailwind
│   └── pages/              # Páginas da aplicação
│       ├── Index.tsx       # Página principal (dashboard de links)
│       └── NotFound.tsx    # Página 404
├── .gitignore              # Arquivos e pastas a serem ignorados pelo Git
├── bun.lockb               # Lockfile do gerenciador de pacotes Bun
├── components.json         # Configuração do shadcn/ui
├── eslint.config.js        # Configuração do ESLint para linting de código
├── package.json            # Metadados do projeto e lista de dependências
├── package-lock.json       # Lockfile do gerenciador de pacotes npm
├── postcss.config.js       # Configuração do PostCSS para processamento CSS
├── README.md               # Este arquivo README
├── tailwind.config.ts      # Configuração do Tailwind CSS
├── tsconfig.json           # Configuração global do TypeScript
├── tsconfig.app.json       # Configuração do TypeScript para o código da aplicação
└── tsconfig.node.json      # Configuração do TypeScript para arquivos Node.js (ex: vite.config.ts)
```

## Como Publicar Este Projeto

Para implantar seu projeto e disponibilizá-lo online:

1.  Simplesmente abra o [Lovable](https://lovable.dev/projects/69129963-6b99-4863-a0a6-f25f059bc649).
2.  Clique em `Share` (Compartilhar) e depois em `Publish` (Publicar).

## Como Conectar um Domínio Personalizado

Sim, você pode conectar um domínio personalizado ao seu projeto Lovable:

1.  Navegue até `Project` (Projeto) > `Settings` (Configurações) > `Domains` (Domínios).
2.  Clique em `Connect Domain` (Conectar Domínio).

Para mais detalhes, consulte a documentação do Lovable: [Configurando um domínio personalizado](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide).

---

Espero que este `README.md` seja útil para entender e começar a trabalhar com o projeto LinkHub! Sinta-se à vontade para explorar o código e contribuir.