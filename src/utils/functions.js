// функция для создания экземпляра карточки
export default function createCard(item) {
    const card = new Card(item, '.card', popupWithImage);
    const cardElements = card.generateCard();
    return cardElements;
}