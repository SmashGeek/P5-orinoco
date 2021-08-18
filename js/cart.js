const cart = document.querySelector("#user-cart");
const form = document.querySelector("form");
const cartTotal = document.getElementById("cart-total");

let products = [];
let contact = {
  firstName: firstName.value,
  lastName: lastName.value,
  address: address.value,
  city: city.value,
  email: email.value,
};
let cartInformation = {
  contact,
  products,
};
//console.log(cartInformation);

let totalPrice = 0;

function displayCart() {
  const items = JSON.parse(localStorage.getItem("panier"));
  //console.log(items);
  if (items != null && Object.keys(items).length > 0) {
    for (let i = 0; i < Object.keys(items).length; i++) {
      const productId = Object.keys(items)[i];
      const itemId = items[productId].id;
      const itemName = items[productId].name;
      const itemPrice = items[productId].price;
      const itemQuantity = items[productId].quantity;
      products.push(itemId);

      let prod = document.createElement("div");
      prod.classList.add("product-cart");
      cart.appendChild(prod);

      let title = document.createElement("p");
      title.classList.add("title");
      title.textContent = itemName;
      prod.appendChild(title);

      let price = document.createElement("p");
      price.classList.add("price");
      price.textContent = itemPrice + " " + "€";
      prod.appendChild(price);

      let quantity = document.createElement("p");
      quantity.classList.add("quantity");
      quantity.textContent = itemQuantity;
      prod.appendChild(quantity);

      let sousTotal = document.createElement("p");
      sousTotal.classList.add("total");
      sousTotal.textContent = itemQuantity * itemPrice + " " + "€";
      prod.appendChild(sousTotal);

      totalPrice += itemPrice * itemQuantity;
      cartTotal.textContent = `Montant total de votre panier : ${totalPrice} €`;
      cart.appendChild(cartTotal);
    }
  } else {
    var headerCart = document.getElementById("title-cart");
    headerCart.innerHTML = "Votre panier est vide !";
  }
}
displayCart();

const formValidate = () => {
  const containNumber = /[0-9]/;
  const regexEmail = /.+@.+\..+/;
  const specialCharacter = /[$&+,:;=?@#|'<>.^*()%!"{}_"]/;

  const isNotEmpty = (value) => (value !== "" ? true : false);
  const isLongEnough = (value) => (value.length >= 2 ? true : false);
  const doNotContainNumber = (value) =>
    !value.match(containNumber) ? true : false;
  const doNotContainSpecialCharacter = (value) =>
    !value.match(specialCharacter) ? true : false;
  const isValidEmail = (value) => (value.match(regexEmail) ? true : false);

  const isValidInput = (value) =>
    isNotEmpty(value) &&
    isLongEnough(value) &&
    doNotContainNumber(value) &&
    doNotContainSpecialCharacter(value);

  const firstName = form.elements.firstName;
  const lastName = form.elements.lastName;
  const address = form.elements.address;
  const city = form.elements.city;
  const email = form.elements.email;

  const firstNameErrorMessage = document.getElementById(
    "firstNameErrorMessage"
  );
  const lastNameErrorMessage = document.getElementById("lastNameErrorMessage");
  const addressErrorMessage = document.getElementById("addressErrorMessage");
  const cityErrorMessage = document.getElementById("cityErrorMessage");
  const emailErrorMessage = document.getElementById("emailErrorMessage");

  if (!isValidInput(firstName.value)) {
    firstNameErrorMessage.textContent =
      "Veuillez renseigner correctement votre prénom !";
    firstName.focus();
    return false;
  } else if (!isValidInput(lastName.value)) {
    lastNameErrorMessage.textContent =
      "Veuillez renseigner correctement votre nom !";
    lastName.focus();
    return false;
  } else if (
    !isNotEmpty(address.value) &&
    !isLongEnough(address.value) &&
    !doNotContainSpecialCharacter(address.value)
  ) {
    addressErrorMessage.textContent = "Veuillez renseigner votre adresse !";
    address.focus();
    return false;
  } else if (!isValidInput(city.value)) {
    cityErrorMessage.textContent =
      "Veuillez renseigner correctement votre ville !";
    city.focus();
    return false;
  } else if (!isValidEmail(email.value)) {
    emailErrorMessage.textContent =
      "Votre adresse mail doit respecter le format suivant 'exemple@exemple.com'";
    email.focus();
    return false;
  } else {
    firstNameErrorMessage.textContent = "";
    lastNameErrorMessage.textContent = "";
    addressErrorMessage.textContent = "";
    cityErrorMessage.textContent = "";
    emailErrorMessage.textContent = "";

    return (cartInformation.contact = {
      firstName: firstName.value,
      lastName: lastName.value,
      address: address.value,
      city: city.value,
      email: email.value,
    });
  }
};

document.getElementById("validate").addEventListener("click", async (e) => {
  e.preventDefault();
  const validForm = formValidate();
  if (validForm !== false) {
    fetch("http://localhost:3000/api/cameras/order", {
      method: "post",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartInformation),
    })
      .then((res) => res.json())
      .then((res) => {
        window.location = `./confirmation.html?id=${res.orderId}&price=${totalPrice}&user=${firstName.value}`;
        localStorage.removeItem("panier");
        console.log(cartInformation);
      });
  }
});
