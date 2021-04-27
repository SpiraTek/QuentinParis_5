// Variable stockant les clés et les values qui seront ajoutées au local storage
let cartStorage = JSON.parse(localStorage.getItem("cart"));
console.log(localStorage.length);

// FONCTION GENERANT LE PANIER
function generateCartPage(){
  if (cartStorage === null) {
    let emptyCart = document.getElementById("cart__container");
    let emptyMsg = document.createElement("h2");
    emptyMsg.innerHTML = "Le panier est vide";
    emptyMsg.className = "empty__cart"
    emptyCart.append(emptyMsg);
  } else {
    // Sinon construction de la page panier dans le HTML
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
      removeBtn.innerHTML = "X";
      removeBtn.className = "removeItemButton";
      removeBtn.id = "remove_Item_Button" + [i];
      getTable.append(removeBtn);
    }
  }
}
generateCartPage();

// Calcul du prix total

// fonction permettant de récupérer le prix total
 //--------function dans cartWidget.js-------
  // Injection du prix total dans le HTML
  let priceContainer = document.getElementById("subTotal");
  priceContainer.innerHTML = getTotalPrice();

  // Gestion du compte du nombre de produits dans le panier.
  //--------function dans cartWidget.js-------
  // Injection du nombre d'articles dans le HTML
  let totalItemContainer = document.getElementById("total__item");
  totalItemContainer.innerHTML = getTotalItem();

// BOUTON POUR SUPPRIMER UN ELEMENT DU PANIER

// Selection du bouton en fonction de son ID
if(cartStorage) {
for (let i = 0; i < cartStorage.length; i++){

const removeLineBtn = document.getElementById("remove_Item_Button" +i)
removeLineBtn.addEventListener("click", (d) => {
  d.preventDefault();
  cartStorage.splice(i, 1)
  localStorage.setItem("cart", JSON.stringify(cartStorage));
  alert("L'article a bien été retiré du panier")
  //rechargement de la page
  location.reload()
    });
  }
}
// BOUTON POUR VIDER ENTIEREMENT LE PANIER -----------------------------------------------------------------------------
const removeAllBtn = document.getElementById("clearCart");
removeAllBtn.addEventListener("click", (e) => {
  e.preventDefault();
  // suppression de cart dans le local storage
  localStorage.removeItem("cart");
  alert("Le panier a été vidé");
  // rechargement de la page
  location.reload()
});

// GESTION VERIFICATION DU FORMULAIRE --------------------------------------------------

function formValidation() {
  // Initialisation des entrées du formulaire
  let formLastname = document.getElementById("lastname").value;
  let formFirstname = document.getElementById("firstname").value;
  let formAddress = document.getElementById("address").value;
  //let formZip = document.getElementById("zipcode").value;
  let formCity = document.getElementById("city").value;
  let formMail = document.getElementById("mail").value;

  // 

  // Controles des expressions courantes
  let formError = "Veuillez vérifier votre saisie. <br> Tous les champs sont obligatoires";
  const regNumber = /[0-9]/;
  const regMail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const regText = /[a-zA-Z]/;

  // Test des entrées du formulaire qui renvoi un message d'erreur en cas de saisie incorrecte
  if (regText.test(formLastname) !== true || formLastname === "") {
    let nameError = document.getElementById("errorName");
    nameError.innerHTML = formError;
      return false
  } 
  // Prénom
  if (regText.test(formFirstname) !== true || formFirstname === "") {
    let firstNameError = document.getElementById("errorFirstName");
    firstNameError.innerHTML = formError;
      return false
  } 
  // Adresse
  if (regText.test(formAddress) !== true ||regNumber.test(formAddress) !== true || formAddress === "") {
    let addressError = document.getElementById("errorAddress");
     addressError.innerHTML = formError;
     return false
  }
  /* Code Postal
  if (regNumber.test(formZip) !== true || formZip === "") {
    formError =
      "Veuillez vérifier votre saisie dans le champ 'code postal', seuls les chiffres sont autorisés.";
      alert(formError);
      return false
  }*/

  // Ville
  if (regText.test(formCity) !== true || formCity === "") {
    let cityError = document.getElementById("errorCity");
    cityError.innerHTML = formError;
      return false
  }
  // Adresse Mail
  if (regMail.test(formMail) !== true || formMail === "") {
    let mailError = document.getElementById("errorMail");
    mailError.innerHTML = formError;
      return false
  }

// -------------------- VOIR POUR METTRE LES ERREURS EN ARRAY AFIN DE POUVOIR AFFICHER PLUSIEURS ERREURS SIMULTANéES
  // SI LE FORMULAIRE EST CORRECTEMENT RENSEIGNE
  // Renvoi des données saisies dans l'objet contact (comme vu dans le controller de l'API)
  else {
    contact = {
      lastName: formLastname,
      firstName: formFirstname,
      address: formAddress,
      //zipCode: formZip,
      city: formCity,
      email: formMail,
    };
    return contact;
  }
}

let contact;
const formCheckBtn = document.getElementById("confirm-order");
formCheckBtn.addEventListener("click", (e) => {
  e.preventDefault();
    // Si le panier est vide
  if (!cartStorage) {
    alert("Votre panier est vide, vous devez ajouter des articles pour pouvoir commander");

    // ENVOI DE FORMDATA ET DU PANIER A L'API SI LA VALIDATION DU FORMULAIRE EST OK
  } else {
    if (formValidation()) {
    let products = [];
    for (items of cartStorage) {
    products.push(items.id);
  } 
    fetch("http://localhost:3000/api/teddies/order", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
    },
      body: JSON.stringify({ contact, products }),
    })
    .then((response) => {
     return response.json()
    })
      .then((orderData) => {
        localStorage.setItem("order", JSON.stringify(orderData));
        document.location.href = "checkout.html?id=" + orderData.orderId;
      });
    
    }
    
    
  }
});



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
