# Birthday Website for Anastasia

## Overview

This is a birthday celebration website built for Anastasia using a full-stack TypeScript architecture. The application features an interactive birthday experience with a countdown timer, candle-blowing simulation using microphone input, mini-games, photo galleries, and personalized love letters. The project uses React with Vite for the frontend, Express for the backend, and is configured to use PostgreSQL with Drizzle ORM for data persistence.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System:**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server, configured with HMR (Hot Module Replacement)
- Wouter for lightweight client-side routing

**UI Component Library:**
- Shadcn/ui component system (New York style) with Radix UI primitives
- Tailwind CSS for styling with custom CSS variables for theming
- Custom color scheme optimized for a birthday/princess theme (pink, purple, and pastel colors)
- Framer Motion for animations and interactive effects

**State Management:**
- TanStack Query (React Query) for server state management and caching
- React Hook Form with Zod resolvers for form validation
- Local state management using React hooks

**Custom Features:**
- Microphone API integration for voice-activated candle blowing (`use-microphone` hook)
- Interactive components: birthday cake, countdown timer, mini-games (balloon pop, heart catching, memory game)
- Floating particle effects and confetti animations
- Photo gallery with hover effects

**Font Stack:**
- Playfair Display (serif) for elegant headings
- Poppins (sans-serif) for body text
- Dancing Script (cursive) for decorative elements

### Backend Architecture

**Server Framework:**
- Express.js with TypeScript
- Custom Vite middleware integration for development
- Request/response logging middleware
- JSON body parsing with raw body preservation for webhook compatibility

**Server Structure:**
- Modular route registration system (`registerRoutes`)
- Storage abstraction layer with interface-based design (`IStorage`)
- In-memory storage implementation (`MemStorage`) as the default, designed to be swapped with database implementation

**API Design:**
- RESTful API pattern with `/api` prefix for all endpoints
- Centralized error handling
- Session-based authentication support (configured for connect-pg-simple)

### Data Storage Solutions

**Database:**
- PostgreSQL as the target database
- Drizzle ORM for type-safe database operations
- Migration system configured with output to `./migrations` directory

**Schema Design:**
- Users table with UUID primary keys (using `gen_random_uuid()`)
- Username/password authentication fields
- Drizzle-Zod integration for runtime validation

**Storage Pattern:**
- Abstract storage interface allows switching between in-memory and database implementations
- CRUD operations abstracted behind `IStorage` interface
- Currently using `MemStorage` for development; production should use database-backed implementation

**Session Management:**
- Configured for PostgreSQL session store (`connect-pg-simple`)
- Cookie-based session handling

### External Dependencies

**Database & ORM:**
- `@neondatabase/serverless`: Neon serverless PostgreSQL driver
- `drizzle-orm`: Type-safe ORM
- `drizzle-kit`: Database migration tool
- `connect-pg-simple`: PostgreSQL session store for Express

**UI Component Libraries:**
- `@radix-ui/*`: Accessible, unstyled component primitives (accordion, dialog, dropdown, select, toast, etc.)
- `framer-motion`: Animation library for React
- `embla-carousel-react`: Carousel/slider component
- `cmdk`: Command menu component

**Form & Validation:**
- `react-hook-form`: Form state management
- `@hookform/resolvers`: Validation resolvers
- `zod`: Schema validation
- `drizzle-zod`: Drizzle schema to Zod validation bridge

**Utilities:**
- `clsx` & `tailwind-merge`: CSS class management
- `class-variance-authority`: Component variant management
- `date-fns`: Date manipulation and formatting
- `nanoid`: Unique ID generation

**Development Tools:**
- `@replit/vite-plugin-*`: Replit-specific development enhancements (error modal, cartographer, dev banner)
- `tsx`: TypeScript execution for Node.js
- `esbuild`: Fast bundler for production builds

**APIs Used:**
- Web Audio API (via `AudioContext`) for microphone input processing
- MediaDevices API (`getUserMedia`) for microphone access