/*Открытие окна для редкатирования профиля*/
let openProfile = document.querySelector('.profile__edit-profile');
let profile = document.querySelector('.popup');
let closedProfile = document.querySelector('.popup__close-btn');

function showClick() {
    profile.classList.add('popup_opened');
}

openProfile.addEventListener('click', showClick);

function closeClick() {
    profile.classList.remove('popup_opened');
}

closedProfile.addEventListener('click', closeClick);

/*Редактирование профиля*/
let formElement = document.querySelector('.popup__form');

function handleFormSubmit (event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    document.getElementById('infoname').textContent = name;
    const hobbie = document.getElementById('job').value;
    document.getElementById('infojob').textContent = hobbie;  
    console.log(event.currentTarget);
    closeClick();
}

/*Отправка формы*/
formElement.addEventListener('submit', handleFormSubmit);
