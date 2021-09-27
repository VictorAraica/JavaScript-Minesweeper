class Celda {
    constructor(x, y, elemento, juego) {
        this.elemento = elemento;
        this.pos = { x: x, y: y };
        this.esMina = false;
        this.visitada = false;
        this.minasVecinas = 0;
        this.juego = juego;
        this.marcada = false;
    }

    reset() {
        this.esMina = false;
        this.visitada = false;
        this.minasVecinas = 0;
        this.marcada = false;
        this.elemento.className = "celda";
        this.elemento.innerHTML = "";
    }

    visit(recursion) {
        // si la partida esta terminada no hacer nada
        if (this.juego.gameOver || (this.marcada && !recursion)) {
            return false;
            // si la celda esta marcada y es visitada por recurcion quitar la marca para actualizar el numero de banderas
        } else if (this.marcada) {
            this.rightClick();
        }

        // si no es mina
        if (!this.esMina) {
            // marcar como visitada
            this.visitada = true;
            this.elemento.className = "visitada";
            // si tiene minas al rededor dibujar el numero y cambiar el color del numero
            if (this.minasVecinas > 0) {
                this.dibujarNumero();
                // si no tiene minas al rededor usamos recursion para visitar las casillas de alrededor
            } else {
                this.visitarAlrededor();

            }
            // si no es mina actualizar cuenta de banderas
            this.juego.updateNroMinas();
            // si es mina terminamos la partida y le cambiamos la clase a la celda a bomba
        } else {
            this.partidaPerdida();
        }
    }

    dibujarNumero() {
        this.elemento.innerHTML = `${this.minasVecinas}`;
        this.elemento.style.fontSize = `${this.juego.getFontSize()}px`;
        if (this.minasVecinas == 1) {
            this.elemento.style.color = "blue";
        } else if (this.minasVecinas == 2) {
            this.elemento.style.color = "green";
        } else if (this.minasVecinas == 3) {
            this.elemento.style.color = "red";
        } else if (this.minasVecinas == 4) {
            this.elemento.style.color = "purple";
        } else if (this.minasVecinas == 5) {
            this.elemento.style.color = "maroon";
        } else if (this.minasVecinas == 6) {
            this.elemento.style.color = "Turquoise";
        } else if (this.minasVecinas == 7) {
            this.elemento.style.color = "black";
        } else if (this.minasVecinas == 8) {
            this.elemento.style.color = "Gray";
        }
    }

    visitarAlrededor() {
        for (let yOffset = -1; yOffset < 2; yOffset++) {
            for (let xOffset = -1; xOffset < 2; xOffset++) {
                let x = this.pos.x;
                let y = this.pos.y;
                if (x + xOffset >= 0 && x + xOffset < this.juego.ancho && y + yOffset >= 0 && y + yOffset < this.juego.alto) {
                    if (!this.juego.tablero[y + yOffset][x + xOffset].visitada) {
                        this.juego.tablero[y + yOffset][x + xOffset].visit(true);
                    }
                }
            }
        }
    }

    rightClick() {
        if (this.juego.gameOver) {
            return false
        } else if (!this.marcada && !this.visitada) {
            this.elemento.className += " marcada";
            this.marcada = true;
            this.juego.banderas += 1;
        } else if (this.marcada) {
            this.elemento.className = this.elemento.className.replace(" marcada", "");
            this.marcada = false;
            this.juego.banderas -= 1;
        }
        this.juego.updateNroMinas();
        return true;
    }

    partidaPerdida() {
        this.dibujarBomba();
        this.juego.partidaPerdida();
    }

    dibujarBomba() {
        this.elemento.className += " bomba";
    }

}