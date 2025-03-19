// The .setup file is created to define the types of the props that the component will receive.
// Separating the types from the component file making it more readable and maintainable.
// This is useful for type checking and autocompletion in the editor.

export interface ImageItem {
  src: string;
  alt: string;
}

export interface GallerySettings {
  animationSpeed: number;
  showOverlay: boolean;
  viewIconSymbol: string;
  enableLightbox: boolean;
}

export interface GalleryStyling {
  backgroundColor: string;
  overlayColor: string;
  overlayTextColor: string;
  borderRadius: number;
}

export interface ImageGalleryProps {
  images: ImageItem[];
  gallerySettings?: GallerySettings;
  styling?: GalleryStyling;
}

// Default props
export const defaultGallerySettings: GallerySettings = {
  animationSpeed: 30,
  showOverlay: true,
  viewIconSymbol: "+",
  enableLightbox: true
};

export const defaultGalleryStyling: GalleryStyling = {
  backgroundColor: "transparent",
  overlayColor: "rgba(0, 0, 0, 0.5)",
  overlayTextColor: "#ffffff",
  borderRadius: 8
};
