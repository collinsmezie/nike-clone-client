# Nike Clone - Full Stack Application

A full-stack Nike e-commerce clone built with modern web technologies featuring authentication, product browsing with server-side filtering, and responsive design.

## Tech Stack

### Backend
- **NestJS** - Node.js framework
- **Prisma ORM** - Database ORM with SQLite
- **JWT Authentication** - Secure user authentication
- **bcrypt** - Password hashing

### Frontend
- **React + TypeScript** - UI library with type safety
- **Vite** - Build tool and dev server
- **React Router v7** - Client-side routing
- **React Query (TanStack Query)** - Data fetching and caching
- **React Hook Form + Zod** - Form handling and validation
- **TailwindCSS** - Utility-first CSS framework
- **Axios** - HTTP client

## Features

✅ User authentication (Sign up / Sign in) with JWT
✅ Product listing with server-side filtering
✅ Filter by category, size, color, and price range
✅ Search functionality
✅ Product details page with:
  - Image gallery
  - Color selector
  - Size selector
  - Reviews with star ratings
  - Product recommendations
✅ Responsive design (mobile, tablet, desktop)
✅ Database seeded with Nike products

## Project Structure

```
nike-clone/
├── backend/              # NestJS backend
│   ├── prisma/
│   │   ├── schema.prisma # Database schema
│   │   └── seed.ts       # Database seeding
│   └── src/
│       ├── auth/         # Authentication module
│       ├── products/     # Products module
│       └── main.ts       # Entry point
├── frontend/             # React frontend
│   └── src/
│       ├── pages/        # Page components
│       ├── hooks/        # React hooks
│       ├── lib/          # Utilities
│       └── types/        # TypeScript types
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation & Running

#### 1. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Run database migrations
npx prisma migrate dev --name init

# Seed database with mock data
npx prisma db seed

# Start backend server
npm run start:dev
```

Backend will run on **http://localhost:3000**

**Available API Endpoints:**
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `GET /products` - Get products (with filters)
- `GET /products/:id` - Get product details
- `GET /products/:id/recommendations` - Get product recommendations

#### 2. Frontend Setup

```bash
cd frontend

# Install dependencies (if not already done)
npm install

# Start development server
npm run dev
```

Frontend will run on **http://localhost:5173**

### Test Credentials

Use these credentials to test the application:
- **Email:** test@nike.com
- **Password:** password123

Or create a new account via the Sign Up page.

## API Features

### Server-Side Filtering
Products can be filtered by:
- `category` - Filter by product category
- `size` - Filter by available size
- `color` - Filter by color name
- `minPrice` & `maxPrice` - Filter by price range
- `search` - Search in product name and description
- `skip` & `take` - Pagination

Example:
```
GET /products?category=Men's Shoes&size=9&minPrice=50&maxPrice=150
```

## Database Schema

- **User** - User accounts with authentication
- **Product** - Product information
- **ProductImage** - Product images
- **ProductColor** - Available colors
- **ProductSize** - Available sizes and stock status
- **ProductDetail** - Product specifications
- **Review** - Customer reviews with ratings

## Development

### Backend Development
```bash
cd backend
npm run start:dev  # Watch mode with hot reload
```

### Frontend Development
```bash
cd frontend
npm run dev  # Vite dev server with HMR
```

### Build for Production

**Backend:**
```bash
cd backend
npm run build
npm run start:prod
```

**Frontend:**
```bash
cd frontend
npm run build
npm run preview  # Preview production build
```

## Environment Variables

### Backend (.env)
```
DATABASE_URL="file:./prisma/dev.db"
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:3000
```

## Responsive Design

The application is fully responsive across:
- **Mobile** (< 768px) - Stack layout, mobile navigation
- **Tablet** (768px - 1024px) - 2-column grid
- **Desktop** (> 1024px) - Full layout with sidebar filters

## Future Enhancements

- [ ] Shopping cart functionality
- [ ] Checkout and payment integration
- [ ] User profile and order history
- [ ] Admin panel for product management
- [ ] OAuth integration (Google, Apple)
- [ ] Wishlist/Favorites persistence
- [ ] Product reviews submission
- [ ] Automated testing (Jest, Vitest)

## License

MIT License - feel free to use this project for learning purposes.

## Credits

Designed and developed as a full-stack demonstration project showcasing modern web development practices.
