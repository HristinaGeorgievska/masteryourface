import { Instagram, Mail } from "lucide-react";
import { Link } from "react-router-dom";

interface FooterProps {
  className?: string;
}

const Footer = ({ className = "bg-background border-t border-border/40" }: FooterProps) => {
  return (
    <footer className={`py-12 px-6 ${className}`}>
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="font-serif text-2xl font-semibold mb-2">
              MASTER YOUR FACE
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-3 gap-y-1 text-sm text-muted-foreground">
              <span>© {new Date().getFullYear()} Hristina Georgievska. Všechna práva vyhrazena.</span>
              <span className="hidden md:inline text-muted-foreground/50">•</span>
              <Link
                to="/obchodni-podminky"
                className="hover:text-foreground underline underline-offset-4 transition-colors"
              >
                Obchodní podmínky
              </Link>
              <span className="hidden md:inline text-muted-foreground/50">•</span>
              <Link
                to="/gdpr"
                className="hover:text-foreground underline underline-offset-4 transition-colors"
              >
                GDPR
              </Link>
            </div>
          </div>

          <div className="flex gap-6">
            <a
              href="mailto:info@masteryourface.cz"
              className="text-foreground hover:text-primary transition-colors"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
            <a
              href="https://instagram.com/hristinageorgievska"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-primary transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;