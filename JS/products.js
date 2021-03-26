
// Appel API des produits 
function displayItem () {
    let productLocation = new URLSearchParams(window.location.search);
    let productId = productLocation.get('id')
    fetch("http://localhost:3000/api/teddies/" + productId) // Récupération des données de l'API 
    .then(function(response){
        return response.json();
    })
    .then(
        (datas => {
        console.log(datas)
        let data = datas;

        // Selection du parent HTML
        const singleItem = document.getElementById('details')

        // Création des éléments HTML 

        // Div conteneur
        const container = document.createElement('div')
        container.id = "teddies__cards";
        container.className= "teddies";

        // Image
        const img = document.createElement('img')
        img.innerHTML = data.imageUrl
        img.src = data.imageUrl
        img.className = "teddies__img"
        img.alt = "Photo d'un ourson en peluche"
        img.width = 400
        img.height = 300
        //description IMG ?

        // Nom
        const name = document.createElement('h1')
        name.innerHTML = data.name
        name.className = "teddies__name"

        // Description
        const desc = document.createElement('p')
        desc.innerHTML = data.description
        desc.className = "teddies__desc"

        // Prix
        const price = document.createElement('h2')
        price.textContent = data.price /100 +'€'
        price.className = "teddies__price"
        
        // Gestion du choix des couleurs
        const color = document.createElement ('select')
        let options = data.colors;
        //Boucle permettant de créer une option pour chaque itération de "data.colors"
        options.forEach(function(colors,key) {
        color[key] = new Option(colors,key); 
        });
        color.className = "color__choice"

        // Gestion quantité 
        const howMany = [1, 2, 3, 4, 5, 6, 7, 8, 9]
        let quantity = document.createElement ('select')
        howMany.forEach(function(qty,key) {
        quantity[key] = new Option(qty,key); 
        });

        // Bouton d'ajout au panier
        const add = document.createElement('button')

        
        // Intégration au HTML
        singleItem.append(container)
        container.append(name)
        container.appendChild(img)
        container.append(desc)
        container.append(price)
        container.append(color)
        container.append(quantity)
        container.append(add)
    
    })

    )}
displayItem();