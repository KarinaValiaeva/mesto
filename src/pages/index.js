import './index.css';
import {
    initialCards,
    profileEditButton,
    profileAddButton,
    formProfileElement,
    nameInput,
    jobInput,
    cards,
    formElementCards,
    validationConfig
} from '../utils/constants.js';

import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Card from '../components/Card.js';
import FormValidator from '../components/Validate.js';
import Section from '../components/Section.js';

// валидация для попапа редактирования профиля
const profileFormValidator = new FormValidator(validationConfig, formProfileElement);
profileFormValidator.enableValidation();

// валидация для попапа добавления карточки
const newCardFormValidator = new FormValidator(validationConfig, formElementCards);
newCardFormValidator.enableValidation();

// создание экземпляра класса для попапа изображения
const popupWithImage = new PopupWithImage('.popup_image');
popupWithImage.setEventListeners();

// отрисовка карточек в секции cards
const CardList = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = new Card(item, '.card', popupWithImage);
        const cardElement = card.generateCard();
        cards.append(cardElement);
        CardList.addItem(cardElement);
    }
}, '.cards');
CardList.renderItems();

// создание экземпляра класса для попапа добавления новой карточки
const popupCardsWithForm = new PopupWithForm(
    '.popup_cards',
    {
        handleFormSubmit: (item) => {
            const newCard = new Card(item, '.card', popupWithImage);
            const cardElement = newCard.generateCard();
            cards.prepend(cardElement);
        }
    });
popupCardsWithForm.setEventListeners();

// создание экземпляра класса для отображения информации о пользователе
const userInfo = new UserInfo({ name: '.profile__name', job: '.profile__job' });

// создание экземпляра класса для попапа редактирования профиля
const popupProfileWithForm = new PopupWithForm(
    '.popup_profile',
    {
        handleFormSubmit: (item) => { userInfo.setUserInfo(item) }
    }
);
popupProfileWithForm.setEventListeners();

// нажатие на кнопку добавления новой карточки
profileAddButton.addEventListener('click', function () {
    popupCardsWithForm.open();
    newCardFormValidator.resetValidation();
});

// нажатие на кнопку редактирования профиля
profileEditButton.addEventListener('click', function () {
    popupProfileWithForm.open();
    nameInput.value = userInfo.getUserInfo().name;
    jobInput.value = userInfo.getUserInfo().job;
    profileFormValidator.resetValidation();
});