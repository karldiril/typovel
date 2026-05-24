export function creerLettre(content) {
    let letter = document.createElement('span');
    letter.classList.add('letter');
    letter.textContent = content;
    return letter;
}


const jeu = document.querySelector('.jeu');

export function initGame(tabMot) {
    for (const el of tabMot) {
        let word = document.createElement('div');
        word.classList.add('word');
        for (const char of el) {
            let letter = creerLettre(char) 
            ajouterLettre(letter, word);
        }
        jeu.append(word);
    }   
}


export function getDOMWord(currentWordIndex) {
    return document.getElementsByClassName("word")[currentWordIndex];
}


export function getDOMLetter(currentWordIndex, currentLetterIndex) {
    return getDOMWord(currentWordIndex).children[currentLetterIndex];
}


export function marquerLettreIncorrect(letter) {
    letter.classList.add('incorrect');
}

function marquerLettreCorrect(letter) {
    letter.classList.add('correct');
}

export function changerCouleurLettre(currentLetter, estValide) {
    if (estValide)
        marquerLettreCorrect(currentLetter);
    else
        marquerLettreIncorrect(currentLetter);
}


export function changerEtatMot(currentWord, estValide) {
    if (!estValide) {
        currentWord.classList.add('wrong');
    }
}


export function supprimerCouleurLettre(letter) {
    letter.classList.remove("correct", "incorrect");
}


export function supprimerLettre(currentLetter) {
    currentLetter.remove();
}


export function ajouterLettre(letter, currentWord) {
    currentWord.append(letter);
}


export function erreurDansMot(motDOM) {
    for (const lettre of motDOM.children) {
        if (lettre.classList.contains('incorrect')) {
            return true;
        }
    }
    return false;
}