export interface Project {
  title: string;
  /** What it is, in a few words, e.g. "Web app". */
  kind: string;
  description: string;
  stack: string[];
  /** Live site. Omitted while a project isn't deployed. */
  url?: string;
  /** Public source code. Omitted for private repositories. */
  source?: string;
  status?: string;
}

// Newest first.
export const projects: Project[] = [
  {
    title: "Fling",
    kind: "Web app",
    description:
      "Send files or a short secret between any two devices without an account. Share a code, link or QR code; files travel directly between browsers, end-to-end encrypted, and nothing is stored on a server.",
    stack: ["React", "TypeScript", "Vite", "WebRTC", "Web Crypto", "Node.js", "WebSocket", "Tailwind CSS"],
    url: "https://fling.zh0.dev",
  },
  {
    title: "Mailframe",
    kind: "Web app",
    description:
      "A visual email editor that compiles designs to responsive, Outlook-safe HTML, with dark-mode preview, accessibility warnings and AI-drafted templates.",
    stack: ["TanStack Start", "React", "TypeScript", "Convex", "Clerk", "OpenRouter", "Tailwind CSS"],
    url: "https://mailframe.zh0.dev",
  },
  {
    title: "Nudge",
    kind: "Android, iOS and web app",
    description:
      "Timers, reminders and alarms that ring on time, even when the app is closed and the phone is locked. Type or say “remind me to call mom tomorrow at 6pm” and it's scheduled. Local-first and works offline.",
    stack: ["React Native", "Expo", "TypeScript", "SQLite", "Kotlin"],
    url: "https://nudge.zh0.dev",
  },
  {
    title: "Auto Bookmark",
    kind: "Web app and browser extension",
    description:
      "Save any page, post on X or YouTube video in one click. AI summarizes it and files it under a category, and you find it again by describing what you remember.",
    stack: ["Next.js", "TypeScript", "Supabase", "pgvector", "Drizzle", "Clerk", "Vercel AI SDK", "Chrome extension"],
    url: "https://auto-bookmark.zh0.dev",
    source: "https://github.com/zubayerhimel/auto-bookmark",
  },
  {
    title: "Bookify",
    kind: "Web app",
    description:
      "A calm PDF reader. Highlight passages, collect quotes, leave notes and resume exactly where you left off, with everything kept privately on your device.",
    stack: ["React", "TypeScript", "Vite", "PDF.js", "IndexedDB", "Tailwind CSS"],
    url: "https://bookify.zh0.dev",
    source: "https://github.com/zubayerhimel/bookify-pied",
  },
  {
    title: "Lettercn",
    kind: "Web app",
    description:
      "A studio for handwritten-style letters. Choose a handwriting font, including Bangla, then paper, ink and ruling, and write on true A4, US Letter, postcard or journal pages. Export a sharp PNG or a print-ready multi-page PDF, with a matching envelope.",
    stack: ["TanStack Start", "React", "TypeScript", "Zustand", "html-to-image", "jsPDF", "Tailwind CSS"],
    url: "https://lettercn.zh0.dev",
    source: "https://github.com/zubayerhimel/lettercn",
  },
  {
    title: "Memory Booth",
    kind: "Web app",
    description:
      "A photo booth in the browser. Shoot a photo strip or collage with your camera, add filters, stickers and text, or record a short clip, then download or share it.",
    stack: ["React", "TypeScript", "Vite", "Canvas API", "MediaRecorder", "Tailwind CSS"],
    url: "https://memorybooth.zh0.dev",
  },
  {
    title: "Neodesk",
    kind: "Client project",
    description: "A collaborative digital asset management platform for photographers and videographers.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "AWS S3", "Cloudinary"],
    url: "https://stage.neodesk.io",
  },
];
