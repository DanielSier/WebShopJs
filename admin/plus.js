let producten = JSON.parse(localStorage.getItem("producten"));
let product = {};

// Functie voor het toevoegen van het product
function toevoegen() {

    const nieuwnaam = document.querySelectorAll(".d-flex")[0].value;
    const nieuwprijs = document.querySelectorAll(".d-flex")[1].value;
    const nieuwafbeelding = document.querySelectorAll(".d-flex")[2].value;

    product.name = nieuwnaam;
    product.price = nieuwprijs;
    product.image = nieuwafbeelding;

    producten.push(product);
    localStorage.setItem("producten", JSON.stringify(producten));
}


