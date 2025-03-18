/**
 * Lightbox.tsx
 * 
 * A customizable lightbox component for image viewing.
 * Features:
 * - Keyboard navigation support
 * - Image captions and counter display
 * - Customizable styling and behavior
 * - Touch-friendly mobile interface
 * 
 * @version 1.0.0
 */

import React, { useEffect, useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import styles from './Lightbox.module.css';
import { 
  LightboxProps, 
  defaultLightboxSettings, 
  defaultLightboxStyling 
} from './Lightbox.setup';

// Empty div element to use as fallback for createPortal during SSR
const dummyElement = {};

/**
 * Lightbox Component
 * 
 * Displays images in a fullscreen modal with navigation controls
 * Uses React Portal to render outside the normal component hierarchy
 * for proper fixed positioning and stacking context
 * 
 * @param {LightboxProps} props - Component properties
 * @returns {React.ReactElement | null} Rendered component or null if not open
 */
const Lightbox: React.FC<LightboxProps> = ({ 
  isOpen, 
  onClose, 
  images, 
  currentIndex,
  onIndexChange,
  lightboxSettings = defaultLightboxSettings,
  styling = defaultLightboxStyling
}) => {
  const [activeIndex, setActiveIndex] = useState(currentIndex);
  // State to track if we're running in a browser environment for SSR compatibility
  const [isBrowser, setIsBrowser] = useState(false);
  // Ref to store the DOM element for portal rendering
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);

  // Set browser environment and portal element on mount
  useEffect(() => {
    setIsBrowser(true);
    setPortalElement(document.body);
  }, []);

  // Reset the active index when the currentIndex prop changes
  useEffect(() => {
    if (currentIndex !== activeIndex) {
      setActiveIndex(currentIndex);
    }
  }, [currentIndex, activeIndex]);

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen || !lightboxSettings.enableKeyboardNavigation) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, lightboxSettings.enableKeyboardNavigation]);

  // Prevent body scrolling when lightbox is open
  useEffect(() => {
    if (!isBrowser) return;
    
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, isBrowser]);

  const handleNext = () => {
    const newIndex = (activeIndex + 1) % images.length;
    setActiveIndex(newIndex);
    if (onIndexChange) {
      onIndexChange(newIndex);
    }
  };

  const handlePrev = () => {
    const newIndex = (activeIndex - 1 + images.length) % images.length;
    setActiveIndex(newIndex);
    if (onIndexChange) {
      onIndexChange(newIndex);
    }
  };

  // Generate custom styles based on props
  const customStyles = useMemo(() => ({
    lightbox: {
      backgroundColor: styling.backdropColor
    },
    navButton: {
      backgroundColor: styling.navigationButtonColor
    },
    navButtonHover: {
      backgroundColor: styling.navigationButtonHoverColor
    },
    caption: {
      backgroundColor: styling.captionBackgroundColor,
      color: styling.captionTextColor
    },
    counter: {
      backgroundColor: styling.counterBackgroundColor,
      color: styling.counterTextColor
    }
  }), [styling]);

  // Get navigation button class based on selected style
  const getNavButtonClass = useMemo(() => {
    let styleClass = '';
    
    switch (lightboxSettings.navigationButtonStyle) {
      case 'rectangular':
        styleClass = styles.rectangularButton;
        break;
      case 'minimal':
        styleClass = styles.minimalButton;
        break;
      case 'circular':
      default:
        styleClass = '';
        break;
    }
    
    return styleClass;
  }, [lightboxSettings.navigationButtonStyle]);

  // Don't render anything if not open or no images
  if (!isOpen || images.length === 0) return null;
  
  // Create the lightbox content
  const lightboxContent = (
    <div 
      className={styles.lightbox} 
      style={customStyles.lightbox}
      onClick={lightboxSettings.closeOnBackdropClick ? onClose : undefined}
    >
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        <button 
          className={`${styles.navButton} ${styles.closeButton} ${getNavButtonClass}`} 
          style={customStyles.navButton}
          onClick={onClose}
          aria-label="Close lightbox"
        >
          ×
        </button>
        
        <button 
          className={`${styles.navButton} ${styles.prevButton} ${getNavButtonClass}`} 
          style={customStyles.navButton}
          onClick={handlePrev}
          aria-label="Previous image"
        >
          ‹
        </button>
        
        <div className={styles.imageContainer}>
          <img 
            src={images[activeIndex].src} 
            alt={images[activeIndex].alt || `Image ${activeIndex + 1}`}
            className={styles.image}
          />
        </div>
        
        <button 
          className={`${styles.navButton} ${styles.nextButton} ${getNavButtonClass}`} 
          style={customStyles.navButton}
          onClick={handleNext}
          aria-label="Next image"
        >
          ›
        </button>
        
        {lightboxSettings.showCaption && images[activeIndex].alt && (
          <div className={styles.caption} style={customStyles.caption}>
            {images[activeIndex].alt}
          </div>
        )}
        
        {lightboxSettings.showCounter && (
          <div className={styles.counter} style={customStyles.counter}>
            {activeIndex + 1} / {images.length}
          </div>
        )}
      </div>
    </div>
  );
  
  // Handle SSR case - don't try to use createPortal during server rendering
  if (!isBrowser || !portalElement) {
    return null;
  }
  
  // Use React Portal to render the lightbox at the document body level
  // This ensures it's not affected by parent element styling
  return createPortal(lightboxContent, portalElement);
};

export default Lightbox;
