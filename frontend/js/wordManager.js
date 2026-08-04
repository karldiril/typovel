async function recupererMots() {
    const mots = await fetch("static/languages/french.json");
    const donnees = await mots.json();

    return donnees.words;
}

const mots = await recupererMots();

function getRandomWord(mots) {
    const indexAleatoire = Math.floor(Math.random() * mots.length);
    const mot = mots[indexAleatoire];
    return mot;
}


export function getRandomWordTab(size) {
    let randomWordTab = [];
    for (let i = 0; i < size; i++) {
        randomWordTab.push(getRandomWord(mots));
    }

    return randomWordTab;
}