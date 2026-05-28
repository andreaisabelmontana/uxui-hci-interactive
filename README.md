# UX, UI & HCI — Interactive Concept Map

A live, interactive companion site for the **UX, UI & Human–Computer Interaction** course (BCSAI · IE University). Every core concept from the syllabus is rendered as something you can *touch* — no passive slides.

## What's inside

- **The 5 Planes of UX** (Garrett) — strategy → scope → structure → skeleton → surface, layered & explorable
- **HCI Timeline** — 1945 → today, interactive
- **Persona Builder** — generates a real persona card from form input
- **Requirements Prioritizer** — MoSCoW drag-and-sort
- **Card Sorting** — information architecture exercise
- **Wireframe Sandbox** — drag/resize boxes, lock to grid
- **Nielsen's 10 Heuristics** — self-evaluation rubric with score
- **Fitts's Law** — live demo (target size vs distance vs movement time)
- **Gestalt Principles** — proximity, similarity, closure, continuity, figure/ground
- **Research Methods Quadrant** — attitudinal/behavioral × qual/quant picker
- **Accessibility Simulator** — color-blindness filters, contrast checker, blur, font-size, motion sensitivity
- **Mobile / Multi-Platform Preview** — same layout, three breakpoints
- **Final Quiz** — self-test on the syllabus

## Run locally

Just open `index.html` in a browser — there's no build step.

## Deploy to GitHub Pages

1. Create a new GitHub repo (e.g. `uxui-concepts`).
2. From this folder:
   ```bash
   git init
   git add .
   git commit -m "Interactive UX/UI/HCI concept map"
   git branch -M main
   git remote add origin https://github.com/<your-user>/uxui-concepts.git
   git push -u origin main
   ```
3. In the repo on github.com → **Settings → Pages** → Source: *Deploy from a branch* → Branch: `main` / root → **Save**.
4. The site will be live at `https://<your-user>.github.io/uxui-concepts/` within ~1 minute.

The included `.github/workflows/pages.yml` will also auto-deploy on every push.
