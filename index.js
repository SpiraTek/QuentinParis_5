// Récupération des données de l'API 
function getItems () { 
    fetch("http://localhost:3000/api/teddies")
    .then(function(response){
        return response.json();
    })

	.then(
      (data => {
         console.log(data) // Verification du bon fonctionnement de "fetch"
         const products = document.getElementById('products') // Div de référence dans le HTML
         for (let index = 0; index < data.length; index++) {

         // Constantes pour les informations des produits et leurs conteneurs HTML 
         const article = document.createElement('article')
         const img = document.createElement('img')
         const name = document.createElement('h3')
         const desc = document.createElement('p')
         const price = document.createElement('h4')
         
         // Contenu des articles
         article.id = "teddies__cards";
         article.className= "teddies";

         img.innerHTML = data[index].imageUrl
         img.src = data[index].imageUrl
         img.className = "teddies__img"
         img.alt = "Photo d'un ourson en peluche"
         img.width = 400
         img.height = 300
         //description IMG ?

         name.innerHTML = data[index].name
         name.className = "teddies__name"

         desc.innerHTML = data[index].description
         desc.className = "teddies__desc"

         price.textContent = data[index].price /100 +'€'
         price.className = "teddies__price"
      
         // Intégration au HTML
         products.append(article)
         article.appendChild(img)
         article.append(name)
         article.append(desc)
         article.append(price)
         }
  })

)}

getItems()
      