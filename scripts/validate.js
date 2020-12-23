// включение валидации вызовом enableValidation
// все настройки передаются при вызове
const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-submit',
    inactiveButtonClass: 'popup__button-submit_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

// функция для сообщения об ошибке
const showInputError = (form, input, config) => {
    const error = form.querySelector(`#${input.id}-error`);
    error.textContent = input.validationMessage;
    error.classList.add(config.errorClass);
    input.classList.add(config.inputErrorClass);
};

// функция для скрытия сообщения об ошибке
const hideInputError = (form, input, config) => {
    const error = form.querySelector(`#${input.id}-error`);
    error.textContent = '';
    error.classList.remove(config.errorClass);
    input.classList.remove(config.inputErrorClass);
};

// функция для проверки инпута на валидность
const checkInputValidity = (form, input, config) => {
    if (input.validity.valid) {
        hideInputError(form, input, config);
    } else {
        showInputError(form, input, config);
    }
};

// функция чтобы сделать кнопку активной/неактивной
const setButtonState = (button, isActive, config) => {
    if (isActive) {
      button.classList.remove(config.inactiveButtonClass);
      button.disabled = false;
    } else {
        button.classList.add(config.inactiveButtonClass);
        button.disabled = true;
    }
};

// функция для слушателей
const setEventListeners = (form, config) => {
    const inputList = Array.from(form.querySelectorAll(config.inputSelector));
    const submitButton = form.querySelector(config.submitButtonSelector);
    inputList.forEach(input => {
      input.addEventListener('input', (evt) => {
        checkInputValidity(form, input, config);
        setButtonState(submitButton, form.checkValidity(), config)
      })
    });
  };
  
// функция валидности формы
const enableValidation = (config) => {
    const forms = document.querySelectorAll(config.formSelector);
    forms.forEach((form) => {
        setEventListeners(form, config);
        form.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
        const submitButton = form.querySelector(config.submitButtonSelector);
        setButtonState(submitButton, form.checkValidity(), config)
    });
};

enableValidation(validationConfig);