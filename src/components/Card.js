export default class Card {
    constructor(data, cardSelector, handleCardClick, userId, { handleButtonDeleteCard }, { handleLikeAddClick }, { handleLikeDelete }) {
        this._title = data.name;
        this._photo = data.link;
        this._id = data.owner._id;
        this._idCard = data._id;
        this._likes = data.likes;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._userId = userId;
        this._handleButtonDeleteCard = handleButtonDeleteCard;
        this._handleLikeAddClick = handleLikeAddClick;
        this._handleLikeDelete = handleLikeDelete;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.card__item')
            .cloneNode(true);
        return cardElement;
    }

    // метод для генерации карточки
    generateCard() {
        this._element = this._getTemplate();
        this._element.querySelector('.card__like-counter').textContent = this._likes.length;
        this._likeButton = this._element.querySelector('.card__like-button');
        this._setLikeActive();
        this._addTrashCan();
        this._cardImage = this._element.querySelector('.card__photo');
        this._setEventListeners();
        this._element.querySelector('.card__title').textContent = this._title;
        this._cardImage.src = this._photo;
        this._cardImage.alt = this._title;

        return this._element;
    }

    // отображение активных лайков при перезагрузке
    _setLikeActive() {
        this._likes.forEach((item) => {
            if (this._userId === item._id) {
                this._likeButton.classList.add('card__like-button_active');
            }
        })
    }

    // метод для получения id карточки
    getCardId() {
        return this._idCard;
    }

    // добавление корзины на карточку
    _addTrashCan() {
        this._btnRemove = this._element.querySelector('.card__btn-remove');
        if (this._userId === this._id) {
            this._btnRemove.classList.add('card__btn-remove_active');
        }
    }

    // метод постановки лайка (отображения состояние активного лайка и загрузкка на сервер)
    _addLike(evt) {
        if (evt.target.classList.contains('card__like-button_active')) {
            this._handleLikeDelete();
            evt.target.classList.remove('card__like-button_active');
        }
        else {
            this._handleLikeAddClick();
            evt.target.classList.add('card__like-button_active');
        }
    }

    // метод для обновления счетчика лайков на странице
    returnLikes(count) {
        this._element.querySelector('.card__like-counter').textContent = count;
    }

    // метод удаления карточки
    removeCard() {
        this._element.remove();
    }
    // слушатели
    _setEventListeners() {
        this._cardImage.addEventListener('click', () => { this._handleCardClick.open(this._title, this._photo) });
        this._btnRemove.addEventListener('click', this._handleButtonDeleteCard);
        this._likeButton.addEventListener('click', this._addLike.bind(this));
    }
}