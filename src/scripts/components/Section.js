//ООП Класс для отрисовки элементов на странице
export default class Section {
    constructor( { items, renderer }, containerSelector) {
      this._items = items;
      this._renderer = renderer;
      this._container = document.querySelector(containerSelector);
    };

//ООП Добавление карточек
renderItems() {
    this._items.forEach(item => {
      this.addItem(item);
    })
  };

//ООП Добавление карточек в начало
addItem(data) {
    this._container.prepend(this._renderer(data));
  };
};