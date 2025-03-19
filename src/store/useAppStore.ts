/**
 * @file Application Global Store
 * @description Central state management for app-wide concerns
 * @typedef {Object} AppStates - Global application state types
 * @property {string} testMessage - Test message state
 * 
 * The AppStore is a global store that can be used to manage application-wide state.
 * It uses Zustand to create a store that can be accessed from any component. 
 * This is used instead of passing props down through multiple levels of components.
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
