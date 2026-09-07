import { useState, useEffect, useCallback, useMemo } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useReviews, type ReviewItem } from "@/hooks/useReviews";

interface TestimonialsProps {
  className?: string;
}

const MAX_QUOTE_LENGTH = 145;

const placeholderReviews: ReviewItem[] = [
  {
    id: "placeholder-1",
    review: "Text recenze...",
    name: "Jméno",
    absolvedCourse: "Absolvovaný kurz",
  },
];

function getTruncatedText(text: string, maxLen: number) {
  if (text.length <= maxLen) return { text, isTruncated: false };
  const slice = text.slice(0, maxLen);
  const lastSpace = slice.lastIndexOf(" ");
  let cleaned = lastSpace > 0 ? slice.slice(0, lastSpace) : slice;
  cleaned = cleaned.replace(/[.,;:\s–-]+$/, "");
  return {
    text: cleaned,
    isTruncated: true,
  };
}

export const Testimonials = ({
  className = "bg-background-secondary",
}: TestimonialsProps) => {
  const { data: remoteReviews } = useReviews();

  const reviews = useMemo(() => {
    if (remoteReviews && remoteReviews.length > 0) {
      return remoteReviews;
    }
    return placeholderReviews;
  }, [remoteReviews]);

  const [api, setApi] = useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [isPaused, setIsPaused] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const onSelect = useCallback((emblaApi: CarouselApi) => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setIsExpanded(false);
  }, []);

  useEffect(() => {
    if (!api) return;

    setScrollSnaps(api.scrollSnapList());
    onSelect(api);

    api.on("select", () => onSelect(api));
    api.on("reInit", () => {
      setScrollSnaps(api.scrollSnapList());
      onSelect(api);
    });
  }, [api, onSelect]);

  // Subtle auto-advance, paused on hover or when quote is expanded
  useEffect(() => {
    if (!api || isPaused || isExpanded || reviews.length <= 1) return;

    const timer = setInterval(() => {
      api.scrollNext();
    }, 15000);

    return () => clearInterval(timer);
  }, [api, isPaused, isExpanded, reviews.length]);

  return (
    <section
      id="recenze"
      className={`py-12 md:py-16 ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container-custom">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-bold">Recenze</h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <Carousel
            opts={{
              align: "center",
              loop: reviews.length > 1,
            }}
            setApi={setApi}
            className="w-full select-none"
          >
            <CarouselContent>
              {reviews.map((item) => {
                const { text: truncated, isTruncated } = getTruncatedText(
                  item.review,
                  MAX_QUOTE_LENGTH,
                );

                return (
                  <CarouselItem key={item.id} className="basis-full">
                    <div className="text-center px-4 sm:px-8 flex flex-col items-center">
                      {/* Editorial quote container — fixed height keeps author name in identical spot */}
                      <div
                        className={`w-full max-w-2xl mx-auto flex items-start justify-center pt-2 md:pt-3 transition-all duration-300 ${
                          isExpanded
                            ? "min-h-[7.5rem] sm:min-h-[7rem] md:min-h-[7.5rem] h-auto"
                            : "h-[7.5rem] sm:h-[7rem] md:h-[7.5rem]"
                        }`}
                      >
                        <blockquote className="font-serif text-lg sm:text-xl md:text-2xl font-normal leading-relaxed text-foreground tracking-tight">
                          {isExpanded || !isTruncated ? (
                            <>
                              „{item.review}“
                              {isTruncated && (
                                <button
                                  type="button"
                                  onClick={() => setIsExpanded(false)}
                                  className="inline-block text-[11px] uppercase tracking-wider text-muted-foreground hover:text-foreground ml-2 font-sans underline underline-offset-4 cursor-pointer transition-colors"
                                  title="Zavřít"
                                >
                                  méně
                                </button>
                              )}
                            </>
                          ) : (
                            <>
                              „{truncated}
                              <button
                                type="button"
                                onClick={() => setIsExpanded(true)}
                                className="inline-flex items-center text-muted-foreground hover:text-foreground font-serif tracking-widest px-1 transition-colors cursor-pointer hover:underline underline-offset-4"
                                title="Zobrazit celé hodnocení"
                              >
                                ...
                              </button>
                              “
                            </>
                          )}
                        </blockquote>
                      </div>

                      {/* Minimalist hairline accent — further from review quote */}
                      <div className="w-8 h-px bg-border/80 mx-auto mt-6 md:mt-8 mb-4" />

                      {/* Author attribution with absolved course */}
                      <div className="flex items-center justify-center gap-2 flex-wrap text-center">
                        <cite className="not-italic font-sans text-xs sm:text-sm font-semibold tracking-wider uppercase text-foreground">
                          {item.name}
                        </cite>
                        {item.absolvedCourse && (
                          <>
                            <span
                              className="text-muted-foreground/50 text-xs select-none"
                              aria-hidden="true"
                            >
                              •
                            </span>
                            <span className="text-[11px] sm:text-xs uppercase tracking-[0.2em] text-muted-foreground font-light">
                              {item.absolvedCourse}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>

            {/* Editorial minimal navigation — only when multiple reviews */}
            {reviews.length > 1 && (
              <div className="flex items-center justify-center gap-6 mt-6 md:mt-8">
                <button
                  onClick={() => api?.scrollPrev()}
                  className="p-1.5 text-muted-foreground/60 hover:text-foreground transition-colors duration-300 focus-visible:outline-none group cursor-pointer"
                  aria-label="Předchozí recenze"
                >
                  <ArrowLeft className="w-4 h-4 stroke-[1.25] transition-transform duration-300 group-hover:-translate-x-0.5" />
                </button>

                <div className="flex items-center gap-2">
                  {scrollSnaps.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => api?.scrollTo(index)}
                      className={`h-[1.5px] transition-all duration-500 focus-visible:outline-none cursor-pointer ${
                        index === selectedIndex
                          ? "w-6 bg-foreground"
                          : "w-2.5 bg-foreground/20 hover:bg-foreground/40"
                      }`}
                      aria-label={`Přejít na recenzi ${index + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => api?.scrollNext()}
                  className="p-1.5 text-muted-foreground/60 hover:text-foreground transition-colors duration-300 focus-visible:outline-none group cursor-pointer"
                  aria-label="Další recenze"
                >
                  <ArrowRight className="w-4 h-4 stroke-[1.25] transition-transform duration-300 group-hover:translate-x-0.5" />
                </button>
              </div>
            )}
          </Carousel>
        </div>
      </div>
    </section>
  );
};
