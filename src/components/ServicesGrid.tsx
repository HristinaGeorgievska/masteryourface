import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Building2, Camera } from "lucide-react";
import servicePublic from "@/assets/service-public.jpg";
import serviceCorporate from "@/assets/service-corporate.jpg";
import servicePhotography from "@/assets/service-photography.jpg";
import { Link } from "react-router-dom";

const services = [
  {
    title: "MASTER YOUR FACE — Individual",
    description: "Objevte make-up, který konečně dává smysl — jednoduchý, přirozený a použitelný v běžném životě.",
    image: servicePublic,
    icon: Users,
    link: "/public-courses",
  },
  {
    title: "MASTER YOUR FACE — Business",
    description: "Firemní workshop make-upu — praktický zážitek, který zaměstnankyním přidá sebevědomí a profesionální vzhled.",
    image: serviceCorporate,
    icon: Building2,
    link: "/corporate-wellness",
  },
  {
    title: "MASTER YOUR IMAGE — Portraits",
    description: "Profesionální portréty přímo ve firmě — rychlé, bez přesunů, přirozené a reprezentativní.",
    image: servicePhotography,
    icon: Camera,
    link: "/portrait-photography",
  },
];

export const ServicesGrid = () => {
  return (
    <section id="services" className="section-padding bg-background">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Nabídka služeb</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {services.map((service, index) => (
            <Card
              key={index}
              className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col"
            >
              <div className="relative aspect-[4/3] overflow-hidden flex-shrink-0">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <service.icon className="w-8 h-8 text-primary-foreground" />
                </div>
              </div>
              <CardContent className="p-6 md:p-8 flex flex-col flex-1">
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-text-secondary mb-6 leading-relaxed flex-1">
                  {service.description}
                </p>
                <Button
                  variant="outline"
                  className="w-full border-2 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  asChild
                >
                  <Link to={service.link}>Zobrazit detaily</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
