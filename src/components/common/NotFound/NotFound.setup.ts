/**
 * @file NotFound.setup.ts
 * @description TypeScript interfaces, types and default props for NotFound component
 */

export interface NotFoundProps {
  /**
   * Main title displayed on the not found page
   */
  title?: string;
  
  /**
   * Description or explanation message
   */
  message?: string;
  
  /**
   * Whether to show a link back to the homepage
   */
  showHomeLink?: boolean;
}

/**
 * Default props for the NotFound component
 */
export const defaultNotFoundProps: NotFoundProps = {
  title: 'Page not found',
  message: 'The requested page could not be found.',
  showHomeLink: true
};
