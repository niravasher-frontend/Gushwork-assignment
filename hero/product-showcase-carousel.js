(function () {
  var SLIDES = [
    {
      src: "assets/fishnet.jpg",
      alt: "Workers installing industrial netting at a project site — view 1",
    },
    {
      src: "assets/fishnet.jpg",
      alt: "Workers installing industrial netting at a project site — view 2",
    },
    {
      src: "assets/fishnet.jpg",
      alt: "Workers installing industrial netting at a project site — view 3",
    },
    {
      src: "assets/fishnet.jpg",
      alt: "Workers installing industrial netting at a project site — view 4",
    },
    {
      src: "assets/fishnet.jpg",
      alt: "Workers installing industrial netting at a project site — view 5",
    },
    {
      src: "assets/fishnet.jpg",
      alt: "Workers installing industrial netting at a project site — view 6",
    },
  ];

  var root = document.querySelector(".product-showcase__carousel");
  var mainImg = document.getElementById("product-showcase-main-img");
  var thumbsEl = document.getElementById("product-showcase-thumbs");
  var statusEl = document.getElementById("product-showcase-carousel-status");
  var prevBtn = document.querySelector(".product-showcase__nav--prev");
  var nextBtn = document.querySelector(".product-showcase__nav--next");

  if (!root || !mainImg || !thumbsEl || !prevBtn || !nextBtn) return;

  var count = SLIDES.length;
  var current = 0;
  var thumbButtons = [];

  function announce() {
    if (statusEl) {
      statusEl.textContent = "Image " + (current + 1) + " of " + count;
    }
  }

  var zoomPreviewImg = document.getElementById("product-showcase-zoom-preview-img");
  var zoomShell = document.querySelector(".product-showcase__zoom-shell");
  var zoomMain = document.querySelector(".product-showcase__zoom-main");
  var zoomCrop = document.querySelector(".product-showcase__zoom-crop");
  var zoomLens = document.querySelector(".product-showcase__zoom-lens");

  function applySlide(index) {
    current = (index + count) % count;
    var slide = SLIDES[current];
    mainImg.src = slide.src;
    mainImg.alt = slide.alt;
    if (zoomPreviewImg) {
      zoomPreviewImg.src = slide.src;
    }

    for (var i = 0; i < thumbButtons.length; i++) {
      var selected = i === current;
      thumbButtons[i].classList.toggle("is-active", selected);
      if (selected) {
        thumbButtons[i].setAttribute("aria-current", "true");
      } else {
        thumbButtons[i].removeAttribute("aria-current");
      }
    }

    announce();
  }

  function goTo(index) {
    applySlide(index);
  }

  function goPrev() {
    goTo(current - 1);
  }

  function goNext() {
    goTo(current + 1);
  }

  function buildThumbs() {
    thumbsEl.innerHTML = "";
    thumbButtons = [];

    for (var i = 0; i < count; i++) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "product-showcase__thumb";
      btn.setAttribute("aria-label", "Show image " + (i + 1) + " of " + count);
      if (i === 0) {
        btn.setAttribute("aria-current", "true");
      }

      var thumbImg = document.createElement("img");
      thumbImg.src = SLIDES[i].src;
      thumbImg.alt = "";
      thumbImg.width = 56;
      thumbImg.height = 56;
      thumbImg.loading = "lazy";
      thumbImg.decoding = "async";

      btn.appendChild(thumbImg);

      (function (idx) {
        btn.addEventListener("click", function () {
          goTo(idx);
        });
      })(i);

      thumbsEl.appendChild(btn);
      thumbButtons.push(btn);
    }
  }

  prevBtn.addEventListener("click", goPrev);
  nextBtn.addEventListener("click", goNext);

  root.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      goPrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      goNext();
    }
  });

  buildThumbs();
  applySlide(0);

  if (zoomShell && zoomMain && zoomCrop && zoomLens && zoomPreviewImg) {
    var zoomMoveRafId = 0;
    var zoomPendingX = 0;
    var zoomPendingY = 0;
    var zoomResizeRafId = 0;
    var zoomCapableCache = null;

    function computeIsZoomCapable() {
      if (!window.matchMedia) return false;
      return (
        window.matchMedia("(min-width: 1080px)").matches &&
        window.matchMedia("(hover: hover)").matches &&
        window.matchMedia("(pointer: fine)").matches
      );
    }

    function isZoomCapable() {
      if (zoomCapableCache === null) {
        zoomCapableCache = computeIsZoomCapable();
      }
      return zoomCapableCache;
    }

    function invalidateZoomCapableCache() {
      zoomCapableCache = null;
    }

    function getCoverMetrics(img, cw, ch) {
      var nw = img.naturalWidth;
      var nh = img.naturalHeight;
      if (!nw || !nh) return null;
      var scale = Math.max(cw / nw, ch / nh);
      var rw = nw * scale;
      var rh = nh * scale;
      var ox = (cw - rw) / 2;
      var oy = (ch - rh) / 2;
      return { scale: scale, nw: nw, nh: nh, rw: rw, rh: rh, ox: ox, oy: oy };
    }

    function getPreviewWidth() {
      var r = zoomPreviewImg.parentElement.getBoundingClientRect();
      if (r.width > 2) return r.width;
      return Math.min(320, window.innerWidth * 0.38);
    }

    /**
     * @param {number} clientX
     * @param {number} clientY
     * @param {DOMRect} [cropRect] — pass from rAF path to avoid a second getBoundingClientRect on the same frame
     */
    function updateZoom(clientX, clientY, cropRect) {
      if (!isZoomCapable()) return;
      var rect = cropRect || zoomCrop.getBoundingClientRect();
      var cw = rect.width;
      var ch = rect.height;
      var mx = clientX - rect.left;
      var my = clientY - rect.top;
      var m = getCoverMetrics(mainImg, cw, ch);
      if (!m) return;

      var L = Math.min(cw, ch) * 0.25;
      var half = L / 2;
      var cx = Math.max(half, Math.min(cw - half, mx));
      var cy = Math.max(half, Math.min(ch - half, my));
      var lx = cx - half;
      var ly = cy - half;

      zoomLens.style.left = lx + "px";
      zoomLens.style.top = ly + "px";
      zoomLens.style.width = L + "px";
      zoomLens.style.height = L + "px";

      var w0 = L / m.scale;
      var x0 = (lx - m.ox) / m.scale;
      var y0 = (ly - m.oy) / m.scale;
      var pw = getPreviewWidth();

      zoomPreviewImg.style.width = m.nw * (pw / w0) + "px";
      zoomPreviewImg.style.height = m.nh * (pw / w0) + "px";
      zoomPreviewImg.style.transform =
        "translate(" + -x0 * (pw / w0) + "px," + -y0 * (pw / w0) + "px)";
    }

    function syncZoomShellInactive() {
      var cap = isZoomCapable();
      zoomShell.classList.toggle("product-showcase__zoom-shell--inactive", !cap);
      if (!cap) {
        zoomMain.classList.remove("is-hovering");
      } else if (zoomMain.classList.contains("is-hovering")) {
        var r = zoomCrop.getBoundingClientRect();
        updateZoom(r.left + r.width / 2, r.top + r.height / 2);
      }
    }

    function onZoomMouseEnter(e) {
      if (!isZoomCapable()) return;
      zoomMain.classList.add("is-hovering");
      var r = zoomCrop.getBoundingClientRect();
      updateZoom(r.left + r.width / 2, r.top + r.height / 2);
    }

    function onZoomMouseLeave() {
      zoomMain.classList.remove("is-hovering");
      if (zoomMoveRafId) {
        cancelAnimationFrame(zoomMoveRafId);
        zoomMoveRafId = 0;
      }
    }

    function onZoomMouseMove(e) {
      if (!isZoomCapable()) return;
      zoomPendingX = e.clientX;
      zoomPendingY = e.clientY;
      if (zoomMoveRafId) return;
      zoomMoveRafId = requestAnimationFrame(function () {
        zoomMoveRafId = 0;
        if (!zoomMain.classList.contains("is-hovering")) return;
        var r = zoomCrop.getBoundingClientRect();
        if (
          zoomPendingX >= r.left &&
          zoomPendingX <= r.right &&
          zoomPendingY >= r.top &&
          zoomPendingY <= r.bottom
        ) {
          updateZoom(zoomPendingX, zoomPendingY, r);
        }
      });
    }

    function onMainImgLoad() {
      if (zoomMain.classList.contains("is-hovering")) {
        var r = zoomCrop.getBoundingClientRect();
        updateZoom(r.left + r.width / 2, r.top + r.height / 2);
      }
    }

    function onWindowResize() {
      if (zoomResizeRafId) return;
      zoomResizeRafId = requestAnimationFrame(function () {
        zoomResizeRafId = 0;
        invalidateZoomCapableCache();
        syncZoomShellInactive();
      });
    }

    invalidateZoomCapableCache();
    syncZoomShellInactive();
    window.addEventListener("resize", onWindowResize);

    zoomMain.addEventListener("mouseenter", onZoomMouseEnter);
    zoomMain.addEventListener("mouseleave", onZoomMouseLeave);
    zoomMain.addEventListener("mousemove", onZoomMouseMove);
    mainImg.addEventListener("load", onMainImgLoad);
  }
})();
