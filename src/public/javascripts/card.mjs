export class Card {
  constructor(suit, face) {
    this.suit = suit;
    this.face = face;
  }
}

export class Deck {
  static suits = ['♠', '♥', '♦', '♣'];

  constructor() {
    const f = suit => [..."A23456789XJQK"].map(val => {
      return new Card(suit, val === 'X' ? '10' : val);
    });
    this.deck = Deck.suits.map(f).flat();
  }

  shuffle() {
    // Fisher–Yates Shuffle from:
    // https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
    let newIndex;
    let tempCard;
    for (let i = this.deck.length - 1; i > 0; i--) {
      newIndex = this.randInt(0, i - 1);
      tempCard = this.deck[i];
      this.deck[i] = this.deck[newIndex];
      this.deck[newIndex] = tempCard;
    }
  }

  randInt(a, b) {
    return Math.floor(Math.random() * ((b - a) + 1)) + a;
  }
}
export const calculateHand = hand => {
  let total = 0;
  let numAces = 0;
  for (const ele of hand) {
    if (ele.face === 'A') {
      numAces++;
    } else {
      total += isNaN(+ele.face) ? 10 : +ele.face;
    }
  }
  total += numAces * 11;
  while (numAces > 0 && total > 21) {
    total -= 10;
    numAces--;
  }
  return total;
}
export const deal = (deck) =>{
  const card = deck.pop();
  return [card, deck];
}