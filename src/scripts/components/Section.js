//ООП Класс для отрисовки элементов на странице
export default class Section {
    constructor(renderer, containerSelector) {
      this._renderer = renderer;
      this._container = document.querySelector(containerSelector);
    };

//ООП Добавление карточек
renderItems(addCards) {
    addCards.forEach(item => {
      this._renderer(item);
    })
  };

//ООП Добавление карточек в начало
addItemPrepend(item) {
  this._container.prepend(item);
}

// ООП Добавление карточек в конец
addItemAppend(item) {
  this._container.append(item);
}
};