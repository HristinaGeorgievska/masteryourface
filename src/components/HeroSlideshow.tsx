import { useState, useEffect, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import hero1 from "@/assets/hero-1.webp";
import hero2 from "@/assets/hero-2.webp";
import hero3 from "@/assets/hero-3.webp";
import hero1_v2 from "@/assets/hero-2/hero-1.webp";
import hero2_v2 from "@/assets/hero-2/hero-2.webp";
import hero3_v2 from "@/assets/hero-2/hero-3.webp";
import hero1_v3 from "@/assets/hero-3/hero-1.webp";
import hero2_v3 from "@/assets/hero-3/hero-2.webp";
import servicePublic from "@/assets/service-public.webp";
import { useCourses, type FormattedCourse } from "@/hooks/useCourses";

const staticSlidesV1 = [hero1, hero2, hero3];
const staticSlidesV2 = [hero1_v2, hero2_v2, hero3_v2];
const staticSlidesV3 = [hero1_v3, hero2_v3];

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

  // DEV-ONLY Hero photos switcher state
  const [heroSet, setHeroSet] = useState<"v1" | "v2" | "v3">((): "v1" | "v2" | "v3" => {
    if (!import.meta.env.DEV) return "v1";
    try {
      const params = new URLSearchParams(window.location.search);
      const queryHero = params.get("hero");
      if (queryHero === "3" || queryHero === "v3") return "v3";
      if (queryHero === "2" || queryHero === "v2") return "v2";
      if (queryHero === "1" || queryHero === "v1") return "v1";
      const saved = localStorage.getItem("dev_hero_set");
      if (saved === "v3") return "v3";
      if (saved === "v2") return "v2";
    } catch {
      // ignore
    }
    return "v1";
  });

  const toggleHeroSet = useCallback(() => {
    setHeroSet((prev) => {
      const next: "v1" | "v2" | "v3" = prev === "v1" ? "v2" : prev === "v2" ? "v3" : "v1";
      try {
        localStorage.setItem("dev_hero_set", next);
      } catch {
        // ignore
      }
      const label =
        next === "v3"
          ? "Hero Set: 3 (assets/hero-3, 2 fotky)"
          : next === "v2"
          ? "Hero Set: 2 (assets/hero-2)"
          : "Hero Set: 1 (assets/hero-*.jpg)";
      toast.info(label, {
        description: "Přepnuto (Shift + H nebo DEV badge)",
        duration: 2500,
      });
      return next;
    });
  }, []);

  useEffect(() => {
    if (!import.meta.env.DEV) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }

      // Secret shortcut: Shift + H or Alt + H
      if ((e.key === "H" && e.shiftKey) || (e.key.toLowerCase() === "h" && e.altKey)) {
        e.preventDefault();
        toggleHeroSet();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleHeroSet]);

  const staticSlides =
    heroSet === "v3"
      ? staticSlidesV3
      : heroSet === "v2"
      ? staticSlidesV2
      : staticSlidesV1;

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
  }, [activeBatch, staticSlides]);

  useEffect(() => {
    const isCourseSlide = activeBatch && currentSlide === 0;
    const duration = isCourseSlide ? 7000 : 5000;

    const timer = setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, duration);

    return () => clearTimeout(timer);
  }, [currentSlide, slides.length, activeBatch]);

  // Reset to slide 0 if slides configuration changes (e.g. course loads or heroSet changes)
  useEffect(() => {
    setCurrentSlide(0);
  }, [activeBatch, heroSet]);

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
            <h1 id="hero-header" className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-4 tracking-tight">
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
            <h1 id="hero-header" className="text-5xl md:text-7xl lg:text-8xl font-bold text-primary-foreground mb-6 tracking-tight">
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

      {/* DEV ONLY Hero Switcher floating badge */}
      {import.meta.env.DEV && (
        <button
          type="button"
          onClick={toggleHeroSet}
          title="DEV ONLY: Klikněte nebo stiskněte Shift + H pro přepnutí fotografií Hero sekce"
          className="fixed bottom-4 left-4 z-50 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/85 hover:bg-black text-white text-xs font-mono shadow-2xl border border-white/20 backdrop-blur-md transition-all opacity-40 hover:opacity-100 cursor-pointer"
        >
          <span
            className={`inline-block w-2 h-2 rounded-full ${
              heroSet === "v3"
                ? "bg-sky-400"
                : heroSet === "v2"
                ? "bg-amber-400"
                : "bg-emerald-400"
            } animate-pulse`}
          />
          <span>
            HERO: {heroSet === "v3" ? "SET 3 (hero-3)" : heroSet === "v2" ? "SET 2 (hero-2)" : "SET 1 (normal)"}
          </span>
          <kbd className="text-[10px] text-white/60 bg-white/10 px-1.5 py-0.5 rounded">
            Shift+H
          </kbd>
        </button>
      )}
    </section>
  );
};

