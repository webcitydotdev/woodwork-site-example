import { builder, Builder } from "@builder.io/react";
// Import component registries
import "./components/ImageGallery/ImageGallery.registry";

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

// Register the settings

// Design Tokens
// Design tokens are used to define the look and feel of your application.
// They can be used to define the colors, fonts, spacing, and other design elements.
/*
styleStrictMode - A boolean value that determines whether the builder should enforce strict mode.
designTokensOptional - A boolean value that determines whether design tokens are optional.
designTokens - An object that defines the design tokens for the application.
*/

Builder.register("editor.settings", {
  styleStrictMode: false,
  designTokensOptional: true,
  designTokens: {
    colors: []
  },
});
