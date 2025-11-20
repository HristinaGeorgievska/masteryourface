import { ScrollReveal } from "@/components/ScrollReveal";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import galleryPublic1 from "@/assets/gallery-public-1.jpg";
import galleryPublic2 from "@/assets/gallery-public-2.jpg";
import galleryPublic3 from "@/assets/gallery-public-3.jpg";
import galleryPhotography1 from "@/assets/gallery-photography-1.jpg";
import galleryPhotography2 from "@/assets/gallery-photography-2.jpg";
import galleryPhotography3 from "@/assets/gallery-photography-3.jpg";
import galleryCorporate1 from "@/assets/gallery-corporate-1.jpg";
import galleryCorporate2 from "@/assets/gallery-corporate-2.jpg";

interface ShowcaseItem {
  image: string;
  subtitle: string;
}

interface ShowcaseProps {
  items?: ShowcaseItem[];
}

const defaultShowcaseItems: ShowcaseItem[] = [
  {
    image: galleryPublic1,
    subtitle: "Public Course Experience",
  },
  {
    image: galleryPhotography1,
    subtitle: "Portrait Photography Session",
  },
  {
    image: galleryCorporate1,
    subtitle: "Corporate Wellness Workshop",
  },
  {
    image: galleryPublic2,
    subtitle: "Facial Massage Techniques",
  },
  {
    image: galleryPhotography2,
    subtitle: "Professional Headshots",
  },
  {
    image: galleryCorporate2,
    subtitle: "Team Building Session",
  },
  {
    image: galleryPublic3,
    subtitle: "Hands-On Learning",
  },
  {
    image: galleryPhotography3,
    subtitle: "Natural Beauty Captured",
  },
];

export const Showcase = ({ items = defaultShowcaseItems }: ShowcaseProps) => {
  return (
    <section className="section-padding bg-background">
      <ScrollReveal>
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Showcase</h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Explore our work and see the transformative results of our courses and services.
            </p>
          </div>

          <Carousel
            opts={{
              align: "start",
              loop: true,
              skipSnaps: false,
            }}
            className="w-full max-w-6xl mx-auto"
          >
            <CarouselContent>
              {items.map((item, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-2">
                    <div className="group relative aspect-[4/3] overflow-hidden rounded-lg transition-all duration-500">
                      <img
                        src={item.image}
                        alt={item.subtitle}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.08]"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                        <p className="text-primary-foreground text-lg font-semibold">
                          {item.subtitle}
                        </p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>
      </ScrollReveal>
    </section>
  );
};

