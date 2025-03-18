/**
 * @file RenderBuilderContent Component
 * @description Renders Builder.io content with preview mode support, optimized for Next.js 15
 */
// This file contains the RenderBuilderContent component that renders the BuilderComponent
// with the specified content and model props. The component also uses the useIsPreviewing
// hook to determine if the page is being previewed in Builder. If the content is falsy and
// the page is not being previewed in Builder, the component renders the DefaultErrorPage
// with a 404 status code.

"use client";
import { ComponentProps, Suspense, useState, useEffect } from "react";
import { BuilderComponent, useIsPreviewing } from "@builder.io/react";
import { builder } from "@builder.io/sdk";
import DefaultErrorPage from "next/error";
import "../builder-registry";
import { REVALIDATION_TIMEFRAMES } from "@/utils/builderUtils";

type BuilderPageProps = ComponentProps<typeof BuilderComponent> & {
  contentType?: keyof typeof REVALIDATION_TIMEFRAMES;
  fallback?: React.ReactNode;
  errorComponent?: React.ReactNode;
};

// Builder Public API Key set in .env file
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

// Loading component for Suspense fallback
function BuilderLoadingFallback() {
  return (
    <div className="builder-loading">
      <div className="builder-loading-spinner"></div>
      <style jsx>{`
        .builder-loading {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 400px;
          width: 100%;
        }
        .builder-loading-spinner {
          width: 50px;
          height: 50px;
          border: 5px solid rgba(0, 0, 0, 0.1);
          border-radius: 50%;
          border-top-color: var(--primary,rgb(0, 0, 0));
          animation: spin 1s ease-in-out infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

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
  contentType = 'PAGE',
  fallback,
  errorComponent
}: BuilderPageProps) {
  // Call the useIsPreviewing hook to determine if
  // the page is being previewed in Builder
  const isPreviewing = useIsPreviewing();
  
  // Custom error component or default error page
  const ErrorComponent = errorComponent || <DefaultErrorPage statusCode={404} />;
  
  // Custom loading fallback or default loading spinner
  const LoadingFallback = fallback || <BuilderLoadingFallback />;
  
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
