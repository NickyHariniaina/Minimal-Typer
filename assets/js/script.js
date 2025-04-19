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
let charIndex = -1;
let isTyping = false;
let mistakesCount = 0;
let elapsedTime = ((Date.now() - startTime)) / 1000;
let wordsTyped = (charIndex - mistakesCount) / 5;
let wpmValue = (wordsTyped / (elapsedTime / 60)).toFixed(2);
let accuracy = ((charIndex - mistakesCount) / charIndex) * 100 || 0;
let time = 15;
let gameMode = "timer";

// DS.

const getCurrentStats = () => {
    elapsedTime = ((Date.now() - startTime)) / 1000;
    wordsTyped = (charIndex - mistakesCount) / 5;
    wpmValue = (wordsTyped / (elapsedTime / 60)).toFixed(0);
    accuracy = ((charIndex - mistakesCount) / charIndex) * 100 || 0;
    return { wpmValue, accuracy: accuracy.toFixed(2) };
};

setInterval(() => {
    const { wpmValue, accuracy } = getCurrentStats();
    wordPerMinutes.textContent = `${wpmValue} WPM`;
    acc.textContent = `${accuracy}%`;
}, 1000);

// Change later
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

// Score and stat using chart.js
const ctx = document.querySelector("#wpm-stat");
const wpmChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [
            {
                label: "WPM",
                data: [],
                borderColor: "white",
                tension: 0.3,
                fill: true,
            }
        ]
    },
    options: {
        responsive: false,
        maintainAspectRatio: false,
    },
});

// Update the chart dynamically
let updateChart;

const letters = "pkfdcrhaeoijgtnlsquyxbmwvz"

