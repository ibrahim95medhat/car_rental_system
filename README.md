# 🚗 Car Rental System

A full-featured **Car Rental Management Platform** built with **Angular 21**, structured as an **Nx monorepo**. It supports two separate portals — an **Admin Dashboard** and a **Customer Application** — with shared UI components in a reusable library.

---

## 📑 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Features](#features)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Environment & API](#environment--api)
- [Architecture](#architecture)
- [Internationalization](#internationalization)
- [UI Library (@ui-lib)](#ui-library-ui-lib)

---

## Overview

The Car Rental System provides:

- **Admin Portal** (`/admin`) — manage users, cars, and orders with full CRUD, status updates, search, and pagination.
- **Customer Portal** (`/`) — browse cars, place rental orders (cash, visa, or installment plans), track orders, and pay installments.

Both portals share authentication guards, a token service, and a comprehensive reusable component library.

---

## Tech Stack

| Category         | Technology                                  |
| ---------------- | ------------------------------------------- |
| Framework        | Angular 21.2 (Standalone Components)        |
| Monorepo         | Nx 22.6                                     |
| State Management | NgRx Signals (`signalStore`)                |
| Styling          | Tailwind CSS v4                             |
| i18n             | `@jsverse/transloco` (EN + AR, RTL support) |
| HTTP             | Angular `HttpClient` with interceptors      |
| Forms            | Angular Reactive Forms                      |
| Routing          | Angular Router with lazy-loaded routes      |
| Linting          | ESLint + Nx ESLint plugin                   |

---

## Project Structure

```
car_rental_system/
├── apps/
│   └── car_rental_system/          # Main Angular application
│       └── src/app/
│           ├── core/               # Guards, interceptors, services, models
│           ├── layouts/            # Dashboard layout & Application layout
│           └── modules/
│               ├── auth/           # Login & Register pages
│               ├── dashboard/      # Admin portal (users, cars, orders)
│               └── application/    # Customer portal (cars, orders, installments)
└── libs/
    └── my-lib/                     # Shared UI component library (@ui-lib)
        └── src/lib/
            ├── components/         # Table, Navbar, Sidebar, Modal, Badge, Input…
            ├── models/             # Shared TypeScript interfaces
            └── utils/              # Error handlers, helpers
```

---

## Features

### Admin Portal (`/admin`)

| Feature            | Details                                                          |
| ------------------ | ---------------------------------------------------------------- |
| Authentication     | JWT login with role-based guard                                  |
| Users              | List, search, paginate                                           |
| Cars               | CRUD (create, edit, delete), search, paginate                    |
| Orders             | List, search, paginate, mark as success / failed                 |
| Order Detail       | Full detail view at `/admin/orders/:id`                          |
| Translated columns | All table headers use reactive `TranslocoPipe` via `ng-template` |

### Customer Portal (`/`)

| Feature           | Details                                                                                                                              |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Authentication    | JWT login / register                                                                                                                 |
| Cars              | Browse with search & pagination, card-based grid                                                                                     |
| Car Detail        | View car specs, open "Rent Now" modal                                                                                                |
| Create Order      | Modal form with delivery/return date pickers, date validation, payment type (cash / visa / tamara), order type (full / installments) |
| Orders            | List with badge status, formatted dates & amounts, search & pagination                                                               |
| Order Detail      | Full order summary at `/orders/:id`                                                                                                  |
| Installments      | List with due dates, pay installment button                                                                                          |
| Inline API errors | Backend validation errors shown inline inside the modal form                                                                         |
| Language toggle   | Switch EN ↔ AR with automatic RTL layout                                                                                            |
| Logout            | Clears token, resets auth state, redirects to login                                                                                  |

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 20
- **npm** ≥ 10 (or **pnpm** / **yarn**)
- **Nx CLI** (optional — can use `npx`)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd car_rental_system

# Install dependencies
npm install
```

### Run the Development Server

```bash
npx nx serve car_rental_system
```

The app will be available at **http://localhost:4200**.

### Build for Production

```bash
npx nx build car_rental_system
```

Output is placed in `dist/apps/car_rental_system/`.

---

## Available Scripts

| Command                          | Description                            |
| -------------------------------- | -------------------------------------- |
| `npx nx serve car_rental_system` | Start dev server with hot reload       |
| `npx nx build car_rental_system` | Production build                       |
| `npx nx test car_rental_system`  | Run unit tests                         |
| `npx nx lint car_rental_system`  | Run ESLint                             |
| `npx nx graph`                   | Visualise the project dependency graph |
| `npx nx build my-lib`            | Build the shared UI library            |

---

## Environment & API

The application connects to a hosted REST API:

```
Base URL: https://task.abudiyab-soft.com/api
```

### Endpoints

| Group                 | Endpoint                                                                                       |
| --------------------- | ---------------------------------------------------------------------------------------------- |
| Admin Auth            | `POST /admin/login`, `POST /admin/register`, `GET /admin/me`, `POST /admin/logout`             |
| Admin Users           | `GET /admin/users`                                                                             |
| Admin Cars            | `GET/POST/PUT/DELETE /admin/cars`                                                              |
| Admin Orders          | `GET/PUT /admin/orders`                                                                        |
| Customer Auth         | `POST /customer/login`, `POST /customer/register`, `GET /customer/me`, `POST /customer/logout` |
| Customer Cars         | `GET /customer/cars`, `GET /customer/cars/:id`                                                 |
| Customer Orders       | `GET/POST /customer/orders`, `GET /customer/orders/:id`                                        |
| Customer Installments | `GET /customer/installments`, `POST /customer/installments/:id/pay`                            |

All authenticated requests include a Bearer token via an Angular HTTP interceptor.

---

## Architecture

### State Management

Each feature page has its own **NgRx Signal Store** (`signalStore`) following a consistent pattern:

```
store/
├── state/          # Initial state & type definitions
├── models/         # State interfaces
└── features/
    └── <feature>/
        ├── methods/    # rxMethod wrappers (load, create, update…)
        └── handlers/   # tapResponse next/error/finalize handlers
```

### Routing

```
/                         → Customer Application Layout
  /cars                   → Car list
  /cars/:id               → Car detail
  /orders                 → Order list
  /orders/:id             → Order detail
  /installments           → Installment list

/admin                    → Admin Dashboard Layout
  /admin/users            → User management
  /admin/cars             → Car management
  /admin/orders           → Order management
  /admin/orders/:id       → Order detail

/login                    → Customer login
/register                 → Customer register
/admin/login              → Admin login
```

### Guards & Interceptors

| Name               | Role                                                      |
| ------------------ | --------------------------------------------------------- |
| `authGuard`        | Redirects unauthenticated users to `/login`               |
| `adminGuard`       | Restricts `/admin` routes to admin role                   |
| `TokenInterceptor` | Attaches `Authorization: Bearer <token>` to every request |
| `TokenService`     | Manages token storage in `localStorage`                   |
| `AuthStateService` | Signal-based reactive user state                          |

---

## Internationalization

Powered by `@jsverse/transloco` with two language files:

```
src/assets/i18n/
├── en.json   # English
└── ar.json   # Arabic (RTL)
```

- Language toggle in both Admin and Customer navbars
- RTL layout applied automatically via `dir="rtl"` on `<html>`
- All table column headers use `<ng-template>` + `TranslocoPipe` for fully reactive translation
- Missing translation keys fall back silently via a custom `SilentMissingHandler`

---

## UI Library (`@ui-lib`)

Located in `libs/my-lib`, exported as the `@ui-lib` path alias.

### Components

| Component        | Selector                 | Description                                                                                                                     |
| ---------------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| Table            | `<lib-table>`            | Feature-rich data table with sorting, pagination, sticky columns, custom cell & header templates, auto date/currency formatting |
| Navbar           | `<lib-navbar>`           | Responsive top navigation with user info, theme/lang toggles, mobile drawer, `[slot=actions]` content projection                |
| Sidebar          | `<lib-sidebar>`          | Collapsible sidebar with nested items, icon paths, active state                                                                 |
| Modal            | `<lib-modal>`            | Reactive modal driven by `ModalService`                                                                                         |
| Input            | `<lib-input>`            | Reactive form input with built-in validation error display and `min`/`max` attribute support                                    |
| Button           | `<lib-button>`           | Styled button with variants (primary, outlined, ghost, danger) and loading state                                                |
| Badge            | `<lib-badge>`            | Status badge with variants (success, danger, warning, info, default)                                                            |
| Search Input     | `<lib-search-input>`     | Debounced search field                                                                                                          |
| Pagination       | `<lib-pagination>`       | Responsive paginator — full page buttons on desktop, prev/current/next on mobile                                                |
| Spinner          | `<lib-spinner>`          | Loading indicator                                                                                                               |
| Empty State      | `<lib-empty-state>`      | Placeholder shown when a table/list has no data                                                                                 |
| Validation Error | `<lib-validation-error>` | Inline form validation error display                                                                                            |
| Toast            | `ToastService`           | Programmatic success/error toasts                                                                                               |

### Table Column Types

Columns support automatic value formatting via the `type` property — no custom templates needed:

```ts
{ field: 'delivery_date', header: 'Delivery', type: 'date' }     // → "Apr 25, 2026"
{ field: 'total_price',   header: 'Total',    type: 'currency' }  // → "$150.00"
```

---

## License

MIT © 2026 Car Rental System
