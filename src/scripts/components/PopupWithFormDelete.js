import Popup from "./Popup.js";

export default class PopupWithFormDelete extends Popup{
  constructor(popupSelector, submitFunction) {
    super(popupSelector);
    this._submitFunction = submitFunction;
    this._form = this._popup.querySelector('.popup__form');
  }

setEventListeners() {
    super.setEventListeners()
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitFunction({ 
        card: this._card, 
        cardId: this._cardId 
    });
  })
}

open = ({cardId, card}) => {
    super.open()
    this._card = card;
    this._cardId = cardId;
  }

}