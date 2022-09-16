class Buscaminas {
    constructor(ancho, alto, minas) {
        this.ancho = ancho;
        this.alto = alto;
        this.size = 0;
        this.nroMinas = minas
        this.gameOver = false;
        this.banderas = 0;

        this.tablero = [];

        this.cuentaMinas = document.createElement("DIV");
        this.cuentaMinas.id = "cuentaMinas";
        this.cuentaMinas.style.gridColumn = `1 / span ${this.ancho}`;
        document.getElementById("buscaminas").appendChild(this.cuentaMinas);
        this.updateNroMinas();

        for (let y = 0; y < this.alto; y++) {
            this.tablero.push([]);
            for (let x = 0; x < this.ancho; x++) {
                let elemento = document.createElement("DIV");
                elemento.className = "celda";
                document.getElementById("buscaminas").appendChild(elemento);
                this.tablero[y].push(new Celda(x, y, elemento, this));

                elemento.addEventListener("click", (e) => this.tablero[y][x].visit(false));
                elemento.addEventListener("contextmenu", (e) => {
                    e.preventDefault();
                    this.tablero[y][x].rightClick();
                });
            }
        }

        this.colocarMinas();

        for (let y = 0; y < this.alto; y++) {
            for (let x = 0; x < this.ancho; x++) {
                this.contarMinas(x, y);
            }
        }

        this.setCellSize();

        window.addEventListener("resize", (e) => {
            this.setCellSize();
        });

        this.reiniciar = document.createElement("BUTTON");
        this.reiniciar.id = "reiniciar-btn";
        this.reiniciar.innerHTML = "REINICIAR";
        this.reiniciar.className = "dificultad";
        this.reiniciar.style.gridColumn = `1 / span ${this.ancho}`;
        document.getElementById("buscaminas").appendChild(this.reiniciar);

        this.reiniciar.addEventListener("click", (e) => this.reset());
    }

    reset() {
        for (let y = 0; y < this.alto; y++) {
            for (let x = 0; x < this.ancho; x++) {
                this.tablero[y][x].reset();
            }
        }

        this.gameOver = false;
        this.banderas = 0;

        this.colocarMinas();

        for (let y = 0; y < this.alto; y++) {
            for (let x = 0; x < this.ancho; x++) {
                this.contarMinas(x, y);
            }
        }

        this.setCellSize();
        this.updateNroMinas();
    }


    colocarMinas() {
        for (let i = 0; i < this.nroMinas; i++) {
            while (true) {
                let x = Math.floor((Math.random() * this.ancho));
                let y = Math.floor((Math.random() * this.alto));
                if (!this.tablero[y][x].esMina) {
                    this.tablero[y][x].esMina = true;
                    break;
                }
            }
        }
    }

    contarMinas(x, y) {
        let cuenta = 0;
        for (let yOffset = -1; yOffset < 2; yOffset++) {
            for (let xOffset = -1; xOffset < 2; xOffset++) {
                if (x + xOffset >= 0 && x + xOffset < this.ancho && y + yOffset >= 0 && y + yOffset < this.alto) {
                    if (this.tablero[y + yOffset][x + xOffset].esMina) {
                        cuenta += 1;
                    }
                }
            }
        }
        this.tablero[y][x].minasVecinas = cuenta;
    }

    getOptimalSize() {
        let espacioX = window.innerWidth * 0.9;
        let espacioY = window.innerHeight * 0.7;

        let anchoIdeal = espacioX / this.ancho;
        let altoIdeal = espacioY / this.alto;

        return Math.min(anchoIdeal, altoIdeal)
    }

    setCellSize() {
        this.size = this.getOptimalSize();
        buscaminas.style.gridTemplateColumns = `repeat(${this.ancho}, ${this.size}px)`;
        buscaminas.style.gridTemplateRows = `repeat(${this.alto + 2}, ${this.size}px)`;

        let celdas = document.querySelectorAll(".celda");
        let visitadas = document.querySelectorAll(".visitada");

        for (let celda of celdas) {
            celda.style.borderWidth = `${this.size * 0.08}px`
        }

        for (let i of visitadas) {
            i.style.fontSize = `${this.getFontSize()}px`
        }

        this.cuentaMinas.style.fontSize = `${this.size / 2.5}px`;
    }

    getFontSize() {
        this.size = this.getOptimalSize();
        return this.size * 0.7;
    }

    updateNroMinas() {
        this.cuentaMinas.innerHTML = `<h1>${this.nroMinas - this.banderas}</h1>`
    }

    partidaPerdida() {
        this.gameOver = true;
        this.cuentaMinas.innerHTML = "<h1>F</h1>";
        this.dibujarBombas();
    }

    dibujarBombas() {
        for (let y = 0; y < this.alto; y++) {
            for (let x = 0; x < this.ancho; x++) {
                if (this.tablero[y][x].esMina) {
                    this.tablero[y][x].dibujarBomba();
                }
            }
        }
    }
}
