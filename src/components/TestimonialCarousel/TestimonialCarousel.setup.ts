/**
 * TestimonialCarousel component setup
 * Contains types, interfaces, and default props
 */

export interface TestimonialItem {
  text: string;
  clientName: string;
  clientTitle: string;
  clientImage: string;
}

export interface TestimonialCarouselProps {
  title: string;
  description: string;
  testimonials: TestimonialItem[];
  textColor?: string;
  buttonColor?: string;
  backgroundColor?: string;
  autoplay?: boolean;
  autoplaySpeed?: number;
}

export const defaultProps = {
  textColor: '#000000',
  buttonColor: '#000000',
  backgroundColor: '#ffffff',
  autoplay: true,
  autoplaySpeed: 5000,
};
