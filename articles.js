// Appel API des produits 

fetch("http://localhost:3000/api/teddies") // first step
  .then(response => response.json()) // second step
  .then(data => {
    console.log(data)
  })
  .catch(error => console.error(error))

