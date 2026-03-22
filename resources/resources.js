(function () {
  var RESOURCES = [
    {
      title: "HDPE Pipe Installation Manual (PDF)",
      url: "",
    },
    {
      title: "Maintenance & Inspection Handbook (PDF)",
      url: "",
    },
    {
      title: "Engineering Specifications Sheet (PDF)",
      url: "",
    },
  ];

  var listEl = document.querySelector(".resources__list");
  if (!listEl) return;

  for (var i = 0; i < RESOURCES.length; i++) {
    var item = RESOURCES[i];

    var row = document.createElement("li");
    row.className = "resources__item";

    var titleEl = document.createElement("div");
    titleEl.className = "resources__doc-title";
    titleEl.textContent = item.title;

    var link = document.createElement("div");
    link.className = "resources__link";
    link.textContent = "Download PDF";

    var icon = document.createElement("img");
    icon.className = "resources__link-icon";
    icon.src = "assets/Download.svg";
    icon.alt = "";
    icon.width = 20;
    icon.height = 20;
    icon.setAttribute("aria-hidden", "true");
    icon.setAttribute("decoding", "async");

    link.appendChild(icon);

    row.appendChild(titleEl);
    row.appendChild(link);

    listEl.appendChild(row);
  }
})();
