# Design Spec: Northbit Web Project Initialization

## Goal
Create a new React + TypeScript + Next.js + Tailwind project with Jest testing support in the `northbit` repository.

## Architecture
- **Framework:** [Next.js](https://nextjs.org/) (latest)
- **Routing:** App Router (`src/app`)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Testing:** Jest + React Testing Library
- **Package Manager:** npm (based on environment check)

## Implementation Strategy
1. **Initialize Git:** (Completed) Ensure the project is tracked from the start.
2. **Scaffold Next.js:** Use `npx create-next-app@latest .` with the following flags:
   - `--typescript`
   - `--tailwind`
   - `--eslint`
   - `--src-dir`
   - `--app`
   - `--import-alias "@/*"`
3. **Configure Testing:**
   - Install `jest`, `jest-environment-jsdom`, `@testing-library/react`, `@testing-library/jest-dom`.
   - Create `jest.config.ts` using the `next/jest` plugin.
   - Create `jest.setup.ts`.
4. **Validation:**
   - Run `npm run dev` to ensure it starts.
   - Add a sample test and run `npm test`.

## Success Criteria
- [ ] Next.js landing page is accessible at `localhost:3000`.
- [ ] Tailwind CSS classes are applied and working.
- [ ] TypeScript compiles without errors.
- [ ] Jest runs and passes a sample component test.
