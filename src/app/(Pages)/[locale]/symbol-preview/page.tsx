/**
 * @file Blog Search Page
 * @description Server component for rendering blog search results dynamically
 */

import React from "react";
import { fetchBuilderContent, isValidLocale } from "@/utils/builderUtils";
import ClientPage from "./ClientPage";
import { getLocaleFromParams } from "@/utils/localeUtils";

interface PageParams {
  page?: string[];
  locale?: string;
}

// Server component for the Blog Search Page
const Page = async ({ params }: { params: { locale?: string; page?: string[] } }) => {
  const { locale } = getLocaleFromParams(params);
  const urlPath = "/symbol-preview/symbol"; // Fixed path for symbol preview

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
