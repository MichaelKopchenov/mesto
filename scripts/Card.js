//Импорт
import { openPopup } from "./index.js";                     //Импорт функции по открытию всплывающих окон

//ООП Объявление класса карточек
export default class Card {
//ООП Заполнение объекта данными
    constructor(data, templateSelector) {
      this._templateSelector = templateSelector;
      this._name = data.name;
      this._link = data.link;
    };

//ООП Шаблон для добавления карточек
_getTemplate() {
    return document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
  };

//ООП Создание карточки
createNewCard() {
    this._element = this._getTemplate();

    this._elementPic = this._element.querySelector('.element__pic');
    this._elementTitle = this._element.querySelector('.element__title');
    this._elementTitle.textContent = this._name;
    this._elementPic.src = this._link;
    this._elementPic.alt = this._name;
    this._setEventListeners();
    return this._element;
  };

//ООП Открытие изображения в режиме просмотра
_openPopupImage = () => {
    const popupPicture = document.querySelector('#pictures');    
    const popupPictureFillImage = document.querySelector('.popup__picture');   
    const popupPictureFillTitle = document.querySelector('.popup__name'); 

    popupPictureFillImage.src = this._link;
    popupPictureFillTitle.textContent = this._name;
    popupPictureFillImage.alt = this._name;

    openPopup(popupPicture);
  };

//ООП Лайк
_activateLikeClass() {
    this._element.querySelector('.element__like-btn').classList.toggle('element__like-btn_active');
  };

//ООП Удаление карточки
_deleteCard() {
    this._element.remove();
    this._element = null;
  };

//ООП Слушатели
_setEventListeners() {
    this._elementPic.addEventListener('click', () => {this._openPopupImage()});
    this._element.querySelector('.element__delete-btn').addEventListener('click', () => {this._deleteCard()});
    this._element.querySelector('.element__like-btn').addEventListener('click', () => {this._activateLikeClass()});
  };
  };