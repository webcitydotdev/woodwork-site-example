import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './Lightbox.module.css';
import { ImageItem } from '../ImageGallery/ImageGallery.setup';

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  images: ImageItem[];
  currentIndex: number;
}

/**
 * Lightbox Component
 * 
 * Displays images in a fullscreen modal with navigation controls
 * Uses React Portal to render outside the normal component hierarchy
 * for proper fixed positioning and stacking context
 */
const Lightbox: React.FC<LightboxProps> = ({ isOpen, onClose, images, currentIndex }) => {
  const [activeIndex, setActiveIndex] = useState(currentIndex);
  // State to track if we're running in a browser environment for SSR compatibility
  const [isBrowser, setIsBrowser] = useState(false);

  // Set browser environment on mount
  useEffect(() => {
    setIsBrowser(true);
  }, []);

  // Reset the active index when the current index changes
  useEffect(() => {
    setActiveIndex(currentIndex);
  }, [currentIndex]);

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

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
  }, [isOpen, activeIndex, onClose]);

  // Prevent body scrolling when lightbox is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  // Don't render anything on the server or if not open
  if (!isBrowser || !isOpen || images.length === 0) return null;
  
  // Create the lightbox content
  const lightboxContent = (
    <div className={styles.lightbox} onClick={onClose}>
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        <button 
          className={`${styles.navButton} ${styles.closeButton}`} 
          onClick={onClose}
          aria-label="Close lightbox"
        >
          ×
        </button>
        
        <button 
          className={`${styles.navButton} ${styles.prevButton}`} 
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
          className={`${styles.navButton} ${styles.nextButton}`} 
          onClick={handleNext}
          aria-label="Next image"
        >
          ›
        </button>
        
        {images[activeIndex].alt && (
          <div className={styles.caption}>
            {images[activeIndex].alt}
          </div>
        )}
        
        <div className={styles.counter}>
          {activeIndex + 1} / {images.length}
        </div>
      </div>
    </div>
  );
  
  // Use React Portal to render the lightbox at the document body level
  // This ensures it's not affected by parent element styling
  return createPortal(
    lightboxContent,
    document.body
  );
};

export default Lightbox;
