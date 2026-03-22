(function () {
  var CONTACT_FORM_FIELDS = [
    {
      type: "text",
      name: "fullName",
      placeholder: "Full Name",
      autocomplete: "name",
    },
    {
      type: "text",
      name: "company",
      placeholder: "Company Name",
      autocomplete: "organization",
    },
    {
      type: "email",
      name: "email",
      placeholder: "Email Address",
      autocomplete: "email",
    },
    {
      type: "phone",
      name: "phone",
      placeholder: "7003026616",
      countryCode: "+91",
    },
  ];

  var fieldsEl = document.querySelector(".contact-cta__fields");
  var formEl = document.querySelector(".contact-cta__form");
  if (!fieldsEl || !formEl) return;

  for (var i = 0; i < CONTACT_FORM_FIELDS.length; i++) {
    var field = CONTACT_FORM_FIELDS[i];

    if (field.type === "phone") {
      var phoneRow = document.createElement("div");
      phoneRow.className = "contact-cta__phone-row";

      var select = document.createElement("select");
      select.className = "contact-cta__phone-code";
      select.name = "countryCode";
      select.setAttribute("aria-label", "Country calling code");

      var opt = document.createElement("option");
      opt.value = field.countryCode || "+91";
      opt.textContent = field.countryCode || "+91";
      select.appendChild(opt);

      var telInput = document.createElement("input");
      telInput.type = "tel";
      telInput.name = field.name;
      telInput.placeholder = field.placeholder;
      telInput.className = "contact-cta__input contact-cta__input--tel";
      telInput.setAttribute("autocomplete", "tel-national");
      telInput.setAttribute("inputmode", "numeric");
      telInput.required = true;

      phoneRow.appendChild(select);
      phoneRow.appendChild(telInput);
      fieldsEl.appendChild(phoneRow);
    } else {
      var input = document.createElement("input");
      input.type = field.type;
      input.name = field.name;
      input.placeholder = field.placeholder;
      input.className = "contact-cta__input";
      input.required = true;
      if (field.autocomplete) {
        input.setAttribute("autocomplete", field.autocomplete);
      }
      fieldsEl.appendChild(input);
    }
  }

  formEl.addEventListener("submit", function (e) {
    e.preventDefault();
  });
})();
