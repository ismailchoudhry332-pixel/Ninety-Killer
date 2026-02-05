# Ninety Killer - Group Operating System

A Ninety.io replacement built with Next.js, Prisma, PostgreSQL, and Gemini AI. Implements the EOS (Entrepreneurial Operating System) discipline through structured, deterministic, auditable software.

## Stack

- **Frontend**: Next.js 14 (App Router) + Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL + Prisma ORM
- **Auth**: NextAuth.js (Google OAuth)
- **AI**: Google Gemini (advisory only, never authoritative)

## Features

- **Teams & Users** - Multi-company, role-based access (Admin, Editor, Viewer, Archiver, Board)
- **Meetings** - Weekly EOS rhythm with one-active-per-team constraint
- **Scorecard** - Weekly KPIs with server-side status calculation
- **Rocks** - Quarterly strategic priorities with milestones
- **Todos** - Execution tracking with carry-forward automation
- **IDS Issues** - Identify, Discuss, Solve with priority levels
- **Ratings** - Per-attendee meeting effectiveness ratings (1-10)
- **Archive & Auto-Spawn** - Transactional archive with carry-forward and next-meeting creation
- **AI Drafts** - Gemini-powered summaries and proposals (human-reviewed, explicitly applied)
- **Audit Log** - Full before/after mutation logging
- **Board Dashboard** - Group-level health view with RAG status indicators

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env with your database URL, OAuth credentials, and Gemini API key
   ```

3. **Set up database**
   ```bash
   npx prisma db push
   npx prisma generate
   ```

4. **Seed demo data** (optional)
   ```bash
   npm run db:seed
   ```

5. **Run development server**
   ```bash
   npm run dev
   ```

## Core Rules

- Only **one active meeting** per team at any time
- Archived meetings are **read-only** (enforced at API level)
- Archive requires **all ratings** submitted
- Carry-forward: unfinished todos and unsolved issues auto-propagate
- AI **never mutates data** without explicit human approval
- All mutations logged in the **audit trail**
- Status fields use **enums only** (no free-text)

## Project Structure

```
src/
├── app/
│   ├── api/          # REST API routes (all modules)
│   ├── board/        # Board dashboard page
│   ├── meetings/     # Meeting list + detail pages
│   ├── teams/        # Team management
│   ├── scorecard/    # Scorecard metrics
│   ├── rocks/        # Quarterly rocks
│   ├── todos/        # Todo tracking
│   ├── issues/       # IDS issues
│   ├── audit/        # Audit log viewer
│   └── login/        # Auth page
├── components/
│   ├── layout/       # Sidebar navigation
│   └── ui/           # Reusable components
├── lib/
│   ├── prisma.ts     # Database client
│   ├── auth.ts       # NextAuth config
│   ├── rbac.ts       # Role-based access control
│   ├── ai.ts         # Gemini AI integration
│   ├── audit.ts      # Audit logging utility
│   └── meeting-lifecycle.ts  # Archive + carry-forward logic
prisma/
├── schema.prisma     # Database schema (all models + enums)
└── seed.ts           # Demo data seeder
```
