export class Engine {
    constructor(tabMot, currentWordIndex = 0, currentLetterIndex = 0, state = "INIT") {
        this.tabMot = tabMot;
        this.currentWordIndex = Math.max(0, currentWordIndex);
        this.currentLetterIndex = Math.max(0, currentLetterIndex);
        this.state = state;
    }
    
    get longueurMotActuel() {
        return this.tabMot[this.currentWordIndex].length;
    }


    verifyLetter(newLetter) {
        const expectedLetter = this.tabMot[this.currentWordIndex][this.currentLetterIndex];
        const wordSize = this.longueurMotActuel;
        if (expectedLetter === newLetter)
            return new Engine(this.tabMot, this.currentWordIndex, this.letterIndex + 1, "SUCCESS")
        else {
            if (this.currentLetterIndex >= wordSize)
                return new Engine(this.tabMot, this.currentWordIndex, this.letterIndex + 1, "BONUS");
            else
                return new Engine(this.tabMot, this.currentWordIndex, this.letterIndex + 1, "ERROR");
        }
    }
}

