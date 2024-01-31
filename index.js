let producten = JSON.parse(localStorage.getItem("producten"))
function kaarten(producten) {
    producten.forEach((product) => {
        const shoptemplate = document.getElementsByTagName("template")[0];
        const kaart = shoptemplate.content.cloneNode(true);
        if (product.image) kaart.querySelectorAll(".card-img-top")[0].src = product.image;
        kaart.querySelectorAll(".card-title")[0].textContent = product.name;
        document.getElementById("row").appendChild(kaart);
    });
}
kaarten(producten.slice(0, 3));