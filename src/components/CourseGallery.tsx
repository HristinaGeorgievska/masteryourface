import { useState, useEffect, useCallback, useRef } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Skeleton } from "@/components/ui/skeleton";
import { useCoursePhotos } from "@/hooks/useCoursePhotos";

interface CourseGalleryProps {
  title?: string;
  className?: string;
}

export const CourseGallery = ({
  title = "Z kurzů",
  className = "bg-background-secondary",
}: CourseGalleryProps) => {
  const { data: items, isLoading } = useCoursePhotos();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Touch swipe support for mobile
  const touchStartX = useRef<number | null>(null);

  const photos = items || [];

  const maxVisible = 4;
  const hasMore = photos.length > maxVisible;
  const visiblePhotos = photos.slice(0, maxVisible);
  const remainingCount = photos.length - maxVisible;

  const handlePrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev - 1 + photos.length) % photos.length : null
    );
  }, [photos.length]);

  const handleNext = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % photos.length : null
    );
  }, [photos.length]);

  // Keyboard navigation
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxIndex(null);
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxIndex, handlePrev, handleNext]);

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    touchStartX.current = null;
  };

  const activePhoto = lightboxIndex !== null ? photos[lightboxIndex] : null;

  return (
    <section className={`section-padding ${className}`}>
      <ScrollReveal>
        <div className="container-custom">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{title}</h2>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-7xl mx-auto">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="aspect-[9/16] rounded-2xl overflow-hidden">
                  <Skeleton className="w-full h-full" />
                </div>
              ))}
            </div>
          ) : photos.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed">
                Fotografie z proběhlých kurzů pro vás právě připravujeme. Již brzy zde nahlédnete do atmosféry našich workshopů.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-7xl mx-auto">
              {visiblePhotos.map((photo, index) => {
                const isLastWithMore = index === maxVisible - 1 && hasMore;

                return (
                  <div
                    key={photo.id}
                    onClick={() => setLightboxIndex(index)}
                    className="group relative aspect-[9/16] overflow-hidden rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer bg-muted"
                  >
                    <img
                      src={photo.url}
                      alt={`Fotografie z kurzu ${index + 1}`}
                      className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${
                        isLastWithMore ? "grayscale-[30%]" : ""
                      }`}
                      loading="lazy"
                    />

                    {/* Regular hover overlay */}
                    {!isLastWithMore && (
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300" />
                    )}

                    {/* 4th item "+X" overlay when more than 4 photos exist */}
                    {isLastWithMore && (
                      <div className="absolute inset-0 bg-black/55 backdrop-blur-[2px] flex flex-col items-center justify-center text-center p-4 transition-all duration-300 group-hover:bg-black/65">
                        <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight drop-shadow-md">
                          +{remainingCount}
                        </span>
                        <span className="text-xs sm:text-sm text-white/90 font-medium uppercase tracking-wider mt-2">
                          Zobrazit vše
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </ScrollReveal>

      {/* Lightbox Gallery Modal */}
      {activePhoto && lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md transition-opacity duration-200"
          onClick={() => setLightboxIndex(null)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={() => setLightboxIndex(null)}
            className="fixed top-6 right-6 z-50 p-3 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-all cursor-pointer backdrop-blur-sm"
            aria-label="Zavřít galerii"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Previous button */}
          {photos.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="fixed left-4 md:left-8 top-1/2 -translate-y-1/2 z-50 p-3 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-all cursor-pointer backdrop-blur-sm"
              aria-label="Předchozí fotografie"
            >
              <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
            </button>
          )}

          {/* Next button */}
          {photos.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 p-3 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-all cursor-pointer backdrop-blur-sm"
              aria-label="Další fotografie"
            >
              <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
            </button>
          )}

          {/* Image container */}
          <div
            className="relative max-w-sm sm:max-w-md w-full max-h-[88vh] flex flex-col items-center select-none"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Counter */}
            {photos.length > 1 && (
              <div className="text-white/70 text-xs sm:text-sm font-medium mb-3 tracking-widest uppercase">
                {lightboxIndex + 1} / {photos.length}
              </div>
            )}

            <div className="relative aspect-[9/16] w-full overflow-hidden rounded-2xl shadow-2xl bg-black border border-white/10">
              <img
                key={activePhoto.id}
                src={activePhoto.url}
                alt={`Fotografie z kurzu ${lightboxIndex + 1}`}
                className="w-full h-full object-cover animate-in fade-in-50 duration-300"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
