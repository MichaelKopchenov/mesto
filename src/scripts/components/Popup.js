//ООП Класс для открытия/закрытия всплывающих окон
export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._buttonClosePopup = this._popup.querySelector('.popup__close-btn');
  }

//ООП Закрытие при помощи кнопки "ESC"
_handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    };
  }

//ООП Закрытие по нажатию на "Крестик"
_handleButtonClose = () => {
    this.close();
  }

//ООП Закрытие по нажатию на Overlay
_handleOverlayClose = (evt) => {
    if (evt.target === evt.currentTarget) {
      this.close();
    };
  }

setEventListeners() {
    this._popup.addEventListener('click', this._handleOverlayClose);
    this._buttonClosePopup.addEventListener('click', this._handleButtonClose);
  }

open() {
    this._popup.classList.add('popup_opened')
    document.addEventListener('keydown', this._handleEscClose);
    }

close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }
};