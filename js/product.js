import { detailProduct } from "./utils.js";
const idRequest = new URLSearchParams(window.location.search);

window.onload = function () {
  let camera = new XMLHttpRequest();
  camera.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let data = JSON.parse(this.response);
      detailProduct(data);
    } else if (this.readyState == 4 && this.status == 404) {
      alert("erreur 404 - Ressource introuvable");
    }
  };
  camera.open(
    "GET",
    "http://localhost:3000/api/cameras/" + idRequest.get("id")
  );
  camera.send();
};
