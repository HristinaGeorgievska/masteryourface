import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { componentTagger } from "lovable-tagger";
import Sitemap from "vite-plugin-sitemap";
import prerender from "@prerenderer/rollup-plugin";
import puppeteerRenderer from "@prerenderer/renderer-puppeteer";
import { imagetools } from "vite-imagetools";

const ROUTES_TO_PRERENDER = [
  '/',
  '/individual',
  '/business',
  '/portrait'
];

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "localhost",
    port: 8080,
  },
  plugins: [
    tailwindcss(),
    react(),
    imagetools(),
    Sitemap({
      hostname: 'https://masteryourface.cz',
      dynamicRoutes: ROUTES_TO_PRERENDER
    }),
    mode === "development" && componentTagger(),
    mode === "production" && !process.env.VERCEL && prerender({
      routes: ROUTES_TO_PRERENDER,
      renderer: puppeteerRenderer,
      rendererOptions: {
        renderAfterDocumentEvent: 'prerender-ready',
        timeout: 30000,
      },
      postProcess(renderedRoute) {
        // Ensure proper doctype and clean HTML
        renderedRoute.html = renderedRoute.html
          .replace(/<!--.*?-->/gs, '') // Remove HTML comments
          .replace(/<script[^>]*data-prerender[^>]*>.*?<\/script>/gs, ''); // Remove prerender scripts
        return renderedRoute;
      }
    })
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
