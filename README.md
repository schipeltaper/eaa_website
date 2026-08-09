# eaamsterdam website

The website for Effective Altruism Amsterdam. Plain HTML and CSS — no build step,
no frameworks, no dependencies. Edit a file, commit, and it is live.

## Running it locally

Serve the folder and open <http://localhost:8000>:

```sh
python3 -m http.server 8000
```

(Opening `index.html` straight from Finder/Explorer mostly works too.)

## Deploying

The site is served by GitHub Pages from the `main` branch, `/ (root)` folder.
Anything merged to `main` goes live within a minute or two.

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
| `contact.html` | How to reach us |
| `donate.html` | Giving to EAA, and giving well generally |
| `styles.css` | All styling for every page |
| `nav.js` | Mobile menu and dropdown behaviour |
| `img/` | Images — see `img/README.md` |

## Before this goes public — things to fill in

Search the project for `TODO` and you will find every one of these in context.
The site is written so nothing is broken while they are outstanding, but several
of them are placeholder text that a visitor would notice.

**Needed:**

- **Luma calendar embed** — `index.html` and `events.html` (see below)
- **WhatsApp group invite link** — currently points at the contact page. Appears
  in the footer of every page, plus `index.html` and `contact.html`
- **LinkedIn page URL** — same places
- **The team** — `team.html` is four placeholder cards
- **Impact numbers and stories** — `index.html`, deliberately left as `—`
  rather than guessed at
- **Donation route** — `donate.html` has no payment link or bank details yet

**Worth checking:**

- Day, time and room for the weekly discussion (`events.html`)
- The week-by-week program outline against this semester's curriculum (`programs.html`)
- Named partner organisations (`collaborations.html`)
- Venue accessibility details (`events.html`)
- Whether the mission statement wording is what the team agreed (`mission.html`)
- The community health contact — a general inbox is a real barrier for sensitive
  reports, so a named person or dedicated address is better (`community-health.html`)

## Embedding the Luma calendar

Both `index.html` and `events.html` have a placeholder block where the calendar
goes, marked with a `LUMA CALENDAR EMBED` comment.

1. Open your calendar on [lu.ma](https://lu.ma) as an admin.
2. Go to the calendar's settings — the **Embed** option is under the settings
   page or the `...` menu.
3. Choose **Embed Calendar** and copy the snippet. It looks like this, with your
   own calendar ID in place of the `cal-…` part:

   ```html
   <iframe
     src="https://lu.ma/embed/calendar/cal-XXXXXXXXXXXX/events"
     width="100%" height="700" frameborder="0" style="border:0"
     allowfullscreen="" aria-hidden="false" tabindex="0"
     title="Effective Altruism Amsterdam events calendar"></iframe>
   ```

4. In each file, replace the whole `<div class="embed-placeholder">…</div>` with
   your iframe, keeping the surrounding `<div class="embed">` so it picks up the
   rounded border. Add a `title` attribute if the copied snippet lacks one —
   screen readers announce it.

Nothing else is needed: the calendar updates itself as you add events on Luma.

**Registration button for a single event.** If you want a "Register" button for
one specific event rather than the whole calendar, Luma has a checkout widget.
On the event's manage page, under **More**, copy the embed registration snippet:

```html
<button class="luma-checkout--button" type="button"
        data-luma-action="checkout" data-luma-event-id="evt-YOUR-EVENT-ID">
  Register
</button>
<script id="luma-checkout" src="https://embed.lu.ma/checkout-button.js"></script>
```

Include that `<script>` only once per page, even with several buttons.

## Editing conventions

- **Header and footer are copied into each page.** There is no templating, which
  is the trade-off for having no build step. If you change a nav link, change it
  in all twelve files — `grep -l "about-eaa.html" *.html` lists them.
- **The current page** is marked with `aria-current="page"` on its nav link. Keep
  that accurate when adding pages.
- **New page?** Copy an existing one, change the `<title>`, the `<meta
  name="description">`, the `<h1>` and the body. Then add it to the nav and the
  footer everywhere.
- **Colours, spacing and fonts** are CSS custom properties at the top of
  `styles.css`. Change them there rather than in individual rules — light and
  dark themes both read from those variables.
- **Dark mode** follows the visitor's system setting. If you add colours, add
  them to both blocks at the top of `styles.css`.
- The site works with JavaScript disabled; `nav.js` only improves the menu.
