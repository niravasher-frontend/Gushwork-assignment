(function () {
  var MANUFACTURING_STEPS = [
    {
      label: "Raw Material",
      heading: "High-Grade Raw Material Selection",
      description:
        "We source premium PE100 resin with full batch traceability and incoming QC. Only material that meets density, melt-flow, and additive specifications enters the extrusion line.",
      listItems: ["PE100 grade material", "Optimal molecular weight distribution"],
      imageUrl: "assets/fishnet.jpg",
      imageAlt: "Manufacturing floor with materials handling",
    },
    {
      label: "Extrusion",
      heading: "Precision Extrusion",
      description:
        "Molten HDPE is pushed through a profiled die at tightly controlled temperature and screw speed to form a continuous pipe with uniform wall thickness and melt strength.",
      listItems: ["Temperature-controlled barrel zones", "Stable output rate and pressure"],
      imageUrl: "assets/fishnet.jpg",
      imageAlt: "Pipe extrusion process",
    },
    {
      label: "Cooling",
      heading: "Controlled Cooling",
      description:
        "The pipe passes through calibrated cooling zones so it solidifies evenly—reducing residual stress, ovality, and warping before downstream sizing and inspection.",
      listItems: ["Graduated cooling baths", "Dimensional stability before sizing"],
      imageUrl: "assets/fishnet.jpg",
      imageAlt: "Cooling stage of pipe production",
    },
    {
      label: "Sizing",
      heading: "Accurate Sizing",
      description:
        "Vacuum sizing tanks ensure precise outer diameter while internal pressure maintains perfect roundness and wall thickness uniformity.",
      listItems: ["Vacuum calibration sleeves", "Continuous OD monitoring"],
      imageUrl: "assets/fishnet.jpg",
      imageAlt: "Sizing and calibration of HDPE pipe",
    },
    {
      label: "Quality Control",
      heading: "Rigorous Quality Control",
      description:
        "In-line and offline tests verify dimensions, surface finish, ovality, and mechanical indicators so every coil or length meets specification before release.",
      listItems: ["Dimensional checks and sampling", "Documented test records"],
      imageUrl: "assets/fishnet.jpg",
      imageAlt: "Quality inspection on the production line",
    },
    {
      label: "Marking",
      heading: "Clear Product Marking",
      description:
        "Permanent markings identify manufacturer, material grade, dimensions, standards, and production data—supporting traceability and compliant installation.",
      listItems: ["Standard-compliant legend layout", "Durable ink or embossing"],
      imageUrl: "assets/fishnet.jpg",
      imageAlt: "Marked HDPE pipe on the line",
    },
    {
      label: "Cutting",
      heading: "Clean Cutting to Length",
      description:
        "Pipes are cut to specified lengths with square ends and consistent repeat length for coils or straight sticks, ready for bundling or coiling.",
      listItems: ["Repeatable cut length", "Clean, square pipe ends"],
      imageUrl: "assets/fishnet.jpg",
      imageAlt: "Cutting HDPE pipe to length",
    },
    {
      label: "Packaging",
      heading: "Protective Packaging",
      description:
        "Finished products are bundled, wrapped, or coiled with protective layers and labeling so they reach site ready for safe storage and handling.",
      listItems: ["Secure strapping and wrapping", "Clear shipment identification"],
      imageUrl: "assets/fishnet.jpg",
      imageAlt: "Packaged HDPE pipe ready for dispatch",
    },
  ];

  var STEP_COUNT = MANUFACTURING_STEPS.length;
  var MQ_MOBILE = window.matchMedia("(max-width: 1080px)");

  var root = document.querySelector(".mfg-process");
  if (!root) return;

  var tabsWrap = root.querySelector(".mfg-process__tabs");
  var tabsEl = root.querySelector(".mfg-process__tabs-track");
  var badgeEl = root.querySelector("#mfg-step-badge");
  var mobileFooter = root.querySelector(".mfg-process__mobile-footer");
  var mobilePrev = root.querySelector("#mfg-mobile-prev");
  var mobileNext = root.querySelector("#mfg-mobile-next");
  var panelEl = root.querySelector("#mfg-panel");
  var textEl = root.querySelector(".mfg-process__text");
  var imgEl = root.querySelector(".mfg-process__image");
  var imgPrevBtn = root.querySelector(".mfg-process__arrow--prev");
  var imgNextBtn = root.querySelector(".mfg-process__arrow--next");

  if (!tabsEl || !textEl || !imgEl) return;

  var tabButtons = [];
  var activeIndex = 0;

  function buildListItems(listItems) {
    var ul = document.createElement("ul");
    ul.className = "mfg-process__list";
    for (var i = 0; i < listItems.length; i++) {
      var li = document.createElement("li");
      li.className = "mfg-process__list-item";
      var icon = document.createElement("img");
      icon.src = "assets/CheckCircle.svg";
      icon.alt = "";
      icon.width = 20;
      icon.height = 20;
      icon.setAttribute("aria-hidden", "true");
      var span = document.createElement("span");
      span.textContent = listItems[i];
      li.appendChild(icon);
      li.appendChild(span);
      ul.appendChild(li);
    }
    return ul;
  }

  function renderTextColumn(index) {
    var step = MANUFACTURING_STEPS[index];
    textEl.innerHTML = "";

    var h3 = document.createElement("div");
    h3.className = "mfg-process__heading";
    h3.id = "mfg-panel-title";
    h3.textContent = step.heading;

    var p = document.createElement("div");
    p.className = "mfg-process__desc";
    p.textContent = step.description;

    textEl.appendChild(h3);
    textEl.appendChild(p);
    textEl.appendChild(buildListItems(step.listItems));
  }

  function updateImage(index) {
    var step = MANUFACTURING_STEPS[index];
    imgEl.src = step.imageUrl;
    imgEl.alt = step.imageAlt;
  }

  function updateStepBadge(index) {
    if (!badgeEl) return;
    var step = MANUFACTURING_STEPS[index];
    badgeEl.textContent =
      "Step " + (index + 1) + "/" + STEP_COUNT + ": " + step.label;
  }

  function updateMobileStepNav(index) {
    if (!mobilePrev || !mobileNext) return;
    var atStart = index <= 0;
    var atEnd = index >= STEP_COUNT - 1;

    mobilePrev.disabled = atStart;
    mobilePrev.setAttribute("aria-disabled", atStart ? "true" : "false");

    mobileNext.disabled = atEnd;
    mobileNext.setAttribute("aria-disabled", atEnd ? "true" : "false");

    if (imgPrevBtn) {
      var imgPrevOff = MQ_MOBILE.matches && atStart;
      imgPrevBtn.disabled = imgPrevOff;
      imgPrevBtn.setAttribute("aria-disabled", imgPrevOff ? "true" : "false");
    }
    if (imgNextBtn) {
      var imgNextOff = MQ_MOBILE.matches && atEnd;
      imgNextBtn.disabled = imgNextOff;
      imgNextBtn.setAttribute("aria-disabled", imgNextOff ? "true" : "false");
    }
  }

  function setTablistHidden(hidden) {
    if (!tabsWrap || !tabsEl) return;
    tabsWrap.setAttribute("aria-hidden", hidden ? "true" : "false");
    if (hidden) {
      tabsWrap.setAttribute("inert", "");
    } else {
      tabsWrap.removeAttribute("inert");
    }
  }

  function setMobileChromeHidden(hidden) {
    if (badgeEl) {
      badgeEl.setAttribute("aria-hidden", hidden ? "true" : "false");
    }
    if (mobileFooter) {
      mobileFooter.setAttribute("aria-hidden", hidden ? "true" : "false");
      if (hidden) {
        mobileFooter.setAttribute("inert", "");
      } else {
        mobileFooter.removeAttribute("inert");
      }
    }
  }

  function applyResponsiveChrome() {
    var mobile = MQ_MOBILE.matches;
    if (mobile) {
      setTablistHidden(true);
      setMobileChromeHidden(false);
    } else {
      setTablistHidden(false);
      setMobileChromeHidden(true);
    }
    updateMobileStepNav(activeIndex);
  }

  function setActiveTab(index) {
    if (index < 0 || index >= STEP_COUNT) return;
    activeIndex = index;

    for (var i = 0; i < tabButtons.length; i++) {
      var btn = tabButtons[i];
      var isOn = i === index;
      btn.classList.toggle("is-active", isOn);
      btn.setAttribute("aria-selected", isOn ? "true" : "false");
      btn.setAttribute("tabindex", isOn ? "0" : "-1");
    }

    if (panelEl) {
      panelEl.setAttribute("aria-labelledby", "mfg-tab-" + index);
    }

    updateStepBadge(index);
    updateMobileStepNav(index);
    renderTextColumn(index);
    updateImage(index);
  }

  function goToPreviousStep() {
    setActiveTab(activeIndex - 1);
  }

  function goToNextStep() {
    setActiveTab(activeIndex + 1);
  }

  for (var t = 0; t < STEP_COUNT; t++) {
    (function (idx) {
      var step = MANUFACTURING_STEPS[idx];
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "mfg-process__tab" + (idx === 0 ? " is-active" : "");
      btn.id = "mfg-tab-" + idx;
      btn.setAttribute("role", "tab");
      btn.setAttribute("aria-selected", idx === 0 ? "true" : "false");
      btn.setAttribute("aria-controls", "mfg-panel");
      btn.setAttribute("tabindex", idx === 0 ? "0" : "-1");
      btn.textContent = step.label;
      btn.addEventListener("click", function () {
        setActiveTab(idx);
      });
      tabsEl.appendChild(btn);
      tabButtons.push(btn);
    })(t);
  }

  setActiveTab(0);
  applyResponsiveChrome();

  if (MQ_MOBILE.addEventListener) {
    MQ_MOBILE.addEventListener("change", applyResponsiveChrome);
  } else if (MQ_MOBILE.addListener) {
    MQ_MOBILE.addListener(applyResponsiveChrome);
  }

  if (mobilePrev) {
    mobilePrev.addEventListener("click", function () {
      if (!mobilePrev.disabled) goToPreviousStep();
    });
  }
  if (mobileNext) {
    mobileNext.addEventListener("click", function () {
      if (!mobileNext.disabled) goToNextStep();
    });
  }

  if (imgPrevBtn) {
    imgPrevBtn.addEventListener("click", function () {
      if (MQ_MOBILE.matches && activeIndex > 0) goToPreviousStep();
    });
  }
  if (imgNextBtn) {
    imgNextBtn.addEventListener("click", function () {
      if (MQ_MOBILE.matches && activeIndex < STEP_COUNT - 1) goToNextStep();
    });
  }
})();
