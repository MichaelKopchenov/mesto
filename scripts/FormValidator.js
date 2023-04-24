//ООП Объявление класса валидации
export default class FormValidator {
//ООП Заполнение объекта данными
    constructor(settings, formElement) {
      this._settings = settings;
      this._formElement = formElement;
      this._inputList = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));  //Массив из полей для показа ошибок
      this._buttonElement = this._formElement.querySelector(this._settings.submitButtonSelector);      //Кнопки "Сохранить"
    };

//ООП Добавление класса с ошибкой
_showInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-input-error`);
    
    inputElement.classList.add(this._settings.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._settings.errorClass);
    };

//ООП Скрыте класса с ошибкой
_hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-input-error`);
    inputElement.classList.remove(this._settings.inputErrorClass);
    errorElement.classList.remove(this._settings.errorClass);
    errorElement.textContent = '';
    };

//ООП Очистка полей с ошибками
resetError() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement)
    });
  };

//ООП Проверка валидности поля
_isValid(inputElement) {
    if (!inputElement.validity.valid) {
        this._showInputError(inputElement);
    } else {
        this._hideInputError(inputElement);
    };
};

//ООП Проверка невалидного поля
_hasInvalidInput() {
    return this._inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
  };

//ООП Добавление класса для кнопки отправки
_toggleButtonState() {
    if(this._hasInvalidInput()) {
        this._buttonElement.classList.add(this._settings.inactiveButtonClass);
        this._buttonElement.setAttribute('disabled', true);
    } else {
        this._buttonElement.classList.remove(this._settings.inactiveButtonClass);
        this._buttonElement.removeAttribute('disabled');
    };
};

//ООП Добавление обработчиков всем полям формы
_setEventListeners() {
    this._inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
              this._isValid(inputElement);
              this._toggleButtonState();
             });    
    });
  
    this._toggleButtonState();
};

//ООП Активация валидации
enableValidation() {
    this._setEventListeners();
};
};