# Portfolio 2.0

A modern multi-language personal portfolio built with Next.js, TypeScript, Tailwind CSS, and next-i18next. The design is based on a layout by UI/UX designer [**Yanka Darelova**](https://www.darelova.com/).

## Project Overview

- Futuristic IDE-themed UI with an interactive Snake game on the homepage
- Fully responsive layout
- Internationalization (i18n) support — English and Traditional Chinese
- Modular architecture with clear separation between pages, sections, and components

## Tech Stack

- [Next.js](https://nextjs.org/) — React framework (Pages Router)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS framework
- [next-i18next](https://github.com/i18next/next-i18next) — i18n for Next.js
- [Lucide React](https://lucide.dev/) — Icon library
- [ESLint](https://eslint.org/) — Code linting

## Multi-language Support

Translations live under `public/locales/`:

```
public/locales/
├── en/common.json   # English
└── zh/common.json   # Traditional Chinese
```

## Project Structure

```
├── public/
│   └── locales/
│       ├── en/common.json
│       └── zh/common.json
├── src/
│   ├── components/
│   │   └── layout/
│   │       ├── Layout.tsx
│   │       ├── Navbar.tsx
│   │       └── Footer.tsx
│   ├── pages/
│   │   ├── _app.tsx
│   │   ├── _document.tsx
│   │   ├── index.tsx
│   │   ├── about.tsx
│   │   ├── projects.tsx
│   │   └── contact.tsx
│   ├── sections/
│   │   └── hello/
│   │       ├── index.tsx
│   │       ├── HeroLeft.tsx
│   │       ├── SnakeGame.tsx
│   │       └── GameControls.tsx
│   └── styles/
│       └── globals.css
├── next-i18next.config.js
├── next.config.ts
├── tailwind.config.js
└── tsconfig.json
```

## Design Credits

UI design based on a Figma template by [**Yanka Darelova**](https://www.darelova.com/).

## References

- [Next.js Documentation](https://nextjs.org/docs)
- [next-i18next Guide](https://github.com/i18next/next-i18next)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
