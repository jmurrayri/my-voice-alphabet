export const playAudio = function(fileName) {
    return new Promise((resolve) => {
        const fullPath = `./sound/${fileName}.m4a`;
        const audio = new Audio(fullPath);
        audio.play();

        // Must pause until the audio has finished playing.
        (function waitUntilEnded() {
            setTimeout(()=> {
                if (audio.ended) {
                    resolve();
                }
                else {
                    waitUntilEnded();
                }
            }, 500);
        }());
    });
};

export const playRandom = function(letters) {
    const letterCount = letters.length;

    const selectedLetter = letters[Math.floor(Math.random() * letterCount) + 1];
    playAudio(selectedLetter);

    return selectedLetter;
};
