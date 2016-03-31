/**
 * Created by Ruslan on 29-Mar-16.
 */
(function () {
  'use strict';
  
  let cardsArray = [
    {
      priority: 0,
      id: 'ace-hearts',
      suit: 'hearts'
    },
    {
      priority: 1,
      id: '2-hearts',
      suit: 'hearts'
    },
    {
      priority: 2,
      id: '3-hearts',
      suit: 'hearts'
    },
    {
      priority: 3,
      id: '4-hearts',
      suit: 'hearts'
    },
    {
      priority: 4,
      id: '5-hearts',
      suit: 'hearts'
    },
    {
      priority: 5,
      id: '6-hearts',
      suit: 'hearts'
    },
    {
      priority: 6,
      id: '7-hearts',
      suit: 'hearts'
    },
    {
      priority: 7,
      id: '8-hearts',
      suit: 'hearts'
    },
    {
      priority: 8,
      id: '9-hearts',
      suit: 'hearts'
    },
    {
      priority: 9,
      id: '10-hearts',
      suit: 'hearts'
    },
    {
      priority: 10,
      id: 'jack-hearts',
      suit: 'hearts'
    },
    {
      priority: 11,
      id: 'queen-hearts',
      suit: 'hearts'
    },
    {
      priority: 12,
      id: 'king-hearts',
      suit: 'hearts'
    },
    {
      priority: 0,
      id: 'ace-diamonds',
      suit: 'diamonds'
    },
    {
      priority: 1,
      id: '2-diamonds',
      suit: 'diamonds'
    },
    {
      priority: 2,
      id: '3-diamonds',
      suit: 'diamonds'
    },
    {
      priority: 3,
      id: '4-diamonds',
      suit: 'diamonds'
    },
    {
      priority: 4,
      id: '5-diamonds',
      suit: 'diamonds'
    },
    {
      priority: 5,
      id: '6-diamonds',
      suit: 'diamonds'
    },
    {
      priority: 6,
      id: '7-diamonds',
      suit: 'diamonds'
    },
    {
      priority: 7,
      id: '8-diamonds',
      suit: 'diamonds'
    },
    {
      priority: 8,
      id: '9-diamonds',
      suit: 'diamonds'
    },
    {
      priority: 9,
      id: '10-diamonds',
      suit: 'diamonds'
    },
    {
      priority: 10,
      id: 'jack-diamonds',
      suit: 'diamonds'
    },
    {
      priority: 11,
      id: 'queen-diamonds',
      suit: 'diamonds'
    },
    {
      priority: 12,
      id: 'king-diamonds',
      suit: 'diamonds'
    },
    {
      priority: 0,
      id: 'ace-clubs',
      suit: 'clubs'
    },
    {
      priority: 1,
      id: '2-clubs',
      suit: 'clubs'
    },
    {
      priority: 2,
      id: '3-clubs',
      suit: 'clubs'
    },
    {
      priority: 3,
      id: '4-clubs',
      suit: 'clubs'
    },
    {
      priority: 4,
      id: '5-clubs',
      suit: 'clubs'
    },
    {
      priority: 5,
      id: '6-clubs',
      suit: 'clubs'
    },
    {
      priority: 6,
      id: '7-clubs',
      suit: 'clubs'
    },
    {
      priority: 7,
      id: '8-clubs',
      suit: 'clubs'
    },
    {
      priority: 8,
      id: '9-clubs',
      suit: 'clubs'
    },
    {
      priority: 9,
      id: '10-clubs',
      suit: 'clubs'
    },
    {
      priority: 10,
      id: 'jack-clubs',
      suit: 'clubs'
    },
    {
      priority: 11,
      id: 'queen-clubs',
      suit: 'clubs'
    },
    {
      priority: 12,
      id: 'king-clubs',
      suit: 'clubs'
    },
    {
      priority: 0,
      id: 'ace-spades',
      suit: 'spades'
    },
    {
      priority: 1,
      id: '2-spades',
      suit: 'spades'
    },
    {
      priority: 2,
      id: '3-spades',
      suit: 'spades'
    },
    {
      priority: 3,
      id: '4-spades',
      suit: 'spades'
    },
    {
      priority: 4,
      id: '5-spades',
      suit: 'spades'
    },
    {
      priority: 5,
      id: '6-spades',
      suit: 'spades'
    },
    {
      priority: 6,
      id: '7-spades',
      suit: 'spades'
    },
    {
      priority: 7,
      id: '8-spades',
      suit: 'spades'
    },
    {
      priority: 8,
      id: '9-spades',
      suit: 'spades'
    },
    {
      priority: 9,
      id: '10-spades',
      suit: 'spades'
    },
    {
      priority: 10,
      id: 'jack-spades',
      suit: 'spades'
    },
    {
      priority: 11,
      id: 'queen-spades',
      suit: 'spades'
    },
    {
      priority: 12,
      id: 'king-spades',
      suit: 'spades'
    }
  ];

  let field = new Field({
    element: document.querySelector('[data-component="field"]'),
    cards: cardsArray
  });

}());