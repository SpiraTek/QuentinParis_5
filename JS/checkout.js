// Récupération des données de la commande

let customerDatas = JSON.parse(localStorage.getItem("order"));
localStorage.setItem("order", JSON.stringify(customerDatas));
console.log(customerDatas)

// Génération de la page de confirmation de commande 
function generateCheckOut(){
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
    let orderMsg = document.createElement("h2");
    orderMsg.innerHTML = "Merci pour votre commande "+ customerDatas.contact.firstName + " " + customerDatas.contact.lastName +" " +  "voici le récapitulatif:"
    orderContainer.append(orderMsg);
    // ID
    let ordernNumber = document.createElement("h3");
    ordernNumber.innerHTML = "Numéro de votre commande: " +  customerDatas.orderId;
    orderContainer.append(ordernNumber)

    // Nombre d'articles
    let itemCount = document.createElement("h3");
    itemCount.innerHTML = "Montant total de votre commande: "  + getTotalPrice() +"€";
    orderContainer.append(itemCount)

    // Bouton de confirmation 
    let finalLink = document.createElement("a")
    let finalButton = document.createElement("button");
    finalLink.href = "index.html"
    finalButton.id = "backToMain"
    finalButton.className = "backToMain"
    finalButton.innerHTML = "Revenir au menu principal"
    orderContainer.append(finalLink)
    finalLink.append(finalButton);

    // Suppression du local storage quand l'utilisateur clique sur le bouton
    let resetStorage = document.getElementById("backToMain")
    resetStorage.addEventListener("click", (e) => {
        e.preventDefault();
        // suppression de cart dans le local storage
        localStorage.clear();
        // rechargement de la page
        document.location.href="index.html";
    });
}
}
generateCheckOut();