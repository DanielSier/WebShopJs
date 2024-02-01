let producten = JSON.parse(localStorage.getItem("producten"));
// template van products in adminpanel

function kaarten(producten2) {
    document.getElementById("productentemp").innerHTML = "";
    producten2.forEach((product, index) => {
        const shoptemplate = document.getElementsByTagName("template")[0];
        const kaart = shoptemplate.content.cloneNode(true);
        kaart.querySelectorAll(".Id")[0].textContent = index;
        kaart.querySelectorAll(".Naam")[0].textContent = product.name;
        kaart.querySelectorAll(".Prijs")[0].textContent = `€${product.price}`;
        kaart.querySelectorAll(".Edit")[0].href = `edit.html?id=${index}`;
        if (product.image) kaart.querySelectorAll("img")[0].src = product.image;
     document.getElementById("productentemp").appendChild(kaart);

     const verwijder = document.querySelectorAll(".remove")[index];
     verwijder.addEventListener("click", () => {
         if (index !== -1) {
             producten2.splice(producten2.indexOf(product), 1);

             localStorage.setItem(
                 "producten",
                 JSON.stringify(producten2)
             );
             verwijder.closest("li").remove();

         }
     });
    });
}
if (!producten) {
    fetch('../producten.json').then(response => response.json()).then(data => {
        kaarten(data);
        producten = data;
        localStorage.setItem("producten", JSON.stringify(data));
    })
} else {
    kaarten(producten);
}
function reset(){
    fetch('../producten.json').then(response => response.json()).then(data => {
        kaarten(data);
        producten = data;
        localStorage.setItem("producten", JSON.stringify(data));
    })
}
