import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, Instagram } from "lucide-react";
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically send the form data to a backend
    // For now, we'll just show a success message
    toast.success("Děkujeme, ozveme se vám co nejdříve.");
    
    // Reset form
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section id="kontakt" className="py-24 px-6 bg-background">
      <div className="container mx-auto max-w-6xl">
        <h2 className="font-serif text-4xl md:text-5xl font-semibold text-center mb-16">
          Kontakt
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
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
                href="mailto:info@masteryourface.cz"
                className="flex items-center gap-3 text-foreground hover:text-primary transition-colors group"
              >
                <div className="p-3 bg-secondary rounded-full group-hover:bg-primary/10 transition-colors">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">info@masteryourface.cz</p>
                </div>
              </a>

              <a 
                href="tel:+420608009013"
                className="flex items-center gap-3 text-foreground hover:text-primary transition-colors group"
              >
                <div className="p-3 bg-secondary rounded-full group-hover:bg-primary/10 transition-colors">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Telefon</p>
                  <p className="font-medium">608 009 013</p>
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
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-card border border-border rounded-lg p-8 shadow-soft">
            <h3 className="font-serif text-2xl font-semibold mb-6">
              Napište nám
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name">Jméno *</Label>
                <Input
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="email">E-mail *</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="message">Zpráva</Label>
                <Textarea
                  id="message"
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="mt-2"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Odeslat zprávu
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;