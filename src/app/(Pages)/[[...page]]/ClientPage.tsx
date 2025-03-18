"use client";

import { useEffect } from "react";
import { RenderBuilderContent } from "@/components/builder";
import useLocaleStore from "@/store/useLocaleStore";

const ClientPage = ({ locale, content }: { locale: string; content: any }) => {
  // Get the setSelectedLocale function from the Zustand store
  // This step is necessary to hydrate the Zustand store with the server-provided locale
  const setSelectedLocale = useLocaleStore(
    (state) => state.setSelectedLocale
  );

  // Hydrate the Zustand store with the server-provided locale
  useEffect(() => {
    setSelectedLocale(locale);
  }, [locale, setSelectedLocale]);

  return (
    <RenderBuilderContent content={content} model="page" locale={locale} />
  );
};

export default ClientPage;
