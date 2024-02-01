let bestelingen = JSON.parse(localStorage.getItem("bestelingen")) || [];
// Hier wordt de order berekent
bestelingen.forEach((order, index) => {
    let totaal = 0;
    order.products.forEach((product) => {
        totaal += product.price * product.aantal;
    });
    // De template van de order pagina
    const shoptemplate = document.getElementsByTagName("template")[0];
    const kaart = shoptemplate.content.cloneNode(true);
    kaart.querySelectorAll(".id")[0].textContent = index;
    kaart.querySelectorAll(".totaalbedrag")[0].textContent = `€${totaal}`;
    kaart.querySelectorAll(".tijd")[0].textContent = order.tijd;
    document.querySelectorAll("ul")[1].appendChild(kaart);
});