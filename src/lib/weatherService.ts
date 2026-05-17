import { weatherData, isLoading, errorMessage, hasSearched } from "./store";
import {
  sanitizeCity,
  validateCity,
  encodeCity,
  checkRateLimit,
  isValidWeatherResponse,
} from "./sanitizer";
import type { WeatherData } from "./types";

const REQUEST_TIMEOUT_MS = 10000;

export async function fetchWeather(rawCity: string): Promise<void> {
  const city = sanitizeCity(rawCity);
  const validationError = validateCity(city);

  if (validationError) {
    errorMessage.set(validationError);
    return;
  }

  if (!checkRateLimit()) {
    errorMessage.set("Please wait a moment before searching again.");
    return;
  }

  isLoading.set(true);
  errorMessage.set(null);
  weatherData.set(null);
  hasSearched.set(true);

  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY as string;
  const encoded = encodeCity(city);
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encoded}&appid=${apiKey}&units=metric`;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(apiUrl, { signal: controller.signal });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`City "${city}" not found.`);
      }
      if (response.status === 401) {
        throw new Error("Service temporarily unavailable.");
      }
      if (response.status === 429) {
        throw new Error("Too many requests. Please try again later.");
      }
      throw new Error("An unexpected error occurred.");
    }

    const data: unknown = await response.json();

    if (!isValidWeatherResponse(data)) {
      throw new Error("Received invalid data from the weather service.");
    }

    weatherData.set(data as WeatherData);
  } catch (err: unknown) {
    if (err instanceof DOMException && err.name === "AbortError") {
      errorMessage.set("Request timed out. Please try again.");
    } else if (err instanceof Error) {
      errorMessage.set(err.message);
    } else {
      errorMessage.set("An unexpected error occurred.");
    }
  } finally {
    clearTimeout(timeout);
    isLoading.set(false);
  }
}

export function getWeatherIcon(iconCode: string): string {
  const sanitized = iconCode.replace(/[^a-z0-9]/gi, "");

  return `https://openweathermap.org/img/wn/${sanitized}@4x.png`;
}
