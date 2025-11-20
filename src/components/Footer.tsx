import { Instagram, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-background-secondary py-12 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="font-serif text-2xl font-semibold mb-2">
              MASTER YOUR FACE
            </p>
            <p className="text-sm text-muted-foreground">
              © 2024 Hristina Georgievska. Všechna práva vyhrazena.
            </p>
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