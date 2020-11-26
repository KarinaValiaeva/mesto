let profileEditButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupCloseButton = document.querySelector('.popup__button-close');

let profileName = document.querySelector('.profile__name');
let profileField = document.querySelector('.profile__field');

document.querySelector('.form__text_type_name').value = profileName.textContent;
document.querySelector('.form__text_type_field').value = profileField.textContent;


profileEditButton.addEventListener('click', togglePopupOpened);
popupCloseButton.addEventListener('click', togglePopupOpened);



function togglePopupOpened() {
    popup.classList.toggle('popup_opened');
}

// Находим форму в DOM
let formElement = document.querySelector('.form');
// Воспользуйтесь методом querySelector()

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                        // Так мы можем определить свою логику отправки.
                        // О том, как это делать, расскажем позже.

    // Находим поля формы в DOM
    let nameInput = formElement.querySelector('.form__text_type_name'); // Воспользуйтесь инструментом .querySelector()
    let jobInput = formElement.querySelector('.form__text_type_field'); // Воспользуйтесь инструментом .querySelector()
    
    
    // Получите значение полей из свойства value
  //  nameInput.value;
    //jobInput.value;
    // Выберите элементы, куда должны быть вставлены значения полей
    
    // Вставьте новые значения с помощью textContent
    profileName.textContent = nameInput.value;
    profileField.textContent = jobInput.value;
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
formElement.addEventListener('submit', togglePopupOpened);
