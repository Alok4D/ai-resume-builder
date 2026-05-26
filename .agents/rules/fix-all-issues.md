---
trigger: model_decision
---

# AI Resume Builder — Full Project Analysis & Issues

## Project Overview

This is a **Next.js 16** AI-powered resume builder using **TypeScript**, **TailwindCSS v4**, **Redux Toolkit + redux-persist**, **Framer Motion**, and **Google Gemini AI** (`gemini-1.5-flash`) for resume generation.

---

## Project Structure

```
ai-resume-builder/
├── app/
│   ├── (main-layout)/
│   │   ├── layout.tsx              → Root layout. Wraps app with Redux Provider + PersistGate
│   │   ├── page.tsx                → Landing page (hero image + "Start Now" CTA → /stepper)
│   │   └── stepper/
│   │       └── page.tsx            → 7-step stepper orchestrator (progress bar + step renderer)
│   └── actions/
│       └── generateResume.ts       → Next.js Server Action: calls Gemini AI, falls back to HTML template
├── components/
│   └── steps/
│       ├── PersonalInformation.tsx → Step 1: firstName, lastName, phone, email, country, address, city, state, zip
│       ├── CareerSummary.tsx       → Step 2: jobTitle (dropdown), summary (textarea)
│       ├── WorkExperience.tsx      → Step 3: job details + skills tag input + achievement file upload
│       ├── Certifications.tsx      → Step 4: Education tab + Certifications tab (uses react-hook-form)
│       ├── ContactInformation.tsx  → Step 5: LinkedIn, personalWebsite, social media + URL
│       ├── AIGeneration.tsx        → Step 6: triggers generateResume server action, shows progress bar
│       └── ResumePreview.tsx       → Step 7: renders generated HTML resume + download via window.print()
├── lib/
│   ├── validation.ts               → Custom validation functions for each step
│   └── pdfGenerator.ts             → html2canvas + jsPDF PDF generator (DEAD CODE — never imported)
├── redux/
│   ├── store.ts                    → Redux store with redux-persist (whitelist: ['formData'])
│   ├── formSlice.ts                → Single slice: personalInfo, careerSummary, workExperience, education, certifications, contactInfo, generatedResume
│   └── Provider.tsx                → ReduxProvider + PersistGate wrapper (client component)
└── types/
    └── steppers/
        └── Steppers.ts             → Type definitions: Step, CertificationFormData, ContactFormData, WorkExperienceFormData, FormErrors (partially unused)
```

---

## How the App Works (Flow)

1. **Landing Page** (`/`) → user clicks "Start Now" → navigates to `/stepper`
2. **Stepper Page** manages `currentStep` (1–7) and `completedSteps[]` in local state
3. Each step component:
   - Reads saved data from **Redux** (via `useSelector`)
   - Dispatches updated data to **Redux** (via `useDispatch`)
   - Calls `onNext(data)` to advance or `onBack()` to go back
4. **Step 6 (AIGeneration)** calls the `generateResume` server action → sends all Redux `formData` to Gemini AI → stores HTML result in `state.form.generatedResume`
5. **Step 7 (ResumePreview)** reads `generatedResume` from Redux → renders via `dangerouslySetInnerHTML` → downloads via `window.open()` + `window.print()`
6. Redux state is **persisted to localStorage** via `redux-persist` (only `formData`, not `generatedResume`)

---

## All Issues Found

### 🔴 Bug: Inconsistent Back Button in `PersonalInformation.tsx`
- **File:** `components/steps/PersonalInformation.tsx` (lines 199–206)
- **Problem:** The Back button uses `<Link href="/">` instead of calling `onBack()`. All other steps call `onBack()`. This causes a full page navigation instead of going back within the stepper, and does not update `currentStep` state.
- **Fix:** Replace the `<Link>` with a button calling `onBack()` like all other steps do.

---

### 🔴 Bug: `ResumePreview.tsx` — Not Responsive (Mobile Broken)
- **File:** `components/steps/ResumePreview.tsx` (line 50)
- **Problem:** `className="py-8 px-24"` has a hardcoded `px-24` with no responsive prefix. On mobile/tablet screens, this causes severe horizontal overflow and unusable layout.
- **Fix:** Change to `py-8 px-4 sm:px-6 md:px-16 lg:px-24` (consistent with all other step components).

---