const handleKeyDown = (event) => {
    const char = wordDisplay.querySelectorAll('span');

    // Delete on backspace
    if (event.key === 'Backspace' && charIndex > -1) {
        char[charIndex].classList.remove('active', 'correct', 'incorrect', 'cursor');
        charIndex--;
        char[charIndex].classList.remove('correct', 'incorrect');
        char[charIndex].classList.add('active', 'cursor');
    } else if ((letters.includes((event.key).toLowerCase()) || event.key === " ") && event.key !== "Escape") {
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
    if (charIndex === char.length - 1 && charIndex !== -1) {
        document.querySelector(".wpm p").innerText = wpmValue;
        document.querySelector(".accuracy p").innerText = accuracy.toFixed(0) + " %";
        document.querySelector(".mistake p").innerText = mistakesCount;
        document.querySelector(".typed-word p").innerText = wordCount;
        clearInterval(timer);
        $(".score").show("fast");
        clearInterval(updateChart);
    }
};

const loading = document.querySelector(".loading");

const restore = () => {
    wordDisplay.innerText = "";
    charIndex = 0;
    wordPerMinutes.innerText = "...";
    acc.innerText = "...";
    wordsToType = [];
    mistakesCount = 0;
    clearInterval(updateChart);
    wpmChart.data.datasets[0].data = [];
    wpmChart.update();
    loading.classList.remove("hide");
    setTimeout(() => {
        loading.classList.add("hide")
        launch();
    }, 1000);
}

function launch(){
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

    startTime = Date.now();

    // Remove any existing keydown event listener
    document.removeEventListener('keydown', handleKeyDown);

    // Add the keydown event listener
    document.addEventListener('keydown', handleKeyDown);

    updateChart = setInterval(() => {
        const { wpmValue } = getCurrentStats();
        if (!isNaN(wpmValue)) {
            wpmDS.push(+wpmValue);
            wpmChart.data.labels.push(wpmDS.length);
            wpmChart.data.datasets[0].data.push(+wpmValue);
            wpmChart.update();
        }
    }, 1000);
};

setInterval(() => {
    const { wpmValue, accuracy } = getCurrentStats();
    wordPerMinutes.textContent = `${wpmValue} WPM`;
    acc.textContent = `${accuracy}%`;
    let newValue = +wpmValue;
    wpmDS.push(newValue);
}, 1000);

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
    const wordTen = $(".words__ten");
    const wordTwentyFive = $(".words__twenty-five");
    const wordFive = $(".words__five");
    const wordFifteen = $(".words__fifteen");
    const wordTwenty = $(".words__twenty");
    const wordThirty = $(".words__thirty");
    const wordThirtyFive = $(".words__thirty-five");
    const wordFourty = $(".words__fourty");
    const easy = $(".level__easy");
    const medium = $(".level__medium");
    const hard = $(".level__hard");

    // Default status.
    $(".score").hide();
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
        customCursor.setAttribute("src", "assets/images/cursor-style/licorice-cursor.png")
    })
    linen.click(() => {
        theme.isLinen = true;
        document.documentElement.style.setProperty('--primary-color', '#f5e9e2');
        document.documentElement.style.setProperty('--secondary-color', '#e3b5a4');
        document.documentElement.style.setProperty('--tertiary-color', '#773344');
        document.documentElement.style.setProperty('--primary-font-color', 'black');
        document.documentElement.style.setProperty('--secondary-font-color', 'black');
        customCursor.setAttribute("src", "assets/images/cursor-style/licorice-cursor.png")
    })
    ocean.click(() => {
        theme.isOcean = true;
        document.documentElement.style.setProperty('--primary-color', '#75dddd');
        document.documentElement.style.setProperty('--secondary-color', '#508991');
        document.documentElement.style.setProperty('--tertiary-color', '#172a3a');
        document.documentElement.style.setProperty('--primary-font-color', 'black');
        document.documentElement.style.setProperty('--secondary-font-color', 'white');
        customCursor.setAttribute("src", "assets/images/cursor-style/raisinBlack-cursor.png")
    })
    crayola.click(() => {
        theme.isCrayola = true;
        document.documentElement.style.setProperty('--primary-color', '#9f8082');
        document.documentElement.style.setProperty('--secondary-color', '#c76d7e');
        document.documentElement.style.setProperty('--tertiary-color', '#e85d75');
        document.documentElement.style.setProperty('--primary-font-color', 'black');
        document.documentElement.style.setProperty('--secondary-font-color', 'white');
        customCursor.setAttribute("src", "assets/images/cursor-style/licorice-cursor.png")
    })
    honeydew.click(() => {
        theme.isHoneyDew = true;
        document.documentElement.style.setProperty('--primary-color', '#e2fcef');
        document.documentElement.style.setProperty('--secondary-color', '#9b287b');
        document.documentElement.style.setProperty('--tertiary-color', '#5c164e');
        document.documentElement.style.setProperty('--primary-font-color', 'black');
        document.documentElement.style.setProperty('--secondary-font-color', 'white');
        customCursor.setAttribute("src", "assets/images/cursor-style/honeyDew-cursor.png")
    })
    gunmetal.click(() => {
        theme.isGunmetal = true;
        document.documentElement.style.setProperty('--primary-color', '#f7fff7');
        document.documentElement.style.setProperty('--secondary-color', '#4ecdc4');
        document.documentElement.style.setProperty('--tertiary-color', '#292f36');
        document.documentElement.style.setProperty('--primary-font-color', 'black');
        document.documentElement.style.setProperty('--secondary-font-color', 'white');
        customCursor.setAttribute("src", "assets/images/cursor-style/raisinBlack-cursor.png")
    })
    sunglow.click(() => {
        theme.isSunglow = true;
        document.documentElement.style.setProperty('--primary-color', '#fff05a');
        document.documentElement.style.setProperty('--secondary-color', '#ffd25a');
        document.documentElement.style.setProperty('--tertiary-color', '#ffaa5a');
        document.documentElement.style.setProperty('--primary-font-color', 'black');
        document.documentElement.style.setProperty('--secondary-font-color', 'black');
        customCursor.setAttribute("src", "assets/images/cursor-style/sunglow-cursor.png")
    })
    dukeBlue.click(() => {
        theme.isDukeBlue = true;
        document.documentElement.style.setProperty('--primary-color', '#ff0054');
        document.documentElement.style.setProperty('--secondary-color', '#9e0059');
        document.documentElement.style.setProperty('--tertiary-color', '#390099');
        document.documentElement.style.setProperty('--primary-font-color', 'white');
        document.documentElement.style.setProperty('--secondary-font-color', 'white')
        customCursor.setAttribute("src", "assets/images/cursor-style/dukeBlue-cursor.png")
    })
    raisinBlack.click(() => {
        theme.isRaisinBlack = true;
        document.documentElement.style.setProperty('--primary-color', '#f4d8cd');
        document.documentElement.style.setProperty('--secondary-color', '#1e555c');
        document.documentElement.style.setProperty('--tertiary-color', '#3a2e39');
        document.documentElement.style.setProperty('--primary-font-color', 'black');
        document.documentElement.style.setProperty('--secondary-font-color', 'white');
        customCursor.setAttribute("src", "assets/images/cursor-style/raisinBlack-cursor.png")
    })
    lavender.click(() => {
        theme.isLavender = true;
        document.documentElement.style.setProperty('--primary-color', '#eeeeff');
        document.documentElement.style.setProperty('--secondary-color', '#a24936');
        document.documentElement.style.setProperty('--tertiary-color', '#000000');
        document.documentElement.style.setProperty('--primary-font-color', 'black');
        document.documentElement.style.setProperty('--secondary-font-color', 'white');
        customCursor.setAttribute("src", "assets/images/cursor-style/lavender-cursor.png")
    })
    mint.click(() => {
        document.documentElement.style.setProperty('--primary-color', '#6da796');
        document.documentElement.style.setProperty('--secondary-color', '#5c985d');
        document.documentElement.style.setProperty('--tertiary-color', '#001d28');
        document.documentElement.style.setProperty('--primary-font-color', 'black');
        document.documentElement.style.setProperty('--secondary-font-color', 'white');
        customCursor.setAttribute("src", "assets/images/cursor-style/mint-cursor.png")
    })

    let currentGameMode = wordTen;

    wordTen.click(() => {
        wordTen.addClass("current-game-mode");
        currentGameMode !== wordTen ? currentGameMode.removeClass("current-game-mode") : null;
        currentGameMode = wordTen;
        wordCount = 10;
        restore();
         
        status.innerText = `0 / ${wordCount}`
    });
    wordFive.click(() => {
        wordFive.addClass("current-game-mode");
        currentGameMode !== wordFive ? currentGameMode.removeClass("current-game-mode") : null;
        currentGameMode = wordFive;
        wordCount = 5;
        restore();
         
        status.innerText = `0 / ${wordCount}`;
    });
    wordFifteen.click(() => {
        wordFifteen.addClass("current-game-mode");
        currentGameMode !== wordFifteen ? currentGameMode.removeClass("current-game-mode") : null;
        currentGameMode = wordFifteen;
        wordCount = 15;
        restore();
         
        status.innerText = `0 / ${wordCount}`;
    });
    wordTwenty.click(() => {
        wordTwenty.addClass("current-game-mode");
        currentGameMode !== wordTwenty ? currentGameMode.removeClass("current-game-mode") : null;
        currentGameMode = wordTwenty;
        wordCount = 20;
        restore();
         
        status.innerText = `0 / ${wordCount}`;
    });
    wordTwentyFive.click(() => {
        wordTwentyFive.addClass("current-game-mode");
        currentGameMode !== wordTwentyFive ? currentGameMode.removeClass("current-game-mode") : null;
        currentGameMode = wordTwentyFive;
        wordCount = 25;
        restore();
         
        status.innerText = `0 / ${wordCount}`;
    });
    wordThirty.click(() => {
        wordThirty.addClass("current-game-mode");
        currentGameMode !== wordThirty ? currentGameMode.removeClass("current-game-mode") : null;
        currentGameMode = wordThirty;
        wordCount = 30;
        restore();
         
        status.innerText = `0 / ${wordCount}`;
    });
    wordThirtyFive.click(() => {
        wordThirtyFive.addClass("current-game-mode");
        currentGameMode !== wordThirtyFive ? currentGameMode.removeClass("current-game-mode") : null;
        currentGameMode = wordThirtyFive;
        wordCount = 35;
        restore();
         
        status.innerText = `0 / ${wordCount}`;
    });
    wordFourty.click(() => {
        wordFourty.addClass("current-game-mode");
        currentGameMode !== wordFourty ? currentGameMode.removeClass("current-game-mode") : null;
        currentGameMode = wordFourty;
        wordCount = 40;
        restore();
         
        status.innerText = `0 / ${wordCount}`;
    });
    // level changer.
    easy.click(() => {
        easy.addClass("current-game-mode");
        currentLevel !== easy ? currentLevel.removeClass("current-game-mode") : null;
        currentLevel = easy;
        mode = "easy";
        wordsToType = [];
        restore();
         
    });
    medium.click(() => {
        medium.addClass("current-game-mode");
        currentLevel !== medium ? currentLevel.removeClass("current-game-mode") : null;
        currentLevel = medium;
        mode = "medium";
        wordsToType = [];
        restore();
         
    })
    hard.click(() => {
        hard.addClass("current-game-mode");
        currentLevel !== hard ? currentLevel.removeClass("current-game-mode") : null;
        currentLevel = hard;
        mode = "hard";
        wordsToType = [];
        restore();
         
    })

    $(".option__settings").mouseover(() => {
        $(".option__settings").addClass("bx-tada");
    })

    $(".option__settings").mouseleave(() => {
        $(".option__settings").removeClass("bx-tada");
    })
    $(".option__randomize").mouseover(() => {
        $(".option__randomize").addClass("bx-tada");
    })

    $(".option__randomize").mouseleave(() => {
        $(".option__randomize").removeClass("bx-tada");
    })

    $(".option__randomize").click(() => {
        restore();
         
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
        if (event.key === "Backspace") {
            $(".score").hide(300);
        }
        if (event.key === "Enter") {
            restore();
        }
    })
})
