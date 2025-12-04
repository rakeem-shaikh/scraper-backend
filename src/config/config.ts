export const CONFIG = {
  PORT: process.env.PORT || 3000,
  SCRAPE_TIMEOUT: 20000, // 20 sec timeout for scraping
  EXPIRY_MS: 1000 * 60 * 20, // 20 min expiry
};
