import Popup from './Popup.js';
export default class PopupSubmit extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._buttonConfirm = this._popup.querySelector('.popup__button-submit_remove-card');
    }

    setEventListeners(funcRemove) {
        super.setEventListeners();
        this._funcRemove = funcRemove;
        this._buttonConfirm.addEventListener('click', this._funcRemove);
        
        
    }
}