/**
 * Created by Ruslan on 29-Mar-16.
 */

class CardHolder extends Component {
  constructor(options) {
    super(options);
    this._cards = [];

    this._el.addEventListener('click', this._onHolderClick.bind(this));
  }

  get cards() {
    return this._cards;
  }

  set cards(value) {
    this._cards = value;
  }

  get topCardElement() {
    let card = this.topCard;
    let cardElement = null;

    if (card) {
      cardElement = document.querySelector('[data-card-id="' + card.id + '"]');
    }

    return cardElement;
  }

  get topCard() {
    if (this._cards.length === 0) {
      return null;
    } else {
      return this._cards[this._cards.length - 1];
    }
  }

  get currentSuit() {
    if (this.topCard) {
      return this.topCard.suit;
    } else {
      return null;
    }
  }

  get currentPriority() {
    if (this.topCard) {
      return this.topCard.priority;
    } else {
      return -1;
    }
  }

  shuffleCards() {
    let j, temp;

    for (let i = this._cards.length; i !== 0; i--) {
      j = Math.floor(( i-- ) * Math.random());

      temp = this._cards[i];
      this._cards[i] = this._cards[j];
      this._cards[j] = temp;
    }
  }

  _onHolderClick(event) {
    this._trigger('holderClick');
  }
  
}