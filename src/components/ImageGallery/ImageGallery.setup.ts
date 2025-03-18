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
