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

Netlify build settings are committed in `netlify.toml`: base **repository root (`.`)**, build command **`npm run build`**, and publish directory **`portfolio`**. The `portfolio/` folder contains built assets; it is not the npm project directory.

For existing static hosting, publish **`portfolio/`**. For a host that builds from source, run **`npm run build`** and publish **`portfolio/`**. The root `index.html` is the Vite development entry, not the built page.

## Content and assets

- `src/pages/`: intro, profile selection, and personalized profile page.
- `src/components/`: reusable content rows, project dialog, and chatbot.
- `src/lib/content.json`: project descriptions, stacks, live links, skills, and profile content.
- `src/index.css`: upstream Tailwind styling plus personalized components.
- `public/`: original favicon, resume, intro sound, avatars, and default background.

The sound and default video are hosted locally. Developer, Stalker, and Adventurer videos use pinned upstream URLs; fonts use the upstream Netflix Sans font URLs. Those external resources need network access. The intro follows the reference’s one-second reveal delay and one-second scale/opacity transitions. The profile selector appears three seconds after sound playback starts, with its own fade/slide entrance. The identical upstream sound is preloaded at volume 0.7 and continues across that route transition rather than being cut off. Muted, rejected-audio, and reduced-motion flows have fallbacks. Animated blur was removed. Netflix Sans bold is preloaded, and the heavier profile/chat route loads separately from the intro. Sound is on by default. The intro and profile videos share a visitor preference stored in local storage, so muting once persists across profiles, reloads, and later visits in the same browser. Profile videos attempt audible autoplay; if the browser blocks it, the video plays muted with an unmute control without saving that fallback as the visitor’s preference. The intro sound still begins with Click to continue to preserve its animation timing.

## Profiles

- **Recruiter:** production impact, experience, skills, education, credentials, and selected projects.
- **Developer:** implementations, stacks, working demos, and available source links.
- **Stalker:** professional journey, education, credentials, and contact.
- **Adventurer:** adversarial ML, hardware benchmarking, and explainable AI.

## Live demos

- [CyberGuard XAI](https://cyberguard-xai.netlify.app/)
- [SkillSwap](https://skill-swap.netlify.app/)
- [M-Sum-PAI](https://transcripto-ai.netlify.app/) · [Source](https://github.com/3nadh3/AI-Transcriber-Summarize-Frontend)

The chatbot uses `https://portfolio-chatbot-ozkz.onrender.com/chat`. Each request sends `{ input, history }`, with completed `{ role, content }` user/assistant messages; the response remains `{ message }`. Recent conversation history stays in session storage for this browser tab across profile changes and reloads. **New chat** clears it. Only successful exchanges reach the LLM; greetings, pending indicators, and error messages are excluded. Context is bounded to 12 recent turns and 24,000 characters.

Assistant replies render as Markdown with headings, lists, bold labels, links, and scrollable tables/code blocks. Raw HTML is not rendered. The backend returns `{ message, suggestions }`: Gemini generates up to three follow-up questions from the current question and conversation history in the same request. There are no fixed suggestion buttons. Clicking a suggestion sends that exact question with the existing history; suggestions refresh after a successful answer and persist within the tab. Privacy refusals have no suggested follow-ups. Rate-limit errors show a request-limit message and retain the question for retry. Other failures provide clickable email and LinkedIn links so visitors can report the issue to Trinadh; those UI error messages never enter model history.

The matching [Node.js backend](https://github.com/3nadh3/portfolio-chatbot/tree/master) validates history, maps assistant messages to Gemini model messages, and supplies its own resume-based system instructions. Conversation state is request-local rather than shared between visitors.

## Validation

TypeScript and the production build pass. DOM checks against the built JavaScript passed for the opening flow, four distinct profiles, anchor navigation, demo links, dialogs, and chatbot opening. Demo URLs returned HTTP 200 during the preceding audit. Full browser visual review and actual media playback remain unverified because the Chromium download failed in the development environment.
