//Импорт классов, стилей и констант
import './index.css';
import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import Section from '../scripts/components/Section.js';
import UserInfo from '../scripts/components/UserInfo.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import Api from '../scripts/components/Api.js';
import {
  initialCards,
  textOfSave,
  popupProfileSelector,
  popupCardsSelector,
  popupZoomPictureSelector,
  popupDeletePictureSelector,
  popupAvatarSelector,
  sectionOfCardsSelector,
  settings,
  userInformation,
  buttonOpenPopupProfile,
  buttonOpenPopupCard,
  buttonOpenPopupAvatar,
  formPopupProfile,
  formPopupCard,
  formPopupAvatar
} from '../scripts/utils/Consts.js';

// ООП Экземпляр класса Api
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-66',
  headers: {
    authorization: 'cfd52413-da91-4ed2-be65-1fde82f4b517',
    'Content-Type': 'application/json'
  }
});

//ООП Валидация форм
const validationProfile = new FormValidator(settings, formPopupProfile);
const validationCard = new FormValidator(settings, formPopupCard);
const validationAvatar = new FormValidator(settings, formPopupAvatar)

//ООП Экземпляр класса UserInfo
const userInfo = new UserInfo(userInformation);

//ООП Экземпляр класса PopupWithImage
const popupZoomPicture = new PopupWithImage(popupZoomPictureSelector);

// Создание карточки
const createCard = (cardData) => {
  const card = new Card (cardData, '#template', popupZoomPicture.open);
  return card.createNewCard();
};

//ООП Экземпляр класса Section для создания разметки и начальных карточек
const section = new Section({
  items: initialCards,
  renderer: (card) => { 
    section.addItem(createCard(card));
  }
}, sectionOfCardsSelector);

//ООП Добавление начальных карточек на страницу
section.renderItems();

//ООП Экземпляр класса PopupWithForm для редактирования профиля
const popupProfileEdit = new PopupWithForm(popupProfileSelector, (data) => {
  userInfo.setUserInfo(data);
});

//ООП Экземпляр класса PopupWithForm для добавления новых карточек
const popupCardsAdd = new PopupWithForm(popupCardsSelector, (data) => {
  section.addItem(createCard(data));
})

// ООП Экземпляр класса PopupWithForm для редактирования аватара
const popupAvatar = new PopupWithForm(popupAvatarSelector, (data) => {
  api.getNewAvatar(data)
  .then(res => {
    userInfo.getNewAvatar({name: res.name, job: res.about, avatar: res.avatar});
    popupAvatar.close();
  })
  .catch((error) => {
    console.error(`${error} при обновлении аватара`);
  })
  .finally(() => popupAvatar.submitButton.textContent = textOfSave)
});

//Открытие профиля с начальными данными
function openPopupProfileBtn() {
  validationProfile.resetError();
  popupProfileEdit.setInputValues(userInfo.getUserInfo());
  popupProfileEdit.open();
};

//Открытие всплывающего окна для добавления карточек
function openPopupCard() {
  formPopupCard.reset();
  validationCard.resetError();
  popupCardsAdd.open();
};

//Открытие всплывающего окна для добавления карточек
function openPopupAvatar() {
  formPopupAvatar.reset();
  validationAvatar.resetError();
  popupAvatar.open();
}

//Слушатели событий

//Открытие профиля
buttonOpenPopupProfile.addEventListener('click', openPopupProfileBtn);
popupProfileEdit.setEventListeners();
validationProfile.enableValidation();

// Открытие аватара
buttonOpenPopupAvatar.addEventListener('click', openPopupAvatar);
popupAvatar.setEventListeners();
validationAvatar.enableValidation();


//Открытие окна для добавления карточки
buttonOpenPopupCard.addEventListener('click', openPopupCard);
popupCardsAdd.setEventListeners();
popupZoomPicture.setEventListeners();
validationCard.enableValidation();