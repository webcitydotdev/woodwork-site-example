/**
 * Lightbox.setup.ts
 * 
 * TypeScript interfaces, types and default props for the Lightbox component.
 * This file contains all type definitions and default configurations.
 */

import { ImageItem } from '../ImageGallery/ImageGallery.setup';

export interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  images: ImageItem[];
  currentIndex: number;
  lightboxSettings?: LightboxSettings;
  styling?: LightboxStyling;
}

export interface LightboxSettings {
  enableKeyboardNavigation: boolean;
  showCaption: boolean;
  showCounter: boolean;
  closeOnBackdropClick: boolean;
  navigationButtonStyle: 'circular' | 'rectangular' | 'minimal';
}

export interface LightboxStyling {
  backdropColor: string;
  navigationButtonColor: string;
  navigationButtonHoverColor: string;
  captionBackgroundColor: string;
  captionTextColor: string;
  counterBackgroundColor: string;
  counterTextColor: string;
}

// Default props
export const defaultLightboxSettings: LightboxSettings = {
  enableKeyboardNavigation: true,
  showCaption: true,
  showCounter: true,
  closeOnBackdropClick: true,
  navigationButtonStyle: 'circular'
};

export const defaultLightboxStyling: LightboxStyling = {
  backdropColor: "rgba(0, 0, 0, 0.9)",
  navigationButtonColor: "rgba(0, 0, 0, 0.5)",
  navigationButtonHoverColor: "rgba(0, 0, 0, 0.8)",
  captionBackgroundColor: "rgba(0, 0, 0, 0.5)",
  captionTextColor: "#ffffff",
  counterBackgroundColor: "rgba(0, 0, 0, 0.5)",
  counterTextColor: "#ffffff"
};
