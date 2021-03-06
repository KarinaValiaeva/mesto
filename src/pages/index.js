import "./index.css";
import Api from "../components/Api";
import {
  profileEditButton,
  profileAddButton,
  formProfileElement,
  nameInput,
  jobInput,
  formElementCards,
  formElementAvatar,
  avatarEditButton,
  avatarPhoto,
  validationConfig,
} from "../utils/constants.js";

import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupSubmit from "../components/PopupSubmit.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";

let userId = null;

// валидация для попапа редактирования профиля
const profileFormValidator = new FormValidator(
  validationConfig,
  formProfileElement
);
profileFormValidator.enableValidation();

// валидация для попапа добавления карточки
const newCardFormValidator = new FormValidator(
  validationConfig,
  formElementCards
);
newCardFormValidator.enableValidation();

//валидация для попапа обновления аватара
const avatarFormValidator = new FormValidator(
  validationConfig,
  formElementAvatar
);
avatarFormValidator.enableValidation();

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-20",
  headers: {
    authorization: "3b3ba091-9f36-415d-9c11-8ad47d6b1eca",
    "Content-Type": "application/json",
  },
});

Promise.all([
  // передаем массив промисов которые нужно выполнить
  api.getUserInfo(),
  api.getInitialCards(),
])
  .then(([userData, initialCards]) => {
    // загрузка информации о пользователе на страницу
    userId = userData._id;
    avatarPhoto.src = userData.avatar;
    document.querySelector(".profile__name").textContent = userData.name;
    document.querySelector(".profile__job").textContent = userData.about;
    // отрисовка карточек в секции cards
    const cardList = new Section(
      {
        items: initialCards,
        renderer: (item) => {
          const cardElement = createCard(item);
          cardList.addItem(cardElement);
        },
      },
      ".cards"
    );
    cardList.renderItems();
  })
  .finally(() => {
    // слушатели нажатий
    profileEditButton.addEventListener("click", function () {
      popupProfileWithForm.open();
      nameInput.value = userInfo.getUserInfo().name;
      jobInput.value = userInfo.getUserInfo().job;
      profileFormValidator.resetValidation();
    });
    avatarEditButton.addEventListener("click", () => {
      popupUpdateAvatar.open();
      avatarFormValidator.resetValidation();
    });
    profileAddButton.addEventListener("click", function () {
      popupCardsWithForm.open();
      newCardFormValidator.resetValidation();
    });
  })
  .catch((err) => console.log(err));

// создание экземпляра класса для попапа добавления новой карточки с загрузкой на сервер
const popupCardsWithForm = new PopupWithForm(".popup_cards", {
  handleFormSubmit: (item) => {
    renderLoading(true, formElementCards);
    api
      .postCard(item)
      .then((item) => {
        const cardElement = createCard(item);
        const cardList = document.querySelector(".cards");
        cardList.prepend(cardElement);
      })
      .finally(() => {
        renderLoading(false, formElementCards);
        popupCardsWithForm.close();
      });
  },
});
popupCardsWithForm.setEventListeners();

// создание экземпляра класса для отображения информации о пользователе
const userInfo = new UserInfo({
  name: ".profile__name",
  about: ".profile__job",
});

// создание экземпляра класса для попапа редактирования профиля с загрузкой на сервер
const popupProfileWithForm = new PopupWithForm(".popup_profile", {
  handleFormSubmit: (item) => {
    renderLoading(true, formProfileElement);
    api
      .patch(item)
      .then((item) => {
        userInfo.setUserInfo({ name: item.name, about: item.about });
      })
      .finally(() => {
        renderLoading(false, formProfileElement);
        popupProfileWithForm.close();
      });
  },
});
popupProfileWithForm.setEventListeners();

// создание экземпляра класса для попапа подтверждения удаления карточки
const popupRemoveCard = new PopupSubmit(".popup_remove-card");

// создание экземпляра класса для попапа обновления аватара
const popupUpdateAvatar = new PopupWithForm(".popup_avatar", {
  handleFormSubmit: (avatar) => {
    renderLoading(true, formElementAvatar);
    api
      .updateAvatar(avatar.link)
      .then((item) => {
        item.avatar = avatar.link;
        avatarPhoto.src = item.avatar;
      })
      .finally(() => {
        renderLoading(false, formElementAvatar);
        popupUpdateAvatar.close();
      });
  },
});
popupUpdateAvatar.setEventListeners();

// создание экземпляра класса для попапа изображения
const popupWithImage = new PopupWithImage(".popup_image");
popupWithImage.setEventListeners();

// функция для создания карточки
function createCard(item) {
  const card = new Card(
    item,
    ".card",
    popupWithImage,
    userId,
    {
      handleButtonDeleteCard: () => {
        popupRemoveCard.setEventListeners(() => {
          removeCard(card);
        });
        popupRemoveCard.open();
      },
    },
    {
      handleLikeAddClick: () => {
        api
          .addLike(card.getCardId())
          .then((res) => {
            card.returnLikes(res.likes.length);
          })
          .catch((err) => console.log(err));
      },
    },
    {
      handleLikeDelete: () => {
        api
          .deleteLike(card.getCardId())
          .then((res) => {
            card.returnLikes(res.likes.length);
          })
          .catch((err) => console.log(err));
      },
    }
  );

  const cardElements = card.generateCard();
  return cardElements;
}

// функция для удаления карточки
function removeCard(card) {
  api
    .deleteCard(card.getCardId())
    .then(() => {
      popupRemoveCard.close();
      card.removeCard();
    })
    .catch((err) => console.log(err));
}

// функция для изменения текста кнопки в попапах при загрузке
function renderLoading(isLoading, popupForm) {
  if (isLoading) {
    popupForm.querySelector(".popup__button-submit").textContent = "Сохранение";
  } else {
    popupForm.querySelector(".popup__button-submit").textContent = "Сохранить";
  }
}
