export function Footer() {
  return (
    <footer className="bg-card border-t border-border px-6 py-4">
      <div className="flex items-center justify-between text-sm">
        <p className="text-muted-foreground">
          <span className="font-semibold text-foreground">LinkHub</span> © 2025
        </p>
        
        <div className="flex items-center gap-6">
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