# 🌟 Portfolio 2.0

A modern personal portfolio website built with **Next.js** and **TypeScript**, featuring multi-language support (English & Traditional Chinese), responsive layout, and clean design.

## 🛠️ Tech Stack

- [Next.js](https://nextjs.org/) — React framework for production
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS framework
- [next-i18next](https://github.com/i18next/next-i18next) — Internationalization (i18n)
- [ESLint](https://eslint.org/) & [Prettier](https://prettier.io/) — Code linting & formatting

## 🌐 Internationalization (i18n)

This project supports English and Traditional Chinese using `next-i18next`.

- Language files are located in:  
  `public/locales/en/common.json`  
  `public/locales/zh/common.json`
- Configuration files:  
  `next-i18next.config.js`  
  `next.config.ts`
- Language switching via:  
  ```ts
  i18n.changeLanguage('zh'); 
  ```

## 📁 Project Structure

```
├── public/
│   └── locales/
│       ├── en/
│       │   └── common.json
│       └── zh/
│           └── common.json
├── src/
│   ├── components/
│   ├── pages/
│   │   ├── index.tsx
│   │   ├── about.tsx
│   │   ├── contact.tsx
│   │   └── projects.tsx
│   └── utils/
│       └── i18n.ts
├── next-i18next.config.js
├── next.config.ts
├── tailwind.config.js
├── eslint.config.mjs
└── tsconfig.json
```

## 🎨 Design Credits

UI design is based on a Figma template created by [**Yanka Darelova**](https://www.darelova.com/).  
Inspired by her clean aesthetic and modern visual style.

## 📚 References

- [Next.js Documentation](https://nextjs.org/docs)
- [next-i18next Guide](https://github.com/i18next/next-i18next)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
