let profileEditButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupCloseButton = document.querySelector('.popup__button-close');
let profileName = document.querySelector('.profile__name');
let profileField = document.querySelector('.profile__field');
let formElement = document.querySelector('.form');

document.querySelector('.form__text_type_name').value = profileName.textContent;
document.querySelector('.form__text_type_field').value = profileField.textContent;

profileEditButton.addEventListener('click', togglePopupOpened);
popupCloseButton.addEventListener('click', togglePopupOpened);
formElement.addEventListener('submit', formSubmitHandler);
formElement.addEventListener('submit', togglePopupOpened);

function togglePopupOpened() {
    popup.classList.toggle('popup_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault(); 
    let nameInput = formElement.querySelector('.form__text_type_name');
    let jobInput = formElement.querySelector('.form__text_type_field');
    profileName.textContent = nameInput.value;
    profileField.textContent = jobInput.value;
}