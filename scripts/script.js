/*Открытие окна для редкатирования профиля*/
let openProfile = document.querySelector('.button_type_edit-profile');
let profile = document.querySelector('.popup');
let closedProfile = document.querySelector('.button_type_popup-close');

function showClick() {
    profile.classList.add('popup_opened');
}

openProfile.addEventListener('click', showClick);

function closeClick() {
    profile.classList.remove('popup_opened');
}

closedProfile.addEventListener('click', closeClick);

/*Редактирование профиля*/
let formElement = document.querySelector('.button_type_popup-save');

function handleFormSubmit (evt) {
    evt.preventDefault();
    const name = document.getElementById('name').value;
    document.getElementById('infoname').textContent = name;
    const hobbie = document.getElementById('job').value;
    document.getElementById('infohobbie').textContent = hobbie;  
    closeClick();
}

formElement.addEventListener('submit', handleFormSubmit);