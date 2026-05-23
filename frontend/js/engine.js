class Engine {
    constructor(mots) {
        this.mots = mots;
        this.currentWord = 0;
        this.currentLetter = 0;
    }

    get longueurMotActuel() {
        return this.mots[this.currentWord].length;
    }

    
    get lettreAttendue() {
        return this.mots[this.currentWord][this.currentLetter];
    }


    comparerLettre(lettreUtilisateur) {
        return lettreUtilisateur === this.lettreAttendue;
    }


    avancerLettre() {
        this.currentLetter++;
    }


    reculer() {
        if (this.currentLetter > 0) {
            this.currentLetter--;
            return {action: "effacer_couleur_lettre"}
        }
        else if (this.currentLetter == 0 && this.currentWord > 0) {
            return {action: "demander_retour_mot_precedent"}
        }
        return;
    }

    validerReculerMot(longueurMotPrecedent) {
        if (this.currentWord > 0) {
            this.currentWord--;
            this.currentLetter = longueurMotPrecedent;
        }
    }


    passerMotSuivant() {
        this.currentLetter = 0;
        this.currentWord++;
    }
}