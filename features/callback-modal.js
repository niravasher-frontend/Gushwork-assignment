(function () {
  var dialog = document.getElementById("callback-request-modal");
  var openBtn = document.getElementById("callback-modal-open");
  var closeBtn = document.getElementById("callback-modal-close");
  var form = document.getElementById("callback-modal-form");

  if (!dialog || !openBtn || !closeBtn || !form) return;

  if (typeof dialog.showModal !== "function") {
    openBtn.setAttribute("aria-expanded", "false");
    return;
  }

  function setExpanded(open) {
    openBtn.setAttribute("aria-expanded", open ? "true" : "false");
  }

  function handleBackdropMouseDown(e) {
    if (!dialog.open) return;
    if (dialog.contains(e.target)) return;
    dialog.close();
  }

  openBtn.addEventListener("click", function () {
    dialog.showModal();
    setExpanded(true);
    requestAnimationFrame(function () {
      document.addEventListener("mousedown", handleBackdropMouseDown);
      var nameField = document.getElementById("callback-full-name");
      if (nameField) nameField.focus();
    });
  });

  closeBtn.addEventListener("click", function () {
    dialog.close();
  });

  dialog.addEventListener("close", function () {
    setExpanded(false);
    document.removeEventListener("mousedown", handleBackdropMouseDown);
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    dialog.close();
  });
})();
