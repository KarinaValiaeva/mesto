export default class Card {
    constructor(data, cardSelector, handleCardClick, api, {handleButtonDeleteCard}, {handleLikeClick}) {
        this._title = data.name;
        this._photo = data.link;
        this._id = data.owner._id;
        this._idCard = data._id;
        this._likes = data.likes;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._api = api;
        this._handleButtonDeleteCard = handleButtonDeleteCard;
        this._handleLikeClick = handleLikeClick;
    }
    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.card__item')
            .cloneNode(true);
        return cardElement;
    }
    generateCard() {
        this._element = this._getTemplate();
        this.addTrashCan();
        this._cardImage = this._element.querySelector('.card__photo');
        this._setEventListeners();
        this._element.querySelector('.card__title').textContent = this._title;
        this._cardImage.src = this._photo;
        this._cardImage.alt = this._title;
        this._element.querySelector('.card__like-counter').textContent = this._likes.length;
        
        return this._element;
    }


    getCardId () {
        return this._idCard;
    }

    addTrashCan () {
        this._btnRemove = this._element.querySelector('.card__btn-remove');
        this._api
        .getUserInfo()
        .then((data) => {
            const userId = data._id
            if (userId === this._id) {
                this._btnRemove.classList.add('card__btn-remove_active');
            }})
            .catch((err)=> console.log(err))
        }

    addLike(evt) {
        evt.target.classList.add('card__like-button_active');
        this._element.querySelector('.card__like-counter').textContent = this._likes.length;
    }

    _deleteLike(evt) {
        evt.target.classList.remove('card__like-button_active');
        this._api
        .deleteLike(this._id)
        .then((item) => {
            console.log(item)
            this._element.querySelector('.card__like-counter').textContent = this._likes.length});
    }

     removeCard() {
        this._element.remove();
          }

    _setEventListeners() {
        this._cardImage.addEventListener('click', () => { this._handleCardClick.open(this._title, this._photo) });
        this._btnRemove.addEventListener('click', this._handleButtonDeleteCard);
        this._element.querySelector('.card__like-button').addEventListener('click', this._handleLikeClick);
    }
}