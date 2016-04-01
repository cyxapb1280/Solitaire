/**
 * Created by Ruslan on 29-Mar-16.
 */
(function () {
  'use strict';

  let field = new Field({
    element: document.querySelector('[data-component="field"]'),
    cards: create52CardsDeck()
  });

  function create52CardsDeck() {
    let suits = ['hearts', 'diamonds', 'clubs', 'spades'];
    let names = ['ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king'];
    let deck = [];

    let currSuit = 0;
    let currName = 0; //the same value will be priority, ace - 0, 2 - 1...

    for (var i = 0; i < 52; i++) {
      deck.push({
        priority: currName,
        id: names[currName] + '-' + suits[currSuit],
        suit: suits[currSuit]
      });

      currSuit = (currSuit === 3) ? 0 : currSuit + 1;
      currName = (currName === 12) ? 0 : currName + 1;
    }

    return deck;
  }

}());