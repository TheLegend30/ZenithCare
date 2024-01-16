let filter = "";

const includeHTML = function () {
  var z, i, elmnt, file, xhttp;
  /* Loop through a collection of all HTML elements: */
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("w3-include-html");
    if (file) {
      /* Make an HTTP request using the attribute value as the file name: */
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status == 200) {
            elmnt.innerHTML = this.responseText;
          }
          if (this.status == 404) {
            elmnt.innerHTML = "Page not found.";
          }
          /* Remove the attribute, and call this function once more: */
          elmnt.removeAttribute("w3-include-html");
          includeHTML();
        }
      };
      xhttp.open("GET", file, true);
      xhttp.send();
      /* Exit the function: */
      return;
    }
  }

  const mainNavLinkEnterEl = document.querySelector(".main-nav-link-enter");
  const mainNavLinkClinicsEl = document.querySelector(".main-nav-link-clinics");
  const searchFormEl = document.querySelector(".search-form");

  // MODAL CONFIGURATION

  const modalEl = document.getElementById("myModal");
  const modalSpanEl = document.getElementsByClassName("close")[0];
  const modalTextEl = document.querySelector(".modal-text");

  const showAlertWindow = function (message) {
    modalTextEl.innerHTML = message;
    modalEl.style.display = "block";
  };

  modalSpanEl.onclick = function () {
    modalEl.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == modalEl) {
      modalEl.style.display = "none";
    }
  };

  if (localStorage.getItem("entered") === "true") {
    mainNavLinkEnterEl.innerHTML = "ВИЙТИ";
    mainNavLinkEnterEl.addEventListener("click", function (e) {
      e.preventDefault();
      window.location.href = "./index.html";
      localStorage.removeItem("entered");
    });

    mainNavLinkClinicsEl.addEventListener("click", function () {
      window.location.href = "./clinics.html";
    });
  } else {
    mainNavLinkEnterEl.innerHTML = "УВІЙТИ";

    mainNavLinkClinicsEl.addEventListener("click", function () {
      showAlertWindow(
        "Цю сторінку можуть переглядати лише зареєстровані користувачі. Будь-ласка зайдіть у свій акаунт чи зареєеструйтеся на сайті!"
      );
    });
    localStorage.removeItem("filter");
  }

  searchFormEl.addEventListener("submit", function (e) {
    e.preventDefault();
    filter = searchFormEl[0].value;
    localStorage.setItem("filter", filter);
    mainNavLinkClinicsEl.click();
  });

  // Footer
  const footerCopyrightTextEl = document.querySelector(
    ".footer-copyright-text"
  );

  footerCopyrightTextEl.textContent = `\u00A9 Copyright ${new Date().getFullYear()}. Всі права збережені`;
};

includeHTML();
