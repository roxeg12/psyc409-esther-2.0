# University Student Portal

A modern, responsive landing page for a university student portal built with React, TypeScript, Vite, and Tailwind CSS.

## Project Structure

```
Project/
├── public/
│   └── (static assets)
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Navigation.tsx
│   │   └── ui/
│   │       └── (reusable UI components)
│   ├── pages/
│   │   ├── LandingPage.tsx
│   │   └── (sub-pages will be added here)
│   ├── routes/
│   │   └── AppRoutes.tsx
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   │   └── (helper functions)
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── postcss.config.js
```

## Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Preview production build:**
   ```bash
   npm run preview
   ```

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check for code issues

## Technologies Used

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework

## Features

- Responsive design
- TypeScript for type safety
- React Router for navigation with browser back/forward support
- Tailwind CSS for styling
- Component-based architecture
- Ready for sub-page implementation

## Development Notes

- This is a frontend-only project (backend functionality is stubbed)
- Sub-pages can be added in the `src/pages/` directory
- Routes are configured in `src/App.tsx`
- Type definitions are in `src/types/index.ts`
