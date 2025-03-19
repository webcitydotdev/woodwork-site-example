/**
 * @file Dynamic Page Router
 * @description Handles dynamic routing and content fetching from Builder.io
 */

import React from "react";
import { fetchBuilderContent, isValidLocale } from "@/utils/builderUtils";
import ClientPage from "./ClientPage";
import { getLocaleFromParams } from "@/utils/localeUtils";

// Server component for dynamic routing
const Page = async ({ params }: { params: { page: string[] } }) => {
  const { locale, urlPath } = await getLocaleFromParams(params);
  const content = await fetchBuilderContent(urlPath, locale, "page");

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
