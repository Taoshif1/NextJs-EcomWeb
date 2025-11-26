# ShopHub - Modern E-commerce Platform

🔗 **Live Demo:** [SHOPHUB](https://next-js-ecom-web.vercel.app/)

A full-stack e-commerce application built with Next.js 16 (App Router), featuring authentication, product management and a polished responsive UI.

## 🚀 Features

### Authentication System
- Credential-based login/registration
- Google OAuth integration
- Protected routes with NextAuth.js middleware
- Session management

### Public Pages
- Landing page with 7 sections (Hero, Features, Products, Testimonials, CTA)
- Product listing with search & category filters (UI)
- Individual product detail pages
- About & Contact pages
- Responsive sticky navbar with user dropdown
- Comprehensive footer

### Protected Pages (Login Required)
- Add Product form with validation
- Manage Products dashboard (view/delete)
- User-specific product filtering

### UI/UX Highlights
- Fully responsive design (mobile/tablet/desktop)
- Gradient color schemes and hover effects
- Consistent card layouts with animations
- Loading states and error handling
- Toast notifications

## 🛠️ Tech Stack

- **Frontend:** Next.js 16 (App Router), React 19, Tailwind CSS 4
- **Authentication:** NextAuth.js v4
- **Database:** MongoDB with Mongoose ODM
- **Deployment:** Vercel

## 📋 Prerequisites

- Node.js 18+ OR npm/yarn
- MongoDB Atlas account (or local MongoDB)
- Google Cloud Console project (for OAuth)

## ⚙️ Installation & Setup

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd shophub
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Environment Variables

Create a `.env.local` file in the root directory:
```env
# MongoDB
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?appName=Cluster0

# NextAuth
NEXTAUTH_SECRET=<generate-with: openssl rand -base64 32>
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Google OAuth (Optional)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

**Getting Google OAuth Credentials:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`

### 4. Run Development Server
```bash
npm run dev
# or
yarn dev
```

Visit [SHOPHUB - localhost:3000](http://localhost:3000)

### 5. Build for Production
```bash
npm run build
npm start
```

## 📁 Project Structure
```
shophub/
├── src/
│   ├── app/
│   │   ├── (pages)/
│   │   │   ├── page.jsx                 # Landing page
│   │   │   ├── about/page.jsx
│   │   │   ├── contact/page.jsx
│   │   │   ├── products/page.jsx        # Product listing
│   │   │   ├── products/[id]/page.jsx   # Dynamic Product details
│   │   │   ├── login/page.jsx
│   │   │   ├── register/page.jsx
│   │   │   ├── add-product/page.jsx     # Protected
│   │   │   └── manage-products/page.jsx # Protected
│   │   ├── api/
│   │   │   ├── auth/[...nextauth]/route.js
│   │   │   ├── register/route.js
│   │   │   └── products/
│   │   │       ├── route.js
│   │   │       └── [id]/route.js       # Dynamic
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   └── SessionProvider.jsx
│   │   ├── layout.jsx
│   │   ├── page.jsx
│   │   ├── globals.css
│   │   └── not-found.jsx
│   │   └── error.jsx
│   ├── lib/
│   │   ├── mongodb.js
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   └── Product.js
│   └── middleware.js
├── .env.local
├── package.json
└── README.md
```

## 🗺️ Route Summary

### Public Routes

| Route | Description |
|-------|-------------|
| `/` | Landing page with hero, features, testimonials |
| `/products` | Product listing with search/filter UI |
| `/products/[id]` | Individual product details |
| `/about` | Company information and values |
| `/contact` | Contact form and information |
| `/login` | Login with credentials or Google |
| `/register` | User registration |

### Protected Routes (Requires Authentication)

| Route | Description |
|-------|-------------|
| `/add-product` | Form to add new products |
| `/manage-products` | Dashboard to view/delete user's products |

### API Routes

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/[...nextauth]` | GET/POST | NextAuth endpoints |
| `/api/register` | POST | User registration |
| `/api/products` | GET | Fetch all products |
| `/api/products` | POST | Create new product |
| `/api/products/[id]` | GET | Get single product |
| `/api/products/[id]` | DELETE | Delete product |

## 🔐 Authentication Flow

1. **Registration:** User creates account → Password hashed with bcrypt → Stored in MongoDB
2. **Login:** Credentials verified → JWT session created → User redirected to home
3. **Google OAuth:** User clicks "Continue with Google" → OAuth flow → Auto-creates user account
4. **Protected Routes:** Middleware checks session → Redirects to `/login` if unauthenticated

## 🎨 UI Requirements Checklist

### ✅ Landing Page (7 Sections)
- Sticky responsive navbar with logo, 4+ routes, auth buttons/dropdown
- Hero section with headline, subtitle, CTA
- Features section with 3 cards
- Featured products grid (6 items)
- Testimonials section
- CTA section
- Footer with links and social icons

### ✅ Product Pages
- List page: title, description, search bar, category filter, 6+ cards
- Detail page: large image, full description, price, back button

### ✅ Protected Pages
- Add Product: form with title, descriptions, price, image URL, category
- Manage Products: table/grid with view/delete actions

### ✅ Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px)
- Hamburger menu for mobile

### ✅ Interactive Elements
- Hover effects on cards and buttons
- Dropdown menus
- Loading states
- Form validation
- Toast notifications

## 🚀 Deployment (Vercel)

1. Push code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables in project settings
4. Deploy!

**Important:** Update `NEXT_PUBLIC_BASE_URL` to your production URL.

## 📝 Known Issues & Limitations

- Search and category filters are UI-only (no backend logic as i'm learning NEXT.js now)
- Product images require external URLs (no upload functionality)
- No shopping cart or checkout flow
- User cannot edit products after creation

## 🤝 Contributing

This is a demo project for learning purposes. Feel free to fork and enhance only for learning purposes!


---

**Built with ❤️ using Next.js and Tailwind CSS**