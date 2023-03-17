/*Открытие окна для редкатирования профиля*/
let profile = document.querySelector('.popup');
let openProfile = document.querySelector('.profile__edit-profile');
let closedProfile = document.querySelector('.popup__close-btn');

function showProfile() {
    profile.classList.toggle('popup_opened');
}

openProfile.addEventListener('click', showProfile);

function closeProfile() {
    profile.classList.remove('popup_opened');
}

closedProfile.addEventListener('click', closeProfile);

/*Редактирование профиля*/
let formElement = document.querySelector('.popup__form');

function handleFormSubmit (event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    document.getElementById('infoname').textContent = name;
    const hobbie = document.getElementById('job').value;
    document.getElementById('infojob').textContent = hobbie;  
    closeProfile();
}

formElement.addEventListener('submit', handleFormSubmit);

/*Открытие окна для добавления нового места*/
let popupCards = document.querySelector('#cards');
let openCards = document.querySelector('.profile__edit-pic');
let closeBtnCard = document.querySelector('#close-card');

function showPlaces() {
    popupCards.classList.add('popup_opened');
}

openCards.addEventListener('click', showPlaces);

function closePlaces() {
    popupCards.classList.remove('popup_opened');
}

closeBtnCard.addEventListener('click', closePlaces);

/*Добавление стартовых карточек*/
const section = document.querySelector('.elements');
const template = document.querySelector('#template');
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
  },
];

initialCards.forEach(function (element) {
    const item = template.content.cloneNode(true);

    const elementPic = item.querySelector('.element__pic');
    const elementTitle = item.querySelector('.element__title');
    const elementBtnLike = item.querySelector('.element__like-btn');
    const elementBtnClose = item.querySelector('.element__delete-btn');

    elementPic.src = element.link;
    elementTitle.textContent = element.name;
    
/*Активная кнопка "Лайк"*/
    elementBtnLike.addEventListener('click', function(evt) {
      evt.target.classList.toggle('element__like-btn_active');
    });
    elementBtnClose.addEventListener('click', function () {
      document.getElementsByClassName('element')[0].remove();
    });
/*Выбор определенной картинки при клике*/
    elementPic.addEventListener('click', function() {
      popupPic.classList.add('popup_opened');
      popupPicture.src = element.link;
      popupName.textContent = element.name;
    });

    section.append(item);
  });

/*Добавление новых карточек*/
let formCards = document.querySelector('#form-cards');

function cardsFormSubmit (event) {
    event.preventDefault();

    const card = template.content.cloneNode(true);
    const name = document.getElementById('place-namecard').value;
    const cardLink = document.getElementById('place-linkcard').value;
    const popupNameCard = card.querySelector('.element__title');
    const popupLinkCard = card.querySelector('.element__pic');
    const elementBtnLike = card.querySelector('.element__like-btn');
    const elementBtnDel = card.querySelector('.element__delete-btn');

    popupNameCard.textContent = name;
    popupLinkCard.src = cardLink;


/*Активная кнопка "Лайк"*/
    elementBtnLike.addEventListener('click', function (evt) {
      evt.target.classList.toggle('element__like-btn_active');
    });
    elementBtnDel.addEventListener('click', function () {
      document.getElementsByClassName('element')[0].remove();
    });
/*Выбор определенной картинки при клике*/
    popupLinkCard.addEventListener('click', function() {
      popupPic.classList.add('popup_opened');
      popupPicture.src = cardLink;
      popupName.textContent = name;
    });
    
    section.prepend(card);

    closePlaces();
};

formCards.addEventListener('submit', cardsFormSubmit);

/*Открытие картинки на весь экран*/
const popupPicture = document.querySelector('.popup__picture');
const popupName = document.querySelector('.popup__name')
const popupPic = document.querySelector('#pictures');
const elementPic = document.querySelectorAll('.element__pic');
const popupPicClose = document.querySelector('#close-picture');

for (var i = 0; i < elementPic.length; i++) {
  elementPic[i].addEventListener('click', function() {
    popupPic.classList.add('popup_opened');
  });
}

function popupClose () {
  popupPic.classList.remove('popup_opened');
};

popupPicClose.addEventListener('click', popupClose);