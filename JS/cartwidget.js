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
if (widgetStorage !== null) {
  //widget Panier
  function cartWidget() {
    let totalItemWidget = document.getElementById("incart");
    totalItemWidget.innerHTML = getTotalItemWidget();
  }
  cartWidget();
}
// Calcul du prix total du panier 


  for (let i = 0; i < widgetStorage.length; i++) {
    function getTotalPrice() {
      let totalCart = 0;
      widgetStorage.forEach((cart) => {
        totalCart = totalCart + cart.price * cart.quantity;
      });
      return totalCart;
    }
    function getTotalItem() {
      let totalItem = 0;
      widgetStorage.forEach((cart) => {
        totalItem = totalItem +  cart.quantity;
      });
      return totalItem;
    }
  }
  
