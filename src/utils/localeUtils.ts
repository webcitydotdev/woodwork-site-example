export const getLocaleFromParams = async (params: { page?: string[]; locale?: string }): Promise<{ locale: string; urlPath: string }> => {
  const resolvedParams = await params;
  const pageSegments = resolvedParams.page || [];
  const locale = pageSegments[0] || resolvedParams.locale || "en"; // Default to "en"
  const urlPath = "/" + (pageSegments.slice(1).join("/") || "");

  return { locale, urlPath };
};
