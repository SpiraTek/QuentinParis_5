// Récupération dans l'API et ouverture url avec id produit
let productLocation = new URLSearchParams(window.location.search);
let productId = productLocation.get("id");
fetch("http://localhost:3000/api/teddies/" + productId) // Récupération des données de l'API
  .then(function (response) {
    return response.json();
  })
  .then((datas) => {
    console.log(datas);
    let data = datas;

    // Selection du parent HTML
    const singleItem = document.getElementById("details");

    // Création des éléments HTML

    // Div conteneur
    const container = document.createElement("div");
    container.id = "teddies__cards";
    container.className = "teddies single__teddy";

    // Div des données 
    const singleTeddyDatas = document.createElement("div")
    singleTeddyDatas.id= "teddy__datas"
    singleTeddyDatas.className = "single__teddy__datas"

    // image
    const img = document.createElement("img");
    img.innerHTML = data.imageUrl;
    img.src = data.imageUrl;
    img.className = "teddies__img single__img";
    img.alt = "Photo d'un ourson en peluche";
    img.width = 400;
    img.height = 300;
    //description IMG ?

    // name
    const name = document.createElement("h1");
    name.innerHTML = data.name;
    name.className = "teddies__name";

    // Description
    const desc = document.createElement("p");
    desc.innerHTML = data.description;
    desc.className = "teddies__desc";

    // price
    const price = document.createElement("h2");
    price.textContent = data.price / 100 + "€";
    price.className = "teddies__price";

    // Gestion du choix des couleurs
    const color = document.createElement("select");
    let options = data.colors;
    //Boucle permettant de créer une option pour chaque itération de "data.colors"
    options.forEach(function (colors, key) {
      color[key] = new Option(colors, key);
    });
    color.className = "color__choice";
    color.id = "color__choice";
    /* 
      // Gestion quantité
      const howMany = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      let quantity = document.createElement("select");
      quantity.id="qtySelect";
      howMany.forEach(function (qty, key) {
        quantity[key] = new Option(qty, key);
      });
    */

    // Bouton d'ajout au panier
    const addToCart = document.createElement("button");
    addToCart.textContent = "Ajouter au panier";
    addToCart.id = "add_to_cart";
    addToCart.className = "add_to_cart";

    // Intégration au HTML
    singleItem.append(container);
    container.appendChild(img);
    container.appendChild(singleTeddyDatas)
    singleTeddyDatas.append(name);
    singleTeddyDatas.append(desc);
    singleTeddyDatas.append(price);
    singleTeddyDatas.append(color);
    //singleTeddyDatas.append(quantity); // Test gestion quantité
    singleTeddyDatas.append(addToCart);

    // Configuration de l'objet récupérant les données choisies par l'utilisateur
    let selectedOptions = {
      id: productId,
      name: data.name,
      //Couleur: color.selectedIndex A CONFIGURER
      image: data.imageUrl,
      price: data.price / 100,
      quantity: 1,
    };
   
    // --------------  Ajout au panier au click sur le bouton --------------

    // Selection du bouton dans le DOM
    let addBtn = document.getElementById("add_to_cart");

    // Ajout de l'event listener au click sur le bouton et création de la fonction qui en résulte
    addBtn.addEventListener("click", function () {
      // Variable stockant les clés et les values qui seront ajoutées au local storage
      let cartStorage = JSON.parse(localStorage.getItem("cart"));

      /* Fonction pour ajouter une fenêtre permettant d'aller au panier ou de revenir au menu principal après ajout au panier
      function confirmation() {
        // Si click sur OK redirection vers page "cart.html"
        if (
          window.confirm(`L'ourson a bien été ajouté au panier.
        Pour consulter le panier cliquez sur OK, pour revenir à l'accueil cliquez sur ANNULER`)
        ) {
          window.location.href = "cart.html";
          // Si click sur ANNULER retour à l'accueil (index.html) du site
        } else {
          window.location.href = "index.html";
        }
      }*/

      // Fonction pour ajouter le produit selectionné au local storage
      const addToLocalStorage = () => {
        // Ajoute l'objet avec les valeurs choisies par l'utilisateur dans le tableau
        cartStorage.push(selectedOptions);
        // Transforme l'objet au format JSON et l'envoi dans la "key" du produit dans le local storage
        localStorage.setItem("cart", JSON.stringify(cartStorage));
        
      };
    

      // Si le local storage est vide création de celui ci avec les données produit
      if (cartStorage === null) {
        cartStorage = [];
        addToLocalStorage();
        console.log("Le panier a été initialisé.");
        location.reload();
        //confirmation();
      }
      
      // Dans le cas ou le local storage n'est pas vide : 
      // Boucle permettant de récupérer l'index d'un produit déjà présent dans le local storage (allReadyInCart)
      else {
        let allreadyInCart = false; //initialisation du booléen à faux
        for (let i = 0; i < cartStorage.length; i++) {
          if (cartStorage[i].id === productId) {
            // si l'ID du produit qu'on ajoute au panier est déjà présent dans le local storage on récupère son index dans ce dernier.
            allreadyInCart = i
          }
        };

        // Cas ou le produit est déjà présent dans le panier : incrémentation de la quantité. 
          if (allreadyInCart !== false){
            cartStorage[allreadyInCart].quantity++
            localStorage.setItem("cart", JSON.stringify(cartStorage));
            console.log("Le produit a bien été modifié.")
          }
          // Sinon le produit n'est pas déjà présent intégration dans le localStorage
          else {
            addToLocalStorage()
            console.log("un nouveau produit a été ajouté au panier")
          }
          // Rafraichir le panier à l'ajout d'un produit
          location.reload();
        }
    });
  });
