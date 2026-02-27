# Jose Manoel Pereira - SEO/GEO Portfolio

Professional multilingual portfolio built with Next.js App Router and optimized for:

- Technical SEO
- GEO (Generative Engine Optimization)
- Core Web Vitals
- International discoverability (`/pt` and `/en`)

## Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui (local setup with `components.json`)
- Framer Motion (minimal usage)
- next-themes (dark mode)
- next/font
- Metadata API
- Dynamic sitemap
- robots.txt
- JSON-LD structured data

## Main routes

- `/pt`
- `/en`
- `/[lang]/projects`
- `/[lang]/projects/[slug]`
- `/[lang]/about`
- `/[lang]/contact`

## Project architecture

```txt
app/
  [lang]/
    layout.tsx
    page.tsx
    projects/
      page.tsx
      [slug]/page.tsx
    about/page.tsx
    contact/page.tsx
  sitemap.ts
  robots.ts
components/
content/
lib/
scripts/
```

## SEO implementation

- Metadata per locale with:
  - `title` template
  - strategic `description`
  - `keywords`
  - canonical URLs
  - `hreflang` alternates
  - OpenGraph metadata
  - Twitter Card metadata
- Dynamic `sitemap.xml` generated from static and project pages
- `robots.txt` with sitemap reference
- Semantic HTML (`header`, `nav`, `main`, `section`, `article`)
- `next/image` with fixed dimensions to avoid layout shifts
- `next/font` for optimized loading and stable rendering

## Structured data (JSON-LD)

- `Person` schema
- `WebSite` schema
- `BreadcrumbList` schema
- `CreativeWork` schema in project case studies

## GEO implementation highlights

Content is organized for easy LLM parsing:

- Single H1 per page
- Strategic H2 sections
- Objective paragraphs
- Structured lists for technical skills and capabilities
- Dedicated section:
  - `Technical Capabilities for AI & LLM Systems`

## Configuration

Set the canonical base URL in `.env.local`:

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

If the variable is not set, the fallback URL is:

```txt
https://josemanoelpereira.dev
```

LLM assistant setup (server-side only):
1. Create `.env.local` in the project root.
2. Add `OPENAI_API_KEY=your_key_here`.
3. Optional: set `OPENAI_MODEL=gpt-4.1-mini`.
4. Never expose the key with `NEXT_PUBLIC_` variables.
5. Restart the dev server after editing environment variables.

## Development

```bash
npm install
npm run dev
```

## Quality checks

```bash
npm run lint
npm run build
```

## Professional profiles

- LinkedIn: https://linkedin.com/in/jose-manoel-dev
- GitHub: https://github.com/CodJose-prog
