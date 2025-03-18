/**
 * Lightbox.registry.ts
 * 
 * Registers the Lightbox component with Builder.io and defines its editable properties.
 * This makes the component available for marketers to use in the Builder.io interface.
 */

import { Builder } from "@builder.io/react";
import Lightbox from "./Lightbox";

// Register the component to Builder.io
Builder.registerComponent(Lightbox, {
  name: "Lightbox",
  description: "A fullscreen image viewer with navigation and customizable UI",
  image: "https://img.icons8.com/ios/50/000000/picture-in-picture.png",
  // Define the inputs/props that will be shown in the Builder.io editor
  inputs: [
    {
      name: "isOpen",
      type: "boolean",
      defaultValue: false,
      helperText: "Controls whether the lightbox is open or closed"
    },
    {
      name: "currentIndex",
      type: "number",
      defaultValue: 0,
      helperText: "Index of the currently displayed image",
      min: 0
    },
    {
      name: "images",
      type: "list",
      defaultValue: [],
      helperText: "Images to display in the lightbox",
      subFields: [
        {
          name: "src",
          type: "file",
          allowedFileTypes: ["jpeg", "jpg", "png", "webp"],
          required: true,
          helperText: "Source URL of the image"
        },
        {
          name: "alt",
          type: "string",
          required: true,
          helperText: "Alt text for the image (also used as caption if enabled)"
        }
      ]
    },
    {
      name: "lightboxSettings",
      type: "object",
      defaultValue: {
        enableKeyboardNavigation: true,
        showCaption: true,
        showCounter: true,
        closeOnBackdropClick: true,
        navigationButtonStyle: 'circular'
      },
      subFields: [
        {
          name: "enableKeyboardNavigation",
          type: "boolean",
          defaultValue: true,
          helperText: "Enable keyboard arrow keys for navigation"
        },
        {
          name: "showCaption",
          type: "boolean",
          defaultValue: true,
          helperText: "Display image caption text"
        },
        {
          name: "showCounter",
          type: "boolean",
          defaultValue: true,
          helperText: "Show image count and position"
        },
        {
          name: "closeOnBackdropClick",
          type: "boolean",
          defaultValue: true,
          helperText: "Close lightbox when clicking background"
        },
        {
          name: "navigationButtonStyle",
          type: "enum",
          defaultValue: "circular",
          enum: ["circular", "rectangular", "minimal"],
          helperText: "Style of navigation buttons"
        }
      ]
    },
    {
      name: "styling",
      type: "object",
      defaultValue: {
        backdropColor: "rgba(0, 0, 0, 0.9)",
        navigationButtonColor: "rgba(0, 0, 0, 0.5)",
        navigationButtonHoverColor: "rgba(0, 0, 0, 0.8)",
        captionBackgroundColor: "rgba(0, 0, 0, 0.5)",
        captionTextColor: "#ffffff",
        counterBackgroundColor: "rgba(0, 0, 0, 0.5)",
        counterTextColor: "#ffffff"
      },
      subFields: [
        {
          name: "backdropColor",
          type: "color",
          defaultValue: "rgba(0, 0, 0, 0.9)",
          helperText: "Background color of the lightbox"
        },
        {
          name: "navigationButtonColor",
          type: "color",
          defaultValue: "rgba(0, 0, 0, 0.5)",
          helperText: "Background color of navigation buttons"
        },
        {
          name: "navigationButtonHoverColor",
          type: "color",
          defaultValue: "rgba(0, 0, 0, 0.8)",
          helperText: "Background color of navigation buttons on hover"
        },
        {
          name: "captionBackgroundColor",
          type: "color",
          defaultValue: "rgba(0, 0, 0, 0.5)",
          helperText: "Background color of image caption"
        },
        {
          name: "captionTextColor",
          type: "color",
          defaultValue: "#ffffff",
          helperText: "Text color of image caption"
        },
        {
          name: "counterBackgroundColor",
          type: "color",
          defaultValue: "rgba(0, 0, 0, 0.5)",
          helperText: "Background color of image counter"
        },
        {
          name: "counterTextColor",
          type: "color",
          defaultValue: "#ffffff",
          helperText: "Text color of image counter"
        }
      ]
    },
    {
      name: "onClose",
      type: "function",
      helperText: "Function to call when the lightbox should close"
    }
  ]
});
