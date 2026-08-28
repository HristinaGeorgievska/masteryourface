import { useEffect, useState } from 'react';

export const FB_PIXEL_ID = '1604634170645705';
export const COOKIE_CONSENT_KEY = 'cookieConsent';
export const CONSENT_CHANGE_EVENT = 'cookieConsentChange';

export type ConsentStatus = 'accepted' | 'declined' | null;

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: (...args: unknown[]) => void;
  }
}

export function useMetaPixel(pixelId: string = FB_PIXEL_ID) {
  const [consent, setConsent] = useState<ConsentStatus>(null);

  useEffect(() => {
    // 1. Initial check after client hydration
    try {
      const savedConsent = localStorage.getItem(COOKIE_CONSENT_KEY) as ConsentStatus;
      if (savedConsent) {
        setConsent(savedConsent);
      }
    } catch {
      // localStorage may fail in restricted/sandboxed environments
    }

    // 2. Listen for consent updates triggered by CookieBanner
    const handleConsentChange = (event: Event) => {
      const customEvent = event as CustomEvent<ConsentStatus>;
      setConsent(customEvent.detail);
    };

    window.addEventListener(CONSENT_CHANGE_EVENT, handleConsentChange);
    return () => {
      window.removeEventListener(CONSENT_CHANGE_EVENT, handleConsentChange);
    };
  }, []);

  useEffect(() => {
    // Strictly prevent loading if not explicitly accepted
    if (consent !== 'accepted') return;
    if (typeof window === 'undefined') return;

    // Prevent duplicate injection
    if (window.fbq) return;

    // Standard Meta Pixel snippet
    /* eslint-disable */
    (function (f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = true;
      n.version = '2.0';
      n.queue = [];
      t = b.createElement(e);
      t.async = true;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode?.insertBefore(t, s);
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    /* eslint-enable */

    if (window.fbq) {
      window.fbq('init', pixelId);
      window.fbq('track', 'PageView');
    }
  }, [consent, pixelId]);

  return { consent };
}
