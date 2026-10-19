
const bilder = [
    "Peugeot 1.jpg",
    "Peugeot 2.jpg",
    "Peugeot 3.jpg",
    "Peugeot 4.jpg",
    "Peugeot 5.jpg",
    "Peugeot 6.jpg",
    "Peugeot 7.jpg",
    "Peugeot 8.jpg",
    "Peugeot 9.jpg",
    "Peugeot 10.jpg",
    "Peugeot 11.jpg",
];

let aktuellesBild = 0;

const slider = document.getElementById("bild-slider");
const bild = document.getElementById("slider-bild");
const zaehler = document.getElementById("bild-zaehler");

function bildAnzeigen() {
    bild.src = bilder[aktuellesBild];
    bild.alt = `Mercedes Bild ${aktuellesBild + 1}`;
    zaehler.textContent =
        `${aktuellesBild + 1} / ${bilder.length}`;
}

function wechseln(richtung) {
    aktuellesBild =
        (aktuellesBild + richtung + bilder.length) % bilder.length;

    bildAnzeigen();
}

let startX = 0;
let startY = 0;
let wurdeGezogen = false;

slider.addEventListener("pointerdown", (e) => {
    startX = e.clientX;
    startY = e.clientY;
    wurdeGezogen = false;
});

slider.addEventListener("pointerup", (e) => {
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;

    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
        wurdeGezogen = true;
        wechseln(dx < 0 ? 1 : -1);
    }
});

slider.addEventListener("click", (e) => {
    if (wurdeGezogen) {
        wurdeGezogen = false;
        return;
    }

    const bereich = bild.getBoundingClientRect();
    const klickX = e.clientX - bereich.left;

    wechseln(klickX < bereich.width / 2 ? -1 : 1);
});

bildAnzeigen();
