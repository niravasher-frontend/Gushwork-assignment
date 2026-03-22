(function () {
  var SHARED_DESCRIPTION =
    "HDPE pipes resist a wide range of chemicals, acids, and alkalis. Unlike metal pipes, they won't corrode, rust, or scale, ensuring pure water quality and extended service life in aggressive environments.";

  var PRODUCT_FEATURES = [
    { iconSrc: "assets/Bag.svg", title: "Superior Chemical Resistance", text: SHARED_DESCRIPTION },
    {
      iconSrc: "assets/Needle.svg",
      title: "Exceptional Flexibility & Durability",
      text: SHARED_DESCRIPTION,
    },
    { iconSrc: "assets/Package.svg", title: "Leak-Proof Fusion Welding", text: SHARED_DESCRIPTION },
    {
      iconSrc: "assets/GearFine.svg",
      title: "Cost-Effective Long-Term Solution",
      text: SHARED_DESCRIPTION,
    },
    { iconSrc: "assets/GearFine.svg", title: "Environmentally Sustainable", text: SHARED_DESCRIPTION },
    { iconSrc: "assets/GearFine.svg", title: "Certified Quality Assurance", text: SHARED_DESCRIPTION },
  ];

  var grid = document.querySelector(".product-features__grid");
  if (!grid) return;

  for (var i = 0; i < PRODUCT_FEATURES.length; i++) {
    var feature = PRODUCT_FEATURES[i];

    var li = document.createElement("li");
    li.className = "product-features__card";

    var iconWrap = document.createElement("span");
    iconWrap.className = "product-features__icon";
    iconWrap.setAttribute("aria-hidden", "true");

    var img = document.createElement("img");
    img.src = feature.iconSrc;
    img.alt = "";
    img.width = 32;
    img.height = 32;
    iconWrap.appendChild(img);

    var titleEl = document.createElement("span");
    titleEl.className = "product-features__card-title";
    titleEl.textContent = feature.title;

    var textEl = document.createElement("span");
    textEl.className = "product-features__card-text";
    textEl.textContent = feature.text;

    li.appendChild(iconWrap);
    li.appendChild(titleEl);
    li.appendChild(textEl);
    grid.appendChild(li);
  }
})();
