<<<<<<< HEAD

# Lithos-Tasks

Lithos Tasks is a geology-themed task management application built using React, TypeScript, Vite, and Tailwind CSS.

The project began as an experiment to explore how AI-assisted design could be combined with software engineering. I initially used Motion AI and AI agents to generate and prototype the landing page and visual interactions. From there, I iterated on the design and transformed it into a fully functional web application with task management features.

Inspired by geological landscapes, the interface includes a cursor-following spotlight effect built using HTML5 Canvas and CSS masking to create an immersive user experience. Beyond the visual design, users can create, search, filter, and manage tasks through a responsive and accessible interface.

The application was developed using a component-based React architecture with TypeScript strict mode and includes automated testing using Vitest and Playwright. The project also incorporates deployment-ready configuration and follows accessibility and responsive design principles.

**Tech Stack**
React 18
TypeScript
Vite
Tailwind CSS v4
Vitest
Playwright
Lucide React
HTML5 Canvas
**What I Learned**
Building reusable React components and custom hooks
Managing application state effectively
Creating advanced UI interactions using Canvas and CSS masking
Writing unit and end-to-end tests
Working with AI-assisted development tools while validating, debugging, and refining generated code
Converting an AI-generated prototype into a production-ready application

# Lithos

A production-grade React 18 + TypeScript + Vite + Tailwind CSS application.

## Features & Tech Stack

- **Framework**: [React 18](https://react.dev/)
- **Build Tool**: [Vite](https://vite.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict Mode enabled)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (configured natively via `@tailwindcss/vite`)
- **Linting & Formatting**: [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/)
- **Testing**:
  - **Unit Testing**: [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
  - **End-to-End (E2E) Testing**: [Playwright](https://playwright.dev/)
- **CI/CD**: GitHub Actions configuration for automated testing and builds
- **Deployment**: Configured for instant deployment on [Vercel](https://vercel.com/) (`vercel.json`)

---

## Getting Started

### Prerequisites

Ensure you have **Node.js** (v18+ or v20+ recommended) and **npm** installed.

### Installation

1. Clone or download the repository.
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Install Playwright browsers (required for E2E tests):
   ```bash
   npx playwright install chromium
   ```

---

## Available Scripts

Run the following commands in the project root:

| Command                 | Description                                                      |
| :---------------------- | :--------------------------------------------------------------- |
| `npm run dev`           | Starts the Vite local development server.                        |
| `npm run build`         | Compiles TypeScript and builds the production bundle in `dist/`. |
| `npm run preview`       | Previews the production build locally.                           |
| `npm run lint`          | Lints the project files using ESLint.                            |
| `npm run format`        | Formats code with Prettier.                                      |
| `npm run format:check`  | Verifies code formatting with Prettier.                          |
| `npm run test`          | Runs the Vitest unit tests.                                      |
| `npm run test:watch`    | Runs Vitest unit tests in watch mode.                            |
| `npm run test:coverage` | Generates a unit test coverage report using Vitest.              |
| `npm run test:e2e`      | Runs E2E tests using Playwright.                                 |

---

## Testing Guide

### Unit & Component Tests

Unit tests are written using **Vitest** and **React Testing Library** in the `src/` directory with the `.test.tsx` extension.
To run tests once:

```bash
npm run test
```

To view test coverage:

```bash
npm run test:coverage
```

### E2E Tests

E2E tests are located in the `e2e/` folder and run using **Playwright**.
To run all E2E tests:

```bash
npm run test:e2e
```

---

## Deployment

# This project contains a `vercel.json` file configured for SPA routing. You can connect this repository to Vercel for automatic deployment on every push to the main branch.


