//Общие селекторы для создания классов
export const popupProfileSelector = '#profile';
export const popupCardsSelector = '#cards';
export const popupZoomPictureSelector = '#pictures';
export const popupAvatarSelector = '#avatar';
export const popupDeleteSelector = '#delete';
export const sectionOfCardsSelector = '.elements';

// ООП ID пользователя
export let userId; // Попробовал второй вариант решения после первого ревью. Сохранил ID пользователя в глобальную переменную.

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
export const buttonOpenPopupAvatar = document.querySelector('.profile__avatar-change');

//Формы для заполнения данных
export const formPopupProfile = document.querySelector('#form-profile');
export const formPopupCard = document.querySelector('#form-cards');
export const formPopupAvatar = document.querySelector('#form-avatar');
