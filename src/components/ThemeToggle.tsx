import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon">
        <Sun className="w-5 h-5" />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="transition-all duration-200 hover:bg-accent hover:shadow-sm"
    >
      {theme === "light" ? (
        <Moon className="w-5 h-5 text-muted-foreground hover:text-foreground" />
      ) : (
        <Sun className="w-5 h-5 text-muted-foreground hover:text-foreground" />
      )}
    </Button>
  );
}