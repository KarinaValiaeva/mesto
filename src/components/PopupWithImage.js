import Popup from './Popup.js';
export default class PopupWithImage extends Popup {
    open(name, link) {
        super.open();
        this._popup.querySelector('.popup__photo').src = link;
        this._popup.querySelector('.popup__photo').alt = name;
        this._popup.querySelector('.popup__caption').textContent = name;
    }
}