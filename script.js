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
let playerWin = false;
let dealerWin = false;
let standClicked = false;
let validBet = false;
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
let dealerInfo = document.getElementById('dealer-info')
let dealerTotalEl = document.getElementById('dealer-totalEl')

playerEl.textContent = player.name + ": $" + player.chips;


function dealerAdd(){
    dealerEl.textContent = "Dealer's Cards: ";
    for (let i = 0; i < dealerCards.length; i++) {
        dealerEl.textContent += dealerCards[i] + " ";
    }
}
function playerAdd(){
    cardsEl.textContent = "Your Cards: ";
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " ";
    }
}


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
function dealerAlg() {
    while (dealerTotal < 17) {
        let dealerCard = getRandomCard();
        dealerTotal += dealerCard;
        dealerCards.push(dealerCard);
    }
    if (dealerTotal === 21) {
        hasDealerBlackJack = true;
        message = "Dealer has a BlackJack!";
        dealerInfo.textContent = message;
        dealerInfo.style.display = "inline-block";
        
    }
    else if (dealerTotal > 21) {
        message = "Dealer <span id='busted-txt'>BUSTED</span> with "+ dealerTotal +" !";
        dealerInfo.innerHTML = message; 
        dealerInfo.style.display = "inline-block";
        
    }
    else {
        message = `Dealer stands with ${dealerTotal}.`;
        dealerInfo.textContent = message;
        dealerInfo.style.display = "inline-block";
    }
    renderGame();
}

function placeBet() {
    betInputDiv.classList.remove('hidden');
    betInputDiv.style.display = 'inline-block';
    placeBetButton.style.display = 'none';
}

function submitBet() {
    let betValue = document.getElementById('bet').value; 
    if (betValue && betValue > 0 && betValue <= player.chips) {
        validBet = true;
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
function upCard(){
    let secondDealerCard = getRandomCard();
    if(hasBlackJack|| !isAlive || standClicked){
        dealerTotal += secondDealerCard;
        dealerCards.push(secondDealerCard);
        dealerAlg();
    }
}
function startGame() {
    if(validBet){
        isAlive = true;
        let firstCard = getRandomCard();
        let secondCard = getRandomCard();
        cards = [firstCard, secondCard];
        total = firstCard + secondCard;
        let firstDealerCard = getRandomCard();
        dealerCards = [firstDealerCard];
        dealerTotal = firstDealerCard;
        startButton.style.display = 'none';
        textElmsDiv.style.display = 'flex'
        standButton.style.display = 'inline-block';
        hitButton.style.display = 'inline-block';
        placeBetButton.style.display = 'none';
        renderGame();}
    else{
        message = "You haven't placed a bet yet, You can't play!"
        messageEl.textContent = message
    }
}

function continueFunc() {
    hasBlackJack = false;
    standClicked = false;
    playerWin = false;
    dealerWin = false;
    hasDealerBlackJack = false;
    validBet = false;
    standButton.disabled = false;
    dealerEl.textContent = "Dealer's cards: "
    cardsEl.textContent = "Your Cards: ";
    totalEl.textContent = "Total: ";
    message = 'Want to play a round?';
    messageEl.textContent = message;
    dealerInfo.textContent = ""; 
    dealerInfo.style.display = "none"; 
    contButton.style.display = 'none';
    startButton.style.display = 'inline-block';
    placeBetButton.style.display = 'inline-block';
}
function standFunc() {
    if (!standClicked) {  
        standClicked = true;  
        standButton.disabled = true;
        upCard();   
    }
}


function resetGame() {
    if (isAlive === false || hasBlackJack) {
        message = 'Want to play another round?';
    }
    messageEl.textContent = message;
    contButton.style.display = 'inline-block';
    hitButton.style.display = 'none';
    textElmsDiv.style.display = 'none';
    standButton.style.display = 'none';
    standButton.disabled = false;

}

function timeout() {
    setTimeout(function () {
        resetGame();
    }, 2500);
}

function renderGame() {
    let betValue = document.getElementById('bet').value; 
    betInfo.style.display = 'inline-block'
    betInfo.textContent = 'Your bet: '+ '$' +betValue
    dealerAdd();
    playerAdd();
    totalEl.textContent = "Total: " + total;
    if (total <= 20) {
        if(standClicked && dealerTotal > total && dealerTotal<22){
            message = 'Dealer Won!'
            dealerWin = true;
            isAlive = false;
            timeout()
        }
        else if(standClicked && dealerTotal < total && total <22){
            message = 'You Won!'
            playerWin = true;
            isDealerAlive = false;
            isAlive = false;
            timeout()
        }
        else if(standClicked && dealerTotal>21 && total<22){
            message = "Dealer <span id='busted-txt'>BUSTED</span>, You WON!"
            dealerWin = true;
            isDealerAlive = false;    
            isAlive = false;
            timeout()
        }
        else if(standClicked && dealerTotal === total){
            message = "It's a PUSH!"
            timeout();
            isDealerAlive = false;
            isAlive =false;
        }
    }
    else if (total === 21) {
        hasBlackJack = true;
        hitButton.style.display = 'none';
        standButton.style.display = 'none';
        if(dealerCards.length === 1){
            upCard();
        }
        else if(dealerTotal< total){
            message ="You have a <span id='win-text'>BlackJack<span/> and WON!"
            playerWin = true;
            isDealerAlive = false;
            isAlive = false;
            timeout()
        }
        else if(dealerTotal === total){
            message = "Dealer also has BlackJack, PUSH!"
            playerWin,dealerWin = true
            isDealerAlive = false;
            isAlive =false;
            timeout();
        }
    }
    else {
        if(dealerTotal < 22){
            message= "You <span id='busted-txt'>BUSTED</span>, Dealer WON!"
            dealerWin = true;
            isDealerAlive = false;
            isAlive = false;
            timeout();
        }
        isAlive = false;
        hitButton.style.display = 'none';
        standButton.style.display = 'none';
        if(dealerCards.length === 1){
            upCard();
        }
        
        
    }
    messageEl.innerHTML = message;
    
}
function newCard() {
    if (isAlive && !hasBlackJack && !standClicked) {
        let card = getRandomCard();
        total += card;
        cards.push(card);
        renderGame();
    }
}
