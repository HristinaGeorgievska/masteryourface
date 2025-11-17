import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Building2, Camera } from "lucide-react";
import servicePublic from "@/assets/service-public.jpg";
import serviceCorporate from "@/assets/service-corporate.jpg";
import servicePhotography from "@/assets/service-photography.jpg";
import { Link } from "react-router-dom";

const services = [
  {
    title: "Public Courses",
    description: "Join our group sessions and master facial massage techniques in a supportive, professional environment. Perfect for individuals seeking personal growth and new skills.",
    image: servicePublic,
    icon: Users,
    link: "/public-courses",
  },
  {
    title: "Corporate Wellness",
    description: "Bring wellness to your workplace with customized facial massage workshops. Boost team morale and introduce valuable self-care practices to your employees.",
    image: serviceCorporate,
    icon: Building2,
    link: "/corporate-wellness",
  },
  {
    title: "Portrait Photography",
    description: "Capture your beauty with professional portrait sessions. Elegant, timeless photography that showcases your confidence and natural radiance.",
    image: servicePhotography,
    icon: Camera,
    link: "/portrait-photography",
  },
];

export const ServicesGrid = () => {
  const scrollToBooking = () => {
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="services" className="section-padding bg-background">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Choose the perfect course or service to begin your journey towards mastering facial wellness.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {services.map((service, index) => (
            <Card
              key={index}
              className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
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
              <CardContent className="p-6 md:p-8">
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-text-secondary mb-6 leading-relaxed">
                  {service.description}
                </p>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1 border-2 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                    asChild
                  >
                    <Link to={service.link}>Learn More</Link>
                  </Button>
                  <Button
                    onClick={scrollToBooking}
                    className="flex-1"
                  >
                    Book Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
