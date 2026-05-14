# Project Initialization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a new React + TypeScript + Next.js + Tailwind project with Jest testing support.

**Architecture:** Scaffolding via `create-next-app` for core configuration, followed by manual Jest setup using the recommended Next.js configuration.

**Tech Stack:** Next.js, TypeScript, Tailwind CSS, Jest, React Testing Library.

---

### Task 1: Scaffold Next.js Project

**Files:**
- Create: All standard Next.js project files.

- [ ] **Step 1: Run create-next-app**
Run: `npx create-next-app@latest . --typescript --tailwind --eslint --src-dir --app --import-alias "@/*" --use-npm --no-git`
Expected: Project files generated in the root directory.

- [ ] **Step 2: Commit initial scaffold**
Run:
```bash
git add .
git commit -m "feat: initial next.js scaffold"
```

---

### Task 2: Install Testing Dependencies

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install Jest and Testing Library**
Run: `npm install -D jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom ts-node`
Expected: Dependencies added to `package.json`.

- [ ] **Step 2: Commit dependencies**
Run:
```bash
git add package.json package-lock.json
git commit -m "chore: add jest and testing library dependencies"
```

---

### Task 3: Configure Jest

**Files:**
- Create: `jest.config.ts`
- Create: `jest.setup.ts`
- Modify: `package.json`

- [ ] **Step 1: Create jest.setup.ts**
Create `jest.setup.ts`:
```typescript
import '@testing-library/jest-dom'
```

- [ ] **Step 2: Create jest.config.ts**
Create `jest.config.ts`:
```typescript
import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

// Add any custom config to be passed to Jest
const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  // Add more setup options before each test is run
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config)
```

- [ ] **Step 3: Add test script to package.json**
Modify `package.json` to include:
```json
"scripts": {
  ...
  "test": "jest",
  "test:watch": "jest --watch"
}
```

- [ ] **Step 4: Commit configuration**
Run:
```bash
git add jest.config.ts jest.setup.ts package.json
git commit -m "chore: configure jest"
```

---

### Task 4: Validate Setup with Sample Test

**Files:**
- Create: `src/app/page.test.tsx`

- [ ] **Step 1: Write sample test**
Create `src/app/page.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react'
import Page from './page'

describe('Page', () => {
  it('renders a heading', () => {
    render(<Page />)

    const heading = screen.getByRole('heading', { level: 1 })

    expect(heading).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run the test**
Run: `npm test`
Expected: Test passes.

- [ ] **Step 3: Final commit**
Run:
```bash
git add src/app/page.test.tsx
git commit -m "test: add sample page test"
```
