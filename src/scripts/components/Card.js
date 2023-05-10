//ООП Объявление класса карточек
export default class Card {
//ООП Заполнение объекта данными
    constructor(data, templateSelector, openPopupZoomPicture) {
      this._templateSelector = templateSelector;
      this._openPopupZoomPicture = openPopupZoomPicture;
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
_openViewPopupImage = () => {
    this._openPopupZoomPicture({
      link: this._link, 
      name: this._name
    });
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
    this._elementPic.addEventListener('click', () => {this._openViewPopupImage()});
    this._element.querySelector('.element__delete-btn').addEventListener('click', () => {this._deleteCard()});
    this._element.querySelector('.element__like-btn').addEventListener('click', () => {this._activateLikeClass()});
  };
  };