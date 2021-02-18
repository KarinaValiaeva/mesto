import './index.css';
import Api from '../components/api';
import {
    profileEditButton,
    profileAddButton,
    formProfileElement,
    nameInput,
    jobInput,
    formElementCards,
    formElementAvatar,
    validationConfig
} from '../utils/constants.js';

import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupSubmit from '../components/PopupSubmit.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';

const avatarPhoto = document.querySelector('.profile__avatar');
// валидация для попапа редактирования профиля
const profileFormValidator = new FormValidator(validationConfig, formProfileElement);
profileFormValidator.enableValidation();

// валидация для попапа добавления карточки
const newCardFormValidator = new FormValidator(validationConfig, formElementCards);
newCardFormValidator.enableValidation();

//валидация для попапа обновления аватара
const avatarFormValidator = new FormValidator(validationConfig, formElementAvatar);
avatarFormValidator.enableValidation();

// создание экземпляра класса для попапа изображения
const popupWithImage = new PopupWithImage('.popup_image');
popupWithImage.setEventListeners();


const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-20',
    headers: {
        authorization: '3b3ba091-9f36-415d-9c11-8ad47d6b1eca',
        'Content-Type': 'application/json'
    }
});

// загрузка информации о пользователе на страницу

api.getUserInfo()
.then ((item) => {
    avatarPhoto.src = item.avatar;
    document.querySelector('.profile__name').textContent = item.name;
    document.querySelector('.profile__job').textContent = item.about;
});


// отрисовка карточек в секции cards

api.getInitialCards()
    .then((cards) => {
        const cardList = new Section({
            items: cards,
            renderer: ((item) => {
               // console.log(item);
                const cardElement = createCard(item);
                cardList.addItem(cardElement);
            })
        }, '.cards');
        cardList.renderItems();
    });

// создание экземпляра класса для попапа добавления новой карточки с загрузкой на сервер
const popupCardsWithForm = new PopupWithForm(
    '.popup_cards',
    {
        handleFormSubmit: (item) => {
            renderLoading(true, formElementCards);
            api.postCard(item)
                .then((item) => {

                    const cardElement = createCard(item);
                    const cardList = document.querySelector('.cards');
                    cardList.prepend(cardElement);
                })
                .finally(() => {
                    renderLoading(false, formElementCards)
                  })
        }

    }
);
popupCardsWithForm.setEventListeners();


// создание экземпляра класса для отображения информации о пользователе
const userInfo = new UserInfo({ name: '.profile__name', about: '.profile__job' });

// создание экземпляра класса для попапа редактирования профиля с загрузкой на сервер
const popupProfileWithForm = new PopupWithForm(
    '.popup_profile',
    {
        handleFormSubmit: (item) => {
            renderLoading(true, formProfileElement)
         api.patch(item)
        .then((item) => {
            userInfo.setUserInfo({name: item.name, about: item.about});
        })
        .finally(() => {
            renderLoading(false, formProfileElement)
          })
        }
    }
);
popupProfileWithForm.setEventListeners();

const popupRemoveCard = new PopupSubmit('.popup_remove-card');

// функция для создания карточки
function createCard(item) {
    const card = new Card(item, '.card', popupWithImage, api,
        {
            handleButtonDeleteCard: () => {
                popupRemoveCard.setEventListeners(() => { removeCard(card) });
                popupRemoveCard.open();
            }

        },
        {
            handleLikeClick: () => {
                console.log(card);
                //like(card);
            }
        }
    );

    const cardElements = card.generateCard();
    return cardElements;
}
// создание экземпляра класса для попапа обновления аватара
const popupUpdateAvatar = new PopupWithForm('.popup_avatar', 
{
    handleFormSubmit: (avatar) => {
        renderLoading(true, formElementAvatar)
        api.updateAvatar(avatar.link)
        .then ( (item) => {
            item.avatar = avatar.link
            avatarPhoto.src = item.avatar;

        })
        .finally(() => {
            renderLoading(false, formElementAvatar)
          })
            }
    }

);
popupUpdateAvatar.setEventListeners();


// функция для удаления карточки
function removeCard (card) {

    api.deleteCard(card.getCardId())
    .then(() => {
      
        popupRemoveCard.close();
        card.removeCard();
    });
}

// функция для постановки лайка 
function like (card) {
    console.log(card)
    // api
    // .addLike(card.likes)
    // .then((res) => {
    //     console.log(res);
       // card.addlike();
    //})
}


// функция для изменения текста кнопки в попапах при загрузке 
function renderLoading (isLoading, popupForm) {
    if (isLoading) {
        popupForm.querySelector('.popup__button-submit').textContent = 'Сохранение';
    } else {
        popupForm.querySelector('.popup__button-submit').textContent = 'Сохранить';
    }
}


//нажатие на кнопку редактирования аватара
document.querySelector('.profile__edit-avatar').addEventListener('click', () => {
    popupUpdateAvatar.open();
    avatarFormValidator.resetValidation();
});

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
})