export function creerLettre(content) {
    let letter = document.createElement('span');
    letter.classList.append('letter');
    letter.textContent = content;
    return letter;
}


const jeu = document.getElementById('jeu');

export function initGame(tabMot) {
    for (const el of tab) {
        let word = document.createElement('div');
        word.classList.add('word');

        for (const char of el) {
            letter = creerLettre(char) 
            ajouterLettre(letter, word);
        }
        jeu.append(word);
    }   
}


export function getDOMWord(currentWordIndex) {
    return document.getElementsByClassName("word")[wordIndex];
}


export function getDOMLetter(currentWordIndex, currentLetterIndex) {
    return getDOMWord(currentWordIndex).children[currentLetterIndex];
}


export function changerCouleurLettre(currentLetter, estValide) {
    if (estValide)
        currentLetter.classList.add("correct");
    else
        currentLetter.classList.add("incorrect");
}


export function supprimerCouleurLettre(currentLetter) {
    currentLetter.classList.remove("correct", "incorrect");
}


export function supprimerLettre(currentLetter, currentWord) {
    currentWord.remove(currentLetter);
}


export function ajouterLettre(letter, currentWord) {
    currentWord.append(letter);
}


function erreurDansMot(motDOM) {
    for (const lettre of motDOM.children) {
        if (lettre.classList.contains('incorrect')) {
            return true;
        }
    }
    return false;
}