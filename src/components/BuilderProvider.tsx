'use client';

import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { builder } from '@builder.io/sdk';
import { useShallow } from 'zustand/react/shallow';
import useLocaleStore from '@/store/useLocaleStore';
import { isValidLocale } from '@/utils/localeUtils';

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
  
  // Get the selected locale from global store
  const selectedLocale = useLocaleStore(useShallow(state => state.selectedLocale));
  
  // Handle hydration mismatch
  useEffect(() => {
    setIsHydrated(true);
  }, []);
  
  // Update locale state after hydration to prevent mismatches
  useEffect(() => {
    if (isHydrated) {
      // Only update after hydration to maintain consistency
      const validLocale = isValidLocale(selectedLocale) 
        ? selectedLocale 
        : defaultLocale;
      
      setLocaleState(validLocale);
    }
  }, [selectedLocale, defaultLocale, isHydrated]);

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
