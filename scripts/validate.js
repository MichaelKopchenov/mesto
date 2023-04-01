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
const showInputError = (formElement, inputElement, errorMessage, settings) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-input-error`);

    inputElement.classList.add(settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(settings.errorClass);
  };

//Функция скрытия класса с ошибкой
const hideInputError = (formElement, inputElement,settings) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-input-error`);

    inputElement.classList.remove(settings.inputErrorClass);
    errorElement.classList.remove(settings.errorClass);
    errorElement.textContent = '';
  };

const resetError = (formElement, inputList, settings) => { 
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
const isValid = (formElement, inputElement, settings) => {                                             
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, settings);
  } else {
    hideInputError(formElement, inputElement, settings);
  }
};

//Добавление обработчиков всем полям формы
const setEventListeners = (formElement, settings) => {
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
    const buttonElement = formElement.querySelector(settings.submitButtonSelector);

    toggleButtonState(inputList, buttonElement, settings);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        
        isValid(formElement, inputElement, settings);
        toggleButtonState(inputList, buttonElement, settings);
      });
    });
  };

//Функция поиска и обработки форм
const enableValidation = (settings) => {
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
function toggleButtonState (inputList, buttonElement, settings) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(settings.inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
} else {
    buttonElement.classList.remove(settings.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
}
};