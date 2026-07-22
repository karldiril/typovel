export class Engine {
    constructor(tabMotsObjets, currentWordIndex = 0, currentLetterIndex = 0) {
        this.tabMots = tabMotsObjets;
        this.currentWordIndex = Math.max(0, currentWordIndex);
        this.currentLetterIndex = Math.max(0, currentLetterIndex);
        this.motMinimumAutorisé = 0;
    }
    
    get longueurMotActuel() {
        return this.tabMots[this.currentWordIndex].attendu.length;
    }

    get isFinished() {
        return this.currentWordIndex >= this.tabMots.length;
    }


    static init(tabMots) {
        const tabMotsObjets = tabMots.map(mot => ({
            attendu: mot,
            tape: "",
            lettres: mot.split("").map(lettre =>({
                charAttendu: lettre,
                charTape: "",
                charEtat: "PENDING"
            }))
        }));
        return new Engine(tabMotsObjets);
    }


    verifyLetter(newLetter) {
        const nouveauxMots = [...this.tabMots];
        const motActuel = nouveauxMots[this.currentWordIndex];
        const lettresActuel = [...motActuel.lettres];
        const etatLettreActuelle = this.calculEtat(newLetter);
        const quantiteExtraLetter = motActuel.tape.length - motActuel.attendu.length;

        if (this.isWordComplete && quantiteExtraLetter >= 5) {
            return this;
        }

        else if (this.isWordComplete) {
            lettresActuel.push({
                charAttendu: "", 
                charEtat: etatLettreActuelle,
                charTape: newLetter,
            })
        }

        else {
            lettresActuel[this.currentLetterIndex] = {
                ...lettresActuel[this.currentLetterIndex],
                charTape: newLetter,
                charEtat: etatLettreActuelle
            };
        }
        

        nouveauxMots[this.currentWordIndex] = {
            ...motActuel,
            tape: motActuel.tape + newLetter,
            lettres: [...lettresActuel],
        };

        return new Engine(nouveauxMots, this.currentWordIndex, this.currentLetterIndex + 1);
    }


    submitWord() {
        if (this.currentLetterIndex != 0)
            return new Engine(this.tabMots, this.currentWordIndex + 1, 0);
        else {
            return this;
        }
    }


    removeLetter(limiteRecul) {
        const motActuel = this.tabMots[this.currentWordIndex];

        if (motActuel.tape.length > 0) {
            const nouveauxMots = [...this.tabMots];
            const lettresActuel = [...motActuel.lettres];

            const targetIndex = this.currentLetterIndex - 1;

            if (targetIndex >= motActuel.attendu.length) {
                lettresActuel.pop();
            }
            else {
                lettresActuel[targetIndex] = {
                ...lettresActuel[targetIndex],
                charTape: "",
                charEtat: "PENDING"
                };
            }

            nouveauxMots[this.currentWordIndex] = {
                ...motActuel,
                tape: motActuel.tape.slice(0, -1),
                lettres: lettresActuel
            };

            return new Engine(nouveauxMots, this.currentWordIndex, targetIndex);
        }

        if (this.currentWordIndex > 0 && this.currentWordIndex - 1 >= limiteRecul) {  
            const motPrecedent = this.tabMots[this.currentWordIndex - 1];
            if (motPrecedent.tape !== motPrecedent.attendu) {
                return new Engine(this.tabMots, this.currentWordIndex - 1, motPrecedent.tape.length);
            }
        }

        return this; 
    }




    calculEtat(key) {
        const motActuel = this.tabMots[this.currentWordIndex];

        if (this.isWordComplete) {
            return "EXTRA";
        }
        if (key === motActuel.attendu[this.currentLetterIndex]) {
            return "CORRECT";
        }
        return "INCORRECT";
    }


    get isWordComplete() {
        return this.currentLetterIndex >= this.tabMots[this.currentWordIndex].attendu.length;
    }
}

