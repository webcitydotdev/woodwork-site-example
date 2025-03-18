"use client";

import React, { useEffect } from "react";
import { RenderBuilderContent } from "@/components/builder";
import useLocationStore from "@/store/useLocaleStore";

const ClientPage = ({
  locale,
  content,
}: {
  locale: string;
  content: any;
}) => {
  // Get the setSelectedLocale function from the Zustand store
  // This step is necessary to hydrate the Zustand store with the server-provided locale
  const setSelectedLocale = useLocationStore((state) => state.setSelectedLocale);

  // Hydrate the Zustand store with the server-provided locale
  // Set the selected locale in the Zustand store
  useEffect(() => {
    setSelectedLocale(locale);
  }, [locale, setSelectedLocale]);

  return (
    <>
      <RenderBuilderContent content={content} model="symbol" locale={locale} />
    </>
  );
};

export default ClientPage;
