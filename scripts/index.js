import { Card } from './card.js';
import { FormValidator } from './validate.js';
const profileEditButton = document.querySelector('.profile__edit-button');
const popup = [...document.querySelectorAll('.popup')];
const popupProfile = document.querySelector('.popup_profile');
const popupCloseButton = [...document.querySelectorAll('.popup__button-close')];
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const formProfileElement = document.querySelector('.popup__form_profile');
const nameInput = formProfileElement.querySelector('.popup__input_type_name');
const jobInput = formProfileElement.querySelector('.popup__input_type_job');
const cards = document.querySelector('.cards');
const popupCards = document.querySelector('.popup_cards');
const profileAddButton = document.querySelector('.profile__add-button');
const formElementCards = document.querySelector('.popup__form_cards');
const titleInput = formElementCards.querySelector('.popup__input_type_title');
const linkInput = formElementCards.querySelector('.popup__input_type_link');
const popupImage = document.querySelector('.popup_image');
const popupPhoto = popupImage.querySelector('.popup__photo');
const popupCaption = popupImage.querySelector('.popup__caption');
export const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-submit',
    inactiveButtonClass: 'popup__button-submit_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

// отображение карточек из массива initialCards
initialCards.forEach((item) => {
    const card = new Card(item, '.card');
    const cardElement = card.generateCard();
    cards.append(cardElement);
})

// функция создания экземпляра класса валидации форм
function validateForm(form) {
    const validForm = new FormValidator(validationConfig, form);
    validForm.enableValidation();
    return validForm;
}

// функция добавления новой карточки
function addCard() {
    const newCard = new Card({ name: titleInput.value, link: linkInput.value }, '.card');
    const cardElement = newCard.generateCard();
    cards.prepend(cardElement);
}

// функция для сохранения новых значений профиля
function formProfileSubmitHandler(evt) {
    evt.preventDefault();
    removePopupOpened(popupProfile);
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
}

// popup image первый вариант
export function openPopupPhoto(evt) {
    addPopupOpened(popupImage);
    const targetItem = evt.target.closest('.card__item');
    const targetPhoto = targetItem.querySelector('.card__photo');
    popupPhoto.src = targetPhoto.src;
    const targetCaption = targetItem.querySelector('.card__title');
    popupCaption.textContent = targetCaption.textContent;
    popupPhoto.alt = targetCaption.textContent;
}

// popup image второй вариант (проще)
//  function openPopupPhoto(name, link) {
//      addPopupOpened(popupImage);
//      popupPhoto.src = link;
//      popupCaption.textContent = name;
//      popupPhoto.alt = name;
//  }

// функция для сохранения новой карточки
function formSubmitHandlerCards(evt) {
    evt.preventDefault();
    addCard();
    formElementCards.reset();
    removePopupOpened(popupCards);
}

// функция открытия попапов
function addPopupOpened(item) {
    item.classList.add('popup_opened');
    document.addEventListener('keydown', keyHandler);
}

// функция закрытия попапов 
function removePopupOpened(item) {
    item.classList.remove('popup_opened');
    document.removeEventListener('keydown', keyHandler);
}

//функция закрытия попапа по нажатию на Esc
function keyHandler(evt) {
    if (evt.key === 'Escape') {
        removePopupOpened(document.querySelector('.popup_opened'));
    }
}
// нажатие на кнопку редактирования профиля
profileAddButton.addEventListener('click', function () {
    addPopupOpened(popupCards);
    validateForm(formElementCards);
});
// нажатие на кнопку добавления новой карточки
profileEditButton.addEventListener('click', function () {
    addPopupOpened(popupProfile);
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    validateForm(formProfileElement);
});
// нажатие на крестик
popupCloseButton.forEach((btn) => {
    btn.addEventListener('click', function () {
        removePopupOpened(document.querySelector('.popup_opened'));
    })
});

// нажатие на оверлей 
popup.forEach((popupItem) => {
    popupItem.addEventListener('click', function () {
        removePopupOpened(document.querySelector('.popup_opened'));
    });
    popupItem.querySelector('.popup__container').addEventListener('click', function (event) {
        event.stopImmediatePropagation();
    });
});

// отправки форм
formProfileElement.addEventListener('submit', formProfileSubmitHandler);
formElementCards.addEventListener('submit', formSubmitHandlerCards);
