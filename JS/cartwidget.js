// Variable stockant les clés et les values qui seront ajoutées au local storage
let widgetStorage = JSON.parse(localStorage.getItem("cart"));
console.log(localStorage.length);
// Gestion du compte du nombre de produits dans le panier.
function getTotalItem () {
    
    let totalItem = 0;
    widgetStorage.forEach((cart) => {
      totalItem = totalItem + cart.quantity;
    });
    return totalItem;
  }
  //widget Panier
  function cartWidget () {
    let totalItemWidget = document.getElementById("incart")
    totalItemWidget.innerHTML = getTotalItem();
    }
    cartWidget()
    