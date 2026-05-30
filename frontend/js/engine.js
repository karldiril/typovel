export class Engine {
    constructor(tabMotsObjets, currentWordIndex = 0, currentLetterIndex = 0) {
        this.tabMots = tabMotsObjets;
        this.currentWordIndex = Math.max(0, currentWordIndex);
        this.currentLetterIndex = Math.max(0, currentLetterIndex);
    }
    
    get longueurMotActuel() {
        return this.tabMots[this.currentWordIndex].attendu.length;
    }


    static init(tabMots) {
        const tabMotsObjets = tabMots.map(mot => ({
            attendu: mot,
            tape: "",
        }));
        return new Engine(tabMotsObjets);
    }


    verifyLetter(newLetter) {
        const nouveauxMots = [...this.tabMots];
        const motActuel = nouveauxMots[this.currentWordIndex];

        nouveauxMots[this.currentWordIndex] = {
            ...motActuel,
            tape: motActuel.tape + newLetter
        };

        return new Engine(nouveauxMots, this.currentWordIndex, this.currentLetterIndex + 1);
    }


    nextWord() {
        return new Engine(this.tabMots, this.currentWordIndex + 1, 0);
    }


}

