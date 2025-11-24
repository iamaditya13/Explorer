# Explorers Travel Website

A modern, responsive travel booking website built with Next.js 16, featuring a clean UI/UX design and optimized performance.

## Features

- 🎨 Modern UI/UX with clean card-based design
- 🚀 Performance optimized with lazy loading and memoization
- 📱 Fully responsive across all devices
- ✨ Subtle animations and transitions
- 🔍 Advanced package filtering and search
- ❤️ User favorites system
- 🔐 Authentication system
- 📦 Package booking and inquiry forms
- 🌍 Multiple destinations and themes

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Fonts**: Geist, Playfair Display

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd flamingo-travels-clone
```

2. Install dependencies:
```bash
pnpm install
# or
npm install
```

3. Run the development server:
```bash
pnpm dev
# or
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
pnpm build
pnpm start
```

## Project Structure

```
├── app/                  # Next.js app directory
│   ├── packages/        # Package listing and detail pages
│   ├── themes/          # Theme pages
│   ├── destinations/    # Destination pages
│   └── ...              # Other routes
├── components/          # Reusable components
│   ├── ui/             # shadcn/ui components
│   └── ...             # Custom components
├── lib/                # Utilities and helpers
│   ├── storage.tsx     # Data management
│   └── auth.tsx        # Authentication logic
└── public/             # Static assets

```

## Key Features

### Performance Optimizations
- Memoized expensive computations with `useMemo`
- Lazy loading for images with proper `sizes` attribute
- Optimized component rendering
- Professional loading states

### UI/UX Improvements
- Clean card-based design
- Subtle fade-in and stagger animations
- Streamlined header with hamburger menu
- Redesigned package detail pages
- Improved CTA banners

### Responsive Design
- Mobile-first approach
- Optimized for all screen sizes
- Touch-friendly interactions

## Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=<your-repo-url>)

### Other Platforms
- Compatible with any Node.js hosting platform
- Supports static export (with modifications)

## License

This project is for educational purposes.

## Acknowledgments

- UI/UX inspiration from modern travel websites
- Icons from Lucide React
- Fonts from Google Fonts
