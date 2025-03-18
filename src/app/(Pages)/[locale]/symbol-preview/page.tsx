/**
 * @file Blog Search Page
 * @description Server component for rendering blog search results dynamically
 */

import React from "react";
import { fetchBuilderContent, isValidLocale } from "@/utils/builderUtils";
import ClientPage from "./ClientPage";

interface PageParams {
  page?: string[];
  locale?: string;
}

// Server component for the Blog Search Page
const Page = async ({ params }: { params: Promise<PageParams> }) => {
  const resolvedParams = await params;

  // Extract locale from the URL, defaulting to "en"
  // Page segments are separated by "/"
  // pageSegments[0] is assumed to be the locale
  // pageSegments[1..n] are the page segments
  // urlPath is the path without the locale
  const pageSegments = resolvedParams.page || [];
  const locale = pageSegments[0] || resolvedParams.locale || "en";
  const urlPath = "/symbol-preview/symbol";

  // Fetch content dynamically from Builder.io
  const builderModelName = "symbol";
  const content = await fetchBuilderContent(urlPath, locale, builderModelName);

  // Handle missing content or invalid locale
  if (!content || !isValidLocale(locale)) {
    return (
      <div>
        <h1>Page not found</h1>
      </div>
    );
  }

  // Pass the locale and content to the client-side component
  return <ClientPage locale={locale} content={content} />;
};

export default Page;
