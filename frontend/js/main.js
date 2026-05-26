import { Engine } from './engine.js';
import * as gameUI from './gameUI.js';


let jeu = document.querySelector(".jeu");
let mots = ["bonjour", "éteins", "voiture", "interroger", "manger", "pendant", "maison", "que", "je", "train", "voiture", "personne", "puis", "étudier"]


const game = new Engine(mots);
gameUI.initGame(mots)


document.addEventListener('keydown', function(event){
    let currentWord = gameUI.getDOMWord(game.currentWordIndex);
    let longueurMot = game.longueurMotActuel;
    let currentLetter = gameUI.getDOMLetter(game.currentWordIndex, game.currentLetterIndex);


    if (event.key === "Backspace") {
        let etat = game.reculer();

        if (etat.action === "RECULER_LETTRE") {
            gameUI.supprimerCouleurLettre(gameUI.getDOMLetter(game.currentWordIndex, game.currentLetterIndex));
        }

        else if (etat.action === "RECULER_MOT" && gameUI.erreurDansMot(gameUI.getDOMWord(game.currentWordIndex - 1))) {
            let motPrecedent = gameUI.getDOMWord(game.currentWordIndex - 1);
            game.validerReculerMot(motPrecedent.children.length);
        }

        else if (etat.action === "SUPPRIMER_LETTRE") {
            gameUI.supprimerLettre(gameUI.getDOMLetter(game.currentWordIndex, game.currentLetterIndex), currentWord);
        }

        return;
    }


    if (event.key.length !== 1 && event.key !== " ")
        return;

    if (game.currentLetterIndex >= longueurMot){
        if (event.key == " "){
            gameUI.changerEtatMot(currentWord, gameUI.erreurDansMot(currentWord))
            game.passerMotSuivant();
        }


        else {
            let letter = gameUI.creerLettre(event.key);
            gameUI.marquerLettreIncorrect(letter);
            gameUI.ajouterLettre(letter, currentWord);
            game.avancerLettre();
        }

        return;
    }


    gameUI.changerCouleurLettre(currentLetter, game.estValideLettre(event.key));


    game.avancerLettre();
});