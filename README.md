# Trinadh Musunuri — Portfolio

Netflix-inspired personal portfolio with profile selection, a cinematic hero, filterable project titles, accessible project dialogs, and resume-based experience and skills.

## Run locally

```sh
cd portfolio
python3 -m http.server 8080
```

Open http://localhost:8080. Deploy the `portfolio/` directory as a static site; no build step or environment variables are required. The downloadable resume is in `portfolio/resume/Trinadh_Musunuri_Resume.pdf`.

Content lives in `portfolio/index.html`; project and skill data live in `portfolio/js/portfolio.js`. Viewing profiles change the initial section or project filter. All visitors can access every section. The first-visit profile picker can be dismissed with Escape or the close button.

## Design reference

Inspired by [shamihsnn/netflix-portfolio](https://github.com/shamihsnn/netflix-portfolio): red-on-black branding, role-based profile selection, terminal styling, and browsable content rows. This implementation keeps the existing static deployment and uses Trinadh's own resume content. The opening sound, profile avatars, and profile-specific background videos are loaded from the reference repository at pinned commit `6f691190bebcbcae9a16ec7bcf092201ff5eb71f`. These require network access to raw.githubusercontent.com. The opening sequence follows its click-to-enter transition. Not affiliated with Netflix.

The opening sound plays only after Enter is clicked. Visitors can mute it before entering. Background videos start muted and have an explicit sound toggle. Reduced-motion settings skip the opening transition. Returning visitors skip the opening within the same tab session.
