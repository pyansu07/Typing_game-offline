let numPlayers;
let players = [];
let currentPlayer = 0;
let startTime;

function startGame() {
    numPlayers = document.getElementById('numPlayers').value;
    document.getElementById('setup').classList.add('hidden');
    document.getElementById('playerNames').classList.remove('hidden');
    
    const form = document.getElementById('namesForm');
    for (let i = 0; i < numPlayers; i++) {
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = `Player ${i + 1} Name`;
        input.id = `player${i + 1}Name`;
        form.appendChild(input);
        form.appendChild(document.createElement('br'));
    }
}

function beginTyping() {
    for (let i = 0; i < numPlayers; i++) {
        const playerName = document.getElementById(`player${i + 1}Name`).value;
        players.push({ name: playerName, wpm: 0 });
    }
    document.getElementById('playerNames').classList.add('hidden');
    document.getElementById('lol').classList.remove('hidden');
    startPlayerTyping();
}

function startPlayerTyping() {
   // document.getElementById('typingArea').classList.remove('hidden');
    // const player = players[currentPlayer];
    // document.getElementById('textToType').textContent = `Player ${player.name}, type the following text: "The quick brown fox jumps over the lazy dog."`;
    // document.getElementById('typingInput').value = '';
    // document.getElementById('typingInput').focus();
    // startTime = new Date();
    loadParagraph();
inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);
}

function submitTyping() {
    //const endTime = new Date();
    //const timeDiff = (endTime - startTime) / 1000 / 60; // in minutes
    //const textTyped = document.getElementById('typingInput').value;
    //const wordCount = textTyped.split(' ').length;
    players[currentPlayer].wpm = initTimer();

    currentPlayer++;
    if (currentPlayer+1 == players.length) {
        // startPlayerTyping();
        let char="show leaderboard"
        document.getElementById('lol2').innerText=char;

    }
    if (currentPlayer < players.length) {
        startPlayerTyping();
    } else {
        showLeaderboard();
    }
}

function showLeaderboard() {
    document.getElementById('lol').classList.add('hidden');
    document.getElementById('leaderboard').classList.remove('hidden');
    document.getElementById('typingArea').classList.add('hidden');
    
    players.sort((a, b) => b.wpm - a.wpm);
    const leaderboardList = document.getElementById('leaderboardList');
    players.forEach(player => {
        const listItem = document.createElement('li');
        listItem.textContent = `${player.name}: ${player.wpm.toFixed(2)} WPM`;
        leaderboardList.appendChild(listItem);
    });
}




















/////////////////////////////////////////////////////////////////////////////////
const typingText = document.querySelector(".typing-text p"),
inpField = document.querySelector(".wrapper .input-field"),
tryAgainBtn = document.querySelector(".content button"),
timeTag = document.querySelector(".time span b"),
mistakeTag = document.querySelector(".mistake span"),
wpmTag = document.querySelector(".wpm span"),
cpmTag = document.querySelector(".cpm span");

let timer,
maxTime = 60,
timeLeft = maxTime,
charIndex = mistakes = isTyping = 0;

function loadParagraph() {
    const ranIndex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML = "";
    paragraphs[ranIndex].split("").forEach(char => {
        let span = `<span>${char}</span>`
        typingText.innerHTML += span;
    });
    typingText.querySelectorAll("span")[0].classList.add("active");
    document.addEventListener("keydown", () => inpField.focus());
    typingText.addEventListener("click", () => inpField.focus());
}

function initTyping() {
    let characters = typingText.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charIndex];
    if(charIndex < characters.length - 1 && timeLeft > 0) {
        if(!isTyping) {
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }
        if(typedChar == null) {
            if(charIndex > 0) {
                charIndex--;
                if(characters[charIndex].classList.contains("incorrect")) {
                    mistakes--;
                }
                characters[charIndex].classList.remove("correct", "incorrect");
            }
        } else {
            if(characters[charIndex].innerText == typedChar) {
                characters[charIndex].classList.add("correct");
            } else {
                mistakes++;
                characters[charIndex].classList.add("incorrect");
            }
            charIndex++;
        }
        characters.forEach(span => span.classList.remove("active"));
        characters[charIndex].classList.add("active");

        let wpm = Math.round(((charIndex - mistakes)  / 5) / (maxTime - timeLeft) * 60);
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
        
        wpmTag.innerText = wpm;
        mistakeTag.innerText = mistakes;
        cpmTag.innerText = charIndex - mistakes;
    } else {
        clearInterval(timer);
        inpField.value = "";
    }   
}

function initTimer() {
const w=Math.round(((charIndex - mistakes)  / 5) / (maxTime - timeLeft) * 60);
    if(timeLeft > 0) {
        timeLeft--;
        timeTag.innerText = timeLeft;
        let wpm = Math.round(((charIndex - mistakes)  / 5) / (maxTime - timeLeft) * 60);
        wpmTag.innerText = wpm;
    } else {
        clearInterval(timer);
    }
    return w;
}

function resetGame() {
    //loadParagraph();
    clearInterval(timer);
    timeLeft = maxTime;
    charIndex = mistakes = isTyping = 0;
    inpField.value = "";
    timeTag.innerText = timeLeft;
    wpmTag.innerText = 0;
    mistakeTag.innerText = 0;
    cpmTag.innerText = 0;
}

// loadParagraph();
// inpField.addEventListener("input", initTyping);
// tryAgainBtn.addEventListener("click", resetGame);