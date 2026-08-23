# GurukulTv News Portal

A modern, mobile-first, bilingual (Nepali / English) news portal with a full-featured admin panel — built as a **frontend-only** React application backed by mock JSON data (no server or database required).

## ✨ Features

### Public Portal
- Homepage with breaking news ticker banner, featured slider, latest news, trending, and category-wise sections
- Category listing pages and full news detail pages with related news and social sharing
- Search with live autocomplete and a dedicated results page
- Video listing and detail pages with embedded YouTube playback (paste any YouTube URL format)
- Photo gallery listing, album detail, and full-image viewer
- About, Contact, Privacy Policy, and Terms pages
- Contact form with direct contact info and social links in the footer
- Ad placements across header, sidebar, in-feed, and footer positions
- Nepali/English language switcher, with Nepali date formatting throughout
- Fully responsive across mobile, tablet, and desktop

### Admin Panel
- Secure login, forgot/reset password flow, change password, and logout
- Dashboard with summary stats and recent activity
- **News**: create/edit/preview/publish, bilingual (NE/EN) fields, tags, featured & breaking flags, filters, pagination
- **Categories**: create/edit, reorder, enable/disable, delete
- **Advertisements**: image/link/placement, active date scheduling, enable/disable, preview
- **Videos**: YouTube-link-based entries with auto-fetched thumbnails
- **Gallery**: multi-image upload, captions, cover image, drag-to-reorder
- **Contact Messages**: inbox list and message detail view
- **Settings**: site logo, contact details, social media links
- Static page editors for About / Privacy / Terms
- Confirmation dialogs, loading/empty/error states throughout

## 🛠 Tech Stack

- [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- [React Router](https://reactrouter.com/) v7
- [Tailwind CSS](https://tailwindcss.com/) v4
- [react-icons](https://react-icons.github.io/react-icons/)
- [nepali-date-converter](https://www.npmjs.com/package/nepali-date-converter) for Bikram Sambat dates
- Mock data via local JSON — no backend/database

## 📁 Project Structure

```
src/
├── components/          # Shared UI (NewsCard, Header, Footer, Banner, SearchBar, ...)
│   └── admin/
│       └── common/      # Reusable admin building blocks (FormField, Pagination, ConfirmDialog, ...)
├── context/              # React Context providers (News, Categories, Ads, Gallery, Video,
│                          #   Settings, Language, Admin Auth, Contact Messages, About/Privacy/Terms)
├── pages/                # Route-level pages
│   └── admin/            # Admin panel pages
├── utils/                # Helpers (YouTube parsing, date/time, localization, file handling)
├── locales/               # en.json / ne.json translation strings
├── App.jsx               # Route definitions
└── main.jsx               # App entry point
```

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) 18 or later
- npm (comes with Node.js)

### Installation

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Other Scripts

```bash
npm run build     # Production build to /dist
npm run preview   # Preview the production build locally
npm run lint       # Run oxlint
```

## 🔑 Admin Access

The admin panel is available at **`/admin/login`**.

| Field    | Default value |
|----------|----------------|
| Username | `admin`         |
| Password | `********`      |

> Since this build has no backend, login state and any password change are stored in `sessionStorage` and reset when the browser session ends. The "forgot/reset password" flow is simulated for demo purposes only — no email is actually sent.

## 🌐 Language Support

The site supports **Nepali (default)** and **English**, switchable from the header. Translation strings live in `src/locales/ne.json` and `src/locales/en.json`. Admin content forms (News, Categories, Gallery) collect Nepali and English fields separately so both languages can be maintained independently.

## 📦 Data & Persistence

All content (news, categories, ads, videos, gallery, settings, messages) is seeded from local mock data and managed in-memory via React Context during a session. There is no database — refreshing the browser after adding content through the admin panel will reset it to the seed data. This is expected behavior for the current frontend-only phase.

## 📱 Responsive Design

Layouts are built mobile-first with Tailwind breakpoints (`sm`, `md`, `lg`, `xl`), covering phone, tablet, and desktop viewports across both the public site and admin panel.

## 📄 License

Internal project — not licensed for public redistribution.