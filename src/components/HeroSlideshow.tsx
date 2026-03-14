import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import servicePublic from "@/assets/service-public.jpg";
import { useCourses, type FormattedCourse } from "@/hooks/useCourses";

const staticSlides = [hero1, hero2, hero3];

/** Format a number as Czech crowns, e.g. 4990 → "4 990 Kč" */
function formatPrice(price: number): string {
  return `${price.toLocaleString("cs-CZ")} Kč`;
}

interface ActiveBatch {
  courses: FormattedCourse[];
  heroImage?: string;
  price?: number;
}

export const HeroSlideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { data: courses } = useCourses();

  const activeBatch = useMemo((): ActiveBatch | null => {
    if (!courses) return null;
    const firstAvailable = courses.find((c) => c.status === true);
    if (!firstAvailable) return null;

    // If the course has a batch number, group all courses with the same batch
    if (firstAvailable.batch != null) {
      const batchCourses = courses.filter(
        (c) => c.batch === firstAvailable.batch && c.status === true,
      );
      return {
        courses: batchCourses,
        heroImage: batchCourses.find((c) => c.heroImage)?.heroImage,
        price: batchCourses[0]?.price,
      };
    }

    // Fallback: single course, no batch
    return {
      courses: [firstAvailable],
      heroImage: firstAvailable.heroImage,
      price: firstAvailable.price,
    };
  }, [courses]);

  const slides = useMemo(() => {
    if (activeBatch) {
      const firstSlide = activeBatch.heroImage || servicePublic;
      return [firstSlide, ...staticSlides];
    }
    return staticSlides;
  }, [activeBatch]);

  useEffect(() => {
    const isCourseSlide = activeBatch && currentSlide === 0;
    const duration = isCourseSlide ? 7000 : 5000;

    const timer = setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, duration);

    return () => clearTimeout(timer);
  }, [currentSlide, slides.length, activeBatch]);

  // Reset to slide 0 if slides configuration changes (e.g. course loads)
  useEffect(() => {
    setCurrentSlide(0);
  }, [activeBatch]);

  const scrollToServices = () => {
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
  };

  const isCourseSlide = activeBatch && currentSlide === 0;


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
              activeBatch && index === 0
                ? `Kurz: ${activeBatch.courses.map((c) => c.city).join(", ")}`
                : `Master Your Face - Slide ${index + (activeBatch ? 0 : 1)}`
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
        {isCourseSlide && activeBatch ? (
          <>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-4 tracking-tight">
              MASTER YOUR FACE
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-primary-foreground/90 max-w-2xl mb-4 font-light">
              Personal make-up experience, corporate beauty workshop & professional portraits.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 max-w-3xl mb-4">
              {activeBatch.courses.map((c, i) => (
                <div key={c.id} className="flex items-center gap-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg md:text-xl lg:text-2xl font-sans font-semibold text-primary-foreground">{c.city}</span>
                    <span className="text-lg md:text-xl lg:text-2xl font-sans font-semibold text-primary-foreground">{c.date}</span>
                  </div>
                  {i < activeBatch.courses.length - 1 && (
                    <span className="text-primary-foreground/70 font-bold text-xl">·</span>
                  )}
                </div>
              ))}
            </div>
            {activeBatch.price != null && (
              <p className="text-2xl md:text-3xl lg:text-4xl font-sans font-bold text-primary-foreground mb-8">
                {formatPrice(activeBatch.price)}
              </p>
            )}
            <Button
              asChild
              variant="outline"
              size="lg"
              className="bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary transition-all duration-300"
            >
              <Link to="/individual#dates">
                Vybrat termín
              </Link>
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
