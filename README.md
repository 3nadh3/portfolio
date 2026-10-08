# Trinadh Musunuri — Netflix-Inspired Portfolio

A personalized React portfolio based on [shamihsnn/netflix-portfolio](https://github.com/shamihsnn/netflix-portfolio), featuring my IBM experience, CMU research, projects, live demos, credentials, and education.

## Credits

Kudos and thanks to **[shamihsnn / Usama Hassan](https://github.com/shamihsnn)** for the original Netflix-inspired portfolio. This version adopts the upstream React/Vite/Tailwind foundation, Netflix Sans typography, opening sound, profile selection, cinematic backgrounds, and content-row/card pattern. Adapted components identify the source in their comments. The upstream README declares MIT licensing.

Reference revision: `6f691190bebcbcae9a16ec7bcf092201ff5eb71f`. Personal content and chatbot integration belong to Trinadh Musunuri. This repository remains independent rather than a GitHub fork. Not affiliated with Netflix.

## Versions

| Branch | Version |
| --- | --- |
| [`master`](https://github.com/3nadh3/portfolio/tree/master) | Current React/Vite/Tailwind adaptation. |
| [`original-personal-design`](https://github.com/3nadh3/portfolio/tree/original-personal-design) | My original HTML/CSS/JavaScript portfolio, designed and developed by me. |
| [`static-netflix-design-backup`](https://github.com/3nadh3/portfolio/tree/static-netflix-design-backup) | Preserved static Netflix-inspired version before the React upgrade. |

## Stack

React 18, TypeScript, Vite, Tailwind CSS, React Router, and Lucide icons. Python is not required. Hash-based routes work on static hosting without server rewrite rules. Vite gives JavaScript and CSS content-based filenames to prevent stale versions after deployment.

## Run and build

```sh
npm install
npm run dev
```

```sh
npm run build
npm run preview
```

`npm run build` checks TypeScript and builds the static site into `portfolio/`. The built output is committed for compatibility with the existing static hosting setup. After changing source files, rebuild and commit the updated `portfolio/` output.

For existing static hosting, publish **`portfolio/`**. For a host that builds from source, run **`npm run build`** and publish **`portfolio/`**. The root `index.html` is the Vite development entry, not the built page.

## Content and assets

- `src/pages/`: intro, profile selection, and personalized profile page.
- `src/components/`: reusable content rows, project dialog, and chatbot.
- `src/lib/content.json`: project descriptions, stacks, live links, skills, and profile content.
- `src/index.css`: upstream Tailwind styling plus personalized components.
- `public/`: original favicon, resume, intro sound, avatars, and default background.

The sound and default video are hosted locally. Developer, Stalker, and Adventurer videos use pinned upstream URLs; fonts use the upstream Netflix Sans font URLs. Those external resources need network access. The opening sound begins after user interaction. Videos start muted and have a sound toggle.

## Profiles

- **Recruiter:** production impact, experience, skills, education, credentials, and selected projects.
- **Developer:** implementations, stacks, working demos, and available source links.
- **Stalker:** professional journey, education, credentials, and contact.
- **Adventurer:** adversarial ML, hardware benchmarking, and explainable AI.

## Live demos

- [CyberGuard XAI](https://cyberguard-xai.netlify.app/)
- [SkillSwap](https://skill-swap.netlify.app/)
- [M-Sum-PAI](https://transcripto-ai.netlify.app/) · [Source](https://github.com/3nadh3/AI-Transcriber-Summarize-Frontend)

The chatbot retains the existing backend at `https://portfolio-chatbot-ozkz.onrender.com/chat` and its `{ input }` / `{ message }` API contract. Includes suggested questions, pending-state protection, and timeout/error handling.

## Validation

TypeScript and the production build pass. DOM checks against the built JavaScript passed for the opening flow, four distinct profiles, anchor navigation, demo links, dialogs, and chatbot opening. Demo URLs returned HTTP 200 during the preceding audit. Full browser visual review and actual media playback remain unverified because the Chromium download failed in the development environment.
