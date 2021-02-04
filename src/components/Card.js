export default class Card {
    constructor(data, cardSelector, handleCardClick) {
        this._title = data.name;
        this._photo = data.link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
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
        this._cardImage = this._element.querySelector('.card__photo');
        this._setEventListeners();
        this._element.querySelector('.card__title').textContent = this._title;
        this._cardImage.src = this._photo;
        this._cardImage.alt = this._title;
        return this._element;
    }
    _toggleLikeButton(evt) {
        evt.target.classList.toggle('card__like-button_active');
    }
    _removeCard(evt) {
        evt.target.closest('.card__item').remove();
    }
    _setEventListeners() {
        this._cardImage.addEventListener('click', () => { this._handleCardClick.open(this._title, this._photo) });
        this._element.querySelector('.card__like-button').addEventListener('click', this._toggleLikeButton);
        this._element.querySelector('.card__btn-remove').addEventListener('click', this._removeCard);
    }
}