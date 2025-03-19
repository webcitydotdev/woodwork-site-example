'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './TestimonialCarousel.module.css';
import { TestimonialCarouselProps, TestimonialItem, defaultProps } from './TestimonialCarousel.setup';

export default function TestimonialCarousel({
  title,
  description,
  testimonials,
  textColor = defaultProps.textColor,
  buttonColor = defaultProps.buttonColor,
  backgroundColor = defaultProps.backgroundColor,
  autoplay = defaultProps.autoplay,
  autoplaySpeed = defaultProps.autoplaySpeed,
}: TestimonialCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);

  const nextTestimonial = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevTestimonial = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
    setTimeout(() => setIsAnimating(false), 500);
  };

  useEffect(() => {
    if (autoplay && testimonials.length > 1) {
      autoplayTimerRef.current = setInterval(nextTestimonial, autoplaySpeed);
    }
    
    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
      }
    };
  }, [autoplay, autoplaySpeed, testimonials.length]);

  // Stop autoplay when user interacts with navigation
  const handleUserNavigation = (callback: () => void) => {
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current);
    }
    callback();
  };

  return (
    <section 
      className={styles.testimonialSection}
      style={{ backgroundColor }}
    >
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Left Side - Section Header */}
          <div className={styles.sectionHeader}>
            <h2 
              className={styles.title}
              style={{ color: textColor }}
            >
              {title}
            </h2>
            <p 
              className={styles.description}
              style={{ color: textColor }}
            >
              {description}
            </p>
            
            {/* Navigation Buttons */}
            {testimonials.length > 1 && (
              <div className={styles.navigationButtons}>
                <button
                  onClick={() => handleUserNavigation(prevTestimonial)}
                  className={styles.navButton}
                  style={{ 
                    borderColor: buttonColor,
                    color: buttonColor 
                  }}
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={() => handleUserNavigation(nextTestimonial)}
                  className={styles.navButton}
                  style={{ 
                    borderColor: buttonColor,
                    color: buttonColor 
                  }}
                  aria-label="Next testimonial"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </div>
          
          {/* Right Side - Testimonial Carousel */}
          <div className={styles.testimonialWrapper}>
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className={styles.testimonialSlide}
                style={{
                  opacity: currentIndex === index ? 1 : 0,
                  visibility: currentIndex === index ? 'visible' : 'hidden',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  transition: 'opacity 0.5s ease-in-out, visibility 0.5s ease-in-out'
                }}
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${testimonials.length}`}
                aria-hidden={currentIndex !== index}
              >
                <div className={styles.testimonialContent}>
                  <div className="relative">
                    <div 
                      className={styles.quoteIcon}
                      style={{ color: textColor }}
                    >
                      "
                    </div>
                    <p 
                      className={styles.quoteText}
                      style={{ color: textColor }}
                    >
                      {testimonial.text}
                    </p>
                  </div>
                  <div className={styles.clientInfo}>
                    {testimonial.clientImage && (
                      <div className={styles.clientImageWrapper}>
                        <Image 
                          src={testimonial.clientImage} 
                          alt={testimonial.clientName}
                          width={56}
                          height={56}
                          className={styles.clientImage}
                        />
                      </div>
                    )}
                    <div>
                      <p 
                        className={styles.clientName}
                        style={{ color: textColor }}
                      >
                        {testimonial.clientName}
                      </p>
                      <p 
                        className={styles.clientTitle}
                        style={{ color: textColor }}
                      >
                        {testimonial.clientTitle}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
