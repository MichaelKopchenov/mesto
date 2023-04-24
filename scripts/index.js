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
const buttonOpenPopupProfile = document.querySelector('.profile__edit-profile');                   
const formPopupProfile = popupProfile.querySelector('#form-profile');       
const profileName = document.querySelector('#infoname');                     
const profileJob = document.querySelector('#infojob');                     
const inputNameFormProfile = popupProfile.querySelector('#title-name');                   
const inputJobFormProfile = popupProfile.querySelector('#job');                   

//Добавление карточек
const popupCards = document.querySelector('#cards');                      
const buttonOpenPopupCard = document.querySelector('.profile__edit-pic');           
const formPopupCard = popupCards.querySelector('#form-cards');      
const inputNameFormAddNewCard = popupCards.querySelector('#card-name');      
const inputLinkFormAddNewCard = popupCards.querySelector('#card-link');

//Режим просмотра
const popupZoomPicture = document.querySelector('#pictures');    
const popupZoomPictureFillImage = document.querySelector('.popup__picture');   
const popupZoomPictureFillTitle = document.querySelector('.popup__name');

//Закрытие всплывающих окон
const buttonsClosePopup = document.querySelectorAll('.popup__close-btn');      

//Секция, куда будут добавлены карточки
const sectionOfCards = document.querySelector('.elements');

//Валидация форм
const validationProfile = new FormValidator(settings, formPopupProfile);
const validationCard = new FormValidator(settings, formPopupCard);

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
  inputNameFormProfile.value = profileName.textContent;
  inputJobFormProfile.value = profileJob.textContent;
  validationProfile.resetError();                                         //Очистка полей ошибок при повторном открытии профиля
  
  openPopup(popupProfile);
};

//Сохранение новых данных профиля
function handleFormProfile(evt) {
  evt.preventDefault();

  profileName.textContent = inputNameFormProfile.value;
  profileJob.textContent = inputJobFormProfile.value;

  closePopup(popupProfile);
};

//Открытие всплывающего окна для добавления карточек
function openPopupCard () {
  formPopupCard.reset();
  validationCard.resetError();                                            //Очистка полей ошибок при повторном открытии окна для добавления карточки
  openPopup(popupCards);
};

//Возвращаем событие
const popupGetClass = (evt) => {
  return evt.target.closest('.popup');
};

//Функция открытия режима просмотра
function openPopupImage (link, name) {
  popupZoomPictureFillImage.src = link;
  popupZoomPictureFillTitle.textContent = name;
  popupZoomPictureFillImage.alt = name;

  openPopup(popupZoomPicture);
};

//Закрытие окон по нажатию на "Крестик".
buttonsClosePopup.forEach((item) => {                                                               
  item.addEventListener('click', (evt) => {
    const buttonClosePopup = popupGetClass(evt);

    closePopup(buttonClosePopup);
  });
});

//Закрытие окон по нажатию на кнопку "ESC"
const handleBtnCloseEsc = (evt) => {
  if (evt.key === 'Escape') {
    const popupOpen = document.querySelector('.popup_opened');

    closePopup(popupOpen);
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
  const cardNewCreated = createdCard.createNewCard();
  sectionOfCards.prepend(cardNewCreated);
  return cardNewCreated;
};

//Создание карточек из массива
initialCards.forEach(function (data) {
  sectionOfCards.append(renderCard(data));
});

//Добавление карточек
function handleNewCard(evt) {
  evt.preventDefault();
  const cardNew = {
    link: inputLinkFormAddNewCard.value, 
    name: inputNameFormAddNewCard.value,
  };

  renderCard(cardNew);
  evt.target.reset();

  closePopup(popupCards);
};

//

//Слушатели событий
buttonOpenPopupProfile.addEventListener('click', openPopupProfileBtn); //Открытие профиля
formPopupProfile.addEventListener('submit', handleFormProfile);        //Отправка новых данных профиля
validationProfile.enableValidation();

buttonOpenPopupCard.addEventListener('click', openPopupCard);          //Открытие окна для добавления карточки
formPopupCard.addEventListener('submit', handleNewCard);               //Отправка заполненной формы для создания карточки
validationCard.enableValidation();