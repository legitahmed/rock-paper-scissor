let roundsPlayed = 0;
const maxRounds = 5;
let player_score = 0;
let computer_score = 0;

const messageDiv = document.getElementById("message");
const playerScoreDisplay = document.getElementById("player-score-number");
const computerScoreDisplay = document.getElementById("computer-score-number");

function typeMessage(message, elementId, typingSpeed) {
    const messageElement = document.getElementById(elementId);
    let index = 0;

    const type = () => {
        if (index < message.length) {
            messageElement.innerHTML += message.charAt(index);
            index++;
            setTimeout(type, typingSpeed);
        }
    };

    type();
}


window.onload = function () {
    const welcomeMessage = "Welcome to the rock-paper-scissors game! Press any button below to start. You will play 5 rounds. Good luck!";
    typeMessage(welcomeMessage, "message", 50); // 50 milliseconds between each character
};

function getComputerChoice() {
    const values = ['rock', 'paper', 'scissor'];
    const randomIndex = Math.floor(Math.random() * values.length);
    return values[randomIndex];
}

function Change2RightRock() {
    document.getElementById("computer-pic").src = "imgs/right-rock.jpg"; 
}

function Change2RightPaper() {
    document.getElementById("computer-pic").src = "imgs/right-paper.jpg";
}

function Change2RightScissor() {
    document.getElementById("computer-pic").src = "imgs/right-scissor.jpg"; 
}

function Change2LeftRock() {
    document.getElementById("player-pic").src = "imgs/left-rock.jpg"; 
}

function Change2LeftPaper() {
    document.getElementById("player-pic").src = "imgs/left-paper.jpg"; 
}

function Change2LeftScissor() {
    document.getElementById("player-pic").src = "imgs/left-scissor.jpg"; 
}

function updateScores() {
    playerScoreDisplay.innerText = player_score;
    computerScoreDisplay.innerText = computer_score;
}

function endGame() {
    if (player_score > computer_score) {
        messageDiv.innerText += "\nCongratulations! You won the game!, refresh the page to play again.";
    } else if (player_score < computer_score) {
        messageDiv.innerText += "\nSorry, you lost the game. Better luck next time!, refresh the page to play again.";
    } else {
        messageDiv.innerText += "\nIt's a tie overall!";
    }
}

function playRound(playerChoice) {
    if (roundsPlayed < maxRounds) {
        const computer_choice = getComputerChoice();
        let resultMessage = "";

        switch (playerChoice) {
            case 'rock':
                Change2LeftRock();
                break;
            case 'paper':
                Change2LeftPaper();
                break;
            case 'scissor':
                Change2LeftScissor();
                break;
        }

        switch (computer_choice) {
            case 'rock':
                Change2RightRock();
                if (playerChoice === 'rock') {
                    resultMessage = "It's a tie! Both chose Rock.";
                } else if (playerChoice === 'paper') {
                    resultMessage = "You win! Paper covers Rock.";
                    player_score++;
                } else {
                    resultMessage = "You lose! Rock crushes Scissors.";
                    computer_score++;
                }
                break;

            case 'paper':
                Change2RightPaper();
                if (playerChoice === 'rock') {
                    resultMessage = "You lose! Paper covers Rock.";
                    computer_score++;
                } else if (playerChoice === 'paper') {
                    resultMessage = "It's a tie! Both chose Paper.";
                } else {
                    resultMessage = "You win! Scissors cut Paper.";
                    player_score++;
                }
                break;

            case 'scissor':
                Change2RightScissor();
                if (playerChoice === 'rock') {
                    resultMessage = "You win! Rock crushes Scissors.";
                    player_score++;
                } else if (playerChoice === 'paper') {
                    resultMessage = "You lose! Scissors cut Paper.";
                    computer_score++;
                } else {
                    resultMessage = "It's a tie! Both chose Scissors.";
                }
                break;
        }

    
        messageDiv.innerText = `Round ${roundsPlayed + 1}: ${resultMessage}`;
        updateScores();

        roundsPlayed++;


        if (roundsPlayed === maxRounds) {
            endGame();
        }
    }
}



// Event listeners for buttons
document.getElementById("rock-button").addEventListener("click", () => playRound('rock'));
document.getElementById("paper-button").addEventListener("click", () => playRound('paper'));
document.getElementById("scissor-button").addEventListener("click", () => playRound('scissor'));
