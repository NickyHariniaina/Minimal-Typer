// Document Selector
const status = document.querySelector("#status");
const wordPerMinutes = document.getElementById("wpm");
const acc = document.getElementById("accuracy");
const wordDisplay = document.getElementById("word-display");

// Variables
let startTime = null, previousEndTime = null;
let currentWordIndex = 0;
let wordsToType = [];
let wordCount = 10;
let mode = "easy";
let currentWord = 0;
let timer;
let charIndex = 0;
let isTyping = false;
let mistakesCount = 0;
let elapsedTime = ((Date.now() - startTime)) / 1000; // Seconds
let wordsTyped = (charIndex - mistakesCount) / 5; // 5 chars = 1 word
let wpmValue = (wordsTyped / (elapsedTime / 60)).toFixed(2); // WPM
let accuracy = ((charIndex - mistakesCount) / charIndex) * 100 || 0; // Accuracy
let time = 15;
let gameMode = "timer";

// DS.
const words = {
    'easy': ["apple", "banana", "grape", "orange", "cherry"],
    'medium': ["keyboard", "monitor", "printer", "charger", "battery"],
    'hard': ["synchronize", "complicated", "development", "extravagant", "misconception"]
};
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
const wpmDS = [];
// Function.

const getCurrentStats = () => {
    elapsedTime = ((Date.now() - startTime)) / 1000; // Seconds
    wordsTyped = (charIndex - mistakesCount) / 5; // 5 chars = 1 word
    wpmValue = (wordsTyped / (elapsedTime / 60)).toFixed(0); // WPM
    accuracy = ((charIndex - mistakesCount) / charIndex) * 100 || 0; // Accuracy
    return { wpmValue, accuracy: accuracy.toFixed(2) };
};
const handleKeyDown = (event) => {
    const char = wordDisplay.querySelectorAll('span'); // Get all characters

    // Delete on backspace
    if (event.key === 'Backspace' && charIndex > 0) {
        char[charIndex].classList.remove('active', 'correct', 'incorrect', 'cursor');
        charIndex--;
        char[charIndex].classList.remove('correct', 'incorrect');
        char[charIndex].classList.add('active', 'cursor');
    } else if ((/[a-zA-Z]/.test(event.key) || event.key === " ") && event.key !== "Escape") {
        if (char[charIndex].innerText === event.key) {
            char[charIndex].classList.add('correct', 'cursor');
            charIndex++;
        } else {
            char[charIndex].classList.add('incorrect');
            mistakesCount++;
            charIndex++;
        }
        // Move to the next character
        if (charIndex < char.length) {
            char[charIndex].classList.add('active', 'cursor');
        }

        // Delete previous cursor
        for (let i = 0; i < charIndex; i++) {
            char[i].classList.remove('cursor');
        }
    }

    // Check if the test has ended
    if (charIndex === char.length) {
        document.querySelector(".wpm p").innerText = wpmValue;
        document.querySelector(".accuracy p").innerText = accuracy.toFixed(0) + " %";
        document.querySelector(".mistake p").innerText = mistakesCount;
        document.querySelector(".typed-word p").innerText = wordCount;
        clearInterval(timer);
        $(".score").show("fast");
    }
};
const restore = () => {
    wordDisplay.innerText = "";
    charIndex = 0;
    wordPerMinutes.innerText = "...";
    acc.innerText = "...";
    wordsToType = [];
    mistakesCount = 0;
}
const launch = () => {

    // Generate random words for the selected mode
    const getRandomWord = (mode) => {
        const wordList = words[mode];
        return wordList[Math.floor(Math.random() * wordList.length)];
    };

    for (let i = 0; i < wordCount; i++) {
        wordsToType.push(getRandomWord(mode));
    }

    // Display text on the screen
    const joinedWord = wordsToType.join(" ");
    for (const char of joinedWord) {
        wordDisplay.innerHTML += `<span>${char}</span>`;
    }

    startTime = Date.now(); // Initialize start time

    // Remove any existing keydown event listener
    document.removeEventListener('keydown', handleKeyDown);

    // Add the keydown event listener
    document.addEventListener('keydown', handleKeyDown);
};

// Interval.
setInterval(() => {
    const { wpmValue, accuracy } = getCurrentStats();
    wordPerMinutes.textContent = `${wpmValue} WPM`;
    acc.textContent = `${accuracy}%`;
    let newValue = +wpmValue;
    wpmDS.push(newValue);
}, 1000);

console.log(wpmDS);

launch();

