import { displayProduct } from "./utils.js";
window.onload = function () {
  let camera = new XMLHttpRequest();
  camera.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let data = JSON.parse(this.response);
      //console.log(data);
      for (let i = 0; i < data.length; i++) {
        displayProduct(data[i]);
      }
    } else if (this.readyState == 4 && this.status == 404) {
      alert("erreur 404 - Ressource introuvable");
    }
  };
  camera.open("GET", "http://localhost:3000/api/cameras");
  camera.send();
};
