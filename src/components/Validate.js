export default class FormValidator {
    constructor(config, form) {
        this._config = config;
        this._form = form;
        this._submitButton = form.querySelector(this._config.submitButtonSelector);
    }
    _showInputError(input) {
        const error = this._form.querySelector(`#${input.id}-error`);
        error.textContent = input.validationMessage;
        error.classList.add(this._config.errorClass);
        input.classList.add(this._config.inputErrorClass);
    }
    _hideInputError(input) {
        const error = this._form.querySelector(`#${input.id}-error`);
        error.textContent = '';
        error.classList.remove(this._config.errorClass);
        input.classList.remove(this._config.inputErrorClass);
    };
    _checkInputValidity(input) {
        if (input.validity.valid) {
            this._hideInputError(input);
        } else {
            this._showInputError(input);
        }
    };
    setButtonState() {
        if (this._form.checkValidity()) {
            this._submitButton.classList.remove(this._config.inactiveButtonClass);
            this._submitButton.disabled = false;
        } else {
            this._submitButton.classList.add(this._config.inactiveButtonClass);
            this._submitButton.disabled = true;
        }
    };
    _setEventListeners() {
        const inputList = Array.from(this._form.querySelectorAll(this._config.inputSelector));
        inputList.forEach(input => {
            input.addEventListener('input', (evt) => {
                this._checkInputValidity(input);
                this.setButtonState();
            })
        });
    };
    enableValidation() {
        this._setEventListeners();
        this._form.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
        this.setButtonState();
    };
    resetValidation() {
        const inputList = Array.from(this._form.querySelectorAll(this._config.inputSelector));
        inputList.forEach(input => {
            this._hideInputError(input);
        });
        this.setButtonState();
    }
}