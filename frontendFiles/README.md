# BHK Boat Service - Unified Website

A unified React application for Bhitarkanika Boat Service, integrating three separate pages into a single, cohesive website with routing and shared components.

## 🚀 Features

- **Unified Navigation**: Consistent TopBar, Navbar, and Footer across all pages
- **Multi-page Application**: Home, Services, and Booking pages with React Router
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern UI Components**: Reusable components with Framer Motion animations
- **Booking System**: Interactive calendar and form for tour bookings
- **Service Information**: Detailed boat tour packages and pricing

## 📁 Project Structure

```
bhk-boat-service-unified/
├── public/
│   ├── 01f6133dfdcfc2bf1b89340f988d808dad7a86c2.jpg
│   ├── WhatsApp Image 2025-09-13 at 23.47.29_b35c9502.jpg
│   └── vite.svg
├── src/
│   ├── assets/
│   │   └── fonts/
│   │       └── LT Highlight.otf
│   ├── components/
│   │   ├── Layout.jsx          # Main layout wrapper
│   │   ├── TopBar.jsx          # Top contact bar
│   │   ├── Navbar.jsx          # Navigation with routing
│   │   ├── Footer.jsx          # Footer with links
│   │   ├── Hero.jsx            # Landing page hero
│   │   ├── About.jsx           # About section
│   │   ├── BoatTours.jsx       # Tours showcase
│   │   ├── Reviews.jsx         # Customer reviews
│   │   ├── Contact.jsx         # Contact form
│   │   ├── BoatCard.jsx        # Tour card component
│   │   ├── InfoCard.jsx        # Info display cards
│   │   └── CTASection.jsx      # Call-to-action section
│   ├── pages/
│   │   ├── HomePage.jsx        # Landing page
│   │   ├── ServicesPage.jsx    # Services and pricing
│   │   └── BookingPage.jsx     # Booking form
│   ├── App.jsx                 # Main app with routing
│   ├── main.jsx               # Entry point
│   └── index.css              # Global styles
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## 🛠️ Technologies Used

- **React 18.3.1** - Frontend framework
- **React Router DOM 6.26.1** - Client-side routing
- **Vite** - Build tool and dev server
- **Tailwind CSS 3.4.0** - Utility-first CSS framework
- **Framer Motion 10.16.4** - Animation library
- **Lucide React 0.454.0** - Icon library

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone or navigate to the project directory:**
   ```bash
   cd "bhk boat service"
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser and visit:**
   ```
   http://localhost:3000
   ```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📱 Pages

### 1. Home Page (`/`)
- Hero section with animated text
- About Bhitarkanika section
- Featured boat tours
- Customer reviews
- Contact information

### 2. Services Page (`/services`)
- Detailed tour packages
- Pricing information
- Boat capacity and timings
- Entry fees
- On-site services

### 3. Booking Page (`/booking`)
- Interactive calendar
- Time slot selection
- Guest count input
- Booking form validation

## 🎨 Design System

### Colors
- **Primary Green**: `#6C733D` (bhitarkanika-green)
- **Light Green**: `#6B8E4A` (bhitarkanika-light-green)
- **Dark**: `#2C2C2C` (bhitarkanika-dark)
- **Footer**: `#1A1A1A` (bhitarkanika-footer)
- **Background**: `#F8F9FA` (bhitarkanika-gray)

### Typography
- **Headings**: Amaranth (Google Fonts)
- **Body**: Inter (System fonts)
- **Special**: LT Highlight (Custom font)

### Components
- Reusable button styles (btn-primary, btn-secondary, btn-outline)
- Consistent spacing and layout utilities
- Responsive grid systems

## 🔧 Customization

### Adding New Pages
1. Create a new component in `src/pages/`
2. Add the route in `src/App.jsx`
3. Update navigation in `src/components/Navbar.jsx`

### Styling
- Modify `tailwind.config.js` for theme customization
- Update `src/index.css` for global styles
- Use Tailwind utility classes for component styling

### Content Updates
- Tour information: `src/pages/ServicesPage.jsx`
- Contact details: `src/components/TopBar.jsx` and `src/components/Footer.jsx`
- Hero content: `src/components/Hero.jsx`

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

### Recommended Hosting
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

## 📞 Contact Information

- **Email**: stayandsailbhitarkanika@gmail.com
- **Phone**: +91 9049303893
- **Location**: Bhitarkanika Wildlife Sanctuary, Odisha, India

## 📄 License

This project is proprietary and confidential. All rights reserved.

---

**BHK Boat Service** - Experience the beauty of Bhitarkanika National Park with our exclusive boat tours.
