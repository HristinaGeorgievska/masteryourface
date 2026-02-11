// Contentful client has been moved to server-side API routes (see api/ directory).
// This prevents API tokens from being exposed in the client-side JavaScript bundle.
//
// Server-side env vars (set in Vercel dashboard, NOT prefixed with VITE_):
//   CONTENTFUL_SPACE_ID
//   CONTENTFUL_ACCESS_TOKEN
//
// API endpoints:
//   GET /api/courses   — returns formatted course data
//   GET /api/showcase  — returns showcase gallery items
