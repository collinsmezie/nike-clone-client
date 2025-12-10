# Nike Clone - Frontend Client Application

A modern, responsive e-commerce web application built with React, TypeScript, and Vite. This client application provides a Nike-inspired shopping experience with product browsing, filtering, authentication, and cart management.

## Features

- **User Authentication**: Secure sign-up and sign-in functionality with JWT token-based authentication
- **Product Browsing**: Browse products with a clean, modern interface
- **Product Filtering**: Advanced filtering by category, gender, sport, shoe height, and price range
- **Product Details**: Detailed product pages with comprehensive information
- **Shopping Cart**: Add products to cart and manage your selections
- **Protected Routes**: Authentication-required routes for product pages
- **Responsive Design**: Mobile-first design built with Tailwind CSS

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **React Query (TanStack Query)** - Server state management and data fetching
- **Axios** - HTTP client for API requests
- **React Hook Form** - Form handling and validation
- **Zod** - Schema validation
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library

## Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn package manager

## Installation

Install dependencies:

```bash
npm install
```

## Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the next available port).

## Building for Production

Build the application for production:

```bash
npm run build
```

The production build will be created in the `dist` directory.

Preview the production build locally:

```bash
npm run preview
```

## Linting

Run ESLint to check for code quality issues:

```bash
npm run lint
```

## Project Structure

```
nike-clone-client/
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── ui/         # Base UI components
│   │   └── layout/     # Layout components
│   ├── contexts/       # React context providers (Auth, Cart)
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions and API client
│   ├── pages/          # Page components
│   ├── types/          # TypeScript type definitions
│   ├── App.tsx         # Main application component
│   └── main.tsx        # Application entry point
├── public/             # Static assets
├── dist/               # Production build output
├── package.json        # Project dependencies and scripts
└── vite.config.ts      # Vite configuration
```

## Available Scripts

Run these commands from the root directory:

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Authentication

The application uses JWT tokens stored in localStorage for authentication. Protected routes require users to be authenticated before accessing product pages.

## API Integration

The frontend communicates with a backend API hosted on Railway. The API client is configured in `src/lib/api.ts` and automatically includes authentication tokens in request headers.

**Note:** The backend is hosted separately on Railway. This repository contains only the frontend client application.

## Browser Support

This application supports modern browsers including:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is part of a Nike clone application.
