(function () {
  var heroEl = document.getElementById("main-hero");
  var stickyEl = document.getElementById("product-sticky-header");
  var toggleEl = document.getElementById("site-header-menu-toggle");
  var navEl = document.getElementById("site-header-nav");
  var backdropEl = document.getElementById("site-header-nav-backdrop");

  var lastScrollY = window.scrollY;
  var scrollTicking = false;
  var scrollEpsilon = 2;

  function isPastHero() {
    if (!heroEl) return false;
    var rect = heroEl.getBoundingClientRect();
    return rect.bottom <= 0;
  }

  function setStickyVisible(visible) {
    if (!stickyEl) return;
    stickyEl.classList.toggle("is-visible", visible);
    stickyEl.setAttribute("aria-hidden", visible ? "false" : "true");
  }

  function onScrollFrame() {
    scrollTicking = false;
    if (!stickyEl || !heroEl) return;
    var y = window.scrollY;
    var past = isPastHero();

    if (!past) {
      setStickyVisible(false);
    } else if (y < lastScrollY - scrollEpsilon) {
      setStickyVisible(false);
    } else if (y > lastScrollY + scrollEpsilon) {
      setStickyVisible(true);
    }

    lastScrollY = y;
  }

  function onScroll() {
    if (!scrollTicking) {
      scrollTicking = true;
      requestAnimationFrame(onScrollFrame);
    }
  }

  if (heroEl && stickyEl) {
    window.addEventListener("scroll", onScroll, { passive: true });
    lastScrollY = window.scrollY;
    onScrollFrame();
  }

  function setMenuOpen(open) {
    if (!navEl || !toggleEl) return;
    document.body.classList.toggle("site-header--menu-open", open);
    navEl.classList.toggle("is-open", open);
    if (backdropEl) {
      backdropEl.classList.toggle("is-visible", open);
      backdropEl.setAttribute("aria-hidden", open ? "false" : "true");
    }
    toggleEl.setAttribute("aria-expanded", open ? "true" : "false");
    toggleEl.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  if (toggleEl && navEl) {
    toggleEl.addEventListener("click", function () {
      var open = !navEl.classList.contains("is-open");
      setMenuOpen(open);
    });

    if (backdropEl) {
      backdropEl.addEventListener("click", closeMenu);
    }

    var navLinks = navEl.querySelectorAll("a");
    for (var i = 0; i < navLinks.length; i++) {
      navLinks[i].addEventListener("click", function () {
        if (window.matchMedia("(max-width: 800px)").matches) {
          closeMenu();
        }
      });
    }

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && navEl.classList.contains("is-open")) {
        closeMenu();
      }
    });

    window.addEventListener(
      "resize",
      function () {
        if (window.matchMedia("(min-width: 801px)").matches) {
          closeMenu();
        }
      },
      { passive: true }
    );
  }
})();
