export const profileEditButton = document.querySelector('.profile__edit-button');
export const profileAddButton = document.querySelector('.profile__add-button');
export const formProfileElement = document.querySelector('.popup__form_profile');
export const nameInput = formProfileElement.querySelector('.popup__input_type_name');
export const jobInput = formProfileElement.querySelector('.popup__input_type_job');
export const cards = document.querySelector('.cards');
export const formElementCards = document.querySelector('.popup__form_cards');
export const formElementAvatar = document.querySelector('.popup__form_avatar');
export const avatarEditButton = document.querySelector('.profile__edit-avatar');
export const avatarPhoto = document.querySelector('.profile__avatar');
export const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-submit',
    inactiveButtonClass: 'popup__button-submit_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};