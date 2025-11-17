import { Instagram, Facebook } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container-custom">
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center gap-6">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity"
              aria-label="Follow us on Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity"
              aria-label="Follow us on Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
          </div>

          <div className="space-y-2">
            <a
              href="https://portfolio.example.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm hover:underline inline-block"
            >
              View Portfolio
            </a>
          </div>

          <p className="text-sm opacity-80">
            © {new Date().getFullYear()} Master Your Face. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
