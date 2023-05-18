// ООП Импорт классов, стилей и констант
import './index.css';
import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithFormDelete from '../scripts/components/PopupWithFormDelete.js';
import Section from '../scripts/components/Section.js';
import UserInfo from '../scripts/components/UserInfo.js';
import Api from '../scripts/components/Api.js';
import {
  popupDeleteSelector,
  popupProfileSelector,
  popupCardsSelector,
  popupZoomPictureSelector,
  popupAvatarSelector,
  sectionOfCardsSelector,
  settings,
  userInformation,
  buttonOpenPopupProfile,
  buttonOpenPopupAvatar,
  buttonOpenPopupCard,
  formPopupProfile,
  formPopupAvatar,
  formPopupCard,
  textOfSave,
} from '../scripts/utils/Consts.js';

// ООП Создание экземпляра класса Api
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-66',
  headers: {
    authorization: 'cfd52413-da91-4ed2-be65-1fde82f4b517',
    'Content-Type': 'application/json'
  }
});

// ООП Валидация форм
const validationProfile = new FormValidator(settings, formPopupProfile);
const validationCard = new FormValidator(settings, formPopupCard);
const validationAvatar = new FormValidator(settings, formPopupAvatar)

// ООП Экземпляр класса UserInfo
const userInfo = new UserInfo(userInformation);

// ООП Экземпляр класса PopupWithImage
const popupZoomPicture = new PopupWithImage(popupZoomPictureSelector);

// ООП Создание карточки
function createCard(cardData) {
  const card = new Card (cardData, '#template', popupZoomPicture.open, popupDeleteMyCard.open, (likeButton, cardId) => {
    if (likeButton.classList.contains('element__like-btn_active')) {
      apiLikeRemove(cardId);
    } else {
      apiLikePut(cardId);
    }
  });

// ООП Снятие лайка с карточки
  const apiLikeRemove = (cardId) => {
    api.unputLike(cardId)
      .then(res => {
      card.activateLikeClass(res.likes)
    })
    .catch((err) => {
      console.log(`Что-то пошло не так при снятии лайка ${err}`)
    });
  };

// ООП Постановка лайка карточке
  const apiLikePut = (cardId) => {
    api.putLike(cardId)
      .then(res => {
        card.activateLikeClass(res.likes)
      })
      .catch((err) => {
        console.log(`Что-то пошло не так при постановке лайка ${err}`)
      });
  };
  return card.createNewCard();
};

//ООП Экземпляр класса Section для создания разметки и начальных карточек
const section = new Section((dataCard) => { 
  section.addItemAppend(createCard(dataCard));
}, sectionOfCardsSelector);

// ООП Добавление начальных данных пользователя и карточек
Promise.all([api.getInitialProfile(), api.getInitialCards()])
  .then(([dataOfUser, dataCard]) => {
    dataCard.forEach(element => element.myid = dataOfUser._id);
    userInfo.setUserInfo({name: dataOfUser.name, job: dataOfUser.about, avatar: dataOfUser.avatar});
    section.renderItems(dataCard);
  })
  

//ООП Экземпляр класса PopupWithForm для редактирования профиля
const popupProfileEdit = new PopupWithForm(popupProfileSelector, (data) => {
  api.setNewProfileData(data)
    .then((dataOfUser) => {
      userInfo.setUserInfo({
        name: dataOfUser.name, 
        job: dataOfUser.about,
        avatar: dataOfUser.avatar
      });
      popupProfileEdit.close();
    })
    .catch((err) => {
      console.error(`Что-то пошло не так при обновлении данных профиля ${err}`)
    })
    .finally(() => popupProfileEdit.buttonSubmit.textContent = textOfSave)
});

// ООП Экземпляр класса PopupWithForm для редактирования аватара
const popupAvatar = new PopupWithForm(popupAvatarSelector, (data) => {
  api.setNewAvatar(data)
    .then((dataOfUser) => {
      userInfo.setUserInfo({
        name: dataOfUser.name, 
        job: dataOfUser.about,
        avatar: dataOfUser.avatar
      });
      popupAvatar.close();
    })
    .catch((err) => {
      console.log(`Что-то пошло не так при обновлении аватара ${err}`)
    })
    .finally(() => popupProfileEdit.buttonSubmit.textContent = textOfSave) //Подсказали данное решение в чате когорты
});

//ООП Экземпляр класса PopupWithForm для добавления новых карточек
const popupCardsAdd = new PopupWithForm(popupCardsSelector, (data) => {
  Promise.all([api.getInitialProfile(), api.setNewCard(data)])
    .then(([dataOfUser, dataCard]) => {
      dataCard.myid = dataOfUser._id
      section.addItemPrepend(createCard(dataCard));
      popupCardsAdd.close();
    })
    .catch((err) => {
      console.log(`Что-то пошло не так при добавлении ${err}`)
    })
    .finally(() => popupCardsAdd.buttonSubmit.textContent = textOfSave)
})

// ООП Экземпляр класса PopupWithFormDelete для удаления своих карточек
const popupDeleteMyCard = new PopupWithFormDelete(popupDeleteSelector, ({card, cardId}) => {
  api.deleteMyCard(cardId)
    .then(() => {
      card.removeCard();
      popupDeleteMyCard.close();
    })
    .catch((err) => {
      console.log(`Что-то пошло не так при удалении карточки ${err}`)
    })
  }
);

// ООП Открытие профиля с начальными данными
function openPopupProfileBtn() {
  validationProfile.resetError();
  popupProfileEdit.setInputValues(userInfo.getUserInfo());
  popupProfileEdit.open();
};

// ООП Открытие аватара
function openPopupAvatar() {
  formPopupAvatar.reset();
  validationAvatar.resetError();
  popupAvatar.open();
}

// ООП Открытие всплывающего окна для добавления карточек
function openPopupCard() {
  formPopupCard.reset();
  validationCard.resetError();
  popupCardsAdd.open();
};

// ООП Открытие профиля
buttonOpenPopupProfile.addEventListener('click', openPopupProfileBtn);
popupProfileEdit.setEventListeners();
validationProfile.enableValidation();

// ООП Открытие аватара
buttonOpenPopupAvatar.addEventListener('click', openPopupAvatar);
popupAvatar.setEventListeners();
validationAvatar.enableValidation();

// ООП Открытие окна для добавления карточки
buttonOpenPopupCard.addEventListener('click', openPopupCard);
popupCardsAdd.setEventListeners();
popupZoomPicture.setEventListeners();
validationCard.enableValidation();

// ООП Открытие окна для удаления своей карточки
popupDeleteMyCard.setEventListeners()

// //ООП Добавление начальных карточек на страницу
// api.getInitialCards()
//   .then((dataCard) => {
//     section.renderItems(dataCard)
//   })
//   .catch((error) => console.error(`Ошибка при загрузке начальных карточек ${error}`));

// //ООП Добавление начальных данных пользователя на страницу
// api.getInitialProfile()
//   .then((dataOfUser) => {
//     userInfo.setUserInfo(( { 
//       name: dataOfUser.name, 
//       job: dataOfUser.about,
//       avatar: dataOfUser.avatar 
//     }))

//   })
//   .catch((error) => console.error(`Ошибка при загрузке данных пользователя ${error}`));