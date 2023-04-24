//Импорт
import Card from './Card.js';                     //Импорт класса по добавлению карточек
import FormValidator from './FormValidator.js';   //Импорт класса по валидации форм

//Все всплывающие окна
const popups = document.querySelectorAll('.popup');

//Селекторы элементов
export const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',  
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__form-input-error_active'
};

//Реактирование профиля
const popupProfile = document.querySelector('#profile');                     
const popupProfileOpenBtn = document.querySelector('.profile__edit-profile');                   
const popupFormProfile = popupProfile.querySelector('#form-profile');       
const profileName = document.querySelector('#infoname');                     
const profileJob = document.querySelector('#infojob');                     
const popupInputName = popupProfile.querySelector('#title-name');                   
const popupInputJob = popupProfile.querySelector('#job');                   

//Добавление карточек
const popupCards = document.querySelector('#cards');                      
const popupCardsOpenBtn = document.querySelector('.profile__edit-pic');           
const popupFormCards = popupCards.querySelector('#form-cards');      
const popupFormTitle = popupCards.querySelector('#card-name');      
const popupFormLink = popupCards.querySelector('#card-link');

//Режим просмотра
const popupPicture = document.querySelector('#pictures');    
const popupPictureFillImage = document.querySelector('.popup__picture');   
const popupPictureFillTitle = document.querySelector('.popup__name');

//Закрытие всплывающих окон
const popupCloseBtns = document.querySelectorAll('.popup__close-btn');      

//Секция, куда будут добавлены карточки
const cardsSection = document.querySelector('.elements');

//Валидация форм
const validationProfile = new FormValidator(settings, popupFormProfile);
const validationCard = new FormValidator(settings, popupFormCards);

//Открытие всплывающих окон
function openPopup (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleBtnCloseEsc);                 //Закрытие путем нажатия на кнопку "ESC"
};

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

  closePopup(popupProfile);
};

//Открытие всплывающего окна для добавления карточек
function openPopupCard () {
  popupFormCards.reset();

  openPopup(popupCards);
};

//Возвращаем событие
const popupGetClass = (evt) => {
  return evt.target.closest('.popup');
};

//Функция открытия режима просмотра
function openPopupImage (link, name) {
  popupPictureFillImage.src = link;
  popupPictureFillTitle.textContent = name;
  popupPictureFillImage.alt = name;

  openPopup(popupPicture);
};

//Закрытие окон по нажатию на "Крестик".
popupCloseBtns.forEach((item) => {                                                               
  item.addEventListener('click', (evt) => {
    const popupCloseBtn = popupGetClass(evt);

    closePopup(popupCloseBtn);
  });
});

//Закрытие окон по нажатию на кнопку "ESC"
const handleBtnCloseEsc = (evt) => {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');

    closePopup(openedPopup);
  };
};

//Закрытие окон по нажатию на overlay
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target === evt.currentTarget) {
      closePopup(popup);
    };
  });
});

//Добавление карточек в начало
const renderCard = (data) => {
  const createdCard = new Card(data, '#template', openPopupImage);
  const newCardCreated = createdCard.createNewCard();
  cardsSection.prepend(newCardCreated);
  return newCardCreated;
};

//Создание карточек из массива
initialCards.forEach(function (data) {
  cardsSection.append(renderCard(data));
});

//Добавление карточек
function handleNewCard(evt) {
  evt.preventDefault();
  const newCard = {
    link: popupFormLink.value, 
    name: popupFormTitle.value,
  };

  renderCard(newCard);
  evt.target.reset();

  closePopup(popupCards);
};

//Слушатели событий
popupProfileOpenBtn.addEventListener('click', () => {             //Открытие профиля
  validationProfile.resetError();                                 //Очистка полей ошибок при повторном открытии профиля
  openPopupProfileBtn();
});
popupFormProfile.addEventListener('submit', handleFormProfile);   //Отправка новых данных профиля
validationProfile.enableValidation();

popupCardsOpenBtn.addEventListener('click', () => {               //Открытие окна для добавления карточки 
  validationCard.resetError();                                    //Очистка полей ошибок при повторном открытии окна для добавления карточки
  openPopupCard();
});
popupFormCards.addEventListener('submit', handleNewCard);         //Отправка заполненной формы для создания карточки
validationCard.enableValidation();