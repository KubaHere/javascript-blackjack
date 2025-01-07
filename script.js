let player = {
    name: "Player1",
    chips: 200
};

let cards = [];
let dealerCards = [];
let total = 0;
let dealerTotal = 0;
let isDealerAlive = false;
let hasDealerBlackJack = false;
let hasBlackJack = false;
let isAlive = false;
let message = "";
let messageEl = document.getElementById("message-el");
let totalEl = document.getElementById("total-el");
let cardsEl = document.getElementById("cards-el");
let playerEl = document.getElementById("player-el");
let betInputDiv = document.getElementById('bet-input');
let placeBetButton = document.getElementById('place-bet-button');
let startButton = document.getElementById('start-button');
let hitButton = document.getElementById('hit-button');
let standButton = document.getElementById('stand-button')
let contButton = document.getElementById('continue-button')
let betInfo = document.getElementById('bet-el')
let textElmsDiv = document.getElementById('text-elms')
let dealerEl =document.getElementById('dealer-el')

playerEl.textContent = player.name + ": $" + player.chips;

function getRandomCard() {
    let randomNumber = Math.floor(Math.random() * 13) + 1;
    if (randomNumber > 10) {
        return 10;
    } else if (randomNumber === 1) {
        return 11;
    } else {
        return randomNumber;
    }
}
function dealerAlg(){
    isDealerAlive = true;
    
    
}
function placeBet() {
    betInputDiv.classList.remove('hidden');
    betInputDiv.style.display = 'inline-block';
    placeBetButton.style.display = 'none';
}

function submitBet() {
    let betValue = document.getElementById('bet').value; 
    if (betValue && betValue > 0 && betValue <= player.chips) {
        message = `You placed a bet of $${betValue}!`;
        messageEl.textContent = message;
        betInputDiv.classList.add('hidden');
        player.chips -= betValue;
        playerEl.textContent = player.name + ": $" + player.chips;
    } else {
        message = 'Please enter a valid bet (within your chip balance).';
        messageEl.textContent = message;
    }
    betInputDiv.style.display = 'none'
}
function startGame() {
    isAlive = true;
    let firstCard = getRandomCard();
    let secondCard = getRandomCard();
    cards = [firstCard, secondCard];
    total = firstCard + secondCard;
    let firstDealerCard = getRandomCard();
    let secondDealerCard = getRandomCard();
    dealerCards = [firstDealerCard,secondDealerCard];
    dealerTotal = firstDealerCard+secondDealerCard;
    
    startButton.style.display = 'none';
    textElmsDiv.style.display = 'inline-block'
    standButton.style.display = 'inline-block';
    hitButton.style.display = 'inline-block';
    placeBetButton.style.display = 'none';

    renderGame();
}

function continueFunc() {
    hasBlackJack = false;
    dealerEl.textContent = "Dealer's cards: "
    cardsEl.textContent = "Your Cards: ";
    totalEl.textContent = "Total: ";
    message = 'Want to play a round?';
    messageEl.textContent = message;
    contButton.style.display = 'none';
    startButton.style.display = 'inline-block';
    placeBetButton.style.display = 'inline-block';
}

function resetGame() {
    if (isAlive === false || hasBlackJack) {
        message = 'Want to play another round?';
    }
    messageEl.textContent = message;
    contButton.style.display = 'inline-block';
    hitButton.style.display = 'none';
}

function timeout() {
    setTimeout(function () {
        resetGame();
    }, 1500);
}

function renderGame() {
    let betValue = document.getElementById('bet').value; 
    betInfo.style.display = 'inline-block'
    betInfo.textContent = 'Your bet: '+ '$' +betValue

    dealerEl.textContent = "Dealer's Cards: ";
    for (let i = 0; i < dealerCards.length; i++) {
        dealerEl.textContent += dealerCards[i] + " ";
    }

    cardsEl.textContent = "Your Cards: ";
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " ";
    }
    if(total<22 && total > dealerTotal){
        message = 'You won the game!'
        dealerEl.textContent = message
    }
    totalEl.textContent = "Total: " + total;
    if (total <= 20) {
        message = "Do you want to HIT or STAND?";

    } else if (total === 21) {
        message = "You've got <span id='win-txt'>Blackjack</span>!";
        timeout();
        hasBlackJack = true;
        hitButton.style.display = 'none';
        standButton.style.display = 'none';
    } else {
        message = "You <span id='busted-txt'>BUSTED</span>!";
        timeout();
        isAlive = false;
        hitButton.style.display = 'none';
        standButton.style.display = 'none';
    }
    messageEl.innerHTML = message;
}

function newCard() {
    if (isAlive === true && hasBlackJack === false) {
        let card = getRandomCard();
        total += card;
        cards.push(card);
        renderGame();
    }
}
