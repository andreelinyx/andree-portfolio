# PERN Portfolio

A personal portfolio website built with the PERN stack:

- PostgreSQL for optional persistent portfolio data
- Express for the JSON API and production static server
- React for the component-based frontend
- Node.js for running the API and project tooling

The visual direction is a soft editorial portfolio with cream paper, warm chocolate typography, powder-blue panels, chartreuse accents, and an interactive scrapbook-style hero. The content is tailored to Andree Lin Yiew Xuan's resume, including computer science education, research, product experience, academic projects, skills, resume download, GitHub, and LinkedIn.

## Run Locally

```bash
npm install
npm run build
npm start
```

Open `http://127.0.0.1:3000`.

Use Node 20, 22, or 24 for this project. Node 25 is outside the supported range and may warn during install.

For frontend development with hot reload:

```bash
npm run dev
```

This runs Express on port `3000` and Vite/React on port `5173`. Vite proxies `/api` requests to Express.

## PostgreSQL

PostgreSQL is optional for an immediate local preview. Without `DATABASE_URL`, the API serves the seed object from `server/data/portfolio.js`.

To use PostgreSQL:

1. Create a database named `pern_portfolio`.
2. Copy `.env.example` to `.env`.
3. Update `DATABASE_URL` with your PostgreSQL username and password.
4. Start the app with `npm start` or `npm run dev`.

The server automatically creates the `portfolio_profiles` table and seeds it on the first connection. The equivalent SQL is also available in `server/schema.sql`.

## How The App Works

1. React mounts in `src/main.jsx`.
2. `App.jsx` requests `/api/profile` with `fetch` inside `useEffect`.
3. Express queries PostgreSQL through the `pg` connection pool.
4. If PostgreSQL is unavailable, Express returns the local seed object.
5. React stores the response with `useState` and renders the portfolio sections.
6. A Vite production build is written to `dist/`, which Express serves in production.

## File Guide

`package.json`
Defines the React, PostgreSQL, Express, and Vite dependencies and project scripts.

`server/index.js`
The Express server. It creates the PostgreSQL connection pool, initializes and seeds the table, exposes `/api/health` and `/api/profile`, and serves the React build from `dist/`.

`server/schema.sql`
Standalone PostgreSQL table definition. The server runs the same table creation automatically.

`server/data/portfolio.js`
Seed and fallback portfolio content. Edit this file to change the default name, email, resume link, profile links, education, research, stats, skills, projects, experience, and services.

`src/main.jsx`
React entrypoint. It mounts `<App />` into the `#root` element in `index.html`.

`src/App.jsx`
Main React component. It loads the profile API, manages loading/error/profile state with hooks, and renders every portfolio section.

`src/App.css`
Component styling for the Pinterest-template visual design and responsive layouts.

`src/styles.css`
Global page styling such as box sizing, body background, font stack, and selection colors.

`public/Andree_Resume.pdf`
Resume file served publicly by Vite and Express. The download buttons point to `/Andree_Resume.pdf`.

`index.html`
Vite HTML entrypoint containing the React root element and metadata.

`vite.config.mjs`
Vite configuration, React plugin, development host/port, API proxy, and build output directory.

`.env.example`
Example Express and PostgreSQL environment variables.

## Scripts

- `npm run client`: starts the Vite React development server.
- `npm run server`: starts Express only.
- `npm run dev`: starts React and Express together.
- `npm run build`: builds React into `dist/`.
- `npm run preview`: previews the Vite production build.
- `npm start`: serves the built React app and API through Express.

## Editing Portfolio Content

Without PostgreSQL, edit `server/data/portfolio.js` and restart Express. This is where Andree's resume-based portfolio content lives.

With PostgreSQL connected, edit the row in `portfolio_profiles`. The links, arrays, and nested collections are stored in JSONB columns.
