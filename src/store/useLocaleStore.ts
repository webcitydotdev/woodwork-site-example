import { create } from "zustand";
import { getLocaleFromParams } from "@/utils/localeUtils";
import { VALID_LOCALES } from "@/utils/builderUtils"; // ✅ Keep VALID_LOCALES

// Define the store state interface
interface LocaleState {
  selectedLocale: string;
  setSelectedLocale: (locale: string) => void;
  initializeLocaleFromUrl: () => void;
}

const isValidLocale = (locale: string): boolean => VALID_LOCALES.includes(locale); // ✅ Validate using VALID_LOCALES

const useLocaleStore = create<LocaleState>((set) => ({
  selectedLocale: "en", // Default to 'en' initially

  setSelectedLocale: (locale: string) => {
    const validLocale = isValidLocale(locale) ? locale : "en"; // ✅ Validate before setting
    set({ selectedLocale: validLocale });
  },

  initializeLocaleFromUrl: async () => {
    if (typeof window !== "undefined") {
      const { locale } = await getLocaleFromParams({ page: window.location.pathname.split("/").filter(Boolean) });

      set({ selectedLocale: isValidLocale(locale) ? locale : "en" }); // ✅ Ensure only valid locales are stored
    }
  },
}));

// ✅ Initialize locale on page load
if (typeof window !== "undefined") {
  window.addEventListener("load", () => {
    useLocaleStore.getState().initializeLocaleFromUrl();
  });
}

export default useLocaleStore;
