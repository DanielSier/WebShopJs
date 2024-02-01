let producten = JSON.parse(localStorage.getItem("producten"));
let winkelwagen = JSON.parse(localStorage.getItem("winkelwagen")) || [];
// haalt informatie uit de JSON
if (!producten) {
    fetch('./producten.json').then(response => response.json()).then(data => {
        kaarten(data);
        producten = data;
        localStorage.setItem("producten", JSON.stringify(data));
    });
} else {
    kaarten(producten);
}
// template voor de shop
function kaarten(producten2) {
    producten2.forEach((product, index) => {
        const shoptemplate = document.getElementsByTagName("template")[0];
        const kaart = shoptemplate.content.cloneNode(true);
        if (product.image) kaart.querySelectorAll(".card-img-top")[0].src = product.image;
        kaart.querySelectorAll(".card-title")[0].textContent = product.name;
        kaart.querySelectorAll(".card-text")[0].textContent = `€${product.price}`;
        kaart.querySelectorAll(".btn")[0].id = index;
        document.getElementById("row").appendChild(kaart);
    });
}
// hier wordt er gekeken of het product al in het winkelwagentje zit of niet
document.addEventListener("click", (e) => {
    if (producten[e.target.id]) {
        const hetproduct = producten[e.target.id];

        const checkproductinwinkelwagen = winkelwagen.find((item) => item.name === hetproduct.name);
        if (!checkproductinwinkelwagen) {
            const pr = producten[e.target.id];
            pr.aantal = 1;

            winkelwagen.push(pr);

            console.log(e.target.id);
        } else {
            checkproductinwinkelwagen.aantal += 1;
            console.log("dit product is al in de winkelwagen");
        }

        localStorage.setItem("winkelwagen", JSON.stringify(winkelwagen));

    }

});
