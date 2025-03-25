// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";

// Firebase configuration (Replace with your actual Firebase project config)
const firebaseConfig = {
  apiKey: "AIzaSyBbWUzwFX_9ut7eb-fiAokSEZ3JTblOSsA",
  authDomain: "dreamias-9e7c6.firebaseapp.com",
  projectId: "dreamias-9e7c6",
  storageBucket: "dreamias-9e7c6.firebasestorage.app",
  messagingSenderId: "479511015794",
  appId: "1:479511015794:web:32eb0eb7687246a0dfadeb",
  measurementId: "G-5BVEBT7C4W",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", function () {
  let groupLink = "";
  document
    .querySelector(".generate_qr")
    .addEventListener("click", async function () {
      let name = document.querySelector(".name").value.trim();
      let number = document.querySelector(".number").value.trim();
      let email = document.querySelector(".email").value.trim();

      if (!name || !number || !email) {
        alert("Please fill in all fields.");
        return;
      }

      fetchPaymentLinks(number);

      // let upiLink = `upi://pay?pa=7000234217@ybl&pn=Rohit%20Chornele&mc=0000&mode=02&am=1&tn=${number}`;
      // let qrCodeUrl = `https://quickchart.io/chart?cht=qr&chs=300x300&chl=${upiLink}`;
    });

  document
    .querySelector(".download_now")
    .addEventListener("click", async function () {
      let id = document.querySelector(".id").value.trim();
      let name = document.querySelector(".name").value.trim();
      let number = document.querySelector(".number").value.trim();
      let email = document.querySelector(".email").value.trim();

      // if (!id || id.length != 12) {
      //   alert("Please enter a valid transaction ID");
      //   return;
      // }

      // Store data in Firestore
      try {
        const docRef = await addDoc(collection(db, "user"), {
          name,
          number,
          email,
          utr: id,
          timestamp: new Date(),
        });

        console.log("Document written with ID: ", docRef.id);

        
        // let groupLink = document.getElementsByClassName("join-link")

        fetchAndDisplayLinks();

        alert("Thanks for your payment");
      } catch (error) {
        console.error("Error adding document: ", error);
        alert("Error saving data, please try again.");
      }
    });

  async function fetchAndDisplayLinks() {
    try {
      const querySnapshot = await getDocs(collection(db, "groups"));
      let linksContainer = document.querySelector(".links-container"); // Ensure you have a container in your HTML
      linksContainer.innerHTML = ""; // Clear previous links

      querySnapshot.forEach((doc) => {
        let data = doc.data();
        if (data.link) {
          let anchorTag = document.createElement("a");
          anchorTag.href = data.link;
          anchorTag.className = "showLink p-2 w-full";
          anchorTag.target = "_blank"; // Opens in a new tab
          anchorTag.innerText = "Join our Community";
          linksContainer.appendChild(anchorTag);

          document.querySelector(".qr_code").style.display = "none";
          document.querySelector(".show-link").style.display = "block";
          // linksContainer.appendChild(document.createElement("br")); // Line break
        }
        console.log(data.link);
      });

      console.log("Links displayed successfully.");
    } catch (error) {
      console.error("Error fetching links:", error);
    }
  }

  async function fetchPaymentLinks(number) {

    let upiLink = `upi://pay?pa=7000234217@ybl&pn=Rohit%20Chornele&mc=0000&mode=02&am=1&tn=${number}`;
    let qrCodeUrl = `https://quickchart.io/chart?cht=qr&chs=300x300&chl=${upiLink}`;
    try {
        let fullUpiLink = qrCodeUrl + upiLink;
        const showLinkImage = document.querySelector(".get_qr");
        if (showLinkImage) {
          showLinkImage.src = fullUpiLink;
          document.querySelector(".form").style.display = "none";
          document.querySelector(".qr_code").style.display = "block";
        } else {
        console.log("No documents found in paymentsetup collection.");
      }
    } catch (error) {
      console.error("Error fetching payment link:", error);
    }
  }
});
