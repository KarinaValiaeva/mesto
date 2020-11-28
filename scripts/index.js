let profileEditButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupCloseButton = document.querySelector('.popup__button-close');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');
let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__input_type_name');
let jobInput = formElement.querySelector('.popup__input_type_job');

function addPopupOpened() {
    popup.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}

function removePopupOpened() {
    popup.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    removePopupOpened();
}

profileEditButton.addEventListener('click', addPopupOpened);
popupCloseButton.addEventListener('click', removePopupOpened);
formElement.addEventListener('submit', formSubmitHandler);

