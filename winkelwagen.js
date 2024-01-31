// Haal de winkelwagen op of initialiseer deze vanuit de lokale opslag
let winkelwagen = JSON.parse(localStorage.getItem("winkelwagen")) || [];
let totaal = 0;
let btw = 0;

// Functie om productkaarten te maken en weer te geven in de winkelwagen
function kaarten(producten) {
    producten.forEach((product, index) => {

        const shoptemplate = document.getElementsByTagName("template")[0];
        const kaart = shoptemplate.content.cloneNode(true);

        // Stel productinformatie in op de gekloonde kaart
        if (product.image) kaart.querySelectorAll("img")[0].src = product.image;
        kaart.getElementById("naam").textContent = product.name;
        const aantal = kaart.getElementById("number");
        aantal.value = product.aantal;
        kaart.querySelectorAll(".col-2")[3].textContent = `€${Math.round(
            product.price * product.aantal
        )}`;

        // Voeg de kaart toe aan de winkelwagen op de pagina
        kaart.querySelectorAll(".col-3");
        document.querySelectorAll("ul")[1].appendChild(kaart);

        // Voeg een eventlistener toe voor het verwijderen van een product
        const verwijder = document.querySelectorAll(".bg-danger")[index];
        verwijder.addEventListener("click", () => {
            if (index !== -1) {
                winkelwagen.splice(winkelwagen.indexOf(product), 1);

                localStorage.setItem(
                    "winkelwagen",
                    JSON.stringify(winkelwagen)
                );
                verwijder.closest("li").remove();
                console.log(index);
                berekenTotaalEnBtw();
            }
        });

        // Voeg een eventlistener toe voor het wijzigen van de hoeveelheid
        aantal.addEventListener("input", () => {
            updatePrijs(index, parseInt(aantal.value));
        });

        // Bereken totaalprijs en btw
        totaal += product.price * product.aantal;
        btw = (totaal / 100) * 21;
    });
}

// Controleer of de winkelwagen leeg is
if (winkelwagen.length <= 0) {
    const div = document.createElement("div");
    div.innerHTML = `<h1 class="text-center">Er is niks in je winkelwagen!</h1>
    <a class="btn btn-primary  text-white position-relative border-primary"
    href="shop.html">klik hier om terug te gaan</a>`;

    div.classList =
        "position-absolute start-50 top-50 translate-middle text-center";
    document.body.appendChild(div);
    document.getElementById("container").classList.add("d-none");
    document.getElementById("h1titel").classList.add("d-none");
} else kaarten(winkelwagen);

// Functie om totaalprijs en btw te berekenen en weer te geven
function berekenTotaalEnBtw() {
    totaal = 0;
    winkelwagen.forEach((product) => {
        totaal += product.price * product.aantal;
    });
    btw = (totaal / 100) * 21;

    document.getElementById("btw").textContent = `btw: €${Math.round(btw)}`;
    document.getElementById(
        "hele-bedrag"
    ).textContent = `Hele bedrag: €${Math.round(totaal + btw)}`;
}

// Roep de functie aan om totaalprijs en btw te berekenen bij het laden van de pagina
berekenTotaalEnBtw();

// Functie om de prijs van een product bij te werken
function updatePrijs(index, nieuwAantal) {
    winkelwagen[index].aantal = nieuwAantal;
    localStorage.setItem("winkelwagen", JSON.stringify(winkelwagen));

    // Update de prijs in de weergegeven lijst
    const prijsElement = document.querySelectorAll(".prijs")[index];
    prijsElement.textContent = `€${winkelwagen[index].price * nieuwAantal}`;

    // Herbereken totaalprijs en btw
    berekenTotaalEnBtw();
}
// hier sla je de winkelwagen op voor de adminpanel orders
function afrekenen() {

    let bestelingen = JSON.parse(localStorage.getItem("bestelingen")) || [];
    const order = {
        tijd: new Date().toLocaleString(),
        products: winkelwagen
    }
    bestelingen.push(order);
    localStorage.setItem("bestelingen", JSON.stringify(bestelingen));
    localStorage.removeItem("winkelwagen");

}
