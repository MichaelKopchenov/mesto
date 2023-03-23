/*Реактирование профиля*/
const popupProfile = document.querySelector('#profile');                     
const popupProfileOpenBtn = document.querySelector('.profile__edit-profile');                   
const popupFormProfile = popupProfile.querySelector('#form-profile');       
const profileName = document.querySelector('#infoname');                     
const profileJob = document.querySelector('#infojob');                     
const popupInputName = document.querySelector('#name');                   
const popupInputJob = document.querySelector('#job');                     

/*Добавление карточек*/
const popupCards = document.querySelector('#cards');                      
const popupCardsOpenBtn = document.querySelector('.profile__edit-pic');           
const popupFormCards = popupCards.querySelector('#form-cards');      
const popupFormTitle = popupCards.querySelector('#card-name');      
const popupFormLink = popupCards.querySelector('#card-link'); 
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

/*Увеличение изображения*/
const popupPicture = document.querySelector('#pictures');    
const popupPictureFillImage = document.querySelector('.popup__picture');   
const popupPictureFillTitle = document.querySelector('.popup__name');  

/*Закрытие всплывающих окон*/
const popupCloseBtns = document.querySelectorAll('.popup__close-btn');      

/*Секция, куда будут добавлены карточки*/
const cardsSection = document.querySelector('.elements');
const template = document.querySelector('#template').content;

/*Открытие всплывающих окон*/
function openPopup (popup) {
  popup.classList.add('popup_opened');
}

/*Закртие всплывающих окон*/
function closePopup (popup) {
  popup.classList.remove('popup_opened');
};

/*Закрытие кликом на "Крестик"*/
popupCloseBtns.forEach((item) => {
  item.addEventListener('click', (evt) => {
    const popupCloseBtn = popupGetClass(evt);
    closePopup(popupCloseBtn);
  });
});

/*Открытие профиля с начальными данными*/
function openPopupProfileBtn () {
  popupInputName.value = profileName.textContent;
  popupInputJob.value = profileJob.textContent;
  openPopup(popupProfile);
};

popupProfileOpenBtn.addEventListener('click', openPopupProfileBtn);

/*Сохранение новых данных профиля*/
function handleFormProfile(evt) {
  evt.preventDefault();
  profileName.textContent = popupInputName.value;
  profileJob.textContent = popupInputJob.value;
  closePopup(popupProfile)
}
popupFormProfile.addEventListener('submit', handleFormProfile);

/*Открытие всплывающего окна для добавления карточек*/
function openPopupCard () {
  popupFormTitle.value = '';
  popupFormLink.value = '';
  openPopup(popupCards);
}
popupCardsOpenBtn.addEventListener('click', openPopupCard);

/*Возвращаем событие*/
const popupGetClass = (evt) => {
  return evt.target.closest('.popup');
};

/*Функция открытия просмотра изображения карточки*/
const openPopupImage = function(name, link) {
  popupPictureFillImage.src = link;
  popupPictureFillTitle.textContent = name;
  popupPictureFillImage.alt = name;
  openPopup(popupPicture);
};

/*Активный "Лайк"*/
function activateLikeClass(evt) {
  evt.target.classList.toggle('element__like-btn_active');
};

/*Удаление карточки*/
function deletCard (evt) {
  const card = evt.target.closest('.element');
  card.remove();
};

/*Шаблон создания карточки*/
function createNewCard ({name, link}) {

  const cardElement = template.querySelector('.element').cloneNode(true);
  const popupCardTitle = cardElement.querySelector('.element__title');  
  const popupCardLink = cardElement.querySelector('.element__pic'); 
  const elementCardBtnLike = cardElement.querySelector('.element__like-btn'); 
  const elementCardBtnDelete = cardElement.querySelector('.element__delete-btn')
  popupCardTitle.textContent = name;    
  popupCardLink.src = link;   
  popupCardLink.alt = name; 
  elementCardBtnLike.addEventListener("click", activateLikeClass);
  elementCardBtnDelete.addEventListener("click", deletCard);
  popupCardLink.addEventListener('click', () => openPopupImage(name, link))
  return cardElement;
};

/*Создание карточек из массива*/
initialCards.forEach(function (name, link) {
  cardsSection.append(createNewCard(name, link));
});

/*Добавление карточек в начало*/
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

popupFormCards.addEventListener('submit', handleNewCard);