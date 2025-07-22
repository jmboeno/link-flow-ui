export function Footer() {
  return (
    <footer className="bg-card border-t border-border px-6 py-4">
      {/* Adicionado flex-wrap e gap para melhor responsividade em telas menores */}
      <div className="flex items-center justify-between text-sm flex-wrap gap-4">
        <p className="text-muted-foreground">
          <span className="font-semibold text-foreground">LinkHub</span> © 2025
        </p>

        {/* Links do rodapé, também com flex-wrap e ajuste de justify para mobile */}
        <div className="flex items-center gap-6 flex-wrap justify-center sm:justify-end">
          <a
            href="#"
            className="text-muted-foreground hover:text-primary transition-colors duration-200"
          >
            Ajuda
          </a>
          <a
            href="#"
            className="text-muted-foreground hover:text-primary transition-colors duration-200"
          >
            Privacidade
          </a>
          <a
            href="#"
            className="text-muted-foreground hover:text-primary transition-colors duration-200"
          >
            Termos
          </a>
        </div>
      </div>
    </footer>
  );
}
