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
