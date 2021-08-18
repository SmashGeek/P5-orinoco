// affichage produit page index
const displayProduct = (data) => {
  let card = document.createElement("div");
  card.setAttribute("id", "product-card");
  cameras.appendChild(card);

  addNode(data.name, "h2", card, null, data);
  addNode(null, "img", card, "img_appareil", data);
  addNode(data.description, "p", card, null, data);
  addNode(data.price / 100 + " " + "€", "p", card, "price", data);
  addNode("Voir Produit", "a", card, "btn", data);
};

function addNode(title, tag, card, classL, data) {
  let obj = document.createElement(tag);
  if (classL != null) {
    obj.classList.add(classL);
  }
  if (tag == "img") {
    obj.src = data.imageUrl;
    obj.alt = document.getElementsByTagName("img").alt =
      "Appareil photo modèle" + " " + data.name;
  }
  if (tag == "a") {
    obj.href = "produit.html?id=" + data._id;
  }
  obj.appendChild(document.createTextNode(title));
  card.appendChild(obj);
}

// Affichage page produit individuel
const detailProduct = (data) => {
  let detail = document.createElement("div");
  detail.setAttribute("id", "produit");
  cam.appendChild(detail);

  addNode(data.name, "h2", cam, "pName", data);
  addNode(null, "img", detail, "img_detail", data);
  addNode(data.description, "p", detail, null, data);
  addNode(data.price / 100 + " " + "€", "p", detail, "price", data);

  let select = document.getElementById("optList"); // menu déroulant choix objectif
  let options = data.lenses;
  //console.log(options);
  for (let i = 0; i < options.length; i++) {
    let opt = options[i];
    let el = document.createElement("option");
    el.textContent = opt;
    el.value = opt;
    select.appendChild(el);
    detail.appendChild(select);
  }

  let btn = document.createElement("a");
  detail.appendChild(btn);
  btn.classList.add("btn-product");
  btn.setAttribute("href", "#");
  btn.textContent = "Ajouter au panier";

  let addToCart = document.getElementsByClassName("btn-product");

  let product = {
    id: data._id,
    name: data.name,
    price: data.price / 100,
    quantity: 1,
  };
  //console.log(product);

  addToCart[0].addEventListener("click", () => {
    let panier = JSON.parse(localStorage.getItem("panier"));
    //console.log(panier);
    if (panier === null) {
      panier = {};
    }
    if (panier[product.id] === undefined) {
      panier[product.id] = product;
    } else {
      panier[product.id].quantity += 1;
    }
    localStorage.setItem("panier", JSON.stringify(panier));
  });
};

export { displayProduct };
export { detailProduct };
