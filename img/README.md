# Images

Drop image files in this folder and reference them from the pages as
`img/<filename>`. Nothing here is required — every page is designed to look
finished without images, so you can add them one at a time.

## Filenames the site already expects

If you add a file with one of these names, follow the note next to it to switch
it on. Until then the site falls back to a gradient or a text placeholder, so
there are never broken-image icons.

| Filename | Used for | How to switch it on |
| --- | --- | --- |
| `hero.jpg` | Background of the home page hero | In `styles.css`, find `HERO IMAGE` and uncomment the `background-image` line |
| `logo.svg` | Header logo, replaces the `EAA` text mark | In each page's header, swap the `<span class="brand-mark">EAA</span>` for `<img src="img/logo.svg" alt="EAA" class="brand-logo">` |
| `og-image.jpg` | Link preview when the site is shared | In each page's `<head>`, uncomment the `og:image` meta tag |
| `team/<name>.jpg` | Portraits on the team page | In `team.html`, uncomment the `<img>` inside that person's card |

## Guidelines

- **Format:** `.jpg` for photos, `.svg` or `.png` for logos and icons. `.webp`
  works everywhere that matters if you want smaller files.
- **Size:** keep photos under ~300 KB. Full-width images look good at about
  1600px wide; team portraits at about 600×600 (square crop).
- **Naming:** lowercase, hyphens instead of spaces (`intro-program-2026.jpg`).
  Uppercase or spaces in filenames break on some web servers.
- **Alt text:** always fill in the `alt` attribute with a short description of
  what the image shows. Screen readers read it aloud, and it shows if the image
  fails to load. Use `alt=""` only for purely decorative images.
- **Permission:** only upload photos you have the right to use, and make sure
  people pictured are happy to appear on a public site.
