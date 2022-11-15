import * as card from '../javascripts/card'
let deck;
let hand = [];
let computerHand = [];
let userInput;
let gameNode;

document.addEventListener('DOMContentLoaded', main);
function main() {
    const btn = document.querySelector('.playBtn');
    btn.addEventListener('click', onclick);
}
function onclick(event) {
    event.preventDefault();
    deck = new card.Deck();
    deck.shuffle();
    const input = document.querySelector('#startValues');
    input = (input) ? input.value : undefined;
    if (input) {
        userInput = input.split(',');
        userInput = (input[0] !== '') ? userInput : undefined;
        if (userInput) {
            userInput = userInput.map(x => {
                return new card.Card('♥', x);
            });
            for (let i = 0; i < userInput.length; i++) {
                deck.deck[i] = userInput[i];
            }
        }

    }
    const startingNode = document.querySelector('.start');
    if (startingNode) document.body.removeChild(startingNode);
    let draw;
    for (let i = 0; i < 2; i++){
    [draw, deck] = card.dealt(deck);
    computerHand.push(draw);
    [draw, deck] = card.dealt(deck);
    hand.push(draw);}
    gameNode = document.querySelector('.game');
    const computerInfo = document.createElement('h1');
    
    computerInfo.textContent = 'Computer Hand - Total ?';
}
