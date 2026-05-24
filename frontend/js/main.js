import Engine from './engine.js';
import * as gameUI from './gameUI.js';


let jeu = document.querySelector(".jeu");
let mots = ["bonjour", "éteins", "voiture", "interroger", "manger", "pendant", "maison", "que", "je", "train", "voiture", "personne", "puis", "étudier"]


Engine mots = new Engine(mots);

initGame(mots);



let i = 0;
let j = 0;
document.addEventListener('keydown', function(event){
    let mot = document.getElementsByClassName('word');
    let longueurMot = mot[i].children.length;
    let lettre = mot[i].children[j];


    // if the input is backspace (delete key) delete the letter
    if (event.key === "Backspace") {
        if (j > mots[i].length) {
            let mot = document.getElementsByClassName('word');
            mot[i].children[j - 1].remove();
        }
        retirerLettre();
        lettre = mot[i].children[j];
        resetLettre(lettre);
        return;
    }

    if (j >= longueurMot){
        if (event.key == " "){
            // Si il y a une erreur dans le mot, on le marque faux
            if (erreurDansMot(mot[i])) {
                mot[i].classList.add('wrong');
            }
            // Ensuite on continue simplement en sautant le mot en cours
            j = 0;
            i += 1
            return;
        }
        // else if input isnt space, we add the letter typed
        else {
            let letter = document.createElement('span');
            letter.textContent = event.key;
            letter.classList.add('incorrect');
            mot[i].append(letter);
            j += 1;
            return;
            
        }
    }


    // if key isnt a char or a space

    if (event.key.length !== 1 && event.key !== " ")
        return;


    // If user key is the same

    if (estValide(event.key, lettre.textContent)) {
        validerLettre(lettre);
    }
    else {
        refuserLettre(lettre);
    }


    j += 1;
});


// Init the game with tab word

function initGame(tab) {
    for (const el of tab) {
        let word = document.createElement('div');
        word.classList.add('word');

        for (const lettre of el) {
            let letter = document.createElement('span');
            letter.classList.add('letter');
            letter.textContent = lettre;
            word.append(letter);
        }
        jeu.append(word);
    }   
}


// verify is the letter is valide

function estValide(choix, lettre) {
    return choix === lettre;
}


// validate the letter

function validerLettre(lettre) {
    lettre.classList.add('correct');
}


// refuse the letter

function refuserLettre(lettre) {
    lettre.classList.add('incorrect');
}


// remove all color on the letter

function resetLettre(lettre) {
    lettre.classList.remove('incorrect');
    lettre.classList.remove('correct');
}


// remove the letter

function retirerLettre() {
    let mot = document.getElementsByClassName('word');
    if (j > 0)
        j -= 1;

    // Si on est au début du mot et le mot d'avant a une erreur
    else if (j == 0 && mot[i - 1].classList.contains('wrong')) {
        j = mot[i - 1].textContent.length;
        i -= 1;
    }
}


// to skip the word

function passerMot() {
    i += 1;
    j = 0;
}


// function to verify if there is a mistake in the word 

function erreurDansMot(mot) {
    for (const lettre of mot.children) {
        if (lettre.classList.contains('incorrect')) {
            return true;
        }
    }
    return false;
}