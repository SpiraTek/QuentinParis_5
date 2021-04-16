
let customerDatas = JSON.parse(localStorage.getItem("order"));
localStorage.setItem("order", JSON.stringify(customerDatas));
console.log(customerDatas)

// Si aucun élément de commande (en principe l'utilisateur ne peux pas accédere à cette page dans ce cas)
if (customerDatas === null) {
    let emptyOrder = document.getElementById("checkout__container");
    let orderError = document.createElement("h2");
    orderError.innerHTML = "Aucune commande n'a été passée, veuiller ajouter des articles à votre panier et valider votre commande.";
    orderError.className = "empty__order"
    emptyOrder.append(orderError);
}
// Sinon récupération des données de la commande 
else {
    let orderContainer = document.getElementById("checkout__container")
    // Titre
    let orderMsg = document.createElement("h2")
    orderMsg.innerHTML = "Merci pour votre commande,"+ customerDatas.orderId +" "+ customerDatas.contact.firstName + " " + customerDatas.contact.lastName +" " +  "voici le récapitulatif:"
    orderContainer.append(orderMsg);
    // Nombre d'articles
    let itemCount = document.createElement("h3")
    itemCount.innerHTML = "Montant total de votre commande: "  + getTotalPrice() +"€";
    orderContainer.append(itemCount)

}