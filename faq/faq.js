(function () {
  var FAQ_DATA = {
    items: [
      {
        question: "What are HDPE pipes primarily used for?",
        answer:
          "HDPE pipes are used to transport water, gas, and industrial fluids in municipal, agricultural, and mining networks. Their strength, flexibility, and fusion-welded joints make them ideal for buried pipelines, irrigation, and chemical-safe conveyance over long service lives.",
      },
      {
        question: "What are the benefits of using HDPE pipes in infrastructure?",
        answer:
          "HDPE offers corrosion resistance, leak-proof fusion joints, long service life, and lower lifecycle cost than many metals. It handles ground movement and temperature swings well, reducing maintenance and downtime in the field.",
      },
      {
        question: "How are HDPE pipes manufactured?",
        answer:
          "Pipes are typically extruded from high-density polyethylene resin, then cooled and cut to length. Diameter, wall thickness, and coil or straight lengths follow standards such as ISO 4427 and IS 4984, with quality checks across the production line.",
      },
      {
        question: "What are the common applications of HDPE piping?",
        answer:
          "Common uses include potable water distribution, sewer and drainage, gas distribution, landfill leachate, mining slurry lines, and agricultural irrigation. The same material family scales from small service lines to large trunk mains.",
      },
      {
        question: "Can HDPE pipes be customized?",
        answer:
          "Yes. Diameter, SDR / pressure class, coil lengths, colors, and marking can often be tailored to project specs. Our team can align deliveries with your installation schedule and regulatory requirements.",
      },
    ],
  };

  function renderFaqAccordion(container) {
    var list = FAQ_DATA.items;
    if (!container || !list.length) return;

    for (var i = 0; i < list.length; i++) {
      var faq = list[i];
      var n = i + 1;
      var isOpen = i === 0;

      var item = document.createElement("div");
      item.className = "faq-item" + (isOpen ? " is-open" : "");

      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "faq-item__trigger";
      btn.id = "faq-trigger-" + n;
      btn.setAttribute("aria-expanded", isOpen ? "true" : "false");
      btn.setAttribute("aria-controls", "faq-panel-" + n);

      var qSpan = document.createElement("span");
      qSpan.className = "faq-item__question";
      qSpan.textContent = faq.question;

      var iconWrap = document.createElement("span");
      iconWrap.className = "faq-item__icon-wrap";
      iconWrap.setAttribute("aria-hidden", "true");
      var chevron = document.createElement("img");
      chevron.src = "assets/Chevron.svg";
      chevron.className = "faq-item__chevron";
      chevron.alt = "";
      chevron.width = 18;
      chevron.height = 18;
      iconWrap.appendChild(chevron);

      btn.appendChild(qSpan);
      btn.appendChild(iconWrap);

      var panel = document.createElement("div");
      panel.className = "faq-item__panel";
      panel.id = "faq-panel-" + n;
      panel.setAttribute("role", "region");
      panel.setAttribute("aria-labelledby", "faq-trigger-" + n);
      panel.setAttribute("aria-hidden", isOpen ? "false" : "true");

      var panelInner = document.createElement("div");
      panelInner.className = "faq-item__panel-inner";

      var answerEl = document.createElement("p");
      answerEl.className = "faq-item__answer";
      answerEl.textContent = faq.answer;

      panelInner.appendChild(answerEl);
      panel.appendChild(panelInner);

      item.appendChild(btn);
      item.appendChild(panel);
      container.appendChild(item);
    }
  }

  function initAccordion(root) {
    var items = root.querySelectorAll(".faq-item");

    function setOpen(item, open) {
      item.classList.toggle("is-open", open);
      var trigger = item.querySelector(".faq-item__trigger");
      var panel = item.querySelector(".faq-item__panel");
      if (trigger) trigger.setAttribute("aria-expanded", open ? "true" : "false");
      if (panel) panel.setAttribute("aria-hidden", open ? "false" : "true");
    }

    items.forEach(function (item) {
      var trigger = item.querySelector(".faq-item__trigger");
      if (!trigger) return;

      trigger.addEventListener("click", function () {
        var willOpen = !item.classList.contains("is-open");
        items.forEach(function (other) {
          setOpen(other, other === item && willOpen);
        });
      });
    });
  }

  var root = document.querySelector(".faq-accordion");
  if (!root) return;

  renderFaqAccordion(root);
  initAccordion(root);

  var form = document.querySelector(".catalogue-cta__form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
    });
  }
})();
