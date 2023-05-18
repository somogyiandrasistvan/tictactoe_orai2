import Elem from "./Elem.js";
class Jatekter {
    lepes;
    constructor() {
        this.lepes = 0;
        this.lista = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
        const szuloElem = $("article");
        for (let index = 0; index < 9; index++) {
            const elem = new Elem(index, szuloElem);
        }
        /// vezérli a játékot
        //ő látja a 9 elemet
        //Ő látja, hogy hányadik lépésnél tartunk
        //Ő tudja megmondani, hogy ki következik.
        //Mikor kell növelni a lépésszámláót?
        //akkor, amikor rákattintunk egy elemre.
        //feliratkozunk egy saját eseményre - elemKattintas
        $(window).on("elemKattintas", (event) => {
            console.log(event.detail);
            let aktElem = event.detail;
            if (this.lepes % 2 === 0) {
                aktElem.setElem("X");
                this.lista[aktElem.getIndex()] = "X";
            } else {
                aktElem.setElem("O");
                this.lista[aktElem.getIndex()] = "O";
            }
            this.lepes++;
            let allapot = this.ellenorzes();
            console.log(this.lepes);
            if (this.lepes === 9) {
                if (allapot === "") {
                    console.log("A játéknak vége! Döntetlen!");
                } else {
                    console.log(`A játéknak vége! ${allapot} nyert!`);
                }
            } else {
                if (allapot === "") {
                } else {
                    console.log(`A játéknak vége! ${allapot} nyert!`);
                }
            }
        });
    }

    getVizszintes() {
        let ellX = "";

        this.lista.forEach((element, index) => {
            ellX += element;
            if (index % 3 == 2) {
                ellX += "@";
            }
        });
        console.log(ellX);
        return ellX;
    }
    getFuggoleges() {
        let ellY = "";
        for (let index = 0; index < 3; index++) {
            ellY +=
                this.lista[index] +
                this.lista[index + 3] +
                this.lista[index + 6];

            ellY += "@";
        }

        return ellY;
    }

    getAtlo() {
        let ell = this.lista[0] + this.lista[4] + this.lista[8] + "@";
        ell += this.lista[2] + this.lista[4] + this.lista[6];

        return ell;
    }

    ellenorzes() {
        console.log(this.lista);
        let ell =
            this.getVizszintes() +
            "@" +
            this.getAtlo() +
            "@" +
            this.getFuggoleges();
        let allapot = "";
        console.log(ell);
        if (ell.indexOf("XXX") >= 0) {
            allapot = "X";
        } else if (ell.indexOf("OOO") >= 0) {
            allapot = "O";
        }
        return allapot;
    }
}

export default Jatekter;
