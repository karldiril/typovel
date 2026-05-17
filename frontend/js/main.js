let jeu = document.querySelector(".jeu");
let mots = ["bonjour", "éteins", "voiture", "interroger", "manger", "pendant", "maison", "que", "je", "train", "voiture", "personne", "puis", "étudier"]


initGame(mots);


let mot = document.getElementsByClassName('word');

let i = 0;
let j = 0;
document.addEventListener('keydown', function(event){
    let longueurMot = mot[i].children.length;
    let lettre = mot[i].children[j];

    console.log("key: " +  event.key);
    console.log("numéro mot: " + i);
    console.log("numéro lettre: " + j);

    // retirer une lettre
    if (event.key === "Backspace") {
        if (j > 0)
            j -= 1;
        lettre = mot[i].children[j];
        resetLettre(lettre);
        return;
    }


    if (event.key.length !== 1)
        return;


    console.log(event.key);
    if (estValide(event.key, lettre.textContent)) {
        validerLettre(lettre);
    }
    else {
        refuserLettre(lettre);
    }

    if (j >= longueurMot - 1){
        if (event.key == " "){
            j = 0;
            i += 1
        }
            
    }
    else
        j += 1;
});



function initGame(tab) {
    for (const mot of tab) {
        let word = document.createElement('div');
        word.classList.add('word');
        for (const lettre of mot) {
            let letter = document.createElement('span');
            letter.classList.add('letter');
            letter.textContent = lettre;
            word.append(letter);
        }
        jeu.append(word);
    }   
}



function estValide(choix, lettre) {
    return choix === lettre;
}


function validerLettre(lettre) {
    lettre.classList.add('correct');
}


function refuserLettre(lettre) {
    lettre.classList.add('incorrect');
}

function resetLettre(lettre) {
    lettre.classList.remove('incorrect');
    lettre.classList.remove('correct');
}


function retirerLettre() {
    if (j > 0)
        j -= 1;
    lettre = mot[i].children[j];
}


function passerMot() {
    i += 1;
    j = 0;
}