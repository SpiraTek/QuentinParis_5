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

// GESTION VERIFICATION DU FORMULAIRE --------------------------------------------------


function formValidation () {

  // Initialisation des entrées du formulaire
  let formLastname = document.getElementById("lastname").value;
  let formFirstname = document.getElementById("firstname").value;
  let formAddress = document.getElementById("address").value;
  let formZip = document.getElementById("zipcode").value;
  let formCity = document.getElementById("city").value;  
  let formMail = document.getElementById("mail").value;

  // Controles des expressions courantes
  let formError = "";
  const regNumber = /[0-9]/;
  const regMail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const regText = /[a-zA-Z]/;

  // Test des entrées du formulaire qui renvoi un message d'erreur en cas de saisie incorrecte
if (regText.test(formLastname) !== true || formLastname === "") {
  formError = "Veuillez vérifier votre saisie dans le champs 'nom' les chiffres et les caractères spéciaux sont interdits."
}
else {}
// Prénom
if (regText.test(formFirstname) !== true || formFirstname === "") {
  formError = "Veuillez vérifier votre saisie dans le champ 'prénom' les chiffres et les caractères spéciaux sont interdits."
}
else {}
// Adresse
if (regText.test(formAddress) !== true || regNumber.test(formAddress) !== true || formAddress === "") {
  formError = "Veuillez vérifier votre saisie dans le champ 'adresse', il doit contenir un numéro et des lettres les caractères spéciaux sont interdits.";
}
else {}
// Code Postal
if (regNumber.test(formZip) !== true || formZip === "") {
  formError = "Veuillez vérifier votre saisie dans le champ 'code postal', seuls les chiffres sont autorisés.";
}
else{}
if (regText.test(formCity) !== true || formCity === "") {
  formError = "Veuillez vérifier votre saisie dans le champ 'ville' les chiffres et les caractères spéciaux sont interdits.";
}
// Adresse Mail
if (regMail.test(formMail) !== true || formMail === "") {
  formError = "Veuillez vérifier votre saisie dans le champ Mail, seules les adresses mails au format 'monmail@monfournisseur.XXX' sont autorisées.";
}
// GESTION DU MESSAGE D'ALERTE EN CAS DE SAISIE INCORRECTE (form error est différent de "")
if (formError !== "") {
  alert("Veuillez vérifier les données saisies:" + "\n" + formError);
}

// SI LE FORMULAIRE EST CORRECTEMENT RENSEIGNE
// Renvoi des données saisies dans l'objet formData 
else {
  formData = {
    lastName: formLastname,
    firstName: formFirstname,
    address: formAddress,
    zipCode: formZip,
    city: formCity,
    email: formMail,
  };
  return formData;
  }
}
let formData;
// test 
const formCheckBtn = document.getElementById("confirm-order")
formCheckBtn.addEventListener('click', (e) => {
  e.preventDefault(); 
  formValidation();
  console.log(formData)
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
