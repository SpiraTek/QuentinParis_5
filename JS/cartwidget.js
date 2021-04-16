// Variable stockant les clés et les values qui seront ajoutées au local storage
let widgetStorage = JSON.parse(localStorage.getItem("cart"));
console.log(localStorage.length);
// Gestion du compte du nombre de produits dans le panier.

function getTotalItemWidget() {
  let totalItem = 0;
  widgetStorage.forEach((cart) => {
    totalItem = totalItem + cart.quantity;
  });
  return totalItem;
}

// Intégration du widget panier au HTML si le localStorage n'est pas vide
if (widgetStorage !== null) {
  function cartWidget() {
    let totalItemWidget = document.getElementById("incart");
    totalItemWidget.innerHTML = getTotalItemWidget();
  }
  cartWidget();
}


// Calcul du prix total du panier si il y'a des produits à l'intérieur, sinon retourne la valeur 0.
function getTotalPrice() {
  let totalCart = 0;
  if (widgetStorage) {
    widgetStorage.forEach((cart) => {
      totalCart = totalCart + cart.price * cart.quantity;
    });
  }
  return totalCart;
}
// Calcul du nombre total de prouits dans le panier s'il y'en a à l'intérieur, sinon retourne la valeur 0. 
function getTotalItem() {
  let totalItem = 0;
  if (widgetStorage) {
    widgetStorage.forEach((cart) => {
      totalItem = totalItem + cart.quantity;
    });
  }
  return totalItem;
}
