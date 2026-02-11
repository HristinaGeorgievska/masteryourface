import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import servicePublic from "@/assets/service-public.jpg";
import { useCourses } from "@/hooks/useCourses";

const staticSlides = [hero1, hero2, hero3];

export const HeroSlideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { data: courses } = useCourses();

  const activeCourse = useMemo(() => {
    if (!courses) return null;
    return courses.find((c) => c.status === true);
  }, [courses]);

  const slides = useMemo(() => {
    if (activeCourse) {
      // Use dynamic hero image if available, otherwise fallback to servicePublic
      const firstSlide = activeCourse.heroImage || servicePublic;
      return [firstSlide, ...staticSlides];
    }
    return staticSlides;
  }, [activeCourse]);

  useEffect(() => {
    const isCourseSlide = activeCourse && currentSlide === 0;
    const duration = isCourseSlide ? 7000 : 5000;

    const timer = setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, duration);

    return () => clearTimeout(timer);
  }, [currentSlide, slides.length, activeCourse]);

  // Reset to slide 0 if slides configuration changes (e.g. course loads)
  useEffect(() => {
    setCurrentSlide(0);
  }, [activeCourse]);

  const scrollToServices = () => {
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
  };

  const isCourseSlide = activeCourse && currentSlide === 0;

  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide}
            alt={
              activeCourse && index === 0
                ? `Kurz: ${activeCourse.city}`
                : `Master Your Face - Slide ${index + (activeCourse ? 0 : 1)}`
            }
            className="h-full w-full object-cover"
            loading={index === 0 ? "eager" : "lazy"}
            fetchPriority={index === 0 ? "high" : "auto"}
            decoding="async"
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/30 to-black/50" />
        </div>
      ))}

      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-6 transition-all duration-500">
        {isCourseSlide && activeCourse ? (
          <>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-4 tracking-tight">
              MASTER YOUR FACE
            </h1>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6 tracking-tight">
              {activeCourse.city}
            </h2>
            <div className="text-xl md:text-2xl lg:text-3xl text-primary-foreground/90 max-w-2xl mb-8 font-light">
              <p className="font-medium mb-2">{activeCourse.address}</p>
              <p>{activeCourse.date}</p>
              <p className="mt-2">{activeCourse.timeRange}</p>
            </div>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary transition-all duration-300"
            >
              <a
                href={activeCourse.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Rezervovat kurz
              </a>
            </Button>
          </>
        ) : (
          <>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-primary-foreground mb-6 tracking-tight">
              MASTER YOUR FACE
            </h1>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary-foreground mb-6 tracking-tight">
              by Hristina Georgievska
            </h2>
            <p className="text-lg md:text-xl lg:text-2xl text-primary-foreground/90 max-w-2xl mb-12 font-light">
              Personal make-up experience, corporate beauty workshop & professional portraits.
            </p>
            <Button
              variant="outline"
              size="lg"
              onClick={scrollToServices}
              className="bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary transition-all duration-300"
            >
              Vybrat z nabídky
            </Button>
          </>
        )}
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-primary-foreground w-8"
                : "bg-primary-foreground/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
