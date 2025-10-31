# Yatzyregler.com - Next.js Recreation

A modern Next.js recreation of yatzyregler.com with i18n support, matching the original design and styling.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the site.

### 3. Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
nextjs-site/
├── src/
│   ├── app/                 # Next.js 13+ App Router
│   │   ├── layout.tsx       # Root layout with Header/Footer
│   │   ├── page.tsx         # Homepage
│   │   ├── globals.css      # Global styles
│   │   └── page.module.css  # Homepage styles
│   │
│   └── components/          # Reusable components
│       ├── Header.tsx       # Site header with navigation
│       ├── Footer.tsx       # Site footer
│       └── CasinoCard.tsx   # Casino listing card
│
├── public/
│   └── images/             # All images (297 files, 19MB)
│
├── next.config.js          # Next.js config with i18n
└── package.json           # Dependencies
```

## 🎨 Design Features

### Styling
- **Fonts**: Rubik (headings) and Nunito (body text) from Google Fonts
- **Colors**: Purple/blue gradient theme matching the original
- **Layout**: Responsive grid layout with mobile-first design
- **Components**: Modular CSS Modules for scoped styling

### Components

#### Header
- Sticky header with logo
- Responsive navigation menu
- Mobile hamburger toggle

#### CasinoCard
- Card-based casino listings
- Features list with checkmarks
- Rating display
- Call-to-action button

#### Footer
- Multi-column layout
- Language switcher (6 languages)
- Links to all major pages
- Responsive grid

## 🌍 Internationalization (i18n)

Configured for 6 locales:
- `sv` - Swedish (default)
- `da` - Danish
- `no` - Norwegian
- `fi` - Finnish
- `es` - Spanish
- `en` - English

## 📝 Adding Content

### 1. Create a New Page

Create a new file in `src/app/`:

```tsx
// src/app/yatzy-regler/page.tsx
export default function YatzyRegler() {
  return (
    <div className="container">
      <h1>Yatzy Regler</h1>
      {/* Your content */}
    </div>
  );
}
```

### 2. Use Scraped Content

Import markdown content from `../content/`:

```tsx
import fs from 'fs';
import matter from 'gray-matter';

// Read markdown file
const content = fs.readFileSync('content/sv/yatzy-regler.md', 'utf-8');
const { data, content: markdown } = matter(content);
```

### 3. Add to Navigation

Update `src/components/Header.tsx` to add new menu items.

## 🖼️ Images

All 297 images are in `/public/images/`:
- Automatically downloaded from yatzyregler.com
- Optimized WebP format
- Ready to use with Next.js `<Image>` component

Example:
```tsx
import Image from 'next/image';

<Image
  src="/images/yatzy-regler.webp"
  alt="Yatzy Regler"
  width={800}
  height={400}
/>
```

## 🔧 Customization

### Colors

Edit CSS variables in `src/app/globals.css`:

```css
:root {
  --color-primary: #6366f1;     /* Main purple */
  --color-secondary: #8b5cf6;   /* Secondary purple */
  --color-accent: #ec4899;      /* Pink accent */
  /* ... */
}
```

### Fonts

Change fonts in `src/app/globals.css`:

```css
@import url('https://fonts.googleapis.com/...');

:root {
  --font-primary: 'Rubik', sans-serif;
  --font-secondary: 'Nunito', sans-serif;
}
```

## 📦 Next Steps

1. **Add More Pages**: Create pages for each scraped content file
2. **MDX Integration**: Use `next-mdx-remote` or `contentlayer` for markdown rendering
3. **SEO**: Add meta tags and structured data
4. **Analytics**: Add Google Analytics or similar
5. **CMS**: Connect to a headless CMS if needed

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: CSS Modules
- **Images**: Next.js Image Optimization
- **Fonts**: Google Fonts (Rubik, Nunito)

## 📄 License

Based on the original yatzyregler.com design.
