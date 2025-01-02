let player = {
    name: "Player1",
    chips: 200
}

let cards = []
let total = 0
let hasBlackJack = false
let isAlive = false
let message = ""
let messageEl = document.getElementById("message-el")
let totalEl = document.getElementById("total-el")
let cardsEl = document.getElementById("cards-el")
let playerEl = document.getElementById("player-el")

playerEl.textContent = player.name + ": $" + player.chips


function getRandomCard() {
    let randomNumber = Math.floor( Math.random()*13 ) + 1
    if (randomNumber > 10) {
        return 10
    } else if (randomNumber === 1) {
        return 11
    } else {
        return randomNumber
    }
}

function startGame() {
    isAlive = true
    let firstCard = getRandomCard()
    let secondCard = getRandomCard()
    cards = [firstCard, secondCard]
    total = firstCard + secondCard
    document.getElementById('start-button').style.display = 'none';
    document.getElementById('stand-button').style.display = 'inline-block'
    document.getElementById('hit-button').style.display = 'inline-block'
    renderGame()
}

function continueFunc(){
    hasBlackJack = false
    cardsEl.textContent = "Cards: "
    totalEl.textContent = "Total: "
    message = 'Want to play a round?'
    messageEl.textContent = message
    document.getElementById('continue-button').style.display = 'none';
    document.getElementById('start-button').style.display = 'inline-block'
    


}

function resetGame(){
    if (isAlive === false || hasBlackJack){
        message = 'Want to play another round?'
    }
    messageEl.textContent = message
    document.getElementById('continue-button').style.display = 'inline-block'
            document.getElementById('hit-button').style.display = 'none';

    
}

function timeout(){setTimeout(function (){resetGame()},1500)}

function renderGame() {
    cardsEl.textContent = "Cards: "
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " "
    }
    
    totalEl.textContent = "Total: " + total
    if (total <= 20) {
        message = "Do you want to HIT?"
    } else if (total === 21) {
        message = "You've got <span id='win-txt'>Blackjack</span>!"
        timeout()
        hasBlackJack = true
        document.getElementById('hit-button').style.display = 'none'
        document.getElementById('stand-button').style.display = 'none'
    } else {
        message = "You <span id='busted-txt'>BUSTED</span>!"
        timeout()
        isAlive = false
        document.getElementById('hit-button').style.display = 'none'
        document.getElementById('stand-button').style.display = 'none'
    }
    messageEl.innerHTML = message
}

function newCard() {
    if (isAlive === true && hasBlackJack === false) {
        let card = getRandomCard()
        total += card
        cards.push(card)
        renderGame()        
    }
}
