'use client';

import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { builder } from '@builder.io/sdk';
import { useShallow } from 'zustand/react/shallow';
import useLocaleStore from '@/store/useLocaleStore';
import { VALID_LOCALES } from '@/utils/builderUtils';

// Initialize Builder.io with public API key
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

// Define the shape of our Builder context
interface BuilderContextType {
  locale: string;
  isValidLocale: (locale: string) => boolean;
  defaultLocale: string;
}

// Create context with default values
const BuilderContext = createContext<BuilderContextType>({
  locale: 'en',
  isValidLocale: () => false,
  defaultLocale: 'en',
});

// Hook to use the Builder context
export const useBuilder = () => useContext(BuilderContext);

interface BuilderProviderProps {
  children: ReactNode;
  defaultLocale?: string;
}

/**
 * BuilderProvider component
 * 
 * A provider component that sets up the Builder.io context with locale information.
 * It uses the locale store to track the current locale and provides utilities
 * for working with Builder.io content.
 * 
 * @param {ReactNode} children - Child components
 * @param {string} defaultLocale - Default locale to use if none is set
 */
export function BuilderProvider({ 
  children, 
  defaultLocale = 'en' 
}: BuilderProviderProps) {
  // Client-side hydration state
  const [isHydrated, setIsHydrated] = useState(false);
  
  // Use controlled state for locale to ensure consistency during hydration
  const [localeState, setLocaleState] = useState(defaultLocale);
  
  // Get the selected locale from the locale store
  const { selectedLocale } = useLocaleStore(
    useShallow((state) => ({
      selectedLocale: state.selectedLocale,
    }))
  );
  
  // Mark when hydration is complete (client-side only)
  useEffect(() => {
    setIsHydrated(true);
  }, []);
  
  // Update localeState after hydration from Zustand store
  useEffect(() => {
    if (isHydrated) {
      // Only update after hydration to maintain consistency
      const validLocale = VALID_LOCALES.includes(selectedLocale) 
        ? selectedLocale 
        : defaultLocale;
      
      setLocaleState(validLocale);
    }
  }, [selectedLocale, defaultLocale, isHydrated]);

  // Create a function to check if a locale is valid
  const isValidLocale = (localeToCheck: string) => {
    return VALID_LOCALES.includes(localeToCheck);
  };

  // Value to provide in context
  const contextValue: BuilderContextType = {
    locale: localeState,
    isValidLocale,
    defaultLocale,
  };

  return (
    <BuilderContext.Provider value={contextValue}>
      {children}
    </BuilderContext.Provider>
  );
}

export default BuilderProvider;
