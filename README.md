# Timothy Sheu - Portfolio

My personal portfolio site, built from scratch to showcase my projects and skills as I work toward full-stack developer roles.

**Live site:** [timothysheu.com](https://timothysheu.com)

## Built With

- [Next.js](https://nextjs.org/) (App Router) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Vercel](https://vercel.com/) for hosting/deployment

## Features

- Responsive design with a custom design token system (colors, typography)
- Dynamic project pages generated from a typed data model
- Icon-based skills section using real brand logos, grouped by category
- Accessible navigation (aria-labels, keyboard navigation, mobile menu)
- Custom Open Graph image and favicon for link sharing
- Custom domain

## Getting Started

Clone the repo and install dependencies:

```bash
git clone https://github.com/timjs42/personal-portfolio-site.git
cd personal-portfolio-site
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it locally.

## Project Structure

```
app/                  # Pages and routes (App Router)
  page.tsx             # Homepage (hero, skills, contact)
  projects/            # Projects listing + dynamic [slug] detail pages
components/           # Reusable UI (Nav, Footer)
lib/                   # Typed data (projects.ts, skills.ts)
```

## What I Learned

This project was built as a hands-on way to learn full-stack development end to end, rather than just following a tutorial. Some of what that involved:

- Next.js App Router fundamentals — file-based routing, dynamic routes (`[slug]`), and the Server vs. Client Component split
- Managing structured content with TypeScript types instead of hardcoding it into components
- Debugging real dependency issues (e.g. a library removing icons I relied on) rather than assuming a fix would always work as expected
- Building genuinely responsive, accessible UI — not just "looks fine on desktop"
- Git workflow: writing detailed, conventional commit messages as a record of how the project was actually built
- Deploying and connecting a custom domain via Vercel

## Contact

Reach out via [LinkedIn](https://www.linkedin.com/in/timothy-sheu-6b1719220/) or check out my other work on [GitHub](https://github.com/timjs42).