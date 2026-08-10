/* Navigation behaviour: mobile menu toggle + accessible dropdown.
   The CSS already opens the dropdown on hover and keyboard focus, so the site
   is fully navigable with JavaScript disabled. This layer adds click-to-open,
   Escape to close, and click-outside to close. */
(function () {
  "use strict";

  var nav = document.getElementById("site-nav");
  var toggle = document.querySelector(".nav-toggle");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
  }

  var dropdownToggles = Array.prototype.slice.call(
    document.querySelectorAll(".dropdown-toggle")
  );

  function closeAll(except) {
    dropdownToggles.forEach(function (btn) {
      if (btn !== except) {
        btn.setAttribute("aria-expanded", "false");
      }
    });
  }

  dropdownToggles.forEach(function (btn) {
    btn.addEventListener("click", function (event) {
      event.preventDefault();
      var open = btn.getAttribute("aria-expanded") === "true";
      closeAll(btn);
      btn.setAttribute("aria-expanded", String(!open));
    });
  });

  document.addEventListener("click", function (event) {
    if (!event.target.closest(".has-dropdown")) {
      closeAll(null);
    }
  });

  /* Add-to-calendar. Everything is derived from one value: the data-ics
     attribute on #subscribe. Empty means not configured yet, and the card falls
     back to a plain explanation rather than showing buttons that go nowhere. */
  var sub = document.getElementById("subscribe");

  if (sub) {
    var feed = (sub.getAttribute("data-ics") || "").trim();
    var buttons = sub.querySelector("[data-subscribe-buttons]");
    var fallback = sub.querySelector("[data-subscribe-fallback]");
    var status = sub.querySelector("[data-subscribe-status]");

    if (feed) {
      // Accept the URL in either form and derive both.
      var httpsFeed = feed.replace(/^webcal:\/\//i, "https://");
      var webcalFeed = httpsFeed.replace(/^https:\/\//i, "webcal://");

      var google = sub.querySelector('[data-subscribe="google"]');
      var webcal = sub.querySelector('[data-subscribe="webcal"]');
      var copy = sub.querySelector('[data-subscribe="copy"]');

      if (google) {
        google.href =
          "https://calendar.google.com/calendar/r?cid=" +
          encodeURIComponent(httpsFeed);
      }
      // Apple Calendar and Outlook both handle webcal: directly.
      if (webcal) {
        webcal.href = webcalFeed;
      }
      if (copy) {
        copy.addEventListener("click", function () {
          function done(ok) {
            if (!status) return;
            status.textContent = ok
              ? "Link copied — paste it into your calendar app's “subscribe by URL”."
              : "Could not copy automatically. The link is: " + httpsFeed;
          }
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(httpsFeed).then(
              function () { done(true); },
              function () { done(false); }
            );
          } else {
            done(false);
          }
        });
      }

      buttons.hidden = false;
      if (fallback) fallback.hidden = true;
    }
  }

  /* WhatsApp invite: assembled on click so the link is never sitting in the
     page source for scrapers to harvest. */
  var reveal = document.getElementById("whatsapp-reveal");
  var target = document.getElementById("whatsapp-link");

  if (reveal && target) {
    reveal.addEventListener("click", function () {
      /* The host is assembled here rather than written in the HTML, so the page
         source contains only the invite code and never a complete group URL. */
      var url = "https://" + "chat.whatsapp" + ".com/" + (reveal.dataset.code || "");

      if (!reveal.dataset.code) {
        target.innerHTML =
          'The invite link has not been added yet — email ' +
          '<a href="mailto:info@eaamsterdam.com">info@eaamsterdam.com</a> ' +
          "and we will send it to you.";
        target.hidden = false;
        reveal.hidden = true;
        return;
      }

      var link = document.createElement("a");
      link.href = url;
      link.className = "button";
      link.rel = "noopener";
      link.target = "_blank";
      link.textContent = "Open WhatsApp and join";

      target.textContent = "";
      target.appendChild(link);
      target.hidden = false;
      reveal.hidden = true;
      link.focus();
    });
  }

  document.addEventListener("keydown", function (event) {
    if (event.key !== "Escape") {
      return;
    }
    closeAll(null);
    if (nav && nav.classList.contains("is-open") && toggle) {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.focus();
    }
  });
})();
