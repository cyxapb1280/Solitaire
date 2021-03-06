/**
 * Created by Ruslan on 29-Mar-16.
 */

class Field {
  constructor(options) {
    this._el = options.element;
    this._cards = options.cards;
    this._currrentZindex = 50;

    this._cardDeckTemplate = document.getElementById('cards-deck-template').innerHTML;
    this._uiCardContainer = this._el.querySelector('[data-component="ui-card-container"]');

    this._deck = new CardHolder({
      element: this._el.querySelector('[data-component="deck"]')
    });

    this._openDeck = new CardHolder({
      element: this._el.querySelector('[data-component="open-deck"]')
    });

    this._dragManager = new DragManager({
      element: this._el.querySelector('[data-component="drag-manager"]'),
      uiCardsContainer: this._uiCardContainer
    });

    this._initializePiles();
    this._initializeHomes();
    this._addAllCardsToDeck();
    this._addStartCardsToPiles();

    if (this._deck.topCardElement) {
      this._deck.topCardElement.onclick = this._onDeckTopCardClick.bind(this);
    }

    this._deck.on('holderClick', this._onDeckClick.bind(this));
    this._dragManager.on('moveElement', this._onDragManagerMoveElement.bind(this));
  }

  _onDeckClick(event) {
    this._moveCardsFromOpenDeckToDeck();
  }

  _onDeckTopCardClick(event) {
    this._moveCardFromDeckToOpenDeck();
  }

  _onDragManagerMoveElement(event) {
    let toId = event.detail.destinationElementId;
    let cardId = event.detail.movingElementId;

    switch (toId) {
      case 'home-0' :
        this._addCardToHome(0, cardId);
        break;
      case 'home-1' :
        this._addCardToHome(1, cardId);
        break;
      case 'home-2' :
        this._addCardToHome(2, cardId);
        break;
      case 'home-3' :
        this._addCardToHome(3, cardId);
        break;
      default : // card to card or card to empty pile
        this._addCardToPile(toId, cardId);
        break;
    }
  }

  _initializePiles() {
    for (let i = 0; i < 7; i++) {
      this['_pile' + i] = new CardHolder({
        element: this._el.querySelector('[data-pile-id="pile-' + i + '"]')
      });
    }
  }

  _initializeHomes() {
    for (let i = 0; i < 4; i++) {
      this['_home' + i] = new CardHolder({
        element: this._el.querySelector('[data-home-id="home-' + i + '"]')
      });
    }
  }

  _addAllCardsToDeck() {
    let str = 'top: ' + this._deck.top + 'px;' + 'left: ' + this._deck.left + 'px;';

    this._deck.cards = this._cards;
    this._deck.shuffleCards();

    this._uiCardContainer.innerHTML = _.template(this._cardDeckTemplate)({
      cards: this._cards,
      styleStr: str
    });

  }

  _addStartCardsToPiles() {
    for (let pile = 0, cards = 1; pile < 7; pile++, cards++) {
      this._addCardsToPileFromDeck(pile, cards);
      this._openTopCard('pile-' + pile);
    }
  }

  _addCardsToPileFromDeck(pileNumber, numberOfCards) {
    let pile = this['_pile' + pileNumber];

    let shift = 0;

    for (var i = 0; i < numberOfCards; i++) {
      let card = this._deck.cards.shift();
      let cardElement = this._el.querySelector('[data-card-id="' + card.id + '"]');

      if (!cardElement) {
        throw new Error('Cant find card in document');
      }

      cardElement.setAttribute('data-current-holder-id', 'pile-' + pileNumber);
      cardElement.style.top = pile.top + shift + 'px';
      cardElement.style.left = pile.left + 'px';
      shift += 10;

      pile.cards.push(card);
    }
  }

  _addCardToHome(homeNumber, cardId) {
    let cardElement = this._el.querySelector('[data-card-id="' + cardId + '"]');
    let home = this['_home' + homeNumber];
    let cards = this._removeCardsFromCurrentHolder(cardId);
    let mainCard = cards[0];

    if (cards.length === 1 &&
      (home.currentSuit === null || mainCard.suit === home.currentSuit) &&
      home.currentPriority === mainCard.priority - 1) {

      this._openTopCard(this._getCardCurrentHolder(cardId));

      home.cards.push(mainCard);
      cardElement.style.zIndex = ++this._currrentZindex;
      cardElement.style.top = home.top + 'px';
      cardElement.style.left = home.left + 'px';
      cardElement.setAttribute('data-current-holder-id', 'home-' + homeNumber);
      cardElement.classList.add('js-droppable');
      cardElement.onclick = null;
    } else {
      this._returnCardsToPreviousHolder(cards);
      this._dragManager.rollBack(cardElement);
    }
  }

  _addCardToPile(pileId, cardId) {
    let pileNumber = pileId.slice(-1);
    let pile = this['_pile' + pileNumber];

    if (!pile.cards.length) {
      this._addCardToEmptyPile(pileNumber, cardId);
    } else {
      this._addCardToNonemptyPile(pileNumber, cardId);
    }
  }

  _addCardToEmptyPile(pileNumber, cardId) {
    let pile = this['_pile' + pileNumber];
    let cards = this._removeCardsFromCurrentHolder(cardId);
    let mainCard = cards[0];
    let cardElement = this._el.querySelector('[data-card-id="' + cardId + '"]');


    if (mainCard.priority === 12) {

      this._openTopCard(this._getCardCurrentHolder(cardId));

      pile.cards = pile.cards.concat(cards);
      cardElement.style.zIndex = ++this._currrentZindex;
      cardElement.style.top = pile.top + 'px';
      cardElement.style.left = pile.left + 'px';
      cardElement.setAttribute('data-current-holder-id', 'pile-' + pileNumber);
      cardElement.classList.add('js-droppable');
      cardElement.onclick = null;
    } else {
      this._returnCardsToPreviousHolder(cards);
      this._dragManager.rollBack(cardElement);
    }
  }

