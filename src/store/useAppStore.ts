/**
 * @file Application Global Store
 * @description Central state management for app-wide concerns
 * @typedef {Object} AppStates - Global application state types
 * @property {string} testMessage - Test message state
 */

import { create } from 'zustand';

// Define the shape of the store
type AppStates = {
  // Add your state here
};

// Create the store
// The store is a hook that can be used in any component
// It will return the state and the set function
const useAppStore = create<AppStates>((set) => ({
// Add your state and actions here
}));

export default useAppStore;
