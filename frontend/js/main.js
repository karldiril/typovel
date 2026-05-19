let jeu = document.querySelector(".jeu");
let mots = ["bonjour", "éteins", "voiture", "interroger", "manger", "pendant", "maison", "que", "je", "train", "voiture", "personne", "puis", "étudier"]


initGame(mots);


let mot = document.getElementsByClassName('word');

let i = 0;
let j = 0;
document.addEventListener('keydown', function(event){
    let longueurMot = mot[i].children.length;
    let lettre = mot[i].children[j];


    // console.log("key: " +  event.key);
    // console.log("numéro mot: " + i);
    // console.log("numéro lettre: " + j);

    // retirer une lettre
    if (event.key === "Backspace") {
        // console.log(i);
        retirerLettre();
        lettre = mot[i].children[j];
        resetLettre(lettre);
        return;
    }

    if (j >= longueurMot){
        if (event.key == " "){
            if (erreurDansMot(mot[i])) {
                mot[i].classList.add('wrong');
            }
            j = 0;
            i += 1
            return;
        }
        else {
            let letter = document.createElement('span');
            letter.textContent = event.key;
            letter.classList.add('incorrect');
            mot.append(letter);
            
        }
    }


    // if key isnt a char

    if (event.key.length !== 1 && event.key !== " ")
        return;


    // If user key is the same

    if (estValide(event.key, lettre.textContent)) {
        validerLettre(lettre);
    }
    else {
        refuserLettre(lettre);
    }


    // console.log(longueurMot);
    // console.log(j);

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

    // Si on est au début du mot et le mot d'avant a une erreur
    else if (j == 0 && mot[i - 1].classList.contains('wrong')) {
        j = mot[i - 1].textContent.length - 1;
        i -= 1;
    }
}


function passerMot() {
    i += 1;
    j = 0;
}


function erreurDansMot(mot) {
    for (const lettre of mot.children) {
        if (lettre.classList.contains('incorrect')) {
            return true;
        }
    }
    return false;
}