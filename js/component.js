/**
 * Created by Ruslan on 29-Mar-16.
 */
  
class Component {
  constructor(options) {
    this._el = options.element;
    this._coords = this._el.getBoundingClientRect();
  }

  get element() {
    return this._el;
  }
  
  on(eventName, handler) {
    this._el.addEventListener(eventName, handler);
  }

  _trigger(eventName, data, options) {
    options = options || {};

    if (data !== undefined && data !== null) {
      options.detail = data;
    }

    let event = new CustomEvent(eventName, options);

    this._el.dispatchEvent(event);
  }

  get top() {
    return this._coords.top;
  }

  get left() {
    return this._coords.left;
  }
}