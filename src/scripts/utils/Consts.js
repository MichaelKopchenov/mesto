//Начальные карточки
export const initialCards = [
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

//Общие селекторы для создания классов
export const popupProfileSelector = '#profile';
export const popupCardsSelector = '#cards';
export const popupZoomPictureSelector = '#pictures';
export const popupDeletePictureSelector = '#delete';
export const popupAvatarSelector = '#avatar';
export const sectionOfCardsSelector = '.elements';

// Текст уведомления пользователя о процессе загрузки
export const textOfSave = 'Сохранение...'

//Селекторы элементов для валидации
export const settings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',  
    inactiveButtonClass: 'popup__submit_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__form-input-error_active'
  };

//Селекторы элементов для класса UserInfo
export const userInformation = {
   profileNameSelector: '#infoname',
   profileJobSelector: '#infojob',
   profileAvatarSelector: '.profile__avatar'
  };

//Кнопки для открытия всплывающих окон ("Профиль" и "Карточки")
export const buttonOpenPopupProfile = document.querySelector('.profile__edit-profile');            
export const buttonOpenPopupCard = document.querySelector('.profile__edit-pic');
export const buttonOpenPopupAvatar = document.querySelector('.profile__avatar-change')

//Формы для заполнения данных
export const formPopupProfile = document.querySelector('#form-profile');
export const formPopupCard = document.querySelector('#form-cards');
export const formPopupAvatar = document.querySelector('#form-avatar');
