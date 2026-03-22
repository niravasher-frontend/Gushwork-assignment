(function () {
  var APPLICATIONS = [
    {
      title: "Fishnet Manufacturing",
      description:
        "High-performance twisting solutions for packaging yarn, strapping materials, and reinforcement threads used in modern packaging applications.",
      imageSrc: "assets/fishnet.jpg",
      imageAlt: "Industrial worker at a manufacturing facility",
    },
    {
      title: "Packaging Yarn Systems",
      description:
        "Precision-engineered lines for technical textiles and high-tenacity yarns used in bundling, palletizing, and protective packaging worldwide.",
      imageSrc: "assets/fishnet.jpg",
      imageAlt: "Industrial worker at a manufacturing facility",
    },
    {
      title: "Strapping & Reinforcement",
      description:
        "Robust twisting and winding equipment for strapping bands and reinforcement threads that meet demanding load and UV-exposure specifications.",
      imageSrc: "assets/fishnet.jpg",
      imageAlt: "Industrial worker at a manufacturing facility",
    },
    {
      title: "Technical Textiles",
      description:
        "Versatile machinery for geotextiles, industrial netting, and specialty fabrics where consistent tension and throughput drive product quality.",
      imageSrc: "assets/fishnet.jpg",
      imageAlt: "Industrial worker at a manufacturing facility",
    },
    {
      title: "Industrial Netting Lines",
      description:
        "Scalable production for safety netting, aquaculture, and construction meshes—with controls tuned for repeatability across long production runs.",
      imageSrc: "assets/fishnet.jpg",
      imageAlt: "Industrial worker at a manufacturing facility",
    },
    {
      title: "Custom Fiber Processing",
      description:
        "Application-specific configurations for blended fibers, coated yarns, and specialty threads used across packaging and industrial supply chains.",
      imageSrc: "assets/fishnet.jpg",
      imageAlt: "Industrial worker at a manufacturing facility",
    },
  ];

  var track = document.getElementById("applications-track");
  var scrollEl = document.getElementById("applications-scroll");
  var prevBtn = document.querySelector(".applications__nav-btn--prev");
  var nextBtn = document.querySelector(".applications__nav-btn--next");

  if (!track || !scrollEl) return;

  for (var i = 0; i < APPLICATIONS.length; i++) {
    var item = APPLICATIONS[i];

    var article = document.createElement("article");
    article.className = "applications-card";

    var media = document.createElement("div");
    media.className = "applications-card__media";

    var img = document.createElement("img");
    img.className = "applications-card__img";
    img.src = item.imageSrc;
    img.alt = item.imageAlt;
    img.width = 400;
    img.height = 533;
    img.loading = i < 2 ? "eager" : "lazy";
    img.decoding = "async";

    var gradient = document.createElement("div");
    gradient.className = "applications-card__gradient";
    gradient.setAttribute("aria-hidden", "true");

    var content = document.createElement("div");
    content.className = "applications-card__content";

    var h3 = document.createElement("h3");
    h3.className = "applications-card__title";
    h3.textContent = item.title;

    var p = document.createElement("p");
    p.className = "applications-card__desc";
    p.textContent = item.description;

    content.appendChild(h3);
    content.appendChild(p);

    media.appendChild(img);
    media.appendChild(gradient);
    media.appendChild(content);
    article.appendChild(media);
    track.appendChild(article);
  }

  function scrollStep(direction) {
    var card = track.querySelector(".applications-card");
    var gap = 20;
    var amount = (card ? card.offsetWidth : 296) + gap;
    scrollEl.scrollBy({ left: direction * amount, behavior: "smooth" });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", function () {
      scrollStep(-1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", function () {
      scrollStep(1);
    });
  }

  scrollEl.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      scrollStep(-1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      scrollStep(1);
    }
  });
})();
