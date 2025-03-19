/**
 * @file Loading.setup.ts
 * @description TypeScript interfaces, types and default props for Loading component
 */

export interface LoadingProps {
  /**
   * Height of the loading container
   */
  height?: number | string;
  
  /**
   * Width of the loading container
   */
  width?: string;
  
  /**
   * Size of the spinner
   */
  spinnerSize?: number | string;
  
  /**
   * Color of the spinner (top border)
   */
  spinnerColor?: string;
  
  /**
   * Width of the spinner border
   */
  spinnerBorderWidth?: number | string;
  
  /**
   * Color of the spinner border (except top)
   */
  spinnerBorderColor?: string;
}

/**
 * Default props for the Loading component
 */
export const defaultLoadingProps: LoadingProps = {
  height: 400,
  width: '100%',
  spinnerSize: 50,
  spinnerColor: 'var(--primary, rgb(0, 0, 0))',
  spinnerBorderWidth: 5,
  spinnerBorderColor: 'rgba(0, 0, 0, 0.1)'
};
