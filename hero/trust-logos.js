(function () {
  const track = document.getElementById("hero-trust-track");
  if (!track) return;

  const PARTNER_LOGOS = Array.from({ length: 12 }, (_, i) => ({
    src: "assets/euroflex-logo.svg",
    alt: i === 0 ? "Euroflex" : "",
  }));

  for (let i = 0; i < PARTNER_LOGOS.length; i++) {
    const entry = PARTNER_LOGOS[i];
    const item = document.createElement("div");
    item.className = "hero-trust__item";

    const img = document.createElement("img");
    img.className = "hero-trust__logo";
    img.src = entry.src;
    img.alt = entry.alt;
    img.width = 122;
    img.height = 33;
    img.draggable = false;
    if (!entry.alt) {
      img.setAttribute("aria-hidden", "true");
    }

    item.appendChild(img);
    track.appendChild(item);
  }
})();
