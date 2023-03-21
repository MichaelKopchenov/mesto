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
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
};

/*Закртие всплывающих окон*/
const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
};

/*Закрытие кликом на "Крестик"*/
popupCloseBtns.forEach((item) => {
  item.addEventListener('click', (evt) => {
    const popupCloseBtn = popupGetClass(evt);
    closePopup(popupCloseBtn);
  });
});

/*Редактирование профиля с данными*/
popupProfileOpenBtn.addEventListener('click', () => {
  openPopup(popupProfile);
  popupInputName.value = profileName.textContent;
  popupInputJob.value = profileJob.textContent;
});

/*Закрытие профиля с данными*/
popupFormProfile.addEventListener('submit', (evt) => {
  evt.preventDefault();

  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;

  closePopup(popupProfile);
});

/*Открытие всплывающего окна для добавления карточек*/
popupCardsOpenBtn.addEventListener('click', () => {
  openPopup(popupCards);
  popupFormTitle.value = '';
  popupFormLink.value = '';
});

/*Возвращаем событие*/
const popupGetClass = (evt) => {
  return evt.target.closest('.popup');
};

/*Функция открытия просмотра изображения карточки*/
const popupCardVeview = (element) => {
  element.addEventListener('click', (evt) => {
    openPopup(popupPicture);
    popupPictureFillImage.src = element.src;
    popupPictureFillTitle.textContent = evt.target.closest('.element').textContent;
    popupPictureFillImage.alt = element.alt;
  });
};

/*Активный "Лайк"*/
const btnLikeActiveClass = (btnClass) => {
  btnClass.addEventListener('click', (evt) => {
  evt.target.classList.toggle('element__like-btn_active');
  });
};

/*Удаление карточки*/
const btnDeleteCard = (cardBtnDel) => {
  cardBtnDel.addEventListener('click', (evt) => {
    evt.target.closest('.element').remove();
  });
};

/*Шаблон создания карточки*/
const cardNewCreate = (cardData) => {

  const cardElement = template.querySelector('.element').cloneNode(true);
  const popupCardTitle = cardElement.querySelector('.element__title');  
  const popupCardLink = cardElement.querySelector('.element__pic'); 
  const elementCardBtnLike = cardElement.querySelector('.element__like-btn'); 
  const elementCardBtnDel = cardElement.querySelector('.element__delete-btn'); 
  popupCardTitle.textContent = cardData.name;    
  popupCardLink.src = cardData.link;   
  popupCardLink.alt = cardData.name; 
  popupCardVeview(popupCardLink); 
  btnLikeActiveClass(elementCardBtnLike); 
  btnDeleteCard(elementCardBtnDel);  
  return cardElement;
};

/*Создание карточек из массива*/
initialCards.forEach((cardData) => {
  cardsSection.append(cardNewCreate(cardData));
});

/*Создание карточек от пользователя*/
popupFormCards.addEventListener('submit', (evt) => {
  evt.preventDefault();
  renderCard({
    name: popupFormTitle.value,
    link: popupFormLink.value,
  });
  evt.target.reset();
  closePopup(popupCards);
});

const renderCard = (card) => {
  cardsSection.prepend(cardNewCreate(card));
};