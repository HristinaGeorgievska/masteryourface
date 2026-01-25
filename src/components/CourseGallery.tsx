import { ScrollReveal } from "@/components/ScrollReveal";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface CourseGalleryProps {
  images: string[];
  title?: string;
  subtitle?: string;
}

export const CourseGallery = ({ images, title = "Course Gallery", subtitle = "See what our courses look like" }: CourseGalleryProps) => {
  return (
    <section className="section-padding bg-background-secondary">
      <ScrollReveal>
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              {subtitle}
            </p>
          </div>

          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-5xl mx-auto"
          >
            <CarouselContent>
              {images.map((image, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-2">
                    <div className="relative aspect-square overflow-hidden rounded-lg transition-shadow">
                      <img
                        src={image}
                        alt={`${title} - obrázek ${index + 1}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
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
