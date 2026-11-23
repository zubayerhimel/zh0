/// <reference types="vite/client" />

declare module "virtual:site-stats" {
  const stats: import("@/lib/site-stats").SiteStats;
  export default stats;
}
