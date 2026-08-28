import React, { useEffect, useState } from 'react';
import { COOKIE_CONSENT_KEY, CONSENT_CHANGE_EVENT, ConsentStatus } from '@/hooks/useMetaPixel';

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Avoid SSR / hydration mismatch by checking localStorage inside useEffect
    try {
      const savedConsent = localStorage.getItem(COOKIE_CONSENT_KEY) as ConsentStatus;
      if (!savedConsent) {
        setIsVisible(true);
      }
    } catch {
      setIsVisible(true);
    }

    const handleScroll = () => {
      // Switch style when scrolling past the top hero area (~100px)
      setIsScrolled(window.scrollY > 100);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleChoice = (choice: 'accepted' | 'declined') => {
    try {
      localStorage.setItem(COOKIE_CONSENT_KEY, choice);
    } catch {
      // Ignore write errors if localStorage is restricted
    }

    // Dispatch event to notify useMetaPixel immediately
    window.dispatchEvent(
      new CustomEvent<ConsentStatus>(CONSENT_CHANGE_EVENT, { detail: choice })
    );

    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <aside
      aria-label="Nastavení cookies"
      role="region"
      className="fixed bottom-6 left-6 z-50 w-[calc(100%-3rem)] max-w-sm transition-all duration-500 animate-in fade-in slide-in-from-bottom-4 pointer-events-auto"
    >
      <div
        className={`transition-all duration-500 rounded-2xl p-5 sm:p-6 flex flex-col gap-4 border ${
          isScrolled
            ? 'bg-background/85 backdrop-blur-xl border-foreground/10 text-foreground shadow-2xl'
            : 'bg-black/15 backdrop-blur-md border-white/20 text-white shadow-lg'
        }`}
      >
        <div>
          <span
            className={`text-[10px] uppercase tracking-[0.2em] font-bold block mb-1.5 transition-colors duration-500 ${
              isScrolled ? 'text-foreground' : 'text-white/90 drop-shadow-sm'
            }`}
          >
            Soukromí & Cookies
          </span>
          <p
            className={`text-xs leading-relaxed font-normal transition-colors duration-500 ${
              isScrolled ? 'text-foreground' : 'text-white drop-shadow-sm'
            }`}
          >
            Tento web používá cookies pro analytiku a marketing. Kliknutím &apos;Přijmout&apos; souhlasíte s jejich použitím.
          </p>
        </div>

        <div
          className={`flex items-center justify-between gap-3 pt-2 border-t transition-colors duration-500 ${
            isScrolled ? 'border-border/60' : 'border-white/20'
          }`}
        >
          <button
            type="button"
            onClick={() => handleChoice('declined')}
            className={`text-xs font-medium transition-colors underline-offset-4 hover:underline cursor-pointer py-1 px-1 ${
              isScrolled
                ? 'text-foreground/75 hover:text-foreground'
                : 'text-white/85 hover:text-white drop-shadow-sm'
            }`}
          >
            Odmítnout
          </button>

          <button
            type="button"
            onClick={() => handleChoice('accepted')}
            className={`px-5 py-2 text-xs font-semibold tracking-wide rounded-full transition-all cursor-pointer shadow-sm ${
              isScrolled
                ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                : 'bg-black/60 hover:bg-black text-white border border-white/30 backdrop-blur-sm hover:border-white/60'
            }`}
          >
            Přijmout
          </button>
        </div>
      </div>
    </aside>
  );
}

export default CookieBanner;
