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
    container.className = "teddies";

    // image
    const img = document.createElement("img");
    img.innerHTML = data.imageUrl;
    img.src = data.imageUrl;
    img.className = "teddies__img";
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
    container.append(name);
    container.appendChild(img);
    container.append(desc);
    container.append(price);
    container.append(color);
    //container.append(quantity); // Test gestion quantité
    container.append(addToCart);

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
    let addBtn = document.querySelector("button");

    // Ajout de l'event listener au click sur le bouton et création de la fonction qui en résulte
    addBtn.addEventListener("click", function () {
      // Variable stockant les clés et les values qui seront ajoutées au local storage
      let cartStorage = JSON.parse(localStorage.getItem("cart"));

      // Fonction pour ajouter une fenêtre permettant d'aller au panier ou de revenir au menu principal après ajout au panier
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
      }

      // Fonction pour ajouter le produit selectionné au local storage
      const addToLocalStorage = () => {
        // Ajoute l'objet avec les valeurs choisies par l'utilisateur dans le tableau
        cartStorage.push(selectedOptions);
        // Transforme l'objet au format JSON et l'envoi dans la "key" du produit dans le local storage
        localStorage.setItem("cart", JSON.stringify(cartStorage));
        
      };

      // Si produit déja présent incrémenter la quantité
      // Recherche de la présence du produit dans le local storage. Trouver si dans le local storage un produit possède déjà l'id du produit qu'on ajoute.

      // Trouver l'index du produit contenant l'id
      //avec l'index je récupère le produit dans le tableau cartStorage    (1 index = 1 id et 1 COULEUR)
      //j'ajoute 1 à la quantité
      // je renvoie dans le local storage

      // Si il y'a déjà des produits dans le local storage
      /* Fonction pour l'ajout d'une quantité au niveau d'un objet déjà existant
      Celle-ci prend en paramètre un objet (ici l'objet déjà existant representé par une ligne de notre talbeau)
      La quantite etant toujours incrementée de 1 pas besoin d'autre paramètre
          il faudrait modifier la fonction afin qu'elle prenne encompte d'autres parametres afin de les utiliser ou non,
          par ex. => function addXXXXXXToObject(formerObject, autreParamettre) {...}
      */

      function incrementQuantity(formerObject) {
        let modifiedObject = {
          id: formerObject.id,
          name: formerObject.name,
          //Couleur: color.selectedIndex A CONFIGURER
          image: formerObject.image,
          price: formerObject.price,
          //petit soucis avec le ++ a toi de regarder plus emplement
          quantity: ++formerObject.quantity, //Ou +1
        };
        return modifiedObject;
      }

      //Booléen permettant de determiner si l'objet qui est testé a été trouvé ou non dans le local storage
      // De base = true et passe a false dans le cas où un objet se trouve déjà dans le panier
      let notInCart = true;

      //Test pour savoir si le cartstorage existe déjà
      if (cartStorage) {
        //pour chaque ligne de notre "tableau" si l'id de l'objet que l'on désire ajouter au panier existe déjà
        for (let i = 0; i < cartStorage.length; i++) {
          if (cartStorage[i].id === productId) {
            //si l'on determine que l'objet existait déjà on fait passer le booléen notInCart a false (utilisé dans le switch plus bas)
            notInCart = false;
            /*à l'emplacement de l'objet dans le tableau on remplace les données présentes par les nouvelles données 
                (ici en appelant une fonction qui prend en paramètre l'objet initial cartStorage)
                  et retourne un autre objet modifié.
                */
            cartStorage[i].quantity+=1 //= incrementQuantity(cartStorage[i]);
          }
        }
        //Switch permettant la gestion des différents cas rencontrables, facilite l'ajout d'éventuels nouveaux cas.
        //PAS DE SWITCH !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        // l'article n'est pas dans le panier, ajout de l'article (création d'un nouvel index)
        switch (notInCart) {
          case true:
            addToLocalStorage();
            console.log("Un nouveau produit a bien été ajouté au panier.");
            //confirmation();
            break;
          // l'article est déja dans le panier, incrémentation de la quantité
          case false:
            localStorage.setItem("cart", JSON.stringify(cartStorage));
            console.log("Le produit a bien été modifié.");
            break;
          default:
            alert(
              "une erreur a été rencontrée lors de l'ajout du produit au panier"
            );
            console.log("Cas par défaut.");
        }
      }
      // Si le local storage est vide création d'un tableau dans celui-ci
      else {
        cartStorage = [];
        addToLocalStorage();
        console.log("Le panier a été initialisé.");
        //confirmation();
      }
      
    });
  });
  // Gestion Panier

