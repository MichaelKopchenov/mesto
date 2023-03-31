//Селекторы элементов
const settings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',  
    inactiveButtonClass: 'popup__submit_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__form-input-error_active'
  };

//Функция добавления класса с ошибкой
const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-input-error`);

    inputElement.classList.add(settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(settings.errorClass);
  };

//Функция скрытия класса с ошибкой
const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-input-error`);

    inputElement.classList.remove(settings.inputErrorClass);
    errorElement.classList.remove(settings.errorClass);
    errorElement.textContent = '';
  };

const hideInputErrorAll = (formElement, inputList) => {
    inputList.forEach((inputElement) => {
        const errorElement = formElement.querySelector(`.${inputElement.id}-input-error`);

        if (!inputElement.validity.valid) {
        inputElement.classList.remove(settings.inputErrorClass);
        errorElement.textContent = '';
        errorElement.classList.remove(settings.errorClass);
        }
    });
};  

//Проверка валидности поля
const isValid = (formElement, inputElement) => {                                             
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

//Добавление обработчиков всем полям формы
const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
    const buttonElement = formElement.querySelector(settings.submitButtonSelector);

    toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        
        isValid(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
      });
    });
  };

//Функция поиска и обработки форм
const enableValidation = (settings) => {
  document.querySelectorAll(settings.formSelector);
  const formList = Array.from(document.querySelectorAll(settings.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
      setEventListeners(formElement, settings);
  });
};

enableValidation(settings);

//Функция проверки невалидного поля
function hasInvalidInput (inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
});
}

//Функция добавления класса для кнопки отправки
function toggleButtonState (inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(settings.inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
} else {
    buttonElement.classList.remove(settings.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
}
};