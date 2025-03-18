// src/utils/builderUtils.ts

import { builder } from "@builder.io/sdk";
import { notFound } from "next/navigation";

// Initialize Builder.io with the public API key
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

// List of valid locales in your application
export const VALID_LOCALES = [
  'en',
];

/**
 * Checks if a given locale is valid by comparing it against the predefined list of valid locales.
 * @param locale The locale string to validate.
 * @returns `true` if the locale is in the VALID_LOCALES list, otherwise `false`.
 */
export const isValidLocale = (locale: string): boolean => {
  return VALID_LOCALES.includes(locale);
};

// Define revalidation timeframes based on content type
export const REVALIDATION_TIMEFRAMES = {
  PAGE: 3600,           // 1 hour for regular pages
  DYNAMIC: 0            // No cache for highly dynamic content
};

/**
 * Fetch content dynamically from Builder.io.
 * Assumes that the locale has already been validated.
 * Optimized with Next.js 15 cache controls.
 *
 * @param urlPath The URL path of the content (e.g., "/about").
 * @param locale The locale of the content
 * @param builderModelName The Builder.io model name (e.g., "page").
 * @param options Additional options including revalidation timeframe
 * @returns The fetched content if found, or throws notFound() if not found.
 */
export const fetchBuilderContent = async (
  urlPath: string,
  locale: string,
  builderModelName: string,
  options?: {
    revalidate?: number;
    tags?: string[];
    noCache?: boolean;
  }
) => {
  try {
    // Apply caching strategy based on content type and options
    const cacheOptions: { next?: { revalidate?: number; tags?: string[]; cache?: string } } = {};
    
    if (options?.noCache) {
      cacheOptions.next = { revalidate: 0 };
    } else if (options?.revalidate !== undefined) {
      cacheOptions.next = { revalidate: options.revalidate };
    } else if (options?.tags) {
      cacheOptions.next = { tags: options.tags };
    }

    // Fetch content from Builder.io with appropriate caching directives
    const content = await builder
      .get(builderModelName, {
        userAttributes: {
          urlPath,
          locale
        },
        options: {
          locale,
          includeRefs: true, // Include referenced content
        },
        ...cacheOptions
      })
      .toPromise();

    // If no content found, throw notFound to trigger 404 page
    if (!content) {
      notFound();
    }

    return content;
  } catch (error) {
    console.error("Error fetching content from Builder.io:", error);
    if ((error as any)?.response?.status === 404) {
      notFound();
    }
    throw error;
  }
};

/**
 * Helper function to determine appropriate caching strategy based on content type
 * @param contentType The type of content being fetched
 * @returns Cache configuration object for Next.js fetch
 */
export const getCacheConfig = (contentType: keyof typeof REVALIDATION_TIMEFRAMES = 'PAGE') => {
  const revalidate = REVALIDATION_TIMEFRAMES[contentType];
  return { next: { revalidate } };
};
