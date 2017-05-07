export const playAudio = function(fileName) {
    const fullPath = `./sound/${fileName}.m4a`;
    const audio = new Audio(fullPath);

    audio.play();
};

export const playRandom = function(letters) {
    const letterCount = letters.length;

    const selectedLetter = letters[Math.floor(Math.random() * letterCount) + 1];
    playAudio(selectedLetter);

    return selectedLetter;
};
