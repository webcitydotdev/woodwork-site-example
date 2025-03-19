import { create } from "zustand";
import { getLocaleFromParams, VALID_LOCALES, isValidLocale } from "@/utils/localeUtils";

/**
 * @file Locale Store
 * @description Central state management for locale concerns
 * @typedef {Object} LocaleState - Locale state types
 * @property {string} selectedLocale - Selected locale
 * @property {function} setSelectedLocale - Function to set selected locale
 * @property {function} initializeLocaleFromUrl - Function to initialize locale from URL
 * 
 * This store is responsible for managing the locale state of the application.
 * It provides a global state for the locale and functions to set and initialize the locale.
 */

// Define the store state interface
interface LocaleState {
  selectedLocale: string;
  setSelectedLocale: (locale: string) => void;
  initializeLocaleFromUrl: () => void;
}

const useLocaleStore = create<LocaleState>((set) => ({
  selectedLocale: "en", // Default to 'en' initially

  setSelectedLocale: (locale: string) => {
    const validLocale = isValidLocale(locale) ? locale : "en"; // Validate before setting
    set({ selectedLocale: validLocale });
  },

  initializeLocaleFromUrl: async () => {
    if (typeof window !== "undefined") {
      const { locale, isLocaleValid } = await getLocaleFromParams({ page: window.location.pathname.split("/").filter(Boolean) });

      // Only use the extracted locale if it's valid
      set({ selectedLocale: isLocaleValid ? locale : "en" });
    }
  },
}));

// Initialize locale on page load
if (typeof window !== "undefined") {
  window.addEventListener("load", () => {
    useLocaleStore.getState().initializeLocaleFromUrl();
  });
}

export default useLocaleStore;
