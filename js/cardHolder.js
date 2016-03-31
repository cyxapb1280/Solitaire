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

  shuffleCards(){
    this._cards = CardHolder.shuffle(this._cards);
  }

  static shuffle(array, b) {
    var i = array.length, j, t;
    while (i) {
      j = Math.floor(( i-- ) * Math.random());
      t = b && typeof array[i].shuffle !== 'undefined' ? array[i].shuffle() : array[i];
      array[i] = array[j];
      array[j] = t;
    }

    return array;
  };
  
  _onHolderClick(event){
      this._trigger('holderClick');
  }
}