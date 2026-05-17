import DOMPurify from "dompurify";

const CITY_PATTERN = /^[a-zA-ZÀ-ÿ\s\-'.]+$/;
const MAX_LENGTH = 100;
const MIN_LENGTH = 1;
const RATE_LIMIT_MS = 1000;

let lastRequestTime = 0;

export function sanitizeCity(input: string): string {
  const clean = DOMPurify.sanitize(input, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
  });

  return clean
    .trim()
    .replace(/<[^>]*>/g, "")
    .replace(/[&<>"']/g, "");
}

export function validateCity(city: string): string | null {
  if (city.length < MIN_LENGTH) return "Please enter a city name.";
  if (city.length > MAX_LENGTH) return "City name is too long.";
  if (!CITY_PATTERN.test(city)) return "City name contains invalid characters.";

  return null;
}

export function encodeCity(city: string): string {
  return encodeURIComponent(city);
}

export function checkRateLimit(): boolean {
  const now = Date.now();

  if (now - lastRequestTime < RATE_LIMIT_MS) return false;

  lastRequestTime = now;

  return true;
}

export function isValidWeatherResponse(data: unknown): boolean {
  if (typeof data !== "object" || data === null) return false;

  const obj = data as Record<string, unknown>;

  return (
    typeof obj.name === "string" &&
    typeof obj.dt === "number" &&
    typeof obj.sys === "object" &&
    obj.sys !== null &&
    typeof obj.main === "object" &&
    obj.main !== null &&
    Array.isArray(obj.weather) &&
    obj.weather.length > 0 &&
    typeof obj.wind === "object" &&
    obj.wind !== null
  );
}
