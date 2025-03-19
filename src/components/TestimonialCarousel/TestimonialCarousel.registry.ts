import { Builder } from '@builder.io/react';
import { testimonialCarouselModel } from './TestimonialCarousel.model';
import TestimonialCarousel from './TestimonialCarousel';

Builder.registerComponent(TestimonialCarousel, 
  {
    name: 'Testimonial Carousel',
    image: 'https://img.icons8.com/?id=tDtvWzs979he',
    inputs: [
      {
        name: 'title',
        type: 'string',
        defaultValue: 'From our community.',
        required: true,
      },
      {
        name: 'description',
        type: 'string',
        defaultValue: "Here's what other subscribers had to say.",
        required: true,
      },
      {
        name: 'testimonials',
        type: 'list',
        defaultValue: [
          {
            text: 'Production Online has helped me become a better musician and producer than I ever thought possible.',
            clientName: 'Kyle Weznick',
            clientTitle: 'Media Director, Turn Around Music Group',
            clientImage: 'https://randomuser.me/api/portraits/men/32.jpg',
          },
          {
            text: 'The resources and support have completely transformed my workflow.',
            clientName: 'Sarah Johnson',
            clientTitle: 'Independent Producer',
            clientImage: 'https://randomuser.me/api/portraits/women/44.jpg',
          },
          {
            text: 'I never thought I could achieve such professional results from my home studio.',
            clientName: 'Marcus Chen',
            clientTitle: 'Composer & Sound Designer',
            clientImage: 'https://randomuser.me/api/portraits/men/68.jpg',
          },
        ],
        subFields: [
          {
            name: 'text',
            type: 'string',
            defaultValue: '',
            required: true,
          },
          {
            name: 'clientName',
            type: 'string',
            defaultValue: '',
            required: true,
          },
          {
            name: 'clientTitle',
            type: 'string',
            defaultValue: '',
            required: true,
          },
          {
            name: 'clientImage',
            type: 'file',
            allowedFileTypes: ['jpeg', 'jpg', 'png', 'webp'],
            required: false,
          },
        ],
        required: true,
      },
      {
        name: 'textColor',
        type: 'color',
        defaultValue: '#000000',
        required: false,
      },
      {
        name: 'buttonColor',
        type: 'color',
        defaultValue: '#0070f3',
        required: false,
      },
      {
        name: 'backgroundColor',
        type: 'color',
        defaultValue: '#ffffff',
        required: false,
      },
      {
        name: 'autoplay',
        type: 'boolean',
        defaultValue: true,
        required: false,
      },
      {
        name: 'autoplaySpeed',
        type: 'number',
        defaultValue: 5000,
        required: false,
        friendlyName: 'Autoplay Speed (ms)',
        helperText: 'Time in milliseconds between slides',
      },
    ],
  }
);
