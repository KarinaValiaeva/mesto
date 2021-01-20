export class FormValidator {
    constructor(config, formElement) {
        this._config = config;
        this._form = formElement;
    }

    _showInputError(input, form) {
        const error = form.querySelector(`#${input.id}-error`);
        error.textContent = input.validationMessage;
        error.classList.add(this._config.errorClass);
        input.classList.add(this._config.inputErrorClass);
    }

    _hideInputError(input, form) {
        const error = form.querySelector(`#${input.id}-error`);
        error.textContent = '';
        error.classList.remove(this._config.errorClass);
        input.classList.remove(this._config.inputErrorClass);
    };

    _checkInputValidity(input, form) {
        if (input.validity.valid) {
            this._hideInputError(input, form);
        } else {
            this._showInputError(input, form);
        }
    };

    _setButtonState(form) {
        const submitButton = form.querySelector(this._config.submitButtonSelector);
        if (this._form.checkValidity()) {
            submitButton.classList.remove(this._config.inactiveButtonClass);
            submitButton.disabled = false;
        } else {
            submitButton.classList.add(this._config.inactiveButtonClass);
            submitButton.disabled = true;
        }
    };

    _setEventListeners(form) {
        const inputList = Array.from(form.querySelectorAll(this._config.inputSelector));
        inputList.forEach(input => {
            input.addEventListener('input', (evt) => {
                this._checkInputValidity(input, form);
                this._setButtonState(form);
            })
        });
    };

    enableValidation() {
        this._setEventListeners(this._form);
        this._form.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
        this._setButtonState(this._form);
    };
}