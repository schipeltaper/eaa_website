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

## Contact address

`info@eaamsterdam.com` — confirmed correct, and what every page uses.

Note that the 2025 fellowship curriculum PDF says `info@eaamsterdam.org` in three
places and links to `www.eaamsterdam.org/events`. That is the document that needs
correcting, not the site — worth fixing before the next cohort receives it.

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
| `programs.html` | Introductory EA Fellowship and what comes after |
| `contact.html` | How to reach us, and the WhatsApp invite |
| `donate.html` | Giving to EAA, and giving well generally |
| `styles.css` | All styling for every page |
| `nav.js` | Mobile menu, dropdown, calendar subscribe, WhatsApp reveal |
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

So the pages link to `styles.css?v=5` and `nav.js?v=5`. **When you change either
file, bump that number in all eleven pages** — here 5 becomes 6:

```sh
sed -i '' 's/?v=5/?v=6/g' *.html   # macOS
sed -i    's/?v=5/?v=6/g' *.html   # Linux
```

(And so on next time. All that matters is using a number the browser has not
seen before.)

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

### Letting people subscribe — one value to fill in

The events page has an **Add our calendar to yours** card with Google Calendar,
Apple/Outlook and Copy-link buttons. All three are built by `nav.js` from a
single attribute, so there is exactly one thing to set:

```html
<div class="card" id="subscribe" data-ics="">
```

Put your Luma calendar's **iCal subscription URL** in `data-ics` and the buttons
appear and work. Leave it empty and they stay hidden, with a short explanation
shown instead — the card never looks broken.

It accepts the URL in either form. Give it `https://…` or `webcal://…`; the
script derives the other, sends Google the https version through its
add-by-URL flow, and gives Apple and Outlook the `webcal://` version, which both
open directly.

**Where to get the URL.** On luma.com, open the calendar while signed in and look
for Subscribe / iCal. Luma documents this at `help.luma.com/p/ical-syncing`.

**A shortcut worth testing first.** Paste this into a browser:

```
https://api.lu.ma/ics/get?entity=calendar&id=cal-Fqocig0MZljxyNl
```

If it downloads a `.ics` file, that is the feed — put it straight into
`data-ics`. If it errors, use whatever URL Luma gives you instead. That address
is an educated guess at Luma's feed endpoint, which is undocumented and could
not be verified when this was written, so test it rather than trusting it.

Once set, this is genuinely one click for a visitor, and their calendar then
updates itself whenever an event is added or a time changes.

A Google Calendar embed would be an alternative, but it would mean maintaining
events in two places. Keeping Luma as the single source is simpler.

### Events hosted somewhere else (Meetup, Eventbrite…)

When someone runs one of our events on their own platform, you do not have to
choose between listing it twice and leaving it off. Luma has a mode for exactly
this: on the calendar's submit-event panel choose **Add Event from External
Platform**, paste the event page URL, then fill in the name, location, host and
time — checking the time zone.

The event then appears on our calendar like any other, and clicking it takes
people straight to the Meetup page rather than a Luma registration form.

Two things to know:

- **No cover image.** Luma does not store one for external events, and neither
  the host nor a calendar admin can add one afterwards, so those entries look
  plainer than the rest.
- **No Luma features.** Managed guest lists, check-in, payments and email blasts
  do not apply — registration lives entirely on the other platform.

Neither matters for a Meetup-run social, and it beats maintaining the same event
in two places.

### Program sessions on the calendar

The same calendar is embedded on `programs.html`, so program sessions show up
there automatically once you add them on Luma. The point is that someone finding
you in week three can see a cohort is running even though they cannot join it —
and knows to ask about the next one.

Two ways to run it:

- **One calendar** (what it does now). Add each session as an event with a clear
  title — `Intro Fellowship · Week 3` makes the sequence obvious. For sessions
  closed to newcomers, turn registration off or set the event to invite-only on
  Luma, so people see it without being able to sign up by mistake.
- **A separate programs calendar.** Make a second calendar on Luma and swap its
  id into the `src` on `programs.html`. Cleaner separation, two calendars to keep
  up to date.

Start with one. Split it only if the events calendar gets so busy that program
sessions are hard to pick out.

## The WhatsApp invite

`contact.html` has a **Show the invite link** button. Fill in the invite code:

1. In WhatsApp, open the group or community → **Invite via link** → **Copy link**.
2. The link ends in a slash followed by a string of letters and numbers. Copy
   only that trailing string.
3. Paste it into `data-code=""` on the `#whatsapp-reveal` button in
   `contact.html`.

The invite code is filled in. If it ever needs changing — a link reset, a new
group — `data-code` is the only thing to edit. Left empty, the button politely
tells people to email instead, so the page is never broken.

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


- **Team roles, bios and photos** — `team.html` has everyone's name from the
  planning doc but placeholder roles and bios. Each group's list ended in "..." so
  people are probably missing. Naomi is commented out because the doc had a
  question mark next to her name
- **Speaker details** — `collaborations.html` has first names only for Ruben,
  Vicky and Lobo. Add full names, what they work on, and what they spoke about
- **Impact numbers** — `index.html`, deliberately left as `—` rather than guessed
  at: events organised, programs run, pledges, members
- **Donation route** — `donate.html` has no payment link or bank details yet
- **Luma calendar link** — `events.html`, for the subscribe button
- **Meetup.com link** — `team.html`, for the young professionals group
- **KPIs** — `mission.html`. The planning doc had the heading but nothing under
  it, so four are drafted from the theory of change. Replace with the real ones
- **Organisation logos** — `collaborations.html`, for EAN, AISIA and PBU
- **Photos** — see the list in `img/README.md`

**Worth checking:**

- Day, time and room for the weekly discussion (`events.html`)
- The week-by-week program outline against this semester's curriculum (`programs.html`)
- The year the rebuilding phase started (`about-eaa.html`)
- Venue accessibility details (`events.html`)
- The community health contact — a general inbox is a real barrier for sensitive
  reports, so a named person or dedicated address is better (`community-health.html`)
- Whether the descriptions of AISIA and PBU on `collaborations.html` are how
  those organisations would describe themselves

## Deliberately not on the site

- **Organisers' personal phone numbers.** The fellowship curriculum lists mobile
  numbers for pressing matters during a cohort. That is right for a document sent
  to enrolled fellows and wrong for a public web page, where it would be scraped
  within days. The site routes everything through the shared inbox instead.
- **Naomi.** The planning doc had a question mark by the name, so the card in
  `team.html` is commented out rather than published unconfirmed.

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
