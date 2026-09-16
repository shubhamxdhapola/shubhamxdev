// Tech logo mapper to resolve any technology name to its corresponding logo SVG directly from Simple Icons CDN
export const techLogoMap = {
  // Frontend
  html: "https://cdn.simpleicons.org/html5",
  html5: "https://cdn.simpleicons.org/html5",
  css: "https://cdn.simpleicons.org/css",
  css3: "https://cdn.simpleicons.org/css",
  javascript: "https://cdn.simpleicons.org/javascript",
  js: "https://cdn.simpleicons.org/javascript",
  typescript: "https://cdn.simpleicons.org/typescript",
  ts: "https://cdn.simpleicons.org/typescript",
  react: "https://cdn.simpleicons.org/react",
  reactjs: "https://cdn.simpleicons.org/react",
  "react.js": "https://cdn.simpleicons.org/react",
  next: "https://cdn.simpleicons.org/nextdotjs/white",
  nextjs: "https://cdn.simpleicons.org/nextdotjs/white",
  "next.js": "https://cdn.simpleicons.org/nextdotjs/white",
  tailwind: "https://cdn.simpleicons.org/tailwindcss",
  tailwindcss: "https://cdn.simpleicons.org/tailwindcss",
  "tailwind css": "https://cdn.simpleicons.org/tailwindcss",
  bootstrap: "https://cdn.simpleicons.org/bootstrap",
  redux: "https://cdn.simpleicons.org/redux",
  "redux toolkit": "https://cdn.simpleicons.org/redux",
  rtk: "https://cdn.simpleicons.org/redux",
  zustand: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/zustand/zustand-original.svg",
  vite: "https://cdn.simpleicons.org/vite",

  // Backend & Databases
  node: "https://cdn.simpleicons.org/nodedotjs",
  nodejs: "https://cdn.simpleicons.org/nodedotjs",
  "node.js": "https://cdn.simpleicons.org/nodedotjs",
  express: "https://cdn.simpleicons.org/express/white",
  expressjs: "https://cdn.simpleicons.org/express/white",
  "express.js": "https://cdn.simpleicons.org/express/white",
  mongodb: "https://cdn.simpleicons.org/mongodb",
  mongo: "https://cdn.simpleicons.org/mongodb",
  mysql: "https://cdn.simpleicons.org/mysql",
  firebase: "https://cdn.simpleicons.org/firebase",
  postgresql: "https://cdn.simpleicons.org/postgresql/4169E1",
  postgres: "https://cdn.simpleicons.org/postgresql/4169E1",
  prisma: "https://cdn.simpleicons.org/prisma/white",
  supabase: "https://cdn.simpleicons.org/supabase",
  "socket.io": "https://cdn.simpleicons.org/socketdotio/white",
  socketio: "https://cdn.simpleicons.org/socketdotio/white",
  cloudinary: "https://cdn.simpleicons.org/cloudinary",
  "aws s3": "https://api.iconify.design/simple-icons:amazonwebservices.svg?color=white",
  aws: "https://api.iconify.design/simple-icons:amazonwebservices.svg?color=white",

  // Programming Languages
  c: "https://cdn.simpleicons.org/c",
  cpp: "https://cdn.simpleicons.org/cplusplus",
  "c++": "https://cdn.simpleicons.org/cplusplus",
  java: "https://cdn.simpleicons.org/openjdk/ED8B00",
  python: "https://cdn.simpleicons.org/python",
  python3: "https://cdn.simpleicons.org/python",

  // Tools & Platforms
  git: "https://cdn.simpleicons.org/git",
  github: "https://cdn.simpleicons.org/github/white",
  postman: "https://cdn.simpleicons.org/postman",
  vscode: "https://api.iconify.design/simple-icons:visualstudiocode.svg?color=%23007ACC",
  "vs code": "https://api.iconify.design/simple-icons:visualstudiocode.svg?color=%23007ACC",
  "visual studio code": "https://api.iconify.design/simple-icons:visualstudiocode.svg?color=%23007ACC",
  leetcode: "https://cdn.simpleicons.org/leetcode",
  canva: "https://api.iconify.design/simple-icons:canva.svg?color=%2300C4CC",
  vercel: "https://cdn.simpleicons.org/vercel/white",
  pnpm: "https://cdn.simpleicons.org/pnpm",
  "framer motion": "https://cdn.simpleicons.org/framer",
  framer: "https://cdn.simpleicons.org/framer",
  shadcn: "https://cdn.simpleicons.org/shadcnui/white",
  "shadcn ui": "https://cdn.simpleicons.org/shadcnui/white",
  zod: "https://cdn.simpleicons.org/zod/3E67B1",
  gemini: "https://cdn.simpleicons.org/googlegemini",
  "google gemini": "https://cdn.simpleicons.org/googlegemini",
  daisyui: "https://cdn.simpleicons.org/daisyui",
  razorpay: "https://cdn.simpleicons.org/razorpay",
};

/**
 * Returns the logo URL for a given tech name, or null if none found.
 * @param {string} techName
 * @returns {string|null}
 */
export function getTechLogo(techName) {
  if (!techName || typeof techName !== "string") return null;
  const key = techName.toLowerCase().trim();
  return techLogoMap[key] || null;
}
