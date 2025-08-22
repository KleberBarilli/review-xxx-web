import FooterLanguageToggle from "../language/LanguageToggle";
import { ThemeToggle } from "../theme/ThemeToggle";

export default function SiteFooter() {
  return (
    <footer className="border-foreground/10 border-t">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <span className="text-muted-foreground text-xs">
          © {new Date().getFullYear()} Review XXX
        </span>

        <div className="flex items-center gap-3">
          <a
            href="https://www.igdb.com/"
            target="_blank"
            rel="noopener noreferrer"
            title="Powered by IGDB"
            className="text-muted-foreground hover:text-foreground text-xs font-semibold"
          >
            Powered by IGDB
          </a>
          <FooterLanguageToggle />
          <ThemeToggle />
        </div>
      </div>
    </footer>
  );
}
