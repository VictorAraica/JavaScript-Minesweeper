let menu = document.getElementById("menu");
let dificultadesUl = document.getElementById("dificultades");
let dificultades = document.getElementsByClassName("dificultad");
let menuPersonalizado = document.getElementById("menu-personalizado");
let buscaminas = document.getElementById("buscaminas");
let jugarBtn = document.getElementById("jugar");
let backBtn = document.getElementById("back-btn");
let tablero;

// resetear la clase de los botones de dificultades
function resetDificultades() {
    for (const i of dificultades) {
        i.className = "dificultad";
    }
}

// agregar los listener de los botones de dificultades
for (const dificultad of dificultades) {
    dificultad.addEventListener("click", (e) => {
        resetDificultades();
        e.target.className += " seleccionado";
        menuPersonalizado.style.transform = "translate(2000px, 0)";
        menuPersonalizado.style.visibility = 'hidden';
        menuPersonalizado.style.opacity = '0';
    });
}

// agregar el listener el boton de dificultad personalizada
dificultades[dificultades.length - 1].addEventListener("click", (e) => {
    resetDificultades();
    e.target.className += " seleccionado";
    menuPersonalizado.style.transform = "translate(0, 0)";
    menuPersonalizado.style.visibility = 'visible';
    menuPersonalizado.style.opacity = '1';
});

// agregar el listener el boton de jugar
jugarBtn.addEventListener("click", (e) => {
    let seleccionado = document.getElementsByClassName("seleccionado")[0];
    let ancho;
    let alto;
    let minas;

    if (seleccionado.id == "principiante") {
        ancho = 8;
        alto = 8;
        minas = 10;
    } else if (seleccionado.id == "intermedio") {
        ancho = 16;
        alto = 16;
        minas = 40;
    } else if (seleccionado.id == "experto") {
        ancho = 30;
        alto = 16;
        minas = 99;
    } else {
        let altoEntry = document.getElementById("alto-entry");
        let anchoEntry = document.getElementById("ancho-entry");
        let minasEntry = document.getElementById("minas-entry");

        alto = parseInt(altoEntry.value);
        ancho = parseInt(anchoEntry.value);
        minas = parseInt(minasEntry.value);


        if (!(5 < alto) || !(alto <= 40) || !(5 < ancho) || !(ancho <= 40) || !(1 < minas) || !(minas < ancho * alto)) {
            if (!(1 < minas) || !(minas < ancho * alto)) {
                minasEntry.style.borderColor = "red";
            } else {
                minasEntry.style.borderColor = "black";
            }
            return false;
        } 
        

    }

    menu.style.display = "none";
    buscaminas.style.display = "grid";
    backBtn.style.display = "block";

    tablero = new Buscaminas(ancho, alto, minas);
});


backBtn.addEventListener("click", (e) => {
    menu.style.display = "flex";
    buscaminas.style.display = "none";
    backBtn.style.display = "none";
    buscaminas.innerHTML = '';
});
