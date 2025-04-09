/**
 * Point culture (en Français car je suis un peu obligé): 
 * Dans ce genre de jeu, un mot equivaut a 5 caractères, y compris les espaces. 
 * La precision, c'est le pourcentage de caractères tapées correctement sur toutes les caractères tapées.
 * 
 * Sur ce... Amusez-vous bien ! 
 */

let startTime = null, previousEndTime = null;
let currentWordIndex = 0;
const wordsToType = [];
const modeSelect = document.getElementById("mode");
const wordDisplay = document.getElementById("word-display");
const input = document.getElementById("input-field")

const wordPerMinutes = document.getElementById("wpm");
const acc = document.getElementById("accuracy");
const wordCount = 50;


let timer;
let charIndex = 0;
let isTyping = false;
let mistakesCount = 0;
let keydownCount = 0;

// Change later
const words = {
    'easy': ["apple", "banana", "grape", "orange", "cherry"],
    'medium': ["keyboard", "monitor", "printer", "charger", "battery"],
    'hard': ["synchronize", "complicated", "development", "extravagant", "misconception"]
};


// Generate a random word from the selected mode
const getRandomWord = (mode) => {
    const wordList = words[mode];
    return wordList[Math.floor(Math.random() * wordList.length)];
};


for (let i = 0; i < wordCount; i++) {
    wordsToType.push(getRandomWord(modeSelect.value));
}

// Display text on the screen.
for (const char in wordsToType.join(" ")) {
    const joinedWord = wordsToType.join(" ");
    wordDisplay.innerHTML += `<span>${joinedWord[char]}</span>`
}

wordDisplay.querySelectorAll('span')[0].classList.add('active');
document.addEventListener('keydown', () => input.focus());
wordDisplay.addEventListener('click', () => input.focus());


startTime = Date.now();

const char = wordDisplay.querySelectorAll('span');
if (charIndex < char.length) {
    document.addEventListener('keydown', (event) => {

        // Delete on backspace
        if (event.key === 'Backspace' && charIndex > 0) {
            char[charIndex].classList.remove('active', 'correct', 'incorrect')
            charIndex--;
            char[charIndex].classList.remove('correct', 'incorrect');
            char[charIndex].classList.add('active');
        } else {

            // Inona no ilana an'ity...? 
            if (!isTyping) {
                isTyping = true;
            }

            if (char[charIndex].innerText === event.key) {
                char[charIndex].classList.add('correct');
                charIndex++;
            } else {
                char[charIndex].classList.add('incorrect');
                mistakesCount++;
                charIndex++;
            }

            // Move to the next character
            if (charIndex < char.length) {
                char[charIndex].classList.add('active');
            }

            // // Calculate and return WPM & accuracy
            // const getCurrentStats = () => {
            //     const elapsedTime = ((Date.now() - startTime)) / 1000; // Seconds
            //     const wordsTyped = (charIndex - mistakesCount) / 5; // 5 chars = 1 word
            //     const wpmValue = (wordsTyped / (elapsedTime / 60)).toFixed(2); // WPM
            //     const accuracy = ((charIndex - mistakesCount) / charIndex) * 100 || 0; // Accuracy
            //     return { wpmValue, accuracy: accuracy.toFixed(2) };
            // };
            // // Calculate and update WPM & accuracy
            // const { wpmValue, accuracy } = getCurrentStats();
            // wordPerMinutes.textContent = `${wpmValue} WPM`;
            // acc.textContent = `${accuracy}% Accuracy`;
        }
    })
} else { // test ended, should display the score modals, modalsIsShown should be set to true.
    clearInterval(timer);
    input.value = '';
}