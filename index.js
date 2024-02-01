let producten = JSON.parse(localStorage.getItem("producten"));
function kaarten(producten2) {
    producten2.forEach((product) => {
        const shoptemplate = document.getElementsByTagName("template")[0];
        const kaart = shoptemplate.content.cloneNode(true);
        if (product.image) kaart.querySelectorAll(".card-img-top")[0].src = product.image;
        kaart.querySelectorAll(".card-title")[0].textContent = product.name;
        document.getElementById("row").appendChild(kaart);
    });
}

if (!producten) {
    fetch('./producten.json').then(response => response.json()).then(data => {
        kaarten(data.slice(0, 3));
        producten = data;
        localStorage.setItem("producten", JSON.stringify(data));
    })
} else {
  kaarten(producten.slice(0, 3));
}