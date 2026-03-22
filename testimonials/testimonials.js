(function () {
  var TESTIMONIALS = [
    {
      headline: "Excellent support for specialized applications.",
      body:
        "The durability and performance of Mangalam’s HDPE piping has significantly improved our municipal water network reliability. Technical support and documentation were outstanding for our specialized pressure-class requirements.",
      name: "Carlos Mendoza",
      role: "Operations Manager",
    },
    {
      headline: "Provides the exact specifications we need.",
      body:
        "For our industrial fluid transport project, material specifications matched what we engineered on paper. Delivery timelines and fusion-joint training met our site schedule without compromise.",
      name: "Rajesh Kumar",
      role: "Manufacturing Head",
    },
    {
      headline: "Consistent quality across every coil.",
      body:
        "We’ve standardized on their coils for agricultural irrigation. Dimensional accuracy and UV resistance have held up season after season in harsh field conditions.",
      name: "Priya Sharma",
      role: "Procurement Lead",
    },
    {
      headline: "Fusion crews were up to speed in days.",
      body:
        "Their on-site butt-fusion and electrofusion training shortened our learning curve dramatically. Weld quality passed third-party inspection on the first major pressure test.",
      name: "James Okafor",
      role: "Site Supervisor",
    },
    {
      headline: "Reduced leaks and callbacks on our network.",
      body:
        "Since switching trunk mains to their PE100 SDR 11, we’ve seen fewer joint failures in high-traffic corridors. Monitoring teams report steadier flow readings year over year.",
      name: "Elena Vasquez",
      role: "Utilities Engineer",
    },
    {
      headline: "Responsive logistics for phased rollouts.",
      body:
        "Multi-drop deliveries aligned with our trenching phases across three districts. Coils were labeled clearly and matched the bill of materials every time.",
      name: "David Chen",
      role: "Project Director",
    },
    {
      headline: "Chemical resistance where we needed it most.",
      body:
        "Our leachate line runs aggressive effluent; their HDPE has shown no stress cracking where our older metallic pipe had pitting. Maintenance windows are shorter now.",
      name: "Amanda Frost",
      role: "Environmental Compliance Lead",
    },
    {
      headline: "Documentation that satisfied our auditors.",
      body:
        "Mill test reports, batch traceability, and compliance certificates arrived in one package. That made our ISO surveillance audit for the pipeline upgrade straightforward.",
      name: "Michael O’Brien",
      role: "Quality Assurance Manager",
    },
  ];

  var track = document.querySelector(".testimonials__track");
  if (!track) return;

  for (var i = 0; i < TESTIMONIALS.length; i++) {
    var t = TESTIMONIALS[i];

    var article = document.createElement("article");
    article.className = "testimonial-card";

    var quote = document.createElement("img");
    quote.className = "testimonial-card__quote";
    quote.src = "assets/quotes.svg";
    quote.alt = "";
    quote.width = 32;
    quote.height = 24;
    quote.setAttribute("aria-hidden", "true");

    var content = document.createElement("div");
    content.className = "testimonial-card__content";

    var h3 = document.createElement("div");
    h3.className = "testimonial-card__headline";
    h3.textContent = t.headline;

    var p = document.createElement("p");
    p.className = "testimonial-card__body";
    p.textContent = t.body;

    content.appendChild(quote);
    content.appendChild(h3);
    content.appendChild(p);

    var author = document.createElement("div");
    author.className = "testimonial-card__author";

    var avatar = document.createElement("div");
    avatar.className = "testimonial-card__avatar";
    avatar.setAttribute("aria-hidden", "true");

    var textCol = document.createElement("div");
    textCol.className = "testimonial-card__author-text";

    var nameEl = document.createElement("div");
    nameEl.className = "testimonial-card__name";
    nameEl.textContent = t.name;

    var roleEl = document.createElement("div");
    roleEl.className = "testimonial-card__role";
    roleEl.textContent = t.role;

    textCol.appendChild(nameEl);
    textCol.appendChild(roleEl);
    author.appendChild(avatar);
    author.appendChild(textCol);

    article.appendChild(content);
    article.appendChild(author);

    track.appendChild(article);
  }
})();
