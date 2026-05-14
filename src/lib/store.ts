import { writable, derived } from "svelte/store";
import type { WeatherData } from "./types";



export const weatherData = writable<WeatherData | null>(null);
export const isLoading = writable<boolean>(false);
export const errorMessage = writable<string | null>(null);




function getInitialTheme(): string {

  if (typeof window === "undefined") return "system";
  
  const stored = localStorage.getItem("theme-preference");
  
  if (stored === "light" || stored === "dark") return stored;
  
  return "system";
}


export const themePreference = writable<string>(getInitialTheme());


export const resolvedTheme = derived(themePreference, ($pref) => {

  if ($pref === "system") {

    if (typeof window === "undefined") return "light";

    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  return $pref;
});




export const hasSearched = writable<boolean>(false);
