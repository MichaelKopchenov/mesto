//Все всплывающие окна
const popups = document.querySelectorAll('.popup')
//Реактирование профиля
const popupProfile = document.querySelector('#profile');                     
const popupProfileOpenBtn = document.querySelector('.profile__edit-profile');                   
const popupFormProfile = popupProfile.querySelector('#form-profile');       
const profileName = document.querySelector('#infoname');                     
const profileJob = document.querySelector('#infojob');                     
const popupInputName = popupProfile.querySelector('#title-name');                   
const popupInputJob = popupProfile.querySelector('#job');
const popupHendleBtn = popupProfile.querySelector('#profile-btn');                     

//Добавление карточек
const popupCards = document.querySelector('#cards');                      
const popupCardsOpenBtn = document.querySelector('.profile__edit-pic');           
const popupFormCards = popupCards.querySelector('#form-cards');      
const popupFormTitle = popupCards.querySelector('#card-name');      
const popupFormLink = popupCards.querySelector('#card-link');
const popupHendleBtnCards = popupCards.querySelector('#card-btn'); 
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];       

//Увеличение изображения
const popupPicture = document.querySelector('#pictures');    
const popupPictureFillImage = document.querySelector('.popup__picture');   
const popupPictureFillTitle = document.querySelector('.popup__name');  

//Закрытие всплывающих окон
const popupCloseBtns = document.querySelectorAll('.popup__close-btn');      

//Секция, куда будут добавлены карточки
const cardsSection = document.querySelector('.elements');
const template = document.querySelector('#template').content;

//Открытие всплывающих окон
function openPopup (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleBtnCloseEsc);                 //Закрытие путем нажатия на кнопку "ESC"
}

//Закртие всплывающих окон
function closePopup (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleBtnCloseEsc);             //Закрытие путем нажатия на кнопку "ESC"
};

//Открытие профиля с начальными данными
function openPopupProfileBtn () {
  popupInputName.value = profileName.textContent;
  popupInputJob.value = profileJob.textContent;
  
  openPopup(popupProfile);
};

//Сохранение новых данных профиля
function handleFormProfile(evt) {
  evt.preventDefault();

  profileName.textContent = popupInputName.value;
  profileJob.textContent = popupInputJob.value;

  closePopup(popupProfile)
}

//Открытие всплывающего окна для добавления карточек
function openPopupCard () {
  popupFormTitle.value = '';
  popupFormLink.value = '';

  openPopup(popupCards);
}

//Возвращаем событие
const popupGetClass = (evt) => {
  return evt.target.closest('.popup');
};

//Функция открытия просмотра изображения карточки
const openPopupImage = function(name, link) {
  popupPictureFillImage.src = link;
  popupPictureFillTitle.textContent = name;
  popupPictureFillImage.alt = name;

  openPopup(popupPicture);
};

//Активный "Лайк"
function activateLikeClass(evt) {
  evt.target.classList.toggle('element__like-btn_active');
};

//Удаление карточки
function deleteCard (evt) {
  const card = evt.target.closest('.element');

  card.remove();
};

//Закрытие окон по нажатию на кнопку "ESC"
const handleBtnCloseEsc = (evt) => {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');

    closePopup(openedPopup);
  }
};

//Закрытие окон по нажатию на overlay
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target === evt.currentTarget) {
      closePopup(popup);
    }
  });
});

//Шаблон создания карточки
function createNewCard ({name, link}) {
  const cardElement = template.querySelector('.element').cloneNode(true);
  const popupCardTitle = cardElement.querySelector('.element__title');  
  const popupCardLink = cardElement.querySelector('.element__pic'); 
  const elementCardBtnLike = cardElement.querySelector('.element__like-btn'); 
  const elementCardBtnDelete = cardElement.querySelector('.element__delete-btn');

  popupCardTitle.textContent = name;    
  popupCardLink.src = link;   
  popupCardLink.alt = name;

  elementCardBtnLike.addEventListener("click", activateLikeClass);
  elementCardBtnDelete.addEventListener("click", deleteCard);
  popupCardLink.addEventListener('click', () => openPopupImage(name, link));
  
  return cardElement;
};

//Создание карточек из массива
initialCards.forEach(function (name, link) {
  cardsSection.append(createNewCard(name, link));
});

//Добавление карточек в начало
function renderCard(data) {
  cardsSection.prepend(data);
};

function handleNewCard(evt) {
  evt.preventDefault();
  const newCard = createNewCard({link: popupFormLink.value, name: popupFormTitle.value,});

  renderCard(newCard);
  evt.target.reset();

  closePopup(popupCards);
};


//Слушатели событий
popupProfileOpenBtn.addEventListener('click', () => {                                             //Открытие профиля
  const popupInputAll = Array.from(popupProfile.querySelectorAll('.popup__input'));

  hideInputErrorAll(popupFormProfile, popupInputAll);
  openPopupProfileBtn()
  toggleButtonState(popupInputAll, popupHendleBtn);
});
popupFormProfile.addEventListener('submit', handleFormProfile);                                  //Отправка новых данных профиля

popupCardsOpenBtn.addEventListener('click', () => {                                              //Открытие окна для добавления карточки 
  const popupInputAll = Array.from(popupCards.querySelectorAll('.popup__input'));

  hideInputErrorAll(popupFormCards, popupInputAll);
  openPopupCard();
  toggleButtonState(popupInputAll, popupHendleBtnCards);
});
popupFormCards.addEventListener('submit', handleNewCard);                                        //Отправка заполненной формы для создания карточки

popupCloseBtns.forEach((item) => {                                                               //Закрытие окон по нажатию на "Крестик".
  item.addEventListener('click', (evt) => {
    const popupCloseBtn = popupGetClass(evt);

    closePopup(popupCloseBtn);
  });
});