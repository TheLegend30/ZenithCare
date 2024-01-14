import { onAuthStateChanged } from "firebase/auth";

let currentPersonGallery = 0;
const quotes = new Map();
quotes.set(
  "Ігор Станкевич, психотерапевт",
  "Zenith Care - це не просто платформа, а справжнє спасіння для тих, хто шукає допомогу. Раджу всім колегам приєднатися до цього чудового сервісу. Разом ми можемо зробити більше!"
);

quotes.set(
  "Оксана Артеменко, голова клініки 'Рівновага'",
  "Я вражена тим, як Zenith Care об'єднує спеціалістів з різних галузей, створюючи команду експертів. Разом ми можемо надавати комплексну допомогу тим, хто цього потребує."
);

quotes.set(
  "Ганна Горчинська, психолог",
  "Працюючи з Zenith Care, я відчуваю себе частиною спільноти, що дійсно робить різницю. Платформа забезпечує ефективний зв'язок між тими, хто потребує допомоги, і тими, хто готовий її надати."
);

const quoteTextEl = document.querySelector(".quote-text");
const quoteAuthorEl = document.querySelector(".quote-author");
const imgGalleryEl = document.querySelector(".quote-img");
const rightButtonGalleryEl = document.querySelector(".gallery-button--right");
const leftButtonGalleryEl = document.querySelector(".gallery-button--left");
const dotsEls = document.querySelectorAll(".dot");
const mainNavLinkEnterEl = document.querySelector(".main-nav-link-enter");

const changeCarousel = function () {
  dotsEls.forEach((cur) => cur.classList.remove("dot--fill"));
  dotsEls[currentPersonGallery].classList.add("dot--fill");

  imgGalleryEl.classList.add("opaque");
  quoteTextEl.classList.add("opaque");
  quoteAuthorEl.classList.add("opaque");
  setTimeout(() => {
    quoteTextEl.textContent = [...quotes.values()][currentPersonGallery];
    quoteAuthorEl.textContent = [...quotes.keys()][currentPersonGallery];
    imgGalleryEl.src = `/images/gallery/person${currentPersonGallery + 1}.webp`;

    imgGalleryEl.classList.remove("opaque");
    quoteTextEl.classList.remove("opaque");
    quoteAuthorEl.classList.remove("opaque");
  }, 300);
};

rightButtonGalleryEl.addEventListener("click", () => {
  currentPersonGallery++;
  if (currentPersonGallery >= dotsEls.length) {
    currentPersonGallery = 0;
  }

  changeCarousel();
});

leftButtonGalleryEl.addEventListener("click", () => {
  currentPersonGallery--;
  if (currentPersonGallery < 0) {
    currentPersonGallery = dotsEls.length - 1;
  }
  changeCarousel();
});

dotsEls.forEach((cur, key) =>
  cur.addEventListener("click", () => {
    currentPersonGallery = key;
    changeCarousel();
  })
);

// Event to change list (from specialists to clinics and vice versa)
const changeListEl = document.querySelector(".change-list");
const popularLabelEl = document.querySelector(".popular-label");
// TODO: Change names for .lists in html
const listEls = document.querySelectorAll(".list");

changeListEl.addEventListener("click", () => {
  listEls.forEach((val) => {
    val.classList.contains("none")
      ? val.classList.remove("none")
      : val.classList.add("none");
  });

  popularLabelEl.textContent =
    popularLabelEl.textContent === "Найкращі спеціалісти"
      ? "Найкращі клініки"
      : "Найкращі спеціалісти";

  changeListEl.textContent =
    changeListEl.textContent === "Спеціалісти" ? "Клініки" : "Спеціалісти";
});

// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     mainNavLinkEnterEl.textContent = "Вийти";
//     console.log("user");
//   } else {
//     mainNavLinkEnterEl.textContent = "Увійти";
//     console.log("no user");
//   }
// });

if (localStorage.getItem("entered") === "true") {
  mainNavLinkEnterEl.innerHTML = "Вийти";
  mainNavLinkEnterEl.addEventListener("click", function (e) {
    e.preventDefault();
    window.location.reload();
    localStorage.removeItem("entered");
  });
} else {
  mainNavLinkEnterEl.innerHTML = "Увійти";
  mainNavLinkEnterEl.removeEventListener("click");
}
