/*Открытие окна для редкатирования профиля*/
let openProfile = document.querySelector('.button__edit-profile');
let profile = document.querySelector('.popup');
let closedProfile = document.querySelector('.button__popup-close');

function showClick() {
    profile.classList.add('popup_opened');
}

openProfile.addEventListener('click', showClick);

function closeClick() {
    profile.classList.remove('popup_opened');
}

closedProfile.addEventListener('click', closeClick);

/*Редактирование профиля*/
let formElement = document.querySelector('.popup__save');

function handleFormSubmit() {
    event.preventDefault();
    const name = document.getElementById('name').value;
    document.getElementById('infoname').innerHTML = name;
    const hobbie = document.getElementById('job').value;
    document.getElementById('infohobbie').innerHTML = hobbie;
    profile.classList.remove('popup_opened');    
}

formElement.addEventListener('click', handleFormSubmit);