// Jquery part.
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
    const raisinBlack = $(".theme__option-raisin-black");
    const mint = $(".theme__option-mint");
    const lavender = $(".theme__option-lavender");
    const timeFifteen = $(".time__fifteen");
    const timeThirty = $(".time__thirty");
    const timeOneMinute = $(".time__one-minute");
    const timeTwoMinutes = $(".time__two-minutes");
    const wordTen = $(".words__ten");
    const wordTwentyFive = $(".words__twenty-five");
    const wordFifty = $(".words__fifty");
    const wordHundred = $(".words__hundred");
    const easy = $(".level__easy");
    const medium = $(".level__medium");
    const hard = $(".level__hard");

    // Default status.
    $(".score").hide();
    let currentGameMode = timeFifteen;
    let currentLevel = easy;

    // Open / Close settings.

    // Open settings 
    $(".option__settings").click(() => {
        $(".settings").show("fast");
    })

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
        document.documentElement.style.setProperty('--primary-font-color', 'white');
        document.documentElement.style.setProperty('--secondary-font-color', 'white');
    })
    linen.click(() => {
        theme.isLinen = true;
        document.documentElement.style.setProperty('--primary-color', '#f5e9e2');
        document.documentElement.style.setProperty('--secondary-color', '#e3b5a4');
        document.documentElement.style.setProperty('--tertiary-color', '#773344');
        document.documentElement.style.setProperty('--primary-font-color', 'black');
        document.documentElement.style.setProperty('--secondary-font-color', 'black');
    })
    ocean.click(() => {
        theme.isOcean = true;
        document.documentElement.style.setProperty('--primary-color', '#75dddd');
        document.documentElement.style.setProperty('--secondary-color', '#508991');
        document.documentElement.style.setProperty('--tertiary-color', '#172a3a');
        document.documentElement.style.setProperty('--primary-font-color', 'black');
        document.documentElement.style.setProperty('--secondary-font-color', 'white');
    })
    crayola.click(() => {
        theme.isCrayola = true;
        document.documentElement.style.setProperty('--primary-color', '#9f8082');
        document.documentElement.style.setProperty('--secondary-color', '#c76d7e');
        document.documentElement.style.setProperty('--tertiary-color', '#e85d75');
        document.documentElement.style.setProperty('--primary-font-color', 'black');
        document.documentElement.style.setProperty('--secondary-font-color', 'white');
    })
    honeydew.click(() => {
        theme.isHoneyDew = true;
        document.documentElement.style.setProperty('--primary-color', '#e2fcef');
        document.documentElement.style.setProperty('--secondary-color', '#9b287b');
        document.documentElement.style.setProperty('--tertiary-color', '#5c164e');
        document.documentElement.style.setProperty('--primary-font-color', 'black');
        document.documentElement.style.setProperty('--secondary-font-color', 'white');
    })
    gunmetal.click(() => {
        theme.isGunmetal = true;
        document.documentElement.style.setProperty('--primary-color', '#f7fff7');
        document.documentElement.style.setProperty('--secondary-color', '#4ecdc4');
        document.documentElement.style.setProperty('--tertiary-color', '#292f36');
        document.documentElement.style.setProperty('--primary-font-color', 'black');
        document.documentElement.style.setProperty('--secondary-font-color', 'white')
    })
    sunglow.click(() => {
        theme.isSunglow = true;
        document.documentElement.style.setProperty('--primary-color', '#fff05a');
        document.documentElement.style.setProperty('--secondary-color', '#ffd25a');
        document.documentElement.style.setProperty('--tertiary-color', '#ffaa5a');
        document.documentElement.style.setProperty('--primary-font-color', 'black');
        document.documentElement.style.setProperty('--secondary-font-color', 'black')
    })
    dukeBlue.click(() => {
        theme.isDukeBlue = true;
        document.documentElement.style.setProperty('--primary-color', '#ff0054');
        document.documentElement.style.setProperty('--secondary-color', '#9e0059');
        document.documentElement.style.setProperty('--tertiary-color', '#390099');
        document.documentElement.style.setProperty('--primary-font-color', 'white');
        document.documentElement.style.setProperty('--secondary-font-color', 'white')
    })
    raisinBlack.click(() => {
        theme.isRaisinBlack = true;
        document.documentElement.style.setProperty('--primary-color', '#f4d8cd');
        document.documentElement.style.setProperty('--secondary-color', '#1e555c');
        document.documentElement.style.setProperty('--tertiary-color', '#3a2e39');
        document.documentElement.style.setProperty('--primary-font-color', 'black');
        document.documentElement.style.setProperty('--secondary-font-color', 'white');
    })
    lavender.click(() => {
        theme.isLavender = true;
        document.documentElement.style.setProperty('--primary-color', '#eeeeff');
        document.documentElement.style.setProperty('--secondary-color', '#a24936');
        document.documentElement.style.setProperty('--tertiary-color', '#000000');
        document.documentElement.style.setProperty('--primary-font-color', 'black');
        document.documentElement.style.setProperty('--secondary-font-color', 'white');
    })
    mint.click(() => {
        document.documentElement.style.setProperty('--primary-color', '#6da796');
        document.documentElement.style.setProperty('--secondary-color', '#5c985d');
        document.documentElement.style.setProperty('--tertiary-color', '#001d28');
        document.documentElement.style.setProperty('--primary-font-color', 'black');
        document.documentElement.style.setProperty('--secondary-font-color', 'white');
    })

    // Mode changer.
    timeFifteen.click(() => {
        timeFifteen.addClass("current-game-mode");
        currentGameMode !== timeFifteen ? currentGameMode.removeClass("current-game-mode") : null;
        currentGameMode = timeFifteen;
        gameMode = "timer";
        restore();
        launch();
        startTimer(15); // Start the timer for 15 seconds
    });

    timeThirty.click(() => {
        timeThirty.addClass("current-game-mode");
        currentGameMode !== timeThirty ? currentGameMode.removeClass("current-game-mode") : null;
        currentGameMode = timeThirty;
        gameMode = "timer";
        restore();
        launch();
        startTimer(30); // Start the timer for 30 seconds
    });

    timeOneMinute.click(() => {
        timeOneMinute.addClass("current-game-mode");
        currentGameMode !== timeOneMinute ? currentGameMode.removeClass("current-game-mode") : null;
        currentGameMode = timeOneMinute;
        gameMode = "timer";
        restore();
        launch();
        startTimer(60); // Start the timer for 60 seconds
    });

    timeTwoMinutes.click(() => {
        timeTwoMinutes.addClass("current-game-mode");
        currentGameMode !== timeTwoMinutes ? currentGameMode.removeClass("current-game-mode") : null;
        currentGameMode = timeTwoMinutes;
        gameMode = "timer";
        restore();
        launch();
        startTimer(120); // Start the timer for 120 seconds
    });
    wordTen.click(() => {
        wordTen.addClass("current-game-mode");
        currentGameMode !== wordTen ? currentGameMode.removeClass("current-game-mode") : null;
        currentGameMode = wordTen;
        wordCount = 10;
        restore();
        launch();
        gameMode = "counter";
        status.innerText = `0 / ${wordCount}`
    });
    wordTwentyFive.click(() => {
        wordTwentyFive.addClass("current-game-mode");
        currentGameMode !== wordTwentyFive ? currentGameMode.removeClass("current-game-mode") : null;
        currentGameMode = wordTwentyFive;
        wordCount = 25;
        restore();
        launch();
        gameMode = "counter";
        status.innerText = `0 / ${wordCount}`
    });
    wordFifty.click(() => {
        wordFifty.addClass("current-game-mode");
        currentGameMode !== wordFifty ? currentGameMode.removeClass("current-game-mode") : null;
        currentGameMode = wordFifty;
        wordCount = 50;
        restore();
        launch();
        gameMode = "counter";
        status.innerText = `0 / ${wordCount}`
    });
    wordHundred.click(() => {
        wordHundred.addClass("current-game-mode");
        currentGameMode !== wordHundred ? currentGameMode.removeClass("current-game-mode") : null;
        currentGameMode = wordHundred;
        wordCount = 100;
        restore();
        launch();
        gameMode = "counter";
        status.innerText = `0 / ${wordCount}`
    });

    // level changer.
    easy.click(() => {
        easy.addClass("current-game-mode");
        currentLevel !== easy ? currentLevel.removeClass("current-game-mode") : null;
        currentLevel = easy;
        mode = "easy";
        wordsToType = [];
        restore();
        launch();
    });
    medium.click(() => {
        medium.addClass("current-game-mode");
        currentLevel !== medium ? currentLevel.removeClass("current-game-mode") : null;
        currentLevel = medium;
        mode = "medium";
        wordsToType = [];
        restore();
        launch();
    })
    hard.click(() => {
        hard.addClass("current-game-mode");
        currentLevel !== hard ? currentLevel.removeClass("current-game-mode") : null;
        currentLevel = hard;
        mode = "hard";
        wordsToType = [];
        restore();
        launch();
    })

    // Score and stat using chart.js
    const ctx = $("#wpm-stat");
    console.log("this is the wpmDS" + wpmDS);
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            datasets: [
                {
                    label: "Wpm",
                    data: wpmDS,
                    borderColor: "white",
                    tension: 0.3,
                    fill: true,
                }
            ]
        },
        options: {
            responsive: false,
            maintainAspectRatio: false, // Allow custom width and height
        },
    })

    //Quit score... It is automatically opened if the game has finished.

    $(".score__quit").click(() => {
        $(".score").hide("fast");
    })

    // Shortcuts
    $(document).keydown((event) => {
        if (event.key === "Escape") {
            $(".settings").hide(300);
        }
    })
})
