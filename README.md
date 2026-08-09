# eaamsterdam website

The website for Effective Altruism Amsterdam. Plain HTML and CSS — no build step,
no frameworks, no dependencies. Edit a file, commit, and it is live.

## Running it locally

Serve the folder and open <http://localhost:8000>:

```sh
python3 -m http.server 8000
```

## Deploying

GitHub Pages serves the `main` branch from `/ (root)`, with the custom domain in
`CNAME`. Anything merged to `main` goes live within a minute or two.

## The files

| File | What it is |
| --- | --- |
| `index.html` | Home page |
| `about-eaa.html` | About EAA overview, links to the five sub-pages |
| `team.html` | The team |
| `effective-altruism.html` | What effective altruism is |
| `mission.html` | Mission statement |
| `collaborations.html` | Who we work with |
| `community-health.html` | Code of conduct and how to raise a problem |
| `events.html` | Events, with the Luma calendar |
| `programs.html` | Introductory Program and what comes after |
| `contact.html` | How to reach us, and the WhatsApp invite |
| `donate.html` | Giving to EAA, and giving well generally |
| `styles.css` | All styling for every page |
| `nav.js` | Mobile menu, dropdown, WhatsApp reveal |
| `img/` | Images — see `img/README.md` |

## Design

**Light mode only.** There is no dark theme; the site looks the same for
everyone, which makes it far easier to check a change looks right. Two things
enforce that: there are no `prefers-color-scheme` rules in `styles.css`, and
`color-scheme: only light` asks browsers not to apply their own automatic
dark-mode transform (Chrome on Android can otherwise recolour a light page).

### If a change does not show up on the live site

Browsers cache CSS and JS hard. Because the filenames never change, a visitor
who has been to the site before can keep using the old stylesheet even after a
deploy — which looks like your change simply did not happen, while HTML changes
show up immediately.

So the pages link to `styles.css?v=2` and `nav.js?v=2`. **When you change either
file, bump that number in all eleven pages:**

```sh
sed -i '' 's/styles\.css?v=2/styles.css?v=3/g; s/nav\.js?v=2/nav.js?v=3/g' *.html   # macOS
sed -i    's/styles\.css?v=2/styles.css?v=3/g; s/nav\.js?v=2/nav.js?v=3/g' *.html   # Linux
```

The new URL is one the browser has never seen, so it always fetches fresh. To
check what is actually live regardless of your own cache, open the site in a
private window, or hard-reload with <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> +
<kbd>Shift</kbd> + <kbd>R</kbd>.

Colours come from the logo and live as custom properties at the top of
`styles.css`. Change them there rather than in individual rules:

| Token | Value | Used for |
| --- | --- | --- |
| `--sky` | `#6fc5e8` | The wordmark blue. Fills, accents, footer headings |
| `--teal` | `#0a7180` | Links and buttons. 5.7:1 on white |
| `--teal-strong` | `#065f6c` | Hover states |
| `--deep` | `#04454f` | Footer and call-to-action bands |
| `--text` | `#12323a` | Body text. 13.6:1 on white |
| `--muted` | `#4a6570` | Secondary text. 6.2:1 on white |

Every text/background pair meets WCAG AA (4.5:1). If you introduce a new colour,
check it — <https://webaim.org/resources/contrastchecker/> takes ten seconds.

## The events calendar

The Luma calendar is embedded on both `index.html` and `events.html`:

```html
<iframe src="https://luma.com/embed/calendar/cal-Fqocig0MZljxyNl/events" ...>
```

It updates itself — add an event on Luma and it appears here, no code change.

The fixed `width="600" height="450"` from Luma's snippet was removed on purpose:
`.embed iframe` in `styles.css` sets the width to 100% and the height to `44rem`
(`34rem` on phones), so it fills the column properly on every screen. If you swap
in a new snippet, drop its `width` and `height` attributes too.

**To point at a different calendar**, replace the `cal-…` id in both files.

### Letting people subscribe

The `events.html` page tells visitors to use the **Subscribe** button inside the
embedded calendar. That is the reliable route: Luma hands out the right feed for
Google Calendar, Apple Calendar or Outlook, and events then sync automatically —
including later changes to a time or venue.

There is also a hidden "Open the calendar on Luma" button in `events.html`, ready
for a one-click link. To switch it on, put your calendar's public URL
(`luma.com/<your-calendar>`) in the `href` and delete the `hidden` attribute on
the surrounding `div`.

A Google Calendar embed would be an alternative, but it would mean maintaining
events in two places. Keeping Luma as the single source is simpler.

## The WhatsApp invite

`contact.html` has a **Show the invite link** button. Fill in the invite code:

1. In WhatsApp, open the group or community → **Invite via link** → **Copy link**.
2. The link ends in a slash followed by a string of letters and numbers. Copy
   only that trailing string.
3. Paste it into `data-code=""` on the `#whatsapp-reveal` button in
   `contact.html`.

Until it is filled in, the button politely tells people to email instead, so the
page is never broken.

### Keeping bots out

Two separate things, and only the second one really matters:

**1. The link is not in the page source.** Bots crawl public pages for WhatsApp
invite URLs and feed them into spam lists. Only the invite code sits in the HTML;
`nav.js` adds the rest on click, so there is no complete URL to harvest. This
stops casual scraping. It is not access control — anyone can read the code.

**2. Require admin approval — this is the one that works.** In WhatsApp: group
**Settings → Group permissions → Approve new participants** (for a Community, the
same setting is per-group). Every join request then waits for an admin to accept
it. A spam account gets stopped at the door even if it has the link.

Also worth doing:

- **Set "Only admins can send messages" on the announcements group** if you use a
  Community. Chat happens in the sub-groups; announcements stay clean.
- **Reset the invite link** if it leaks or you start seeing junk requests:
  **Invite via link → Reset link**. Every old link dies instantly, so update
  `data-code` here at the same time.
- **Make more than one person an admin**, so approvals do not stall when someone
  is on holiday.

If you would rather not publish a link at all, delete the button and point people
at the email address — the page already mentions it as the fallback.

## Before this goes fully public — things to fill in

Search the project for `TODO` to find each of these in context. Nothing is broken
while they are outstanding, but they are placeholder text a visitor would notice.

**Needed:**

- **The team** — `team.html` is four placeholder cards
- **Impact numbers and stories** — `index.html`, deliberately left as `—` rather
  than guessed at
- **Donation route** — `donate.html` has no payment link or bank details yet
- **WhatsApp invite code** — `contact.html`, as above

**Worth checking:**

- Day, time and room for the weekly discussion (`events.html`)
- The week-by-week program outline against this semester's curriculum (`programs.html`)
- Named partner organisations (`collaborations.html`)
- Venue accessibility details (`events.html`)
- Whether the mission statement wording is what the team agreed (`mission.html`)
- The community health contact — a general inbox is a real barrier for sensitive
  reports, so a named person or dedicated address is better (`community-health.html`)

## Editing conventions

- **Header and footer are copied into each page.** There is no templating, which
  is the trade-off for having no build step. If you change a nav link, change it
  in all eleven files — `grep -l "about-eaa.html" *.html` lists them.
- **The current page** is marked with `aria-current="page"` on its nav link. Keep
  that accurate when adding pages.
- **New page?** Copy an existing one, change the `<title>`, the `<meta
  name="description">`, the `<h1>` and the body. Then add it to the nav and the
  footer everywhere.
- The site works with JavaScript disabled; `nav.js` only improves the menu. The
  one exception is the WhatsApp button, which falls back to the email address.
