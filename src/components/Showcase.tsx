import { ScrollReveal } from "@/components/ScrollReveal";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import { useShowcase } from "@/hooks/useShowcase";

export const Showcase = () => {
  const { data: items, isLoading, error } = useShowcase();

  if (error) {
    return null;
  }

  if (!isLoading && (!items || items.length === 0)) {
    return null;
  }

  return (
    <section className="section-padding bg-background">
      <ScrollReveal>
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Portfolio</h2>
          </div>

          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-7xl mx-auto"
          >
            <CarouselContent>
              {isLoading
                ? Array.from({ length: 4 }).map((_, index) => (
                    <CarouselItem
                      key={index}
                      className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                    >
                      <div className="p-2">
                        <Skeleton className="aspect-[11/15] rounded-lg" />
                      </div>
                    </CarouselItem>
                  ))
                : items?.map((item) => (
                    <CarouselItem
                      key={item.id}
                      className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                    >
                      <div className="p-2">
                        <div className="group relative aspect-[11/15] overflow-hidden rounded-lg shadow-md">
                          <img
                            src={item.image}
                            alt={item.name || item.client || "Portfolio ukázka - Master Your Face"}
                            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-90"
                            loading="lazy"
                          />
                          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/70 to-transparent p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <div className="text-white flex flex-col justify-end gap-2">
                              {item.client && (
                                <p className="text-xs font-semibold uppercase tracking-widest opacity-90">
                                  {item.client}
                                </p>
                              )}
                              {item.name && (
                                <p className="text-2xl font-bold">{item.name}</p>
                              )}
                              {item.photographer && (
                                <p className="text-xs font-medium opacity-70">
                                  Foto: {item.photographer}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-12" />
            <CarouselNext className="hidden md:flex -right-12" />
          </Carousel>
        </div>
      </ScrollReveal>
    </section>
  );
};
