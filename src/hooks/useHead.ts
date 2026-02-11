import { useEffect } from "react";

interface HeadTag {
  tag: "title" | "meta" | "link";
  attributes?: Record<string, string>;
  textContent?: string;
}

/**
 * Lightweight <head> manager for Vite SPA.
 * Sets title, meta, and link tags on mount; cleans them up on unmount.
 * Works with prerenderers that execute JS before snapshotting.
 */
export function useHead(tags: HeadTag[]) {
  useEffect(() => {
    const elements: Element[] = [];

    for (const { tag, attributes, textContent } of tags) {
      if (tag === "title") {
        document.title = textContent ?? "";
        continue;
      }

      const el = document.createElement(tag);

      if (attributes) {
        for (const [key, value] of Object.entries(attributes)) {
          el.setAttribute(key, value);
        }
      }

      if (textContent) {
        el.textContent = textContent;
      }

      // Mark as managed so we can identify them
      el.setAttribute("data-head", "true");

      document.head.appendChild(el);
      elements.push(el);
    }

    return () => {
      for (const el of elements) {
        el.remove();
      }
    };
  }, [JSON.stringify(tags)]);
}
