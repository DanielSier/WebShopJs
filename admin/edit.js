let producten = JSON.parse(localStorage.getItem("producten"));
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");

console.log(id);
const product = producten[id];
document.querySelectorAll(".d-flex")[0].value = product.name;
document.querySelectorAll(".d-flex")[1].value = product.price;
document.querySelectorAll(".d-flex")[2].value = product.image;
if (product.image) document.querySelectorAll("img")[0].src = product.image;
function edit() {
    const nieuwnaam = document.querySelectorAll(".d-flex")[0].value;
    const nieuwprijs = document.querySelectorAll(".d-flex")[1].value;
    const nieuwafbeelding = document.querySelectorAll(".d-flex")[2].value;

    producten[id].name = nieuwnaam;
    producten[id].price = nieuwprijs;
    producten[id].image = nieuwafbeelding;

    localStorage.setItem("producten", JSON.stringify(producten));
}

const imgElement = document.querySelector("img");
const afbeeldingInput = document.querySelectorAll(".d-flex")[2];

afbeeldingInput.addEventListener("input", function () {
    if (afbeeldingInput.value) {
        imgElement.src = afbeeldingInput.value;
    } else {
        imgElement.src = `https://img.freepik.com/premium-vector/geen-foto-beschikbaar-
        vector-icoon-standaard-afbeelding-symbool-foto-komt-binnenkort-voor-
        website-of-mobiele-app_87543-18055.jpg`;
    }
});

edit();

