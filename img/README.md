# Images

## What is here

**Originals** — the files you added. Leave these alone; they are the masters.

| File | What it is |
| --- | --- |
| `logo.webp` | Full wordmark, white — for dark backgrounds only |
| `logo2.webp` | Full wordmark, blue — for light backgrounds |
| `lamp_logo.webp` | The lightbulb mark on its own |
| `amsterdam.webp` | Stylised map of the canal ring (2.3 MB) |

**Derived** — generated from the originals, and what the pages actually load.

| File | Made from | Why |
| --- | --- | --- |
| `hero-amsterdam.webp` | `amsterdam.webp` | Home page hero. Resized to 1800px and re-encoded: 2.3 MB → 97 KB. The original would have been the slowest thing on the site, especially on a phone |
| `logo-wordmark.webp` | `logo2.webp` | Cropped to the artwork. The original is on an 1800×1800 canvas that is mostly empty space |
| `favicon-96.png` | `lamp_logo.webp` | Browser tab icon |
| `apple-touch-icon.png` | `lamp_logo.webp` | Icon when saved to a phone home screen |
| `og-image.png` | `logo2.webp` | Preview card when a link is shared |

## Where each one is used

- **Header, every page** — `lamp_logo.webp` beside the site name. It has a white
  background baked in rather than transparency, so the CSS uses
  `mix-blend-mode: multiply` to blend it into the header instead of showing a
  white square.
- **Home page hero** — `hero-amsterdam.webp` as a background, under a white
  gradient so the dark text stays readable. The gradient is angled on desktop
  (text left, map visible right) and flatter on phones where text spans the width.
- **Footer, every page** — `logo.webp`, the white wordmark, on the deep teal
  footer. This is the one place the white version belongs.
- **Social previews** — `og-image.png`.

`logo2.webp` is not loaded directly by any page; the cropped `logo-wordmark.webp`
is available if you want the blue wordmark somewhere on a light background.

## Regenerating the derived files

If you replace an original, the derived version needs remaking. There is no build
step, so do it with any image tool — the targets are:

- `hero-amsterdam.webp` — 1800px wide, WebP, quality ~72, under ~150 KB
- `logo-wordmark.webp` — cropped tight to the artwork, 900px wide
- `favicon-96.png` — 96×96, square, white background
- `apple-touch-icon.png` — 180×180, square, white background
- `og-image.png` — 1200×630, logo centred on white

## Adding new images

- **Format:** `.webp` or `.jpg` for photos, `.svg` or `.png` for logos and icons.
- **Size:** keep photos under ~300 KB. Full-width images look good at about
  1600–1800px wide; team portraits at about 600×600 (square crop). Anything
  straight off a phone camera is several times larger than it needs to be —
  resize before committing, since git keeps every version forever.
- **Naming:** lowercase, hyphens instead of spaces (`intro-program-2026.webp`).
  Uppercase or spaces break on some web servers.
- **Alt text:** always fill in the `alt` attribute with a short description of
  what the image shows. Screen readers read it aloud, and it displays if the image
  fails to load. Use `alt=""` only when the image is purely decorative or the
  text next to it already says the same thing.
- **Permission:** only upload photos you have the right to use, and make sure
  people pictured are happy to appear on a public site.

### Team portraits

Save as `img/team/firstname.jpg`, square, about 600×600. Then in `team.html`
swap the initials `<span>` for the commented-out `<img>` in that person's card.
Speakers work the same way, in `img/speakers/`, from `collaborations.html`.

### Organisation logos

Save as `img/orgs/<name>.png` — transparent or white background, about 400px
wide. Then swap the monogram `<span>` for the commented-out `<img>` in
`collaborations.html`. Wanted: `ean.png`, `aisia.png`, `pbu.png`.

## Photos still wanted

From the team's own list. Until these exist the pages use text and colour
instead, so nothing looks broken — but real photos of real people will do more
for this site than anything else on the list.

| Photo | Where it would go |
| --- | --- |
| Speaker event | `collaborations.html`, or the events page |
| Young professionals meetup | `team.html`, professionals section |
| Community photo — a good group shot | Home page, or the About page |
| Events — a few from discussions and socials | Events page |
| Conference / EAN event | Collaborations page |

A note on consent: get permission before publishing a photo where individuals
are recognisable, especially group shots taken at events. It is easier to ask on
the night than to take a photo down later.
