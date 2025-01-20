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
let messageI = "";
let secondDealerCard = getRandomCard();
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


function dealerAdd() {
    const dealerCardsContainer = document.getElementById('dealer-cards');
    dealerCardsContainer.innerHTML = ""; 

    for (let i = 0; i < dealerCards.length; i++) {
        const card = dealerCards[i];
        const cardImg = document.createElement('img');
        if (i === 0 && !standClicked && isAlive && !hasBlackJack) {
            cardImg.src = `cards/card_back.png`; 
            cardImg.alt = "Hidden Card";
        }
        else{    
            cardImg.src = `cards/${card.rank}_of_${card.suit}.png`;
            cardImg.alt = `${card.rank} of ${card.suit}`;

        }
        cardImg.classList.add('card');
        dealerCardsContainer.appendChild(cardImg);
    }
}
function playerAdd() {
    const playerCardsContainer = document.getElementById('player-cards');
    playerCardsContainer.innerHTML = ""; 
    for (let card of cards) {
        const cardImg = document.createElement('img');
        cardImg.src = `cards/${card.rank}_of_${card.suit}.png`;
        
        cardImg.alt = `${card.rank} of ${card.suit}`;
        cardImg.classList.add('card'); 
        playerCardsContainer.appendChild(cardImg); 
    }
}

function getRandomCard() {
    const suits = ["hearts", "diamonds", "clubs", "spades"];
    const ranks = [2, 3, 4, 5, 6, 7, 8, 9, 10,"ace", "jack", "queen", "king"];
    
    let randomSuit = suits[Math.floor(Math.random() * suits.length)];
    let randomRank = ranks[Math.floor(Math.random() * ranks.length)];

    let cardValue;
    if (randomRank === "jack" || randomRank === "queen" || randomRank === "king") {
        cardValue = 10;
    }
    else if(randomRank === "ace"){
        cardValue = 11;
    } 
    else {
        cardValue = randomRank;
    }
    return { rank: randomRank, suit: randomSuit, value: cardValue };
}

function dealerAlg() {
    while (dealerTotal < 17) {
        let dealerCard = getRandomCard();
        dealerTotal += dealerCard.value;
        dealerCards.push(dealerCard);
        dealerAdd();
    }
    if (dealerTotal === 21) {
        hasDealerBlackJack = true;
        messageI = "Dealer has a BlackJack!";
        dealerInfo.textContent = messageI;
        dealerInfo.style.display = "inline-block";
        
    }
    else if (dealerTotal > 21) {
        messageI = "Dealer <span id='busted-txt'>BUSTED</span> with "+ dealerTotal +" !";
        dealerInfo.innerHTML = messageI; 
        dealerInfo.style.display = "inline-block";
        
    }
    else {
        messageI = `Dealer stands with ` + dealerTotal;
        dealerInfo.textContent = messageI;
        
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
        betInputDiv.style.display = 'none'
    } else {
        message = 'Please enter a valid bet (within your chip balance).';
        messageEl.textContent = message;
    }
    
}
function betWin(){
    let betValue = document.getElementById('bet').value
    console.log(betValue)
    winBet = betValue * 2;
    player.chips += winBet
}
function upCard(){
    dealerTotal += secondDealerCard.value;
    dealerCards.push(secondDealerCard);
    dealerAdd()  
}
function startGame() {
    if(validBet){
        isAlive = true;
        isDealerAlive = true;
        let firstCard = getRandomCard();
        let secondCard = getRandomCard();
        cards = [firstCard, secondCard];
        total = firstCard.value + secondCard.value

        let firstDealerCard = getRandomCard();
        dealerCards = [firstDealerCard];
        dealerTotal = firstDealerCard.value;

        startButton.style.display = 'none';
        textElmsDiv.style.display = 'flex'
        standButton.style.display = 'inline-block';
        hitButton.style.display = 'inline-block';
        placeBetButton.style.display = 'none';
        playerAdd();
        dealerAdd();
        upCard();
        renderGame();
        }
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
    dealerTotalEl.textContent = "Dealer's total: "
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
        dealerAlg();   
    }
}



function resetGame() {
    if (isAlive === false || hasBlackJack || hasDealerBlackJack || !isDealerAlive) {
        message = 'Want to play another round?';
    }
    else if(dealerWin){
        betWin();
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
    }, 3500);
}

function renderGame() {
    let betValue = document.getElementById('bet').value; 
    betInfo.style.display = 'inline-block'
    betInfo.textContent = 'Your bet: '+ '$' +betValue
    playerAdd();
    if(standClicked) {
        dealerAdd();
        dealerTotalEl.textContent= "Dealer's total: " + dealerTotal 
    }
    else if(!isAlive || hasBlackJack){
        dealerTotalEl.textContent= "Dealer's total: " + dealerTotal 
    }
    else if(!standClicked && isAlive && !hasBlackJack){
        dealerTotalEl.textContent= "Dealer's total: " + secondDealerCard.value 
    }
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
            dealerWin = false;
            isDealerAlive = false;
            isAlive = false;
            timeout()
        }
        else if(standClicked && dealerTotal>21 && total<22){
            message = "Dealer <span id='busted-txt'>BUSTED</span>, You WON!"
            dealerWin = false;
            isDealerAlive = false;    
            isAlive = false;
            
            timeout()
        }
        else if(standClicked && dealerTotal === total){
            message = "It's a PUSH!"
            timeout();
            isAlive =false;
        }
    }
    else if (total === 21) {
        hasBlackJack = true;
        hitButton.style.display = 'none';
        standButton.style.display = 'none';
        
        if(dealerTotal< total){
            message ="You have a <span id='win-text'>BlackJack<span/> and WON!"
            dealerWin = false;
            isDealerAlive = false;
            isAlive = false;
            timeout();
            dealerAdd();
        }
        else if(dealerTotal === total){
            message = "Dealer also has BlackJack, PUSH!"
            
            isDealerAlive = false;
            isAlive =false;
            timeout();
            dealerAdd();
        }
    }
    
    else {
        isAlive = false;
        if(dealerTotal < 22){
            message= "You <span id='busted-txt'>BUSTED</span>, Dealer WON!"
            dealerWin = true;
            timeout();
            dealerAdd();
        }
        hitButton.style.display = 'none';
        standButton.style.display = 'none';
        
        
        
    }
    
    messageEl.innerHTML = message;
    
}
function newCard() {
    if (isAlive && !hasBlackJack && !standClicked) {
        let card = getRandomCard();
        total += card.value;
        cards.push(card);
        playerAdd();
        renderGame();
    }
}
