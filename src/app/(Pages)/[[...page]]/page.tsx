/**
 * @file Dynamic Page Router
 * @description Handles dynamic routing and content fetching from Builder.io
 */

import React from "react";
import { fetchBuilderContent, isValidLocale } from "@/utils/builderUtils";
import ClientPage from "./ClientPage";

// Page props for dynamic routing
interface PageParams {
  page: string[];
  locale: string;
}

// Server component for dynamic routing
const Page = async ({ params }: { params: Promise<PageParams> }) => {
  const resolvedParams = await params;

  // Extract locale from the URL, defaulting to "en"
  // Page segments are separated by "/"
  // pageSegments[0] is assumed to be the locale
  // pageSegments[1..n] are the page segments
  // urlPath is the path without the locale
  const pageSegments = resolvedParams.page || [];
  const localeSegment = pageSegments[0];
  const locale = localeSegment || "en";
  const urlPath = "/" + (pageSegments.slice(1).join("/") || "");

  // Fetch Builder.io content dynamically for the page
  const builderModelName = "page";
  const content = await fetchBuilderContent(urlPath, locale, builderModelName);

    // Handle missing content or invalid locale
    if (!content || !isValidLocale(locale)) {
      return (
        <div>
          <h1>Page not found</h1>
        </div>
      );
    }

  // Pass the locale to the client-side component
  return <ClientPage locale={locale} content={content} />;
};

export default Page;
