import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

let user = null;

const registrationContainerEl = document.querySelector(
  ".registration-container"
);
const registrationFormEl = document.querySelector(".registration-form");
const emailEl = document.getElementById("email");
const passwordEl = document.getElementById("password");
const loginButtonEl = document.querySelector(".login-button");
const radioGroupEl = document.querySelector(".radio-group");
const regTypeGroopEl = document.querySelector(".reg-type-group");
const enterRadioEl = document.getElementById("enter");

const sucErrContainerEl = document.querySelector(".suc-err-container");
const sucErrTextEl = document.querySelector(".suc-err-text");
const sucErrButtonEl = document.querySelector(".suc-err-button");
sucErrButtonEl.addEventListener("click", () => {
  registrationContainerEl.classList.remove("none");
  sucErrContainerEl.classList.add("none");
});

const checkRadio = function () {
  if (enterRadioEl.checked) {
    loginButtonEl.textContent = "Увійти";
    regTypeGroopEl.classList.add("none");
  } else {
    loginButtonEl.textContent = "Зареєструватися";
    regTypeGroopEl.classList.remove("none");
  }
};

const createAccount = async function (auth, email, password) {
  await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      user = userCredential.user;
    })
    .catch((error) => {
      switch (error.code) {
        case "auth/email-already-exists":
        case "auth/invalid-email":
        case "auth/operation-not-allowed":
        case "auth/weak-password":
        default:
          throw new Error("Error");
      }
    });
};

const signInAccount = async function (auth, email, password) {
  await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
    })
    .catch((error) => {
      switch (error.code) {
        case "auth/invalid-provider-id":
        case "auth/invalid-email":
        default:
          throw new Error("Error");
      }
    });
};

const checkIfLogged = function (auth, success) {
  onAuthStateChanged(auth, (user) => {
    console.log(success);
    if (success) {
      sucErrButtonEl.href = "index.html";
      sucErrTextEl.textContent = `Ви успішно ${
        enterRadioEl.checked ? "увійшли" : "зареєструвалися"
      } `;
      localStorage.setItem("entered", "true");
    } else {
      sucErrButtonEl.href = "authorization.html";
      sucErrTextEl.textContent = `Ви не змогли ${
        enterRadioEl.checked
          ? "увійти (неправильна пошта чи пароль)"
          : "зареєструватися"
      }. Спробуйте знову!`;
    }
    registrationContainerEl.classList.add("none");
    sucErrContainerEl.classList.remove("none");
  });
};

const authenticate = async function (e) {
  e.preventDefault();
  let email = emailEl.value;
  let password = passwordEl.value;

  if (enterRadioEl.checked) {
    try {
      await signInAccount(auth, email, password);
    } catch (e) {
      checkIfLogged(auth, false);
      return;
    }
    checkIfLogged(auth, true);
  } else {
    try {
      await createAccount(auth, email, password);
    } catch (e) {
      checkIfLogged(auth, false);
      return;
    }
    checkIfLogged(auth, true);
  }
};

checkRadio();
radioGroupEl.addEventListener("change", checkRadio);

const firebaseConfig = {
  apiKey: "AIzaSyA5ejPOJBuBbuTS4mIHYW5_KyC1iu_ezzw",
  authDomain: "zenithcare-e9c23.firebaseapp.com",
  projectId: "zenithcare-e9c23",
  storageBucket: "zenithcare-e9c23.appspot.com",
  messagingSenderId: "333755327283",
  appId: "1:333755327283:web:5957812ce8f36e17db5446",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

registrationFormEl?.addEventListener("submit", function (e) {
  authenticate(e);
});

export { user, auth };
