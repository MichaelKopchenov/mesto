import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupPicture = this._popup.querySelector('.popup__picture');
    this._popupPictureTitle = this._popup.querySelector('.popup__name');
  };

open = (data) => {
    this._popupPicture.src = data.link;
    this._popupPicture.alt = `${data.name}`;
    this._popupPictureTitle.textContent = data.name;
    super.open();
  };
};