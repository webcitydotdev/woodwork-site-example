import { builder } from "@builder.io/sdk";

// Initialize Builder.io with the public API key
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

// Define revalidation timeframes based on content type
// Add more types as needed with appropriate revalidation times
export const REVALIDATION_TIMEFRAMES = {
  PAGE: 3600, // 1 hour for regular pages
  DYNAMIC: 0  // No cache for highly dynamic content
};

// Check if we're in development mode
const isDevelopment = process.env.NODE_ENV === 'development';

/**
 * Fetch content dynamically from Builder.io.
 * Assumes that the locale has already been validated.
 * Optimized with Next.js 15 cache controls.
 *
 * @param urlPath The URL path of the content (e.g., "/about").
 * @param locale The locale of the content
 * @param builderModelName The Builder.io model name (e.g., "page").
 * @param options Additional options including revalidation timeframe
 * @returns The fetched content if found, or null if not found.
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
    
    // In development mode, always disable caching for hot reloading
    if (isDevelopment) {
      cacheOptions.next = { 
        revalidate: 0,
        cache: 'no-store'
      };
    } else if (options?.noCache) {
      cacheOptions.next = { revalidate: 0 };
    } else if (options?.revalidate !== undefined) {
      cacheOptions.next = { revalidate: options.revalidate };
    } else if (options?.tags) {
      cacheOptions.next = { tags: options.tags };
    }

    // Add a random cache buster query param in development mode to ensure fresh content
    const cacheBusterOptions = isDevelopment ? {
      cachebuster: Date.now().toString()
    } : {};

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
          ...cacheBusterOptions
        },
        ...cacheOptions
      })
      .toPromise();

    // Return null if no content found (instead of calling notFound)
    if (!content) {
      return null;
    }

    return content;
  } catch (error) {
    console.error("Error fetching content from Builder.io:", error);
    // Return null for 404 errors (instead of calling notFound)
    if ((error as any)?.response?.status === 404) {
      return null;
    }
    throw error;
  }
};

/**
 * Helper function to determine appropriate caching strategy based on content type
 * @param contentType The type of content being fetched
 * @returns Cache configuration object for Next.js fetch
 * 
 * This function is used to determine the appropriate caching strategy based on the content type.
 * It returns a configuration object that can be passed to the Next.js fetch function to control caching.
 * The revalidation time is set based on the content type, but can be overridden if needed.
 */
export const getCacheConfig = (contentType: keyof typeof REVALIDATION_TIMEFRAMES = 'PAGE') => {
  // In development mode, disable cache to ensure fresh content
  if (isDevelopment) {
    return { next: { revalidate: 0, cache: 'no-store' } };
  }
  
  const revalidate = REVALIDATION_TIMEFRAMES[contentType];
  return { next: { revalidate } };
};
