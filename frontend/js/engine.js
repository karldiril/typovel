export class Engine {
    constructor(tabMots) {
        this.tabMots = tabMots;
        this.currentWordIndex = 0;
        this.currentLetterIndex = 0;
    }

    get longueurMotActuel() {
        return this.tabMots[this.currentWordIndex].length;
    }

    
    get lettreAttendue() {
        return this.tabMots[this.currentWordIndex][this.currentLetterIndex];
    }


    estValideLettre(lettreUtilisateur) {
        return lettreUtilisateur === this.lettreAttendue;
    }


    avancerLettre() {
        this.currentLetterIndex++;
    }


    reculer() {
        if (this.currentLetterIndex > 0 && this.currentLetterIndex <= this.longueurMotActuel) {
            this.currentLetterIndex--;
            return {action: "RECULER_LETTRE"}
        }
        else if (this.currentLetterIndex > 0 && this.currentLetterIndex > this.longueurMotActuel) {
            this.currentLetterIndex--;
            return {action: "SUPPRIMER_LETTRE"}
        }
        else if (this.currentLetterIndex == 0 && this.currentWordIndex > 0) {
            return {action: "RECULER_MOT"}
        }
        return;
    }


    validerReculerMot(longueurMotReelle) {
        if (this.currentWordIndex > 0) {
            this.currentWordIndex--;
            this.currentLetterIndex = longueurMotReelle;
        }
    }


    passerMotSuivant() {
        this.currentLetterIndex = 0;
        this.currentWordIndex++;
    }
}