### 🔴 Bug: `Certifications.tsx` — Uses `localStorage` Instead of Redux
- **File:** `components/steps/Certifications.tsx` (lines 68–89)
- **Problem:** The `useEffect` reads from `localStorage.getItem("educationAndCertificationData")` to pre-populate the form. But data is **never written back** to localStorage in this component — it's dispatched to Redux. Meanwhile, all other steps read from Redux via `useSelector`. This means:
  - On page refresh, this form will be empty (localStorage key doesn't exist)
  - It is inconsistent with the rest of the app's data persistence pattern
- **Fix:** Remove the `localStorage` `useEffect`. Use `useSelector` to read `state.form.formData.education` and `state.form.formData.certifications` from Redux like other components do.

---

### 🔴 Bug: `Certifications.tsx` — Buggy Form Error Display
- **File:** `components/steps/Certifications.tsx` (lines 320–327)
- **Problem:** The Next button is `type="button"` and calls `handleSubmit(onSubmit)()` then synchronously checks `Object.keys(errors).length > 0`. However `errors` from `react-hook-form`'s `formState` does NOT update synchronously — it updates on next render. So `formError` is always set to `false` even when there are validation errors, making the error banner non-functional.
- **Fix:** Use the `isValid` flag from `formState`, or change the button to `type="submit"` and rely on `react-hook-form`'s native submit handling.

---

### 🔴 Bug: `ResumePreview.tsx` — Dead `error` State
- **File:** `components/steps/ResumePreview.tsx` (lines 18, 62–66)
- **Problem:** `const [error, setError] = useState('')` is declared and the error UI is rendered conditionally, but `setError` is **never called anywhere** in the component. The error block is dead code.
- **Fix:** Either remove the error state entirely, or connect it to actual error scenarios (e.g., if `generatedResume` is malformed).

---

### 🟡 Warning: Unused `useEffect` Imports
- **Files:**
  - `components/steps/PersonalInformation.tsx` (line 4) — imports `useEffect` but never uses it
  - `components/steps/CareerSummary.tsx` (line 4) — imports `useEffect` but never uses it
  - `components/steps/ContactInformation.tsx` (line 4) — imports `useEffect` but never uses it
- **Fix:** Remove `useEffect` from these import statements.

---

### 🟡 Warning: Dead Code — `lib/pdfGenerator.ts` Never Used
- **File:** `lib/pdfGenerator.ts`
- **Problem:** A full `generatePDF()` function using `html2canvas` and `jsPDF` is defined but never imported anywhere. `ResumePreview.tsx` uses `window.open()` + `window.print()` for PDF download instead.
- **Fix:** Either integrate `generatePDF` into `ResumePreview.tsx` for proper PDF (better quality, no print dialog), or delete the file. The `html2canvas` and `jsPDF` packages in `package.json` are wasted bundle size if unused.

---

### 🟡 Warning: `types/steppers/Steppers.ts` — Partially Unused
- **File:** `types/steppers/Steppers.ts`
- **Problem:** Defines `Step`, `CertificationFormData`, `ContactFormData`, `WorkExperienceFormData`, `FormErrors` interfaces. However, `stepper/page.tsx` redeclares its own local `interface Step { id: number; label: string }` instead of importing from this types file. `WorkExperienceFormData` and `FormErrors` are also never imported anywhere.
- **Fix:** Import `Step` from the types file in `stepper/page.tsx`. Use the typed interfaces in component props instead of `any`.

---

### 🟡 Warning: Dual/Dead Local State in `stepper/page.tsx`
- **File:** `app/(main-layout)/stepper/page.tsx` (lines 33, 42)
- **Problem:** The stepper maintains `const [formData, setFormData] = useState<any>({})` and accumulates step data via `handleNext`. However, all step components read data directly from **Redux**, so this local `formData` state in the parent is never consumed or passed to any child. It is dead state.
- **Fix:** Remove the local `formData` state from the stepper. Data flows directly through Redux.

---

### 🟡 Warning: `WorkExperience.tsx` — Achievement File Upload is Mandatory
- **File:** `components/steps/WorkExperience.tsx` (lines 63–66)
- **Problem:** The achievement file upload is required (`if (!achievementFile) { validationErrors.achievementFile = "Achievement file is required" }`). This is poor UX — forcing users to upload an image file for work experience doesn't make sense for a general resume builder. Users can skip via the "Skip" button, but that skips ALL work experience data.
- **Fix:** Make the achievement file optional (remove the `if (!achievementFile)` validation block).

---

### 🟡 Warning: `CareerSummary.tsx` — Very Limited Job Title Dropdown
- **File:** `components/steps/CareerSummary.tsx` (lines 70–75)
- **Problem:** Job title is a `<select>` with only 5 options: Frontend Developer, Backend Developer, Full Stack Developer, UI/UX Designer, Project Manager. This is too restrictive for a general-purpose resume builder.
- **Fix:** Replace with a free-text `<input>` field, or significantly expand the dropdown options, or use a combo-box (input + datalist).

---

### 🟡 Warning: `PersonalInformation.tsx` — Very Limited Country Dropdown
- **File:** `components/steps/PersonalInformation.tsx` (lines 133–137)
- **Problem:** Country dropdown has only 3 options: Bangladesh, India, USA.
- **Fix:** Use a full country list or a searchable select component.

---

### 🟡 Warning: `AIGeneration.tsx` — Cannot Regenerate Resume
- **File:** `components/steps/AIGeneration.tsx` (line 97)
- **Problem:** `disabled={isGenerating || !!generatedResume}` permanently disables the Generate button once a resume is created. Users cannot regenerate with new/modified data without going back multiple steps. The "Regenerate" button in `ResumePreview.tsx` just calls `onBack()` (goes back one step to AIGeneration) but the button is still disabled there.
- **Fix:** Add a "Regenerate" button in `AIGeneration.tsx` that clears `generatedResume` from Redux and re-enables the generate button.

---

### 🟡 Warning: Pervasive `any` Types — No Type Safety
- **Files:** All step components (`/* eslint-disable @typescript-eslint/no-explicit-any */` at top of every file)
- **Problem:** All component `Props` interfaces use `onNext: (data: any) => void`. Proper typed interfaces already exist in `types/steppers/Steppers.ts` but are not used in components.
- **Fix:** Replace `any` with proper types from `types/steppers/Steppers.ts` or from `redux/formSlice.ts` exported interfaces.

---

### 🟡 Warning: `PersistGate loading={null}` — Flash of Empty Content
- **File:** `redux/Provider.tsx` (line 10)
- **Problem:** `<PersistGate loading={null}>` renders `null` while Redux state is rehydrating from localStorage. This means step forms briefly show empty/default values before populating with saved data.
- **Fix:** Provide a loading skeleton or spinner: `<PersistGate loading={<div>Loading...</div>}>`.

---

### 🟡 Warning: `generateResume.ts` — Outdated Gemini Model
- **File:** `app/actions/generateResume.ts` (line 13)
- **Problem:** Uses `model: "gemini-1.5-flash"`. Newer and better models are available (`gemini-2.0-flash`, `gemini-2.5-flash`).
- **Fix:** Update to a newer model for better resume quality.

---

### 🔵 Info: `next.config.ts` — External Image Domain May Be Missing
- **File:** `next.config.ts`
- The landing page uses an external image from `i.ibb.co`. Verify that this domain is listed in `images.remotePatterns` in `next.config.ts` to avoid Next.js image optimization errors.

---

## Summary Table

| Severity | File | Issue |
|---|---|---|
| 🔴 Bug | `PersonalInformation.tsx` | Back button uses `<Link>` instead of `onBack()` |
| 🔴 Bug | `ResumePreview.tsx` | `px-24` not responsive — breaks on mobile |
| 🔴 Bug | `Certifications.tsx` | Reads from `localStorage` instead of Redux |
| 🔴 Bug | `Certifications.tsx` | `formError` never triggers due to async `errors` state |
| 🔴 Bug | `ResumePreview.tsx` | `error` state declared but `setError` never called |
| 🟡 Warning | 3 step components | Unused `useEffect` import |
| 🟡 Warning | `lib/pdfGenerator.ts` | Dead code — never imported |
| 🟡 Warning | `types/steppers/Steppers.ts` | Types defined but not imported where needed |
| 🟡 Warning | `stepper/page.tsx` | Local `formData` state is dead/unused |
| 🟡 Warning | `WorkExperience.tsx` | Achievement file upload incorrectly required |
| 🟡 Warning | `CareerSummary.tsx` | Job title limited to 5 options only |
| 🟡 Warning | `PersonalInformation.tsx` | Country limited to 3 options only |
| 🟡 Warning | `AIGeneration.tsx` | No way to regenerate resume once generated |
| 🟡 Warning | All step components | `any` types everywhere, no type safety |
| 🟡 Warning | `Provider.tsx` | `PersistGate loading={null}` causes flash |
| 🟡 Warning | `generateResume.ts` | Uses outdated `gemini-1.5-flash` model |
| 🔵 Info | `next.config.ts` | Verify `i.ibb.co` is in `remotePatterns` |
