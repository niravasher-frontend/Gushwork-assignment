(function () {
  var FOOTER_CATEGORIES = [
    { label: "Packaging Industry Solutions", href: "#" },
    { label: "Fishnet Manufacturing", href: "#" },
    { label: "PPMF/Tapes and Twines", href: "#" },
    { label: "FIBC and Woven Sack", href: "#" },
    { label: "Carpet and Rugs Industry", href: "#" },
    { label: "Technical Textiles", href: "#" },
  ];

  var FOOTER_PRODUCTS = [
    { label: "Two For One Twister", href: "#" },
    { label: "TPRS Twister Machine", href: "#" },
    { label: "Ring Twisting Machines", href: "#" },
    { label: "Covering Machines", href: "#" },
    { label: "Heat Setting Equipment", href: "#" },
    { label: "Servo Controlled Winders", href: "#" },
  ];

  var catList = document.querySelector(".site-footer__categories");
  var prodList = document.querySelector(".site-footer__products");

  if (catList) {
    for (var i = 0; i < FOOTER_CATEGORIES.length; i++) {
      var c = FOOTER_CATEGORIES[i];
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = c.href;
      a.textContent = c.label;
      li.appendChild(a);
      catList.appendChild(li);
    }
  }

  if (prodList) {
    for (var j = 0; j < FOOTER_PRODUCTS.length; j++) {
      var p = FOOTER_PRODUCTS[j];
      var liP = document.createElement("li");
      var aP = document.createElement("a");
      aP.href = p.href;
      aP.textContent = p.label;
      liP.appendChild(aP);
      prodList.appendChild(liP);
    }
  }
})();
