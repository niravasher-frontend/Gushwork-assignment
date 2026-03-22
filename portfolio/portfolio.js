(function () {
  var PORTFOLIO_ITEMS = [
    {
      title: "HDPE Fittings & Accessories",
      description:
        "Complete range of electrofusion and butt fusion fittings, including elbows, tees, reducers, and couplers for seamless pipe connections.",
      imageSrc: "assets/fishnet.jpg",
      imageAlt: "Technician reviewing materials in a warehouse",
      buttonText: "Learn More",
    },
    {
      title: "Professional Installation Services",
      description:
        "Expert installation and fusion welding services ensuring optimal system performance, compliance with standards, and long-term reliability.",
      imageSrc: "assets/fishnet.jpg",
      imageAlt: "Team reviewing installation plans on site",
      buttonText: "Learn More",
    },
    {
      title: "PE-RT Heating Pipes",
      description:
        "Polyethylene of Raised Temperature resistance pipes ideal for underfloor heating, radiator connections, and hot water applications.",
      imageSrc: "assets/fishnet.jpg",
      imageAlt: "Industrial piping and quality inspection",
      buttonText: "Learn More",
    },
  ];

  var grid = document.querySelector(".portfolio__grid");
  if (!grid) return;

  for (var i = 0; i < PORTFOLIO_ITEMS.length; i++) {
    var item = PORTFOLIO_ITEMS[i];

    var article = document.createElement("article");
    article.className = "portfolio-card";

    var titleEl = document.createElement("div");
    titleEl.className = "portfolio-card__title";
    titleEl.textContent = item.title;

    var descEl = document.createElement("p");
    descEl.className = "portfolio-card__desc";
    descEl.textContent = item.description;

    var media = document.createElement("div");
    media.className = "portfolio-card__media";

    var img = document.createElement("img");
    img.className = "portfolio-card__img";
    img.src = item.imageSrc;
    img.alt = item.imageAlt;
    img.loading = "lazy";
    img.decoding = "async";

    media.appendChild(img);

    var btn = document.createElement("a");
    btn.className = "portfolio-card__btn";
    btn.href = "#contact";
    btn.textContent = item.buttonText;

    article.appendChild(titleEl);
    article.appendChild(descEl);
    article.appendChild(media);
    article.appendChild(btn);

    grid.appendChild(article);
  }
})();
