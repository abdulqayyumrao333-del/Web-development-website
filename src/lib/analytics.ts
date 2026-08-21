export type ReferrerCategory = "direct" | "search" | "social" | "referral" | "other";
export type DeviceCategory = "desktop" | "mobile" | "tablet" | "unknown";

const SEARCH_ENGINES = ["google.", "bing.", "duckduckgo.", "yahoo.", "baidu.", "yandex."];
const SOCIAL_PLATFORMS = [
  "facebook.",
  "twitter.",
  "x.com",
  "t.co",
  "linkedin.",
  "instagram.",
  "reddit.",
  "pinterest.",
  "tiktok.",
];

/** Categorizes a referrer URL into a coarse bucket — never stores the raw
 * URL itself, which could contain search terms or other sensitive data. */
export function categorizeReferrer(referrerUrl: string | null, siteHostname: string): ReferrerCategory {
  if (!referrerUrl) return "direct";

  let hostname: string;
  try {
    hostname = new URL(referrerUrl).hostname.toLowerCase();
  } catch {
    return "other";
  }

  if (hostname === siteHostname || hostname.endsWith(`.${siteHostname}`)) return "direct";
  if (SEARCH_ENGINES.some((s) => hostname.includes(s))) return "search";
  if (SOCIAL_PLATFORMS.some((s) => hostname.includes(s))) return "social";
  return "referral";
}

/** Coarse device categorization from the User-Agent string — just enough to
 * bucket desktop/mobile/tablet, not fingerprinting-grade parsing. */
export function categorizeDevice(userAgent: string | null): DeviceCategory {
  if (!userAgent) return "unknown";
  const ua = userAgent.toLowerCase();
  if (/ipad|tablet|(android(?!.*mobile))/.test(ua)) return "tablet";
  if (/mobile|iphone|ipod|android/.test(ua)) return "mobile";
  if (/mozilla|chrome|safari|firefox|edge/.test(ua)) return "desktop";
  return "unknown";
}

export const ANALYTICS_SESSION_COOKIE = "aq_analytics_session";
/** How long a session is considered the "same visit" for view-deduplication
 * purposes — a refresh or re-visit within this window doesn't count twice. */
export const DEDUP_WINDOW_MINUTES = 30;
