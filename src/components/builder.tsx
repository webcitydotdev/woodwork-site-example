/**
 * @file RenderBuilderContent Component
 * @description Renders Builder.io content with preview mode support, optimized for Next.js 15
 */
// This file contains the RenderBuilderContent component that renders the BuilderComponent
// with the specified content and model props. The component also uses the useIsPreviewing
// hook to determine if the page is being previewed in Builder. If the content is falsy and
// the page is not being previewed in Builder, the component renders the NotFound component.

"use client";
import { ComponentProps, Suspense, useState, useEffect } from "react";
import { BuilderComponent, useIsPreviewing } from "@builder.io/react";
import { builder } from "@builder.io/sdk";
import "../builder-registry";
import { REVALIDATION_TIMEFRAMES } from "@/utils/builderUtils";
import NotFound from "./common/NotFound";
import Loading from "./common/Loading";

type BuilderPageProps = ComponentProps<typeof BuilderComponent> & {
  contentType?: keyof typeof REVALIDATION_TIMEFRAMES;
  fallback?: React.ReactNode;
  errorComponent?: React.ReactNode;
};

// Builder Public API Key set in .env file
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

// Error boundary wrapper component
function BuilderErrorBoundary({ children, fallback }: { children: React.ReactNode, fallback: React.ReactNode }) {
  const [hasError, setHasError] = useState(false);
  
  useEffect(() => {
    const errorHandler = () => setHasError(true);
    window.addEventListener('error', errorHandler);
    return () => window.removeEventListener('error', errorHandler);
  }, []);
  
  if (hasError) return <>{fallback}</>;
  return <>{children}</>;
}

export function RenderBuilderContent({ 
  content, 
  model, 
  locale,
  fallback,
  errorComponent
}: BuilderPageProps) {
  // Call the useIsPreviewing hook to determine if
  // the page is being previewed in Builder
  const isPreviewing = useIsPreviewing();
  
  // Custom error component or default error page
  const ErrorComponent = errorComponent || <NotFound />;
  
  // Custom loading fallback or default loading spinner
  const LoadingFallback = fallback || <Loading />;
  
  // If "content" has a value or the page is being previewed in Builder,
  // render the BuilderComponent with the specified content and model props.
  if (content || isPreviewing) {
    return (
      <BuilderErrorBoundary fallback={ErrorComponent}>
        <Suspense fallback={LoadingFallback}>
            <BuilderComponent
              content={content}
              model={model}
              locale={locale}
              options={{
                // Only fetch needed data for optimal performance
                includeRefs: true,
                noTraverse: true, // Prevent unnecessary traversal for performance
              }}
              // Handle caching through custom builder context or page props
              // instead of directly in options to avoid type errors
            />
        </Suspense>
      </BuilderErrorBoundary>
    );
  }

  // If the "content" is falsy and the page is
  // not being previewed in Builder, render the
  // ErrorComponent.
  return ErrorComponent;
}
