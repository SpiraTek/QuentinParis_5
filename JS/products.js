// Récupération dans l'API et ouverture url avec ID produit
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
    container.className = "teddies";

    // Image
    const img = document.createElement("img");
    img.innerHTML = data.imageUrl;
    img.src = data.imageUrl;
    img.className = "teddies__img";
    img.alt = "Photo d'un ourson en peluche";
    img.width = 400;
    img.height = 300;
    //description IMG ?

    // Nom
    const name = document.createElement("h1");
    name.innerHTML = data.name;
    name.className = "teddies__name";

    // Description
    const desc = document.createElement("p");
    desc.innerHTML = data.description;
    desc.className = "teddies__desc";

    // Prix
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
    container.append(name);
    container.appendChild(img);
    container.append(desc);
    container.append(price);
    container.append(color);
    //container.append(quantity); // Test gestion quantité
    container.append(addToCart);

    // Configuration de l'objet récupérant les données choisies par l'utilisateur
    let selectedOptions = {
      ID: productId,
      Nom: data.name,
      //Couleur: color.selectedIndex A CONFIGURER
      Image: data.imageUrl,
      Prix: data.price / 100 + "€",
      Quantité: 1,
    };

    // --------------  Ajout au panier au click sur le bouton -------------- 

    // Selection du bouton dans le DOM 
    let addBtn = document.querySelector("button");

    // Ajout de l'event listener au click sur le bouton et création de la fonction qui en résulte
    addBtn.addEventListener("click", function () {

      // Variable stockant les clés et les values qui seront ajoutées au local storage
      let cartStorage = JSON.parse(localStorage.getItem("cart"))

      // Fonction pour ajouter une fenêtre permettant d'aller au panier ou de revenir au menu principal après ajout au panier
      function confirmation() {
        // Si click sur OK redirection vers page "cart.html"
        if (window.confirm(`L'ourson a bien été ajouté au panier.
Pour consulter le panier cliquez sur OK, pour revenir à l'accueil cliquez sur ANNULER`)) {
          window.location.href = "cart.html";
          // Si click sur ANNULER retour à l'accueil (index.html) du site
        } else {
          window.location.href = "index.html";
        }
      }

      // Fonction pour ajouter le produit selectionné au local storage
      const addToLocalStorage = () => {

        // Ajoute l'objet avec les valeurs choisies par l'utilisateur dans le tableau
        cartStorage.push(selectedOptions);

        // Transforme l'objet au format JSON et l'envoi dans la "key" du produit dans le local storage
        localStorage.setItem("cart", JSON.stringify(cartStorage));
      }
      // Si produit déja présent incrémenter la quantité
// Recherche de la présence du produit dans le local storage. Trouver si dans le local storage un produit possède déjà l'ID du produit qu'on ajoute.
        
          // Trouver l'index du produit contenant l'ID
          //avec l'index je récupère le produit dans le tableau cartStorage    (1 index = 1 ID et 1 COULEUR)
          //j'ajoute 1 à la quantité  
          // je renvoie dans le local storage

      // Si il y'a déjà des produits dans le local storage
   if(cartStorage) { 
        addToLocalStorage();
        console.log("l'ourson est déja dans le panier");
        confirmation();
      }

      // Si le local storage est vide création d'un tableau dans celui-ci
      else{
        cartStorage = [];
        addToLocalStorage ();
        console.log("Le panier a été initialisé")
        confirmation();
      }

          
    })
  })
      // Sinon créer une nouvelle entrée dans le local storage
    
    
  
  