import * as card from '../javascripts/card.mjs'
let deck;
let hand;
let computerHand;
let userInput;
let gameNode;
let div;
let computerDiv;
let Hit;
let Stand;
let compInfo;
function deal(deck) {
    const card = deck.deck.pop();
    return [card, deck];
}

document.addEventListener('DOMContentLoaded', main);
function main() {
    const btn = document.querySelector('.playBtn');
    btn.addEventListener('click', onClick);
}
function onClick(event) {
    event.preventDefault();
    if (gameNode) {
        let lastGame = gameNode.lastElementChild;
        while (lastGame) {
            gameNode.removeChild(lastGame);
            lastGame = gameNode.lastElementChild;
        }
    }
    hand = [];
    computerHand = [];
    deck = new card.Deck();
    deck.shuffle();
    let input = document.querySelector('#startValues');
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
    for (let i = 0; i < 2; i++) {
        [draw, deck] = deal(deck);
        computerHand.push(draw);
        [draw, deck] = deal(deck);
        hand.push(draw);
    }
    gameNode = document.querySelector('.game');
    compInfo = document.createElement('h1');
    const Info = document.createElement('h1');
    compInfo.id = 'compInfo';
    Info.id = 'Info';
    compInfo.textContent = 'Computer Hand - Total ?';
    Info.textContent = 'Player Hand - Total ' + card.calculateHand(hand);
    gameNode.appendChild(compInfo);
    gameNode.appendChild(Info);
    gameNode.appendChild(document.createElement('br'));
    computerDiv = document.createElement('div');
    div = document.createElement('div');
    gameNode.appendChild(computerDiv);
    gameNode.appendChild(div);
    const computerCard = document.createElement('div');
    computerCard.textContent = computerHand[0].suit + computerHand[0].face;
    computerCard.className = 'card';
    computerDiv.appendChild(computerCard);
    computerAppend();
    for (let i = 0; i < 2; i++) {
        const cards = document.createElement('div');
        cards.textContent = hand[i].suit + hand[i].face;
        cards.className = 'card';
        div.appendChild(cards);
    }
    gameNode.appendChild(document.createElement('br'));
    Hit = document.createElement('button');
    Hit.textContent = 'Hit';
    Hit.className = 'button';
    Hit.id = 'Hit';
    gameNode.appendChild(Hit);
    Stand = document.createElement('button');
    Stand.textContent = 'Stand';
    Stand.className = 'button';
    Stand.id = 'Stand';
    gameNode.appendChild(Stand);
    Hit.addEventListener('click', hit);
    Stand.addEventListener('click', stand);
}

function hit(event) {
    let draw;
    [draw, deck] = deal(deck);
    hand.push(draw);
    const drawDiv = document.createElement('div');
    drawDiv.textContent = hand[hand.length - 1].suit + hand[hand.length - 1].face;
    drawDiv.className = 'card';
    div.appendChild(drawDiv);
    const Info = document.querySelector('#Info');
    const total = card.calculateHand(hand);
    const compTotal = card.calculateHand(computerHand);
    Info.textContent = 'Player Hand - Total ' + total;
    if (total > 21) {
        bust();
    }
    if (compTotal < 17) {
        compAction();
    }
}
function compAction() {
    let draw;
    [draw, deck] = deal(deck);
    computerHand.push(draw);
    // computerAppend();
    if (card.calculateHand(computerHand) > 21) { bust(); }
}
function stand(event) {
    const compTotal = card.calculateHand(computerHand);
    if (compTotal < 17) {
        compAction();
    }
    if (compTotal > 21) return;
    else bust();
}
function computerAppend() {
    const unknown = document.createElement('div');
    unknown.textContent = '??';
    unknown.className = 'card';
    computerDiv.appendChild(unknown);
}
function bust() {
    let child = computerDiv.lastElementChild;
    while (child) {
        computerDiv.removeChild(child);
        child = computerDiv.lastElementChild;
    }
    for (let i = 0; i < computerHand.length; i++) {
        const cards = document.createElement('div');
        cards.textContent = computerHand[i].suit + computerHand[i].face;
        cards.className = 'card';
        computerDiv.appendChild(cards);
    }
    const total = card.calculateHand(hand);
    const compTotal = card.calculateHand(computerHand);
    compInfo.textContent = 'Computer Hand - Total '+compTotal;
    gameNode.removeChild(document.querySelector('#Hit'));
    gameNode.removeChild(document.querySelector('#Stand'));
    if (total > 21) {
        end('computer');
    } else if (compTotal > 21) {
        end('player');
    } else if (compTotal - total > 0) {
        end('computer');
    } else if (compTotal - total < 0) {
        end('player');
    } else end('tie');

    const restart = document.createElement('button');
    restart.textContent = 'Restart';
    restart.className = 'button';
    restart.id = 'restart';
    gameNode.appendChild(restart);
    restart.addEventListener('click', onClick);

}
function end(winner) {
    const child = document.createElement('h1');
    if (winner === 'computer') {
        child.textContent = 'Computer Won 💰💰💰';
    } else if (winner === 'player') {
        child.textContent = 'Player Won 💰💰💰';
    }
    else child.textContent = 'Tie, we split 💰💰💰';
    gameNode.appendChild(child);
}