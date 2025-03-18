/**
 * ImageGallery.tsx
 * 
 * A responsive, customizable infinite image carousel component for Builder.io.
 * Features:
 * - Dynamic row count based on image quantity
 * - Infinite scrolling animation with alternating directions
 * - Customizable animation speed, colors, and overlay options
 * - Optional lightbox functionality for image viewing
 * 
 * @author Your Name
 * @version 1.0.0
 */

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import styles from './ImageGallery.module.css';
import { ImageGalleryProps, defaultGallerySettings, defaultGalleryStyling } from './ImageGallery.setup';
import Lightbox from '../Lightbox/Lightbox';

/**
 * ImageGallery Component
 * 
 * Displays a responsive infinite image carousel with customizable properties.
 * 
 * @param {ImageGalleryProps} props - Component properties from Builder.io
 * @returns {React.ReactElement} Rendered component
 */
const ImageGallery: React.FC<ImageGalleryProps> = ({ 
  images, 
  gallerySettings = defaultGallerySettings,
  styling = defaultGalleryStyling
}) => {
  // State for lightbox functionality
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  /**
   * Apply custom animation speed using CSS variables
   * This allows for dynamic control of animation speed via Builder.io interface
   */
  useEffect(() => {
    // Set the CSS variable for animation speed
    document.documentElement.style.setProperty('--animation-speed', `${gallerySettings.animationSpeed}s`);
    
    return () => {
      // Cleanup by removing the variable when component unmounts
      document.documentElement.style.removeProperty('--animation-speed');
    };
  }, [gallerySettings.animationSpeed]);
  
  /**
   * Determine how many rows to display based on image count
   * - Less than 5 images: 1 row
   * - Between 5-9 images: 2 rows
   * - 10+ images: 3 rows
   * 
   * @returns {Array<Array<typeof images[0]>>} Array of image arrays, one per row
   */
  const rows = useMemo(() => {
    // Less than 5 images - show only one row
    if (images.length < 5) {
      return [images];
    } 
    // Between 5-9 images - show two rows
    else if (images.length < 10) {
      const midpoint = Math.ceil(images.length / 2);
      return [
        images.slice(0, midpoint),
        images.slice(midpoint)
      ];
    } 
    // 10+ images - show three rows
    else {
      const rowSize = Math.ceil(images.length / 3);
      return [
        images.slice(0, rowSize),
        images.slice(rowSize, rowSize * 2),
        images.slice(rowSize * 2)
      ];
    }
  }, [images]);

  /**
   * Handler for opening the lightbox
   * Calculates the correct image index across all rows
   * 
   * @param {number} rowIndex - Index of the row
   * @param {number} imageIndex - Index of the image within the row
   */
  const openLightbox = useCallback((rowIndex: number, imageIndex: number): void => {
    // Only open if lightbox is enabled in settings
    if (!gallerySettings.enableLightbox) return;

    // Calculate the absolute index by adding up images in previous rows
    let actualIndex = imageIndex;
    for (let i = 0; i < rowIndex; i++) {
      actualIndex += rows[i].length;
    }
    
    setCurrentImageIndex(actualIndex);
    setIsLightboxOpen(true);
  }, [gallerySettings.enableLightbox, rows]);

  /**
   * Generate custom styles based on Builder.io properties
   */
  const customStyles = useMemo(() => ({
    gallery: {
      backgroundColor: styling.backgroundColor
    },
    imageWrapper: {
      borderRadius: `${styling.borderRadius}px`
    },
    imageOverlay: {
      backgroundColor: styling.overlayColor,
      color: styling.overlayTextColor
    }
  }), [styling]);

  /**
   * Render a carousel item
   * Extracted to reduce code duplication and improve readability
   * 
   * @param {object} image - Image object with src and alt
   * @param {number} rowIndex - Index of the row
   * @param {number} index - Index of the image within the row
   * @param {string} keyPrefix - Unique prefix for React keys
   * @returns {React.ReactElement} Carousel item element
   */
  const renderCarouselItem = useCallback((
    image: typeof images[0], 
    rowIndex: number, 
    index: number, 
    keyPrefix: string
  ): React.ReactElement => {
    // Determine if we show square or wide format for this item
    // Create alternating pattern different for each row
    const isSquare = (rowIndex % 2 === 0) 
      ? (index % 2 === 0) 
      : (index % 2 !== 0);
    
    return (
      <div 
        key={`${rowIndex}-${index}${keyPrefix ? `-${keyPrefix}` : ''}`} 
        className={`${styles.carouselItem} ${isSquare ? styles.squareItem : styles.wideItem}`}
        onClick={() => openLightbox(rowIndex, index)}
        style={{ cursor: gallerySettings.enableLightbox ? 'pointer' : 'default' }}
      >
        <div className={styles.imageWrapper} style={customStyles.imageWrapper}>
          <img 
            src={image.src} 
            alt={image.alt || `Gallery image ${index + 1}`} 
            className={styles.image}
            loading="lazy" // Add lazy loading for performance
          />
          {gallerySettings.showOverlay && (
            <div className={styles.imageOverlay} style={customStyles.imageOverlay}>
              <span className={styles.viewIcon}>{gallerySettings.viewIconSymbol}</span>
            </div>
          )}
        </div>
      </div>
    );
  }, [customStyles, gallerySettings, openLightbox]);

  return (
    <section className={styles.gallery} style={customStyles.gallery} aria-label="Image Gallery">
      <div className={styles.container}>
        {/* Render each row of images */}
        {rows.map((rowImages, rowIndex) => (
          <div key={`row-${rowIndex}`} className={styles.rowContainer}>
            <div className={styles.carousel}>
              <div 
                className={`${styles.carouselContent} ${rowIndex % 2 !== 0 ? styles.reverseAnimation : ''}`}
                aria-hidden="true" // Hide from screen readers as it's decorative
              >
                {/* Render each set of images three times for infinite effect */}
                {/* First set - original images */}
                {rowImages.map((image, index) => 
                  renderCarouselItem(image, rowIndex, index, '')
                )}
                
                {/* Second set - repeated for seamless scrolling but preserving IDs */}
                {rowImages.map((image, index) => 
                  renderCarouselItem(image, rowIndex, index, 'repeat-1')
                )}
                
                {/* Third set - repeated again for really wide screens */}
                {rowImages.map((image, index) => 
                  renderCarouselItem(image, rowIndex, index, 'repeat-2')
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox component - only render if enabled */}
      {gallerySettings.enableLightbox && (
        <Lightbox 
          isOpen={isLightboxOpen}
          onClose={() => setIsLightboxOpen(false)}
          images={images}
          currentIndex={currentImageIndex}
        />
      )}
    </section>
  );
};

export default ImageGallery;
