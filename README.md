<p align="center">
  <img src="public/images/logo.png" alt="TULSANOFF logo" width="180" />
</p>

<h1 align="center">TULSANOFF</h1>

<p align="center">
  Homepage for **TULSANOFF** — a massage studio website built with React, TypeScript, and Vite.
</p>

<p align="center">
  <img src="public/images/hero.jpg" alt="TULSANOFF hero" width="720" />
</p>

## Tech Stack

| Layer | Tool |
|-------|------|
| Framework | React 19 + TypeScript |
| Build | Vite 8 |
| Linting | Oxlint |
| Styling | CSS Modules |
| Typography | Inter (variable) |
| i18n | react-intl |

## Getting Started

```bash
npm install
npm run dev
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Type-check + production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run Oxlint |

## Project Structure

```
src/
├── components/    # UI components, each with a CSS module
├── i18n/          # Locale files (en-US.json + future locales)
├── assets/        # Static assets
├── App.tsx        # Root component
└── main.tsx       # Entry point
```

## i18n

All user-facing copy lives in locale files under `src/i18n/` as message IDs. The default locale is `en-US`; additional locales are planned.

## Gallery

<p align="center">
  <img src="public/images/gallery-1.jpg" alt="Gallery" width="32%" />
  <img src="public/images/gallery-2.jpg" alt="Gallery" width="32%" />
  <img src="public/images/gallery-3.jpg" alt="Gallery" width="32%" />
</p>

## License

Private — not for distribution.
