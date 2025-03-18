# Next.js + Builder.io Localized Starter Template

A minimalist, production-ready starter template for creating localized websites with Next.js 15, Builder.io, and Zustand for state management.

## 🌐 Features

- **Multi-language Support**: Built-in locale routing and content management
- **Builder.io Integration**: Visual content editing with powerful CMS capabilities
- **Zustand State Management**: Simple and efficient state management for locale preferences
- **Next.js 15 App Router**: Modern and efficient routing with React Server Components
- **TypeScript**: Type-safe code development
- **Optimized Performance**: Proper caching strategies for Builder.io content

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17 or later
- Builder.io account with API key

### Installation

1. Clone this repository:
```bash
git clone https://github.com/your-username/nextjs-builder-localized-starter.git
cd nextjs-builder-localized-starter
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with your Builder.io API key:
```env
NEXT_PUBLIC_BUILDER_API_KEY=your_builder_api_key
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🌍 Localization Setup

### Supported Locales

The template comes with support for the following locales:
- English (`en`)

You can add more locales in `src/utils/builderUtils.ts` by updating the `VALID_LOCALES` array.
and adding the locales to your builder.io space

### URL Structure

The localized content uses the following URL pattern:
- `/{locale}` - Homepage in a specific locale (e.g., `/en`, `/fr`)
- `/{locale}/{path}` - Content pages in a specific locale (e.g., `/en/about`, `/fr/contact`)

If no locale is specified, it defaults to English (`en`).

### Builder.io Content Models

For this template to work properly, you need to create a content model in Builder.io:

1. Go to your Builder.io dashboard
2. Navigate to Models → Create Model
3. Name it `page`
4. Set the path to return dynamically `http://localhost:3000/${!locale || locale === "Default" ? "en" : locale}${targeting?.urlPath || ''}`;


## 🧩 How It Works

### 1. Locale Detection

The locale is detected from the URL path and stored in the Zustand store (`useLocaleStore.ts`). The store is initialized on the client side.

### 2. Content Fetching

Content is fetched from Builder.io based on the current locale and URL path. The `fetchBuilderContent` function in `builderUtils.ts` handles this with proper caching strategies.

### 3. Rendering

The fetched content is passed to the `RenderBuilderContent` component, which renders the Builder.io content with the specified locale.

## 🛠️ Customization

### Adding New Locales

1. Update the `VALID_LOCALES` array in `src/utils/builderUtils.ts`
2. Add the new locale to your Builder.io targeting attributes

### Custom Styling

The template uses CSS variables for styling. You can customize the appearance by modifying the CSS files in the `src/app/assets` directory.

### Adding Components

Register custom components for Builder.io in the `src/builder-registry.ts` file.

### Component Structure

Components in this project follow a standardized file structure pattern for better organization and separation of concerns:

1. **`component-name.tsx`** - The main component file containing the React component logic and rendering.
   
2. **`component-name.module.css`** - CSS module file containing component-specific styles.
   
3. **`component-name.setup.ts`** - Contains TypeScript interfaces, types, and default props for the component.
   
4. **`component-name.registry.ts`** - Registers the component with Builder.io and defines how it will appear in the Builder.io editor, including customizable inputs and properties.

#### Example: ImageGallery Component

The ImageGallery component demonstrates this structure:

- **`ImageGallery.tsx`** - Contains the component implementation with image grid layout and lightbox functionality.
  
- **`ImageGallery.module.css`** - Styling for the gallery, carousel animation, and image layouts.
  
- **`ImageGallery.setup.ts`** - Defines interfaces for image items, gallery settings, styling options, and default values.
  
- **`ImageGallery.registry.ts`** - Registers the component with Builder.io and defines editable properties for marketers such as images, animation speed, overlay settings, and styling options.

When creating new components for Builder.io, follow this pattern to maintain consistency and make components easily configurable through the Builder.io interface.

## 📚 Additional Resources

- [Builder.io Documentation](https://www.builder.io/c/docs/intro)
- [Next.js Documentation](https://nextjs.org/docs)
- [Zustand Documentation](https://zustand.docs.pmnd.rs/)
