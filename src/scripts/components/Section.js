//ООП Класс для отрисовки элементов на странице
export default class Section {
    constructor( { items, renderer }, containerSelector) {
      this._items = items;
      this.renderer = renderer;
      this._container = document.querySelector(containerSelector);
    };

//ООП Добавление карточек
renderItems() {
    this._items.forEach(item => {
      this.addItem(this.renderer(item));
    })
  };

//ООП Добавление карточек в начало
addItem(element) {
    this._container.prepend(element);
  };
};