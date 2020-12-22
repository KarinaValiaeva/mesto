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
const cardTemplate = document.querySelector('.card');
const popupImage = document.querySelector('.popup_image');
const popupPhoto = popupImage.querySelector('.popup__photo');
const popupCaption = popupImage.querySelector('.popup__caption');

// Секция cards
function renderCards() {
    const cardElements = initialCards.map(composeCards);
    cards.append(...cardElements);
}

function composeCards(el) {
   const cardElement = cardTemplate.content.cloneNode(true);
    cardElement.querySelector('.card__title').textContent = el.name;
    cardElement.querySelector('.card__photo').src = el.link;
    cardElement.querySelector('.card__photo').alt = el.name;
    cardElement.querySelector('.card__like-button').addEventListener('click', addLikeButton);
    cardElement.querySelector('.card__photo').addEventListener('click', openPopupPhoto);
    addRemoveListenerToItem(cardElement);
    return cardElement;
}

// функция для лайков
function addLikeButton(evt) {
    const eventTarget = evt.target;
        eventTarget.classList.toggle('card__like-button_active');
}

// функция добавления новой карточки
function addCard() {
    const newCard = composeCards({name: titleInput.value, link: linkInput.value});
    cards.prepend(newCard);
}

// функция удаления карточки
 function removeCard(evt) {
     const targetItem = evt.target.closest('.card__item');
     targetItem.remove();
 }

// функция для слушателя кнопки удаления карточки
 function addRemoveListenerToItem(item){       
     const removeButton = item.querySelector('.card__btn-remove');
     removeButton.addEventListener('click', removeCard);
 }

// функция для сохранения новых значений профиля
function formProfileSubmitHandler(evt) {
    evt.preventDefault();
    removePopupOpened(popupProfile);
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
}

// popup image
function openPopupPhoto(evt) {
    addPopupOpened(popupImage);  
    const targetItem = evt.target.closest('.card__item');
    const targetPhoto = targetItem.querySelector('.card__photo');
    popupPhoto.src = targetPhoto.src;
    const targetCaption = targetItem.querySelector('.card__title');
    popupCaption.textContent = targetCaption.textContent;
    popupPhoto.alt = targetCaption.textContent;
}

// функция для сохранения новой карточки
 function formSubmitHandlerCards(evt) {
     evt.preventDefault();
     addCard();
     titleInput.value = '';
     linkInput.value = '';
     removePopupOpened(popupCards);

 }

// функция открытия попапов
function addPopupOpened(item) {
     item.classList.add('popup_opened');
}

 // функция закрытия попапов 
 function removePopupOpened(item) {
    item.classList.remove('popup_opened');
}

 //функция закрытия попапа по нажатию на Esc
function keyHandler(evt) {
    if (evt.key === 'Escape') {
        removePopupOpened(document.querySelector('.popup_opened'))
    }
}

renderCards();

profileAddButton.addEventListener('click', function () {
    addPopupOpened(popupCards);
    const form = popupCards.querySelector('.popup__form');
    const submitButton = form.querySelector('.popup__button-submit');
    setButtonState(submitButton, form.checkValidity(), validationConfig)
});

profileEditButton.addEventListener('click', function () {
    addPopupOpened(popupProfile);
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
});

popupCloseButton.forEach((btn) => {
    btn.addEventListener('click', function () {
        removePopupOpened(document.querySelector('.popup_opened'));
    })
});

// нажатие на Esc
document.addEventListener('keydown', keyHandler);

// нажатие на оверлей
popup.forEach((popupItem) => {
    popupItem.addEventListener('click', function () {
        removePopupOpened(document.querySelector('.popup_opened'));
    });
    popupItem.querySelector('.popup__container').addEventListener('click', function (event) {
        event.stopImmediatePropagation();
    });
});

formProfileElement.addEventListener('submit', formProfileSubmitHandler);
formElementCards.addEventListener('submit', formSubmitHandlerCards);