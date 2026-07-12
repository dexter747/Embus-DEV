<div align="center">

# Embus

### Intercity Bus Travel & Booking — Web App

A Next.js front-end for searching, mapping, and booking intercity bus routes,
with an interactive Leaflet map and a clean, animated UI.

![Status](https://img.shields.io/badge/status-archived-orange)
![License](https://img.shields.io/badge/license-MIT-blue)
![Next.js](https://img.shields.io/badge/Next.js-App%20Router-000000)
![TypeScript](https://img.shields.io/badge/TypeScript-3178c6)
![Leaflet](https://img.shields.io/badge/Maps-Leaflet-199900)

</div>

---

> [!NOTE]
> **Archived project, open-sourced as-is under MIT.** A front-end MVP with mock
> data for routes and search. Shared as a reference for building map-based
> travel/booking UIs with Next.js and Leaflet.

## Overview

Embus is the web front-end for an intercity bus travel product. Users browse a
marketing landing page, search intercity routes, view results as cards and on a
map, and start a booking/signup flow. The current build uses mock route data,
so it runs with no backend or API keys required.

## Features

- 🗺️ **Interactive map** — route/stop visualization via Leaflet + React-Leaflet
- 🔎 **Route search** — from/to with a location picker modal and results list
- 🚌 **Bus info cards** — operator, timing, seats, pickup/dropoff, price
- 🛬 **Intercity view** — dedicated results page for intercity journeys
- 🏠 **Landing + marketing** — home, landing, about, and contact pages
- 🔐 **Auth flow** — signup screen scaffold
- ✨ **Polished UI** — Framer Motion animations, styled-components, Lucide icons

## Pages

| Route | Purpose |
| --- | --- |
| `/` · `/landing` | Home / marketing landing |
| `/intercity` | Route search + results (list & map) |
| `/about` | About the product |
| `/contact` | Contact page |
| `/auth/signup` | Sign-up flow |

## Tech Stack

- **Framework:** Next.js (App Router) + TypeScript
- **Maps:** Leaflet + React-Leaflet
- **UI/animation:** Framer Motion, styled-components, Lucide & React Icons, Tailwind CSS

## Getting Started

> Requires **Node.js 18+**.

```bash
git clone https://github.com/dexter747/Embus-DEV.git
cd Embus-DEV
npm install
npm run dev        # http://localhost:3000
```

Build for production:

```bash
npm run build && npm start
```

No environment variables are required — route/search data is mocked in the app.

## License

Released under the [MIT License](./LICENSE) © 2025 Maitreya Kulkarni.
