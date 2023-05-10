//Импорт классов, стилей и констант
import './index.css';
import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import Section from '../scripts/components/Section.js';
import UserInfo from '../scripts/components/UserInfo.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import {
  initialCards,
  popupProfileSelector,
  popupCardsSelector,
  popupZoomPictureSelector,
  sectionOfCardsSelector,
  settings,
  userInformation,
  buttonOpenPopupProfile,
  buttonOpenPopupCard,
  formPopupProfile,
  formPopupCard
} from '../scripts/utils/Consts.js';

//ООП Валидация форм
const validationProfile = new FormValidator(settings, formPopupProfile);
const validationCard = new FormValidator(settings, formPopupCard);

//ООП Экземпляр класса UserInfo
const userInfo = new UserInfo(userInformation);

//ООП Экземпляр класса PopupWithImage
const popupZoomPicture = new PopupWithImage(popupZoomPictureSelector);

//ООП Экземпляр класса Section для создания разметки и начальных карточек
const section = new Section({
  items: initialCards,
  renderer: (data) => {
    const createdCard = new Card(data, '#template', popupZoomPicture.open);
    return createdCard.createNewCard();
  }
}, sectionOfCardsSelector);

//ООП Добавление начальных карточек на страницу
section.renderItems();

//ООП Экземпляр класса PopupWithForm для редактирования профиля
const popupProfileEdit = new PopupWithForm(popupProfileSelector, () => {
  userInfo.setUserInfo(popupProfileEdit._getInputValues());
});

//ООП Экземпляр класса PopupWithForm для добавления новых карточек
const popupCardsAdd = new PopupWithForm(popupCardsSelector, () => {
  section.addItem(section.renderer(popupCardsAdd._getInputValues()));
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

//Слушатели событий

//Открытие профиля
buttonOpenPopupProfile.addEventListener('click', openPopupProfileBtn);
popupProfileEdit.setEventListeners();
validationProfile.enableValidation();

//Открытие окна для добавления карточки
buttonOpenPopupCard.addEventListener('click', openPopupCard);
popupCardsAdd.setEventListeners();
popupZoomPicture.setEventListeners();
validationCard.enableValidation();