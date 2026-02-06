import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Validates that a URL uses a safe protocol (http/https only).
 * Prevents javascript:, data:, and other dangerous URI schemes.
 */
export function isSafeUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return ["https:", "http:"].includes(parsed.protocol);
  } catch {
    return false;
  }
}

/** Allowed hostnames for Contentful CDN image assets. */
const CONTENTFUL_CDN_HOSTS = ["images.ctfassets.net", "downloads.ctfassets.net"];

/**
 * Validates that an image URL originates from the Contentful CDN.
 * Returns the URL unchanged if valid, or an empty string if not.
 */
export function sanitizeCdnImageUrl(url: string): string {
  try {
    const parsed = new URL(url);
    if (
      ["https:", "http:"].includes(parsed.protocol) &&
      CONTENTFUL_CDN_HOSTS.some((host) => parsed.hostname === host)
    ) {
      return url;
    }
    return "";
  } catch {
    return "";
  }
}
