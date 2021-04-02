
function getItems () { 
    fetch("http://localhost:3000/api/teddies") // Récupération des données de l'API 
    .then(function(response){
        return response.json();
    })

	.then(
        (data => {
            console.log(data) // Verification du bon fonctionnement de "fetch"
            const products = document.getElementById('products') // Div de référence dans le HTML
            for (let index = 0; index < data.length; index++) { // Index des données du array

            // Div conteneur
            const container = document.createElement('article')
            container.id = "teddies__cards";
            container.className= "teddies";

            // Image 
            const img = document.createElement('img')
            img.innerHTML = data[index].imageUrl
            img.src = data[index].imageUrl
            img.className = "teddies__img"
            img.alt = "Photo d'un ourson en peluche"
            img.width = 400
            img.height = 300
            //description IMG ?

            // Nom
            const name = document.createElement('h3')
            name.innerHTML = data[index].name
            name.className = "teddies__name"

            // Description
            const desc = document.createElement('p')
            desc.innerHTML = data[index].description
            desc.className = "teddies__desc"

            // Prix
            const price = document.createElement('h4')
            price.textContent = data[index].price /100 +'€'
            price.className = "teddies__price"

            // Boutton et lien
            const link = document.createElement ('a')
            const more = document.createElement('button')
            link.href = "products.html?id=" + data[index]._id
            more.textContent = "Adoptez le"
            more.className = "more__button seemore"


            // Intégration au HTML
            products.append(container)
            container.appendChild(img)
            container.append(name)
            container.append(desc)
            container.append(price)
            container.append(link)
            link.append(more)
            }
  })

)}

getItems()
      