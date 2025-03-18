"use client"
import { useEffect } from 'react';
import useAppStore from '@/store/useAppStore';

/**
 * @function useIsMobile
 * @description The definitive React hook for mobile device detection in this application
 * 
 * This hook:
 * 1. Uses the global app store to maintain and share mobile state across components
 * 2. Sets up a resize event listener to update the state when window dimensions change
 * 3. Uses a breakpoint of 1200px (defined in the app store) to determine mobile status
 * 4. Persists the mobile detection state across page navigations
 * 
 * @example
 * // Basic usage in a component
 * const isMobile = useIsMobile();
 * 
 * // Conditional rendering based on device type
 * return (
 *   <>
 *     {isMobile ? <MobileComponent /> : <DesktopComponent />}
 *   </>
 * );
 * 
 * @returns {boolean} - True if the user is on a mobile device (width <= 1200px)
 */
const useIsMobile = () => {
  const { setWidth, isMobile } = useAppStore();
 
  useEffect(() => {
    // Only set up the listener if we're in the browser
    if (typeof window === 'undefined') return;
    
    // Function to update width in the store
    const handleResize = () => {
      const width = window.innerWidth;
      setWidth(width);
    };
 
    // Set initial value only if width is 0 (not yet initialized)
    // This prevents unnecessary state updates on navigation
    if (useAppStore.getState().width === 0) {
      handleResize();
    }

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);
    
    // Clean up event listener on unmount
    return () => window.removeEventListener('resize', handleResize);
  }, [setWidth]);

  return isMobile;
};
 
export default useIsMobile;