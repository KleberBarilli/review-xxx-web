import FooterLanguageToggle from "../language/LanguageToggle";

export default function SiteFooter() {
  return (
    <footer className="border-foreground/10 border-t">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <span className="text-muted-foreground text-xs">
          © {new Date().getFullYear()} Review XXX
        </span>
        <FooterLanguageToggle />
      </div>
    </footer>
  );
}
