import { Mail, Phone, Instagram, Globe } from "lucide-react";

interface ContactProps {
  showHeading?: boolean;
}

const Contact = ({ showHeading = true }: ContactProps) => {
  return (
    <section id="kontakt" className="py-24 px-6 bg-background">
      <div className="container mx-auto max-w-6xl">
        {showHeading && (
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-center mb-16">
            Kontakt
          </h2>
        )}

        <div className="space-y-8">
          <div>
            <h3 className="font-serif text-2xl font-semibold mb-6">
              Kontaktní informace
            </h3>
            <p className="text-lg text-muted-foreground mb-8">
              Máte otázky nebo zájem o některou z našich služeb?
              Neváhejte nás kontaktovat.
            </p>
          </div>

          <div className="space-y-4">
            <a
              href="mailto:hristina.georgievska1@gmail.com"
              className="flex items-center gap-3 text-foreground hover:text-primary transition-colors group"
            >
              <div className="p-3 bg-secondary rounded-full group-hover:bg-primary/10 transition-colors">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">hristina.georgievska1@gmail.com</p>
              </div>
            </a>

            <a
              href="tel:+420602367517"
              className="flex items-center gap-3 text-foreground hover:text-primary transition-colors group"
            >
              <div className="p-3 bg-secondary rounded-full group-hover:bg-primary/10 transition-colors">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Telefon</p>
                <p className="font-medium">602 367 517</p>
              </div>
            </a>

            <a
              href="https://instagram.com/hristinageorgievska"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-foreground hover:text-primary transition-colors group"
            >
              <div className="p-3 bg-secondary rounded-full group-hover:bg-primary/10 transition-colors">
                <Instagram className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Instagram</p>
                <p className="font-medium">@hristinageorgievska</p>
              </div>
            </a>

            <a
              href="https://hristinageorgievska.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-foreground hover:text-primary transition-colors group"
            >
              <div className="p-3 bg-secondary rounded-full group-hover:bg-primary/10 transition-colors">
                <Globe className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Webová stránka</p>
                <p className="font-medium">hristinageorgievska.com</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
