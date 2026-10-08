# Trinadh Musunuri — Netflix-Inspired Portfolio

My personal portfolio featuring my software engineering experience at IBM, CMU research, projects, technical skills, and M.S. Computer Science education (expected May 2027).

## Portfolio versions

| Branch | Design |
| --- | --- |
| [`master`](https://github.com/3nadh3/portfolio/tree/master) | Current Netflix-inspired portfolio, personalized with my resume and content. |
| [`original-personal-design`](https://github.com/3nadh3/portfolio/tree/original-personal-design) | My original portfolio design, designed and developed by me, preserved before the redesign. |

The original design branch preserves the previous website code at commit `bbd56769ca3c6985c5a32392c1eb5db761fc16c8`, with a README identifying the archived version.

## Credits and kudos

Kudos and thanks to **[shamihsnn / Usama Hassan](https://github.com/shamihsnn)** for **[netflix-portfolio](https://github.com/shamihsnn/netflix-portfolio)**, the original design reference for this version. The opening flow, role-based profile selection, typography, sound, avatars, and cinematic background videos are adapted from that project. My original repository remains independent rather than a GitHub fork; this README records the upstream inspiration and asset attribution.

The reference assets are loaded from commit `6f691190bebcbcae9a16ec7bcf092201ff5eb71f`: the `tudum.mp3` opening sound, four profile avatars, and corresponding background videos. Typography uses the reference's Netflix Sans regular, medium, and bold font URLs with Helvetica/Arial fallbacks. Media requires access to `raw.githubusercontent.com`; fonts require access to `assets.nflxext.com`. This portfolio is not affiliated with Netflix.

## Features

- Full-screen name intro with click-to-enter sound and zoom/fade transition.
- Recruiter, Developer, Stalker, and Adventurer profile selection.
- Profile-specific background videos and top-picks heading.
- Resume-based experience, skills, education, and projects.
- Project filters and accessible detail dialogs.
- Resume download, LinkedIn, GitHub, and email links.
- Responsive layouts, keyboard controls, and reduced-motion handling.

The opening screen is a portfolio entrance, not account authentication. Sound starts only after clicking Enter. Intro sound can be muted before entering; background videos start muted and have a sound toggle. Returning visitors skip the intro within the same tab session.

## Run locally

```sh
cd portfolio
python3 -m http.server 8080
```

Open http://localhost:8080. Deploy `portfolio/` as the static site root. No build step or environment variables are required.

## Update content

- `portfolio/index.html`: experience, education, contact details, opening screens.
- `portfolio/js/portfolio.js`: project/skill data, profiles, media, and interaction logic.
- `portfolio/css/index.css`: layout, reference fonts, and responsive styling.
- `portfolio/resume/Trinadh_Musunuri_Resume.pdf`: downloadable resume; matches the provided resume.

## Validation

JavaScript syntax and DOM interaction checks passed for the intro, sound controls, profiles, video selection, project filters/dialogs, navigation targets, and local assets. Full browser visual review and real audio/video playback remain unverified because Chromium was unavailable in the development environment. This implementation adapts the reference's design; pixel-for-pixel equivalence has not been verified.

## Portfolio assistant

The Netflix-themed chatbot uses the existing backend at `https://portfolio-chatbot-ozkz.onrender.com/chat` with the original `{ input: message }` request and `{ message: reply }` response. Includes suggested questions, a typing indicator, duplicate-send protection, timeout/error handling, Escape-to-close, and mobile keyboard support. The free-tier service may need time to wake up. Chat styling and interactions are in `portfolio/css/index.css` and `portfolio/js/chatbot.js`.

## Profile-specific content and project links

Recruiter highlights production impact, experience, education, skills and selected projects. Developer highlights implemented systems, technical stacks, three live demos and the M-Sum-PAI source. Stalker follows the education/research/internship journey and credentials. Adventurer highlights adversarial ML and CPU–NPU research plus explainable AI. Profiles control visible sections, navigation, hero copy, top-picks links and project selection; project filters stay within the current profile. Profiles are restored on reload within the tab.

Live demos restored from PDF hyperlink annotations: https://cyberguard-xai.netlify.app/ and https://skill-swap.netlify.app/. The original site supplied https://transcripto-ai.netlify.app/ and https://github.com/3nadh3/AI-Transcriber-Summarize-Frontend. Missing research demo/source URLs are not guessed. Original certification links are preserved.
