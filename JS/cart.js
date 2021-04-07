// Variable stockant les clés et les values qui seront ajoutées au local storage
let cartStorage = JSON.parse(localStorage.getItem("cart"));
console.log(localStorage.length);

for (let i = 0; i < cartStorage.length; i++) {
  console.log(localStorage);
  let getTable = document.getElementById("cart__container");

  let cartImg = document.createElement("img");
  cartImg.className = "cartimg";
  cartImg.src = cartStorage[i].image;
  getTable.append(cartImg);

  let cartArticle = document.createElement("p");
  cartArticle.innerHTML = cartStorage[i].name;
  getTable.append(cartArticle);

  let cartPerLineQuantity = document.createElement("p");
  cartPerLineQuantity.innerHTML = cartStorage[i].quantity;
  getTable.append(cartPerLineQuantity);

  let cartPrice = document.createElement("p");
  cartPrice.innerHTML = cartStorage[i].price + "€";
  getTable.append(cartPrice);

  //Prix total par ligne
  let cartTotalPrice = document.createElement("p");
  cartTotalPrice.innerHTML =
    cartStorage[i].price * cartStorage[i].quantity + "€";
  getTable.append(cartTotalPrice);

  let removeBtn = document.createElement("button");
  removeBtn.innerHTML = "Supprimer du panier";
  removeBtn.className = "rmvbtn";
  removeBtn.id = "removeButton" + [i];
  getTable.append(removeBtn);
}

// Calcul du prix total

  // fonction permettant de récupérer le prix total
function getTotalPrice () {
  
  let totalCart = 0;
  cartStorage.forEach((cart) => {
    totalCart = totalCart + cart.price*cart.quantity;
  console.log(cartStorage.price, cartStorage.quantity);
  });
  return totalCart;
  
}
// Injection du resultat dans le HTML
let priceContainer = document.getElementById("subTotal");
priceContainer.innerHTML = getTotalPrice();

/*let getTable = document.getElementById("cart__tablebody")

    let cartArticle = document.createElement("th")
    cartArticle.innerHTML = cartStorage[i].nom;
    getTable.append(cartArticle);

    let cartImg = document.createElement("td")

    cartImg.innerHTML = cartStorage[i].image;
    cartImg.src = "cartStorage[i].image";
    getTable.append(cartImg)

    let cartPerLineQuantity = document.createElement("td")
    cartPerLineQuantity.innerHTML = cartStorage[i].Quantité
    getTable.append(cartPerLineQuantity)

    let cartPrice = document.createElement("td")
    cartPrice.innerHTML = cartStorage[i].Prix;
    getTable.append(cartPrice)*/
