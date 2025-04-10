// /**
//  * Point culture (en Français car je suis un peu obligé): 
//  * Dans ce genre de jeu, un mot equivaut a 5 caractères, y compris les espaces. 
//  * La precision, c'est le pourcentage de caractères tapées correctement sur toutes les caractères tapées.
//  * 
//  * Sur ce... Amusez-vous bien ! 
//  */
// let startTime = null, previousEndTime = null;
// let currentWordIndex = 0;
// const wordsToType = [];

// const modeSelect = document.getElementById("level");
// const wordDisplay = document.getElementById("word-display");
// const inputField = document.getElementById("input-field");
// const results = document.getElementById("results");

// const words = {
//     easy: ["apple", "banana", "grape", "orange", "cherry"],
//     medium: ["keyboard", "monitor", "printer", "charger", "battery"],
//     hard: ["synchronize", "complicated", "development", "extravagant", "misconception"]
// };

// // Generate a random word from the selected mode
// const getRandomWord = (mode) => {
//     const wordList = words[mode];
//     return wordList[Math.floor(Math.random() * wordList.length)];
// };

// // Initialize the typing test
// const startTest = (wordCount = 50) => {
//     wordsToType.length = 0; // Clear previous words
//     wordDisplay.innerHTML = ""; // Clear display
//     currentWordIndex = 0;
//     startTime = null;
//     previousEndTime = null;

//     for (let i = 0; i < wordCount; i++) {
//         wordsToType.push(getRandomWord(modeSelect.value));
//     }

//     wordsToType.forEach((word, index) => {
//         const span = document.createElement("span");
//         span.textContent = word + " ";
//         if (index === 0) span.style.color = "red"; // Highlight first word
//         wordDisplay.appendChild(span);
//     });

//     inputField.value = "";
//     results.textContent = "";
// };

// // Start the timer when user begins typing
// const startTimer = () => {
//     if (!startTime) startTime = Date.now();
// };

// // Calculate and return WPM & accuracy
// const getCurrentStats = () => {
//     const elapsedTime = (Date.now() - previousEndTime) / 1000; // Seconds
//     const wpm = (wordsToType[currentWordIndex].length / 5) / (elapsedTime / 60); // 5 chars = 1 word
//     const accuracy = (wordsToType[currentWordIndex].length / inputField.value.length) * 100;

//     return { wpm: wpm.toFixed(2), accuracy: accuracy.toFixed(2) };
// };

// // Move to the next word and update stats only on spacebar press
// const updateWord = (event) => {
//     if (event.key === " ") { // Check if spacebar is pressed
//         if (inputField.value.trim() === wordsToType[currentWordIndex]) {
//             if (!previousEndTime) previousEndTime = startTime;

//             const { wpm, accuracy } = getCurrentStats();
//             results.textContent = `WPM: ${wpm}, Accuracy: ${accuracy}%`;

//             currentWordIndex++;
//             previousEndTime = Date.now();
//             highlightNextWord();

//             inputField.value = ""; // Clear input field after space
//             event.preventDefault(); // Prevent adding extra spaces
//         }
//     }
// };

// // Highlight the current word in red
// const highlightNextWord = () => {
//     const wordElements = wordDisplay.children;

//     if (currentWordIndex < wordElements.length) {
//         if (currentWordIndex > 0) {
//             wordElements[currentWordIndex - 1].style.color = "black";
//         }
//         wordElements[currentWordIndex].style.color = "red";
//     }
// };

// // Event listeners
// // Attach `updateWord` to `keydown` instead of `input`
// inputField.addEventListener("keydown", (event) => {
//     startTimer();
//     updateWord(event);
// });
// modeSelect.addEventListener("change", () => startTest());

// // Start the test
// startTest();

// -------------------------------------------------------------------


// theme checker.
const theme = {
    isLicorice: false,
    isLinen: false,
    isOcean: false,
    isCrayola: false,
    isHoneyDew: false,
    isGunmetal: false,
    isSunglow: false,
    isDukeBlue: false,
    isRaisinBlack: false,
    isMint: true,
    isFawn: false,
    isLavender: false,
}


