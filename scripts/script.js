/*Открытие окна для редкатирования профиля*/
let openProfile = document.querySelector('.button__edit-profile');
let profile = document.querySelector('.popup');
let closedProfile = document.querySelector('.button__close');

function showClick() {
    profile.classList.add('popup_opened');
}

openProfile.addEventListener('click', showClick);

function closeClick() {
    profile.classList.remove('popup_opened');
}

closedProfile.addEventListener('click', closeClick);

/*Редактирование профиля*/
let formElement = document.querySelector('.button__save');

function handleFormSubmit (event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    document.getElementById('infoname').textContent = name;
    const hobbie = document.getElementById('job').value;
    document.getElementById('infojob').textContent = hobbie;  
    closeClick();
}

/*Отправка формы*/
formElement.addEventListener('submit', handleFormSubmit);