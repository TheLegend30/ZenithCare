if (localStorage.getItem("entered") !== "true")
  window.location.href = "index.html";

import { initializeApp } from "firebase/app";
import { collection, getFirestore, getDocs, doc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA5ejPOJBuBbuTS4mIHYW5_KyC1iu_ezzw",
  authDomain: "zenithcare-e9c23.firebaseapp.com",
  projectId: "zenithcare-e9c23",
  storageBucket: "zenithcare-e9c23.appspot.com",
  messagingSenderId: "333755327283",
  appId: "1:333755327283:web:5957812ce8f36e17db5446",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const querySnapshot = await getDocs(collection(db, "clinics"));

const readAllData = function () {
  querySnapshot.forEach((doc) => {
    console.log(doc.data());
  });
};

const clinicContentEl = document.querySelector(".clinic-content");

const putClinicsOnPage = function () {
  querySnapshot.forEach((doc) => {
    let data = doc.data();
    clinicContentEl.innerHTML += `
    <div class="clinic-section">
<div class="clinic">
  <div class="clinic-main">
    <div class="clinic-img-container">
      <img
        class="clinic-img"
        src="${data.image}"
        alt="Зображення клініки"
      />
    </div>
    <div class="clinic-desc">
      <span class="clinic-name">Назва: ${data.username}</span>
      <span class="clinic-address">Адреса: ${data.address}</span>
      <span class="clinic-created">Заснована: ${new Date(
        data.created_at.seconds * 1000
      ).toLocaleDateString()}</span>
      <span class="clinic-email">Електрона пошта: ${data.email}</span>
      <span class="clinic-phone">Номер телефону: ${data.phone}</span>

      <div class="clinic-rating-container">
      <div class="clinic-rating">
        <span class="clinic-rating-average">Рейтинг: ${data.avg_rating}</span>
        <span class="clinic-rating-count">(${data.count_rating})</span>
      </div>
      <div class="clinic-stars">
        <span class="fa fa-star ${
          data.avg_rating > 1.0 ? "checked" : ""
        }"></span>
        <span class="fa fa-star ${
          data.avg_rating > 2.0 ? "checked" : ""
        }"></span>
        <span class="fa fa-star ${
          data.avg_rating > 3.0 ? "checked" : ""
        }"></span>
        <span class="fa fa-star ${
          data.avg_rating > 4.0 ? "checked" : ""
        }"></span>
        <span class="fa fa-star ${
          data.avg_rating > 4.5 ? "checked" : ""
        }"></span>
      </div>
    </div> 
    </div>
  </div>
  <div class="clinic-footer">
    <a class="clinic-button" href="tel:${data.phone}">Звʼязатися</a>
  </div>
</div>
</div>
    `;
  });
};

putClinicsOnPage();
