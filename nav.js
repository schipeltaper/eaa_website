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