  _addCardToNonemptyPile(pileNumber, cardId) {
    let pile = this['_pile' + pileNumber];
    let cards = this._removeCardsFromCurrentHolder(cardId);
    let mainCard = cards[0];

    let topCardElement = pile.topCardElement;
    let cardElement = this._el.querySelector('[data-card-id="' + cardId + '"]');

    if (pile.currentPriority === mainCard.priority + 1 &&
      this._checkForCorrectSuit(pile.currentSuit, mainCard.suit)) {

      this._openTopCard(this._getCardCurrentHolder(cardId));

      pile.cards = pile.cards.concat(cards);

      cardElement.style.position = 'absolute';
      cardElement.style.top = 25 + 'px';
      cardElement.style.left = 0;
      cardElement.setAttribute('data-current-holder-id', 'pile-' + pileNumber);
      cardElement.classList.add('js-droppable');
      cardElement.onclick = null;

      topCardElement.appendChild(cardElement);
      cardElement.style.zIndex = ++this._currrentZindex;
    } else {
      this._returnCardsToPreviousHolder(cards);
      this._dragManager.rollBack(cardElement);
    }
  }

  _openTopCard(pileId) {
    if (pileId === 'open-deck') {
      return;
    }

    let pileNumber = pileId.slice(-1);
    let pileCards = this['_pile' + pileNumber].cards;

    if (!pileCards.length) {
      return;
    }

    let card = pileCards[pileCards.length - 1];
    let cardElement = this._el.querySelector('[data-card-id="' + card.id + '"]');

    if (!cardElement) {
      throw new Error('Cant find card in document');
    }

    this._openCard(cardElement);
  }

  _openCard(cardElement) {
    cardElement.classList.remove('js-closed');
    cardElement.classList.add('js-draggable');
    cardElement.classList.add('js-droppable');
  }

  _moveCardFromDeckToOpenDeck() {
    let card = this._deck.cards.shift();
    this._openDeck.cards.push(card);

    let cardElement = document.querySelector('[data-card-id="' + card.id + '"]');

    cardElement.style.zIndex = ++this._currrentZindex;
    cardElement.style.top = this._openDeck.top + 'px';
    cardElement.style.left = this._openDeck.left + 'px';
    cardElement.setAttribute('data-current-holder-id', 'open-deck');
    cardElement.classList.remove('js-closed');
    cardElement.classList.add('js-draggable');
  }

  _moveCardsFromOpenDeckToDeck() {
    this._deck.cards = this._openDeck.cards.slice();
    this._openDeck.cards = [];

    this._deck.cards.forEach(function (card) {
      let cardElement = document.querySelector('[data-card-id="' + card.id + '"]');

      cardElement.style.top = this._deck.top + 'px';
      cardElement.style.left = this._deck.left + 'px';
      cardElement.setAttribute('data-current-holder-id', 'deck');
      cardElement.classList.add('js-closed');
      cardElement.classList.remove('js-draggable');
    }.bind(this));

    this._deck.topCardElement.onclick = this._onDeckTopCardClick.bind(this);
  }

  _removeCardsFromCurrentHolder(cardId) {
    let currentHolderId = this._getCardCurrentHolder(cardId);
    let cards = [];

    if (currentHolderId.slice(0, 4) === 'home') {
      cards.push(this._removeFromHome(currentHolderId));
    }

    if (currentHolderId === 'open-deck') {
      cards.push(this._removeFromOpenDeck());
    }

    if (currentHolderId.slice(0, 4) === 'pile') {
      cards = this._removeFromPile(currentHolderId, cardId);
    }

    return cards;
  }

  _returnCardsToPreviousHolder(cards) {
    let currentHolderId = this._getCardCurrentHolder(cards[0].id);
    let holder;

    if (currentHolderId.slice(0, 4) === 'home') {
      let homeNumber = currentHolderId.slice(-1);
      holder = this['_home' + homeNumber];

      holder.cards.push(cards[0]);
    }

    if (currentHolderId.slice(0, 4) === 'pile') {
      let pileNumber = currentHolderId.slice(-1);
      holder = this['_pile' + pileNumber];


      holder.cards = holder.cards.concat(cards);
    }

    if (currentHolderId === 'open-deck') {
      holder = this._openDeck;

      holder.cards.push(cards[0]);
    }
  }

  _getCardCurrentHolder(cardId) {
    let cardElement = this._el.querySelector('[data-card-id="' + cardId + '"]');
    return cardElement.dataset.currentHolderId;
  }

  _checkForCorrectSuit(firstSuit, secondSuit) {
    if ((firstSuit === 'hearts' || firstSuit === 'diamonds') && (secondSuit === 'clubs' || secondSuit === 'spades')) {
      return true;
    }

    if ((firstSuit === 'clubs' || firstSuit === 'spades') && (secondSuit === 'hearts' || secondSuit === 'diamonds')) {
      return true;
    }

    return false;
  }

  _removeFromHome(currentHolderId) {
    let homeNumber = currentHolderId.slice(-1);
    let holder = this['_home' + homeNumber];
    return holder.cards.pop();
  }

  _removeFromOpenDeck() {
    let holder = this._openDeck;
    return holder.cards.pop();
  }

  _removeFromPile(currentHolderId, cardId) {
    let pileNumber = currentHolderId.slice(-1);
    let holder = this['_pile' + pileNumber];

    let cardIndex = holder.cards.findIndex(function (card) {
      return card.id === cardId;
    });

    return holder.cards.splice(cardIndex);
  }
}