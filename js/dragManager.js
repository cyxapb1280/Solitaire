/**
 * Created by Ruslan on 29-Mar-16.
 */

class DragManager extends Component {
  constructor(options) {
    super(options);
    this._dragElement = null;
    this._backUp = null;
    this._downX = 0;
    this._downY = 0;
    this._shiftX = 0;
    this._shiftY = 0;
    this._movingStarted = false;
    this._uiCardContainer = options.uiCardsContainer;

    document.onmousemove = this._onMouseMove.bind(this);
    document.onmouseup = this._onMouseUp.bind(this);
    document.onmousedown = this._onMouseDown.bind(this);
  }

  rollBack(movedElement) {
    let element = movedElement || this._dragElement;

    this._backUp.parent.appendChild(element);

    element.style.position = this._backUp.position;
    element.style.left = this._backUp.left;
    element.style.top = this._backUp.top;
    element.style.zIndex = this._backUp.zIndex;
    element.style.opacity = this._backUp.opacity;
    element.classList.remove('js-moving');
  }

  _onMouseDown(event) {
    if (event.which != 1) return;

    var element = event.target.closest('.js-draggable');
    if (!element) return;

    this._dragElement = element;

    this._downX = event.pageX;
    this._downY = event.pageY;

    return false;
  }

  _onMouseMove(event) {
    if (!this._dragElement) return;

    if (!this._movingStarted) {
      var moveX = event.pageX - this._downX;
      var moveY = event.pageY - this._downY;

      if (Math.abs(moveX) < 3 && Math.abs(moveY) < 3) {
        return;
      }

      this._movingStarted = true;
      this._createBackUp();
      this._tearElementFromParent();
      this._dragElement.classList.add('js-moving');

      var coords = this._getCoords(this._dragElement);
      this._shiftX = this._downX - coords.left;
      this._shiftY = this._downY - coords.top;
    }

    this._dragElement.style.left = event.pageX - this._shiftX + 'px';
    this._dragElement.style.top = event.pageY - this._shiftY + 'px';

    return false;
  }

  _onMouseUp(event) {
    if (this._dragElement) {
      this._finishDrag(event);
    }
  }

  _tearElementFromParent() {
    if (!this._dragElement.parentElement.dataset.cardId) {
      return;
    }

    let coords = this._getCoords(this._dragElement);

    this._uiCardContainer.appendChild(this._dragElement);
    this._dragElement.style.top = coords.top + 'px';
    this._dragElement.style.left = coords.left + 'px';
  }

  _finishDrag(event) {
    var dropElem = this._findDroppable(event);

    if (!dropElem) {
      this._onDragCancel();
    } else {
      this._onDragEnd(dropElem);
    }
  }

  _createBackUp(event) {
    var element = this._dragElement;

    this._backUp = {
      parent: element.parentElement,
      position: element.position || '',
      left: element.style.left || '',
      top: element.style.top || '',
      zIndex: element.style.zIndex || '',
      opacity: element.style.opacity || ''
    };
  }

  _findDroppable(event) {
    this._dragElement.hidden = true;

    var elementBelow = document.elementFromPoint(event.clientX, event.clientY);

    this._dragElement.hidden = false;

    if (elementBelow == null) {
      return null;
    }

    return elementBelow.closest('.js-droppable');
  }

  _onDragEnd(dropElem) {
    let data = {
      movingElementId: this._dragElement.dataset.cardId,
      destinationElementId: dropElem.dataset.homeId || dropElem.dataset.pileId || dropElem.dataset.currentHolderId
    };

    this._cleanUp();

    this._trigger('moveElement', data);
  }

  _onDragCancel() {
    this.rollBack();
    this._cleanUp();
  }

  _cleanUp() {
    this._dragElement.classList.remove('js-moving');
    this._dragElement = null;
    this._downX = 0;
    this._downY = 0;
    this._shiftX = 0;
    this._shiftY = 0;
    this._movingStarted = false;
  }

  _getCoords(element) {
    var box = element.getBoundingClientRect();

    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset
    };

  }

}


