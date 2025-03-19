import { Builder } from "@builder.io/react";
import ImageGallery from "./ImageGallery";

// Register the component to Builder.io
// This will allow you to use the component in the visual editor
// and define the inputs/props that will be shown in the editor

// name: The name of the component
// description: A short description of the component
// image: An image to represent the component in the editor (optional)
// inputs: An array of inputs/props that will be shown in the editor
// Each input should have a name, type, and any other configuration options
// For more information on inputs, see: https://www.builder.io/c/docs/guides/getting-started-with-react#adding-custom-inputs

Builder.registerComponent(ImageGallery, {
  name: "Image Gallery",
  description: "A dynamic and responsive image gallery with lightbox functionality",
  image: "https://img.icons8.com/ios/50/000000/image-gallery.png",
  // Define the inputs/props that will be shown in the Builder.io editor
  inputs: [
    {
      name: "images",
      type: "list",
      defaultValue: [
        {
          src: "https://source.unsplash.com/featured/600x400?nature",
          alt: "Nature landscape"
        },
        {
          src: "https://source.unsplash.com/featured/600x400?architecture",
          alt: "Architecture"
        },
        {
          src: "https://source.unsplash.com/featured/600x400?travel",
          alt: "Travel"
        },
        {
          src: "https://source.unsplash.com/featured/600x400?animals",
          alt: "Animals"
        }
      ],
      subFields: [
        {
          name: "src",
          type: "file",
          allowedFileTypes: ["jpeg", "jpg", "png", "webp"],
          required: true,
          helperText: "Choose an image for the gallery"
        },
        {
          name: "alt",
          type: "string",
          required: true,
          helperText: "Provide alt text for accessibility"
        }
      ]
    },
    {
      name: "gallerySettings",
      type: "object",
      defaultValue: {
        animationSpeed: 30,
        showOverlay: true,
        viewIconSymbol: "+",
        enableLightbox: true
      },
      subFields: [
        {
          name: "animationSpeed",
          type: "number",
          defaultValue: 30,
          helperText: "Animation speed in seconds (higher = slower)",
          min: 10,
          max: 60
        },
        {
          name: "showOverlay",
          type: "boolean",
          defaultValue: true,
          helperText: "Show overlay on hover"
        },
        {
          name: "viewIconSymbol",
          type: "string",
          defaultValue: "+",
          helperText: "Symbol to show in the overlay"
        },
        {
          name: "enableLightbox",
          type: "boolean",
          defaultValue: true,
          helperText: "Enable lightbox functionality"
        }
      ]
    },
    {
      name: "styling",
      type: "object",
      defaultValue: {
        backgroundColor: "transparent",
        overlayColor: "rgba(0, 0, 0, 0.5)",
        overlayTextColor: "#ffffff",
        borderRadius: 8
      },
      subFields: [
        {
          name: "backgroundColor",
          type: "color",
          defaultValue: "transparent",
          helperText: "Background color of the gallery"
        },
        {
          name: "overlayColor",
          type: "color",
          defaultValue: "rgba(0, 0, 0, 0.5)",
          helperText: "Color of the image overlay"
        },
        {
          name: "overlayTextColor",
          type: "color",
          defaultValue: "#ffffff",
          helperText: "Color of the text in the overlay"
        },
        {
          name: "borderRadius",
          type: "number",
          defaultValue: 8,
          helperText: "Border radius of the images (px)",
          min: 0,
          max: 50
        }
      ]
    }
  ]
});
