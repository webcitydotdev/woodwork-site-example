/**
 * @file Application Global Store
 * @description Central state management for app-wide concerns
 * @typedef {Object} AppStates - Global application state types
 * @property {string} testMessage - Test message state
 */

import { create } from 'zustand';
const mobileDevice = 768; // Define the width of a mobile device

// Define the shape of the store
type AppStates = {
  width: number;
     isMobile: boolean; 
       setWidth: (width: number) => void;
};

// Create the store
// The store is a hook that can be used in any component
// It will return the state and the set function
const useAppStore = create<AppStates>((set) => ({
  width: 0,
  isMobile : false, 
  setWidth: (width) => set({ width, isMobile: width <= mobileDevice }),
}));

export default useAppStore;
