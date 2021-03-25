
// Appel API des produits 
function displayItem () {
    let productLocation = new URLSearchParams(window.location.search);
    let id = productLocation.get('id')
    fetch("http://localhost:3000/api/teddies/" + id) // Récupération des données de l'API 
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
        const container = document.createElement('div')
        const img = document.createElement('img')
        const name = document.createElement('h1')
        const desc = document.createElement('p')
        const price = document.createElement('h2')  
        // Gestion du choix des couleurs
        const color = document.createElement ('select')
        let options = data.colors;

        options.forEach(function(colors,key) {
        color[key] = new Option(colors,key); //Boucle permettant de créer une option pour chaque itération de "data.colors"
        });
         
        // Contenu du HTML
        container.id = "teddies__cards";
        container.className= "teddies";

        img.innerHTML = data.imageUrl
        img.src = data.imageUrl
        img.className = "teddies__img"
        img.alt = "Photo d'un ourson en peluche"
        img.width = 400
        img.height = 300
        //description IMG ?

        name.innerHTML = data.name
        name.className = "teddies__name"

        desc.innerHTML = data.description
        desc.className = "teddies__desc"

        price.textContent = data.price /100 +'€'
        price.className = "teddies__price"

        color.className = "color__choice"

        
        // Intégration au HTML
        singleItem.append(container)
        container.append(name)
        container.appendChild(img)
        container.append(desc)
        container.append(price)
        container.append(color)
        color.append(options)
    
    })

    )}
displayItem()