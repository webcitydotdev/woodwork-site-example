export const getLocaleFromParams = (params: { page?: string[]; locale?: string }): { locale: string; urlPath: string } => {
    const pageSegments = params.page || [];
    const locale = pageSegments[0] || params.locale || "en"; // Default to "en" if no valid locale is found
    const urlPath = "/" + (pageSegments.slice(1).join("/") || ""); // Construct URL path without the locale segment
  
    return { locale, urlPath };
  };
  