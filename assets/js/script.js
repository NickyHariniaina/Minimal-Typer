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
//const inputField = document.getElementById("input-field");
const wordPerMinutes = document.getElementById("wpm");
const acc = document.getElementById("acc");
const wordCount = 50;


let timer;
let charIndex = 0;
let isTyping = false;
let mistakesCount = 0;


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


for(const char in wordsToType.join(" ")) {
    const joinedWord = wordsToType.join(" ");
    wordDisplay.innerHTML += `<span>${joinedWord[char]}</span>`
}



wordDisplay.querySelectorAll('span')[0].classList.add('active');
document.addEventListener('keydown',()=>input.focus());
wordDisplay.addEventListener('click',()=>input.focus());


function initTyping(){
    const char = wordDisplay.querySelectorAll('span');
    const typedChar = input.value.charAt(charIndex);
    console.log(typedChar);
    
    if(charIndex < char.length) {
        if(!isTyping) {
            isTyping = true;
        }
    
        if(char[charIndex].innerText === typedChar) {
                char[charIndex].classList.add('correct');
                console.log('correct');
            }else{
                char[charIndex].classList.add('incorrect');
                mistakesCount++;
                console.log('Incorrect');
            }
            charIndex++;
            char[charIndex].classList.add('active');
           /* mistakes.innerText = mistakesCount;
           cpm.innerText = charIndex-mistakesCount;*/
        }else{
            clearInterval(timer);
            input.value = '';
        }
        console.log(charIndex);
    }
    

    // Calculate and return WPM & accuracy
    const getCurrentStats = () => {
        const elapsedTime = (Date.now() - previousEndTime) / 1000; // Seconds
        wpmValue = ((charIndex - mistakesCount / 5) / (elapsedTime / 60)).toFixed(2); // 5 chars = 1 word
        accuracy = (wordsToType[charIndex].length / input.value.length) * 100;
        //{ wpm: wpm.toFixed(2), accuracy: accuracy.toFixed(2) };
    };
    
    // Move to the next word and update stats only on spacebar press
    const updateWord = (event) => {
        if (event.key === " ") { // Check if spacebar is pressed
            if (inputField.value.trim() === wordsToType[currentWordIndex]) {
                if (!previousEndTime) previousEndTime = startTime;
                
                const {wpmValue, accuracy} = getCurrentStats();
                wordPerMinutes.textContent = wpmValue;
                acc.textContent = ` ${accuracy}% Accuracy`;
                
                currentWordIndex++;
                previousEndTime = Date.now();
                
                inputField.value = ""; // Clear input field after space
                event.preventDefault(); // Prevent adding extra spaces
            }
        }
    };

    input.addEventListener("input", initTyping);



// Initialize the typing test
/*const startTest = (wordCount = 50) => {
    wordsToType.length = 0; // Clear previous words
    wordDisplay.innerHTML = ""; // Clear display
    currentWordIndex = 0;
    startTime = null;
    previousEndTime = null;
    
    for (let i = 0; i < wordCount; i++) {
        wordsToType.push(getRandomWord(modeSelect.value));
    }

    wordsToType.forEach((word, index) => {
        const span = document.createElement("span");
        span.textContent = word + " ";
        if (index === 0) span.style.color = "red"; // Highlight first word
        wordDisplay.appendChild(span);
    });

    inputField.value = "";
    results.textContent = "";
};

// Start the timer when user begins typing
const startTimer = () => {
    if (!startTime) startTime = Date.now();
};



// Highlight the current word in red
const highlightNextWord = () => {
    const wordElements = wordDisplay.children;

    if (currentWordIndex < wordElements.length) {
        if (currentWordIndex > 0) {
            wordElements[currentWordIndex - 1].style.color = "black";
        }
        wordElements[currentWordIndex].style.color = "red";
    }
};

// Event listeners
// Attach `updateWord` to `keydown` instead of `input`
inputField.addEventListener("keydown", (event) => {
    startTimer();
    updateWord(event);
});
modeSelect.addEventListener("change", () => startTest());

// Start the test
startTest();
*/