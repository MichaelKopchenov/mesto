import Popup from './Popup.js';

export default class PopupWithForm extends Popup{
  constructor(popupSelector, submitFunction) {
    super(popupSelector);
    this._submitFunction = submitFunction;
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = this._form.querySelectorAll('.popup__input');
    this._submitButton = this._popup.querySelector(".popup__submit");
    

  };

_getInputValues() {
   this._values  = {};
   this._inputList.forEach(input => {
    this._values[input.name] = input.value;
   });
   return this._values
  };

setInputValues(dataOfUser) {
    this._inputList.forEach(input => {
      input.value = dataOfUser[input.name] ?? '';
    });
  };

setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitFunction(this._getInputValues());
    });
  };

load(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = "Сохранение...";
    } else {
      this._submitButton.textContent = "Сохранить";
    }
  }

close() {
    super.close();
    this._form.reset();
  };
};