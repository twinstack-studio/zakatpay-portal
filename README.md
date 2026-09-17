# ZakatPay Portal

[![CI](https://github.com/twinstack-studio/zakatpay-portal/actions/workflows/ci.yml/badge.svg)](https://github.com/twinstack-studio/zakatpay-portal/actions/workflows/ci.yml)
[![License: All rights reserved](https://img.shields.io/badge/License-All_rights_reserved-0f766e.svg)](./LICENSE)
[![Live Demo](https://img.shields.io/badge/Live_Demo-Open_Portal-0f766e.svg)](https://zakatpay-portal.vercel.app)

A zakat and donation portal for Pakistan. ZakatPay helps people work out the
zakat they owe, learn the rulings behind it, and find a trusted charity to give
to, all in one responsive web experience.

[**Open the live portal**](https://zakatpay-portal.vercel.app) ·
[**Work with TwinStack Studio**](mailto:hello.twinstackstudio@gmail.com)

> **Portfolio demo:** Checkout is simulated. No payment is processed and no card
> details are sent or stored. The charities listed are shown for demonstration
> only; this project is not affiliated with or endorsed by any of them.

## What the product delivers

### For donors

- Zakat calculator covering cash, bank balances, gold, silver, investments and business stock, checked against the silver nisab
- Directory of Pakistani charities with profiles, causes and a guided donate and checkout flow
- Sign-up and sign-in with email one-time codes, passwords or Google
- Personal dashboard and donation ledger for signed-in users
- Downloadable PDF documents, including an audit report and an e-book, generated in the browser

### Learning and engagement

- Islamic rulings, blogs, news and video library
- Built-in chatbot with quick replies for common zakat questions
- Animated 3D hero and page transitions, fully responsive on mobile and tablet

### Engineering highlights

- Express API with MongoDB for accounts, one-time codes and donation records
- JWT sessions; every donation route reads the account from the token, so users can only access their own records
- Google sign-in verified server-side with Google rather than trusting the client
- Configurable CORS allow-list, request size limits and a health check that reports database status
- Serverless-ready API entry point for Vercel, plus a Render blueprint

## Technology

| Layer | Stack |
| --- | --- |
| Frontend | React 19, React Router 7, Vite, Tailwind CSS 4, Framer Motion, Three.js |
| Backend | Node.js, Express 5, Mongoose |
| Data | MongoDB Atlas |
| Authentication | JWT, bcrypt, email one-time codes via Nodemailer, Google OAuth |
| Hosting | Vercel (frontend), Vercel serverless or Render (API) |

## Project structure

```text
zakatpay-portal/
├── frontend/   React + Vite single-page app
├── backend/    Express API (server.js locally, api/index.js on Vercel)
└── render.yaml Render blueprint for the API
```

## Run locally

Requirements: Node.js 20+ and a MongoDB database (MongoDB Atlas works).

```bash
git clone https://github.com/twinstack-studio/zakatpay-portal.git
cd zakatpay-portal

# API
cd backend
npm install
cp .env.example .env    # fill in MONGO_URI, JWT_SECRET, EMAIL_USER, EMAIL_PASS
npm run dev             # http://localhost:5001

# Frontend (in a second terminal)
cd frontend
npm install
npm run dev             # http://localhost:5173
```

The frontend reads `VITE_API_URL` from `frontend/.env.development` in local
development. All configuration is documented in
[`backend/.env.example`](./backend/.env.example) and
[`frontend/.env.example`](./frontend/.env.example).

## Useful commands

| Where | Command | What it does |
| --- | --- | --- |
| `backend/` | `npm run dev` | Start the API with auto-reload |
| `backend/` | `npm start` | Start the API in production mode |
| `backend/` | `npm run rotate` | Interactively update the secrets in `.env` |
| `frontend/` | `npm run dev` | Start the Vite dev server |
| `frontend/` | `npm run build` | Build the production bundle |

## Built by TwinStack Studio

TwinStack Studio builds full-stack websites, web applications, dashboards,
portals, automation, and AI-powered products.

[GitHub](https://github.com/twinstack-studio) ·
[Website](https://twinstackstudio.com) ·
[Email](mailto:hello.twinstackstudio@gmail.com)

© 2026 TwinStack Studio. All rights reserved. See [LICENSE](./LICENSE).