$(document).ready(() => {
    //Document Selector
    const modeSettingsButton = $(".navbar__item-mode");
    const appearanceSettingsButton = $(".navbar__item-appearance");
    const modeSettings = $(".mode");
    const appearanceSettings = $(".appearance");
    const licorice = $(".theme__option-licorice");
    const linen = $(".theme__option-linen");
    const ocean = $(".theme__option-ocean");
    const crayola = $(".theme__option-crayola");
    const honeydew = $(".theme__option-honeydew");
    const gunmetal = $(".theme__option-gunmetal");
    const sunglow = $(".theme__option-sunglow");
    const dukeBlue = $(".theme__option-duke-blue");
    const raisinBlack= $(".theme__option-raisin-black");
    const mint = $(".theme__option-mint");
    const fawn = $(".theme__option-fawn");
    const lavender = $(".theme__option-lavender");
    
    // Open / Close settings. ( Jquery )


    // Open settings 


    // Close settings
    $(".settings__quit").click(() => {
        $(".settings").hide(300);
    })

    // Browse between settings page:

    // Go to the mode settings.
    $(".navbar__item-mode").click(() => {
        modeSettingsButton.addClass("navbar__item-selected");
        appearanceSettingsButton.removeClass("navbar__item-selected");
        appearanceSettings.hide(500);
        modeSettings.show(500);
    })

    // Go to the appearance settings.
    $(".navbar__item-appearance").click(() => {
        appearanceSettingsButton.addClass("navbar__item-selected");
        modeSettingsButton.removeClass("navbar__item-selected");
        modeSettings.hide(500);
        appearanceSettings.show(500);
    })

    // Change the theme.
    licorice.click(() => {
        theme.isLicorice = true;
        document.documentElement.style.setProperty('--primary-color', '#211103');
        document.documentElement.style.setProperty('--secondary-color', '#3d1308');
        document.documentElement.style.setProperty('--tertiary-color', '#7b0d1e');
    })
    linen.click(() => {
        theme.isLinen = true;
        document.documentElement.style.setProperty('--primary-color', '#f5e9e2');
        document.documentElement.style.setProperty('--secondary-color', '#e3b5a4');
        document.documentElement.style.setProperty('--tertiary-color', '#773344');
        document.documentElement.style.setProperty('--text-color', 'white');
    })
    ocean.click(() => {
        theme.isOcean = true;
        document.documentElement.style.setProperty('--primary-color', '#75dddd');
        document.documentElement.style.setProperty('--secondary-color', '#508991');
        document.documentElement.style.setProperty('--tertiary-color', '#172a3a');
    })
    crayola.click(() => {
        theme.isCrayola = true;
        document.documentElement.style.setProperty('--primary-color', '#9f8082');
        document.documentElement.style.setProperty('--secondary-color', '#c76d7e');
        document.documentElement.style.setProperty('--tertiary-color', '#e85d75');
    })
    honeydew.click(() => {
        theme.isHoneyDew = true;
        document.documentElement.style.setProperty('--primary-color', '#e2fcef');
        document.documentElement.style.setProperty('--secondary-color', '#9b287b');
        document.documentElement.style.setProperty('--tertiary-color', '#5c164e');
    })
    gunmetal.click(() => {
        theme.isGunmetal = true;
        document.documentElement.style.setProperty('--primary-color', '#f7fff7');
        document.documentElement.style.setProperty('--secondary-color', '#4ecdc4');
        document.documentElement.style.setProperty('--tertiary-color', '#292f36');
    })
    sunglow.click(() => {
        theme.isSunglow = true;
        document.documentElement.style.setProperty('--primary-color', '#fff05a');
        document.documentElement.style.setProperty('--secondary-color', '#ffd25a');
        document.documentElement.style.setProperty('--tertiary-color', '#ffaa5a');
    })
    dukeBlue.click(() => {
        theme.isDukeBlue = true;
        document.documentElement.style.setProperty('--primary-color', '#ff0054');
        document.documentElement.style.setProperty('--secondary-color', '#9e0059');
        document.documentElement.style.setProperty('--tertiary-color', '#390099');
    })
    raisinBlack.click(() => {
        theme.isRaisinBlack = true;
        document.documentElement.style.setProperty('--primary-color', '#f4d8cd');
        document.documentElement.style.setProperty('--secondary-color', '#1e555c');
        document.documentElement.style.setProperty('--tertiary-color', '#3a2e39');
    })
    lavender.click(() => {
        theme.isLavender = true;
        document.documentElement.style.setProperty('--primary-color', '#eeeeff');
        document.documentElement.style.setProperty('--secondary-color', '#a24936');
        document.documentElement.style.setProperty('--tertiary-color', '#000000');
    })
    mint.click(() => {
        document.documentElement.style.setProperty('--primary-color', '#6da796');
        document.documentElement.style.setProperty('--secondary-color', '#5c985d');
        document.documentElement.style.setProperty('--tertiary-color', '#001d28');
    })
})