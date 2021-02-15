import './index.css';
import Api from '../components/api';
import {
    initialCards,
    profileEditButton,
    profileAddButton,
    formProfileElement,
    nameInput,
    jobInput,
    formElementCards,
    validationConfig
} from '../utils/constants.js';

import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
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


const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-20',
    headers: {
      authorization: '3b3ba091-9f36-415d-9c11-8ad47d6b1eca',
      'Content-Type': 'application/json'
    }
  });

//console.log(api.getUserInfo());
// api.patch();




// отрисовка карточек в секции cards

  api.getInitialCards()
      .then((cards) => {
          const cardList = new Section({
             items: cards,
            
              renderer: ((item) => {
                  const cardElement = createCard(item);
                 console.log(cardElement);
                  cardList.addItem(cardElement);
                  //cardElement.querySelector('.card__btn-remove').remove();
                })
          }, '.cards');
          cardList.renderItems();
      });

      // создание новой карточки
      const popupCardsWithForm = new PopupWithForm(
        '.popup_cards',
        {
            handleFormSubmit: (item) => {
                api.postCard(item)
                .then ((item) => {
                        const cardElement = createCard(item);
                          
                        const cardList = document.querySelector('.card');
                        console.log(cardList); 
                        cardList.prepend(cardElement);
                    })
                    }
                    
            }
        );
    popupCardsWithForm.setEventListeners();
    

//      const cardList = new Section({
//     //    items: post,
//         renderer: 
       
//         api.getInitialCards()
//         .then((item) => {

//              const cardElement = createCard(item);
//              console.log(cardElement);
//              cardList.addItem(cardElement);
//              cardElement.querySelector('.card__btn-remove').remove();
//          })

//      }, '.cards');
//    //  cardList.renderItems();




// const popupCardsWithForm = new PopupWithForm(
//     '.popup_cards',
//     {
//         handleFormSubmit: (item) => {
//             api.postCard(item)
//             .then ((item) => {
//                     const cardElement = createCard(item);
//                     console.log(cardElement);
//                     cardList.prependItem(cardElement);
                   
//                 })
//                 }
                
//         }
//     );
// popupCardsWithForm.setEventListeners();


// создание экземпляра класса для попапа добавления новой карточки
// const popupCardsWithForm = new PopupWithForm(
//     '.popup_cards',
//     {
//         handleFormSubmit: (item) => {
//             const cardElement = createCard(item)
//             cardList.prependItem(cardElement);
            
//         }
//     });
// popupCardsWithForm.setEventListeners();

// создание экземпляра класса для отображения информации о пользователе
const userInfo = new UserInfo({ name: '.profile__name', job: '.profile__job' });

// создание экземпляра класса для попапа редактирования профиля
const popupProfileWithForm = new PopupWithForm(
    '.popup_profile',
    {
        handleFormSubmit: (item) => {
            userInfo.setUserInfo(item);
        }
    }
);
popupProfileWithForm.setEventListeners();

// функция для создания экземпляра карточки
function createCard(item) {
    const card = new Card(item, '.card', popupWithImage);
    const cardElements = card.generateCard();
    return cardElements;
}


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