# Senior Developer Editorial Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILLS: 
> 1. Use **superpowers:subagent-driven-development** (recommended) or **superpowers:executing-plans** for orchestration.
> 2. Use **design-taste-frontend**, **high-end-visual-design**, **gpt-taste**, **theme-factory**, **frontend-design**, **vercel-react-best-practices**, **vercel-react-view-transitions**, and **web-design-guidelines** to enforce premium, non-generic aesthetic standards and technical best practices.
> 3. Use **full-output-enforcement** to prevent code truncation and ensure complete, production-ready files.
> 4. Use **verification-before-completion** for rigorous validation of every task.
> 
> Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a high-end, high-authority personal website for a senior software developer using an "Editorial Minimalist" aesthetic.

**Architecture:** A scrollable Single Page Application (SPA) with complex scroll-triggered interactions (Pinned Narratives) and a focus on component materiality (Double-Bezel Islands). Data is externalized into JSON files for maintainability.

**Tech Stack:** Next.js 15 (App Router), TypeScript, Tailwind CSS v4, Framer Motion, Phosphor Icons.

---

### Task 1: Project Setup & Global Styling

**Files:**
- Modify: `package.json`
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Install Framer Motion and Icons**
Run: `npm install framer-motion @phosphor-icons/react`
Expected: Dependencies added to `package.json`.

- [ ] **Step 2: Configure Tailwind v4 & Typography**
Update `src/app/globals.css` with Cabinet Grotesk (simulated via sans fallback) and custom theme variables.

- [ ] **Step 3: Setup Root Layout with Font & Grain Overlay**
Add a fixed-position noise overlay with `pointer-events-none`.

- [ ] **Step 4: Commit setup**
Run:
```bash
git add package.json src/app/globals.css src/app/layout.tsx
git commit -m "chore: setup tailwind v4, framer motion, and global grain overlay"
```

---

### Task 2: Core UI Primitives

**Files:**
- Create: `src/components/ui/Island.tsx`
- Create: `src/components/ui/SectionLabel.tsx`
- Create: `src/components/ui/NarrativeBlock.tsx`

- [ ] **Step 1: Create Double-Bezel Island Component**
Tactile, nested container with internal refraction borders.

- [ ] **Step 2: Create SectionLabel Component**
Numbered indices with high-contrast accent color.

- [ ] **Step 3: Create NarrativeBlock Component**
For the scroll-telling reveal interaction (used in Experience and Projects).

- [ ] **Step 4: Commit primitives**
Run:
```bash
git add src/components/ui/Island.tsx src/components/ui/SectionLabel.tsx src/components/ui/NarrativeBlock.tsx
git commit -m "feat: add core UI primitives"
```

---

### Task 3: Hero Section (Nested Island)

**Files:**
- Create: `src/components/sections/Hero.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create Hero Component**
Centered massive H1 + "Double-Bezel" floating island of monochrome logos.

- [ ] **Step 2: Update Main Page**
Assemble Hero in `src/app/page.tsx`.

- [ ] **Step 3: Commit Hero**
Run:
```bash
git add src/components/sections/Hero.tsx src/app/page.tsx
git commit -m "feat: implement Nested Island Hero section"
```

---

### Task 4: Skills Section (Typography Wall)

**Files:**
- Create: `src/components/sections/Skills.tsx`
- Create: `src/data/skills.json`

- [ ] **Step 1: Create Skills Data**
Structured by Leadership, Core Stack, AI & Tooling, Systems.

- [ ] **Step 2: Create Skills Component**
Asymmetric 2-column grid with massive (48px+) typography.

- [ ] **Step 3: Commit Skills**
Run:
```bash
git add src/data/skills.json src/components/sections/Skills.tsx
git commit -m "feat: implement Typography Wall Skills section"
```

---

### Task 5: Experience Section (Hybrid Pinned Narrative)

**Files:**
- Create: `src/components/sections/Experience.tsx`
- Create: `src/data/experience.json`

- [ ] **Step 1: Create Experience Data**
Top 3 roles as narratives, others as archive entries.

- [ ] **Step 2: Implement Pinned Narrative + Accordion**
Shared logic for pinning titles and expanding archive rows.

- [ ] **Step 3: Commit Experience**
Run:
```bash
git add src/data/experience.json src/components/sections/Experience.tsx
git commit -m "feat: implement Experience section"
```

---

### Task 6: Projects Section (Hybrid Pinned Narrative)

**Files:**
- Create: `src/components/sections/Projects.tsx`
- Create: `src/data/projects.json`

- [ ] **Step 1: Create Projects Data**
Hero projects vs Archive projects.

- [ ] **Step 2: Implement Projects Component**
Mirroring the Experience section's interaction model.

- [ ] **Step 3: Commit Projects**
Run:
```bash
git add src/data/projects.json src/components/sections/Projects.tsx
git commit -m "feat: implement Projects section"
```

---

### Task 7: Education & Certifications (Side-Scrub)

**Files:**
- Create: `src/components/sections/Education.tsx`
- Create: `src/data/education.json`

- [ ] **Step 1: Create Education Data**
1 Degree, 6 Certifications.

- [ ] **Step 2: Implement Side-Scrub Layout**
Sticky preview area updating based on list scroll position.

- [ ] **Step 3: Commit Education**
Run:
```bash
git add src/data/education.json src/components/sections/Education.tsx
git commit -m "feat: implement Side-Scrub Education section"
```

---

### Task 8: Contact & Footer (Split Contrast)

**Files:**
- Create: `src/components/sections/Contact.tsx`
- Create: `src/components/layout/Footer.tsx`

- [ ] **Step 1: Implement Split Contact Section**
Massive CTA on left, minimalist form on right.

- [ ] **Step 2: Create Minimalist Footer**
Clean row with social links and copyright.

- [ ] **Step 3: Commit Contact & Footer**
Run:
```bash
git add src/components/sections/Contact.tsx src/components/layout/Footer.tsx
git commit -m "feat: implement Contact and Footer sections"
```

---

### Task 9: Global Navigation & Polish

**Files:**
- Create: `src/components/layout/Navbar.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Implement Floating Navbar**
Pill-shaped glass navigation with anchor links.

- [ ] **Step 2: Final Build & Validation**
Run: `npm run build`
Expected: Success.

- [ ] **Step 3: Final Commit**
Run:
```bash
git commit -m "feat: finalize portfolio with navigation and polish"
```
