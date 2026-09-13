import { useState, useEffect, useCallback, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface NavItem {
  label: string;
  href: string;
  id: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "O Hristině", href: "/#o-hristine", id: "o-hristine" },
  { label: "Služby", href: "/#services", id: "services" },
  { label: "Recenze", href: "/#recenze", id: "recenze" },
  { label: "Portfolio", href: "/#portfolio", id: "portfolio" },
  { label: "FAQ", href: "/#faq", id: "faq" },
  { label: "Kontakt", href: "/#kontakt", id: "kontakt" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const location = useLocation();
  const isHome = location.pathname === "/";

  const navRef = useRef<HTMLElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const isScrollingToTop = useRef(false);
  const [indicator, setIndicator] = useState<{ left: number; width: number; opacity: number }>({
    left: 0,
    width: 0,
    opacity: 0,
  });

  // Track active link geometry to smoothly slide the underline
  useEffect(() => {
    const updateIndicator = () => {
      if (!isHome || !activeSection) {
        setIndicator((prev) => ({ ...prev, opacity: 0 }));
        return;
      }

      const activeEl = linkRefs.current[activeSection];
      if (activeEl && navRef.current) {
        const navRect = navRef.current.getBoundingClientRect();
        const linkRect = activeEl.getBoundingClientRect();
        setIndicator({
          left: linkRect.left - navRect.left,
          width: linkRect.width,
          opacity: 1,
        });
      } else {
        setIndicator((prev) => ({ ...prev, opacity: 0 }));
      }
    };

    updateIndicator();
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [activeSection, isHome]);

  // Listen for clear-anchor event (e.g. from BackToTop button)
  useEffect(() => {
    const handleClearAnchor = () => {
      isScrollingToTop.current = true;
      setActiveSection("");
    };

    const cancelScrollToTop = () => {
      isScrollingToTop.current = false;
    };

    window.addEventListener("clear-anchor", handleClearAnchor);
    window.addEventListener("wheel", cancelScrollToTop, { passive: true });
    window.addEventListener("touchmove", cancelScrollToTop, { passive: true });

    return () => {
      window.removeEventListener("clear-anchor", handleClearAnchor);
      window.removeEventListener("wheel", cancelScrollToTop);
      window.removeEventListener("touchmove", cancelScrollToTop);
    };
  }, []);

  // Handle scroll detection for navbar appearance
  // Handle scroll detection & ScrollSpy for active section highlighting
  useEffect(() => {
    let ticking = false;

    const updateScrollState = () => {
      const scrollPos = window.scrollY;
      setIsScrolled(scrollPos > 40);

      if (!isHome) {
        setActiveSection("");
        ticking = false;
        return;
      }

      if (isScrollingToTop.current) {
        if (scrollPos <= 60) {
          isScrollingToTop.current = false;
        }
        setActiveSection("");
        ticking = false;
        return;
      }

      // Clear active section (underline) only after the "MASTER YOUR FACE" header in Hero appears on the screen
      const heroHeader = document.getElementById("hero-header");
      let isHeroHeaderVisible = false;

      if (heroHeader) {
        const heroHeaderRect = heroHeader.getBoundingClientRect();
        // Visible on screen: enters viewport from top (bottom > 80) and top < window.innerHeight
        isHeroHeaderVisible =
          heroHeaderRect.bottom > 80 && heroHeaderRect.top < window.innerHeight;
      } else {
        isHeroHeaderVisible = scrollPos < 100;
      }

      if (isHeroHeaderVisible) {
        setActiveSection("");
        ticking = false;
        return;
      }

      // If user has scrolled near the bottom of the page, activate the last nav item ("kontakt")
      const isNearBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 120;

      if (isNearBottom) {
        setActiveSection("kontakt");
        ticking = false;
        return;
      }

      // Find the active section by checking which section top has passed the trigger line
      // Use dynamic trigger line (35% of viewport height, minimum 160px)
      const triggerY = Math.max(160, window.innerHeight * 0.35);
      let currentActive = "";

      for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
        const item = NAV_ITEMS[i];
        const element = document.getElementById(item.id);
        if (!element) continue;
        const rect = element.getBoundingClientRect();
        if (rect.top <= triggerY) {
          currentActive = item.id;
          break;
        }
      }

      // If none of the lower sections match but the hero header is not visible yet,
      // keep "o-hristine" active until the hero header actually appears on screen
      if (!currentActive) {
        currentActive = "o-hristine";
      }

      setActiveSection(currentActive);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollState);
        ticking = true;
      }
    };

    updateScrollState();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [isHome]);

  // Lock body scroll when mobile menu is open (with scrollbar compensation to prevent layout shift)
  useEffect(() => {
    if (mobileMenuOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [mobileMenuOpen]);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  // Handle anchor clicks smoothly
  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string, id: string) => {
      setMobileMenuOpen(false);
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      if (isHome) {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
          setActiveSection(id);
          // Small delay to ensure body overflow is unlocked and drawer closes cleanly
          setTimeout(() => {
            element.scrollIntoView({ behavior: "smooth" });
            window.history.pushState(null, "", `#${id}`);
          }, 60);
        }
      }
    },
    [isHome],
  );

  const handleLogoClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      setMobileMenuOpen(false);
      setActiveSection("");
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      if (isHome) {
        e.preventDefault();
        isScrollingToTop.current = true;
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
          window.history.pushState(null, "", "/");
        }, 60);
      }
    },
    [isHome],
  );

  // Check if currently on the Hero section (homepage before scrolling)
  const isHero = isHome && !isScrolled;
  const isTransparent = isHero;

  return (
    <>
      {/* Base Navigation Header */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-colors duration-300",
          isScrolled
            ? "bg-background/95 backdrop-blur-md shadow-xs border-b border-border/40 py-3.5 md:py-4"
            : "bg-transparent py-5 md:py-6",
        )}
      >
        <div className="container-custom flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            to="/"
            onClick={handleLogoClick}
            className="group flex flex-col transition-opacity hover:opacity-90"
          >
            <span
              className={cn(
                "font-serif text-lg md:text-xl font-bold tracking-[0.22em] uppercase transition-colors",
                isTransparent ? "text-primary-foreground" : "text-foreground",
              )}
            >
              MASTER YOUR FACE
            </span>
            <span
              className={cn(
                "text-[10px] md:text-[11px] tracking-[0.26em] uppercase font-light -mt-1 transition-colors",
                isTransparent
                  ? "text-primary-foreground/75"
                  : "text-muted-foreground",
              )}
            >
              by Hristina Georgievska
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            ref={navRef}
            aria-label="Hlavní navigace"
            className="relative hidden lg:flex items-center gap-7 xl:gap-9 py-1"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = isHome && activeSection === item.id;
              return (
                <a
                  key={item.id}
                  ref={(el) => {
                    linkRefs.current[item.id] = el;
                  }}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href, item.id)}
                  className={cn(
                    "relative text-xs tracking-[0.14em] uppercase font-medium transition-colors duration-300 py-1",
                    isTransparent
                      ? isActive
                        ? "text-primary-foreground font-semibold"
                        : "text-primary-foreground/75 hover:text-primary-foreground"
                      : isActive
                        ? "text-foreground font-semibold"
                        : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {item.label}
                </a>
              );
            })}

            {/* Smooth subtle gliding indicator */}
            <span
              aria-hidden="true"
              className={cn(
                "absolute bottom-0 h-[1.5px] rounded-full pointer-events-none transition-all duration-300 ease-out",
                isTransparent ? "bg-primary-foreground" : "bg-foreground",
              )}
              style={{
                left: `${indicator.left}px`,
                width: `${indicator.width}px`,
                opacity: indicator.opacity,
              }}
            />
          </nav>

          {/* Right CTA Button & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Button
              asChild
              variant="outline"
              size="sm"
              className={cn(
                "hidden sm:inline-flex text-xs uppercase tracking-wider font-semibold transition-all duration-300 rounded-full px-5 py-2",
                isTransparent
                  ? "border-primary-foreground text-primary-foreground bg-transparent hover:bg-primary-foreground hover:text-primary"
                  : "border-foreground text-foreground bg-transparent hover:bg-foreground hover:text-background",
              )}
            >
              <Link to="/individual#dates">
                <span>Vybrat termín</span>
                <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
              </Link>
            </Button>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Otevřít menu"
              className={cn(
                "p-2 rounded-md transition-colors lg:hidden cursor-pointer",
                isTransparent
                  ? "text-primary-foreground hover:bg-white/10"
                  : "text-foreground hover:bg-muted",
              )}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Menu Overlay - ONE SINGLE UNIFIED BLOCK */}
      <div
        aria-hidden={!mobileMenuOpen}
        className={cn(
          "fixed inset-0 z-50 flex flex-col justify-between overflow-y-auto lg:hidden transition-opacity duration-300 ease-out",
          isHero ? "bg-black text-white" : "bg-background text-foreground",
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        )}
      >
        {/* Top bar inside the overlay (matches header position exactly) */}
        <div
          className={cn(
            "container-custom w-full flex items-center justify-between",
            isScrolled ? "py-3.5 md:py-4" : "py-5 md:py-6",
          )}
        >
          <Link
            to="/"
            onClick={handleLogoClick}
            className="group flex flex-col transition-opacity hover:opacity-90"
          >
            <span
              className={cn(
                "font-serif text-lg md:text-xl font-bold tracking-[0.22em] uppercase",
                isHero ? "text-white" : "text-foreground",
              )}
            >
              MASTER YOUR FACE
            </span>
            <span
              className={cn(
                "text-[10px] md:text-[11px] tracking-[0.26em] uppercase font-light -mt-1",
                isHero ? "text-white/75" : "text-muted-foreground",
              )}
            >
              by Hristina Georgievska
            </span>
          </Link>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Zavřít menu"
            className={cn(
              "p-2 rounded-md transition-colors cursor-pointer",
              isHero
                ? "text-white hover:bg-white/10"
                : "text-foreground hover:bg-muted",
            )}
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Centered Navigation Links & CTA */}
        <div className="flex flex-col items-center justify-center my-auto w-full max-w-sm mx-auto px-6 py-6 space-y-6 sm:space-y-7">
          {NAV_ITEMS.map((item) => {
            const isActive = isHome && activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href, item.id)}
                className={cn(
                  "font-serif text-2xl sm:text-3xl tracking-tight transition-all duration-200 text-center",
                  isHero
                    ? isActive
                      ? "text-white font-semibold"
                      : "text-white/80 hover:text-white"
                    : isActive
                      ? "text-foreground font-semibold"
                      : "text-foreground/80 hover:text-foreground",
                )}
              >
                {item.label}
              </a>
            );
          })}

          <div className="pt-4 sm:pt-6 w-full flex justify-center">
            <Button
              asChild
              size="lg"
              className={cn(
                "rounded-full px-8 py-3 text-sm font-medium tracking-wider uppercase transition-all duration-300 shadow-md",
                isHero
                  ? "bg-white text-black hover:bg-neutral-200"
                  : "bg-foreground text-background hover:bg-foreground/90",
              )}
            >
              <Link
                to="/individual#dates"
                onClick={() => {
                  setMobileMenuOpen(false);
                  document.body.style.overflow = "";
                  document.body.style.paddingRight = "";
                }}
              >
                <span>Vybrat termín</span>
              </Link>
            </Button>
          </div>
        </div>

        {/* Footer Branding */}
        <div
          className={cn(
            "text-center text-[10px] tracking-[0.25em] uppercase font-light pb-6 transition-colors",
            isHero ? "text-white/30" : "text-muted-foreground",
          )}
        >
          <p>MASTER YOUR FACE by Hristina Georgievska</p>
        </div>
      </div>
    </>
  );
};

export default Navbar;
