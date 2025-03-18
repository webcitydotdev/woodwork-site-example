/**
 * @file Location Feature Store
 * @description State management for location-specific features with URL-based locale initialization
 */

import { create } from "zustand";
import { VALID_LOCALES } from "@/utils/builderUtils";

// Define the shape of the store
type LocaleState = {
  selectedLocale: string;
  setSelectedLocale: (locale: string) => void;
  initializeLocaleFromUrl: () => void;
};

// Helper function to get locale from URL
const getLocaleFromUrl = (): string => {
  if (typeof window !== "undefined") {
    const pathname = window.location.pathname;
    const segments = pathname.split("/").filter(Boolean);

    if (segments.length > 0) {
      const localeSegment = segments[0];
      // Check if the segment matches a locale pattern (e.g., en, fr, es)
      if (
        localeSegment.length === 2 &&
        VALID_LOCALES.includes(localeSegment)
      ) {
        return localeSegment;
      }
    }
  }
  return "en"; // Default locale
};

// Create the Zustand store
const useLocaleStore = create<LocaleState>((set) => ({
  selectedLocale: "en", // Default to 'en' until client-side initialization
  setSelectedLocale: (locale) => set({ selectedLocale: locale }),
  initializeLocaleFromUrl: () => {
    if (typeof window !== "undefined") {
      const localeFromUrl = getLocaleFromUrl();
      set({ selectedLocale: localeFromUrl });
    }
  },
}));

// Initialize locale from URL when in browser environment
if (typeof window !== "undefined") {
  // Defer initialization to ensure DOM is fully loaded
  window.addEventListener("load", () => {
    useLocaleStore.getState().initializeLocaleFromUrl();
  });
}

export default useLocaleStore;
