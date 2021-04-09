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
  removeBtn.className = "removeItemButton";
  removeBtn.id = "remove_Item_Button" + [i];
  getTable.append(removeBtn);
}

// Calcul du prix total

  // fonction permettant de récupérer le prix total
function getTotalPrice () {
  
  let totalCart = 0;
  cartStorage.forEach((cart) => {
    totalCart = totalCart + cart.price*cart.quantity;
  });
  return totalCart;
  
}
// Injection du prix total dans le HTML
let priceContainer = document.getElementById("subTotal");
priceContainer.innerHTML = getTotalPrice();

// Gestion du compte du nombre de produits dans le panier.
function getTotalItem () {
    
  let totalItem = 0;
  cartStorage.forEach((cart) => {
    totalItem = totalItem + cart.quantity;
  });
  return totalItem;
}
// Injection du nombre d'articles dans le HTML 
let totalItemContainer = document.getElementById("total__item")
totalItemContainer.innerHTML = getTotalItem();

//widget Panier
function cartWidget () {
  let totalItemWidget = document.getElementById("incart")
  totalItemWidget.innerHTML = getTotalItem();
  }
  
  cartWidget();


// BOUTON POUR SUPPRIMER UN ELEMENT DU PANIER 

// Selection de tous les bouttons removeItemButton


for(let i = 0 ; 1 < removeItemBtn.length; i++){
  removeItemBtn[i].addEventListener('click', (e) => {
    e.preventDefault();
    alert("click")
    // Selection du produit à supprimer 
    let productToRemove = cartStorage[i].id
   
  })
};
// BOUTON POUR VIDER ENTIEREMENT LE PANIER -----------------------------------------------------------------------------
const removeAllBtn = document.getElementById("clearCart")
removeAllBtn.addEventListener('click', (e) => {
  e.preventDefault(); 
  // suppression de cart dans le local storage
  localStorage.removeItem("cart")
  alert("Le panier a été vidé")
  // rechargement de la page 
  window.location.href = "cart.html";
});
// RECUPERER LE NUMERO DE COMMANDE VIA L'API 


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
