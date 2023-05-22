//ООП Объявление класса карточек
export default class Card {
//ООП Заполнение объекта данными
    constructor(cardData, userId, templateSelector, openPopupZoomPicture, openDeletePopup, {handleLike, handleDeleteLike}) {
      this._element = document.querySelector(templateSelector)
        .content.querySelector('.element')
        .cloneNode(true);
      this._openPopupZoomPicture = openPopupZoomPicture;
      this._openDeletePopup = openDeletePopup;
      this._elementPic = this._element.querySelector('.element__pic');
      this._elementTitle = this._element.querySelector('.element__title');
      this._likeButton = this._element.querySelector('.element__like-btn');
      this._deleteButton = this._element.querySelector('.element__delete-btn');
      this._likeCounter = this._element.querySelector('.element__like-counter');
      this._name = cardData.name;
      this._link = cardData.link;
      this._userId = userId;
      this._cardOwnerId = cardData.owner._id;
      this._id = cardData._id;
      this._likes = cardData.likes
      this._likesLength = cardData.likes.length;
      this._handleLike = handleLike;
      this._handleDeleteLike = handleDeleteLike;
    };
    

//ООП Создание карточки
createNewCard() {
    this._elementTitle.textContent = this._name;
    this._elementPic.src = this._link;
    this._elementPic.alt = this._name;
    this._setEventListeners();
    this._deleteButtonOfCardVisible();
    this._statusOfLike();
    return this._element;
  };
//ООП Открытие изображения в режиме просмотра
_openViewPopupImage() {
    this._openPopupZoomPicture({
      link: this._link, 
      name: this._name
    });
  };

//ООП Лайк

// ООП Проверка своего ИД в массиве лайков
_statusOfLike() {
  this._likes.forEach(like => {
    if (like._id === this._userId) {
      this._likeButton.classList.add('element__like-btn_active')
      return
    }
  })
  this._likeCounter.textContent = this._likesLength;
};

// ООП Проверка наличия стиля у кнопки лайка
_isLiked() {
  this._likeButton.classList.contains("element__like-btn_active")
      ? this._handleDeleteLike()
      : this._handleLike();
}

// ООП Изменение класса лайков и счетчик
activateLikeClass(likes) {
    this._likeButton.classList.toggle('element__like-btn_active');
    this._likeCounter.textContent = likes.length;
  };

//ООП Удаление карточки
removeCard = () => {
    this._element.remove();
    this._element = null;
  };

_handleDeleteCard() {
    this._openDeletePopup({ 
      cardId: this._id, 
      card: this 
    });
    // console.log(this);
  }

// ООП Появление/скрытие иконки для удаления
_deleteButtonOfCardVisible() {
  if (this._userId === this._cardOwnerId) {
    this._deleteButton.classList.remove('element__delete-btn_hidden')
  } else {
    this._deleteButton.classList.add('element__delete-btn_hidden')
  }
};

//ООП Слушатели
_setEventListeners() {
    this._elementPic.addEventListener('click', () => this._openViewPopupImage());
    this._deleteButton.addEventListener('click', () => this._handleDeleteCard());
    this._likeButton.addEventListener('click', () => this._isLiked());
  };
  };