class Hamburger {
    constructor(size, stuffing, topping) { // Конструктор получает размер, начинки, и доп наполнители
        this.size = size;
        this.stuffing = stuffing;
        this.spice = topping[0] ? 'spice' : ''; // Данные о приправах и соусах получаем из массива
        this.sauce = topping[1] ? 'sauce' : '';
        this.products = []; // Создаем пустой массив продуктов для гамбургера
        this._fetchProducts(); // Наполняем его
        this.price = 0;
        this.calories = 0;
    }

    _fetchProducts() {
        this.products = [
            { title: 'small', description: 'маленький', price: 50, calories: 20 },
            { title: 'big', description: 'большой', price: 100, calories: 40 },
            { title: 'cheese', description: 'сыр', price: 10, calories: 20 },
            { title: 'salad', description: 'салат', price: 20, calories: 5 },
            { title: 'potato', description: 'картофель', price: 15, calories: 10 },
            { title: 'spice', description: 'специи', price: 15, calories: 0 },
            { title: 'sauce', description: 'майонез', price: 20, calories: 5 },
        ];
    }

    // Показываем информацию по составу заказа
    showContent() {

        const block = document.querySelector('#showContent');
        let msg = `Ваш заказ: `;

        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].title == this.size) {
                msg += `${this.products[i].description} бургер, `;
            }
            if (this.products[i].title == this.stuffing) {
                msg += `наполнитель: ${this.products[i].description}`;
            }
            if (this.products[i].title == this.spice) {
                msg += `, специи: ДА`;
            }
            if (this.products[i].title == this.sauce) {
                msg += `, майонез: ДА`;
            }
        }
        block.innerHTML = msg;
        // console.log(msg);
    }

    // Показываем стоимость и калорийность
    showPriceAndCalories() {

        const info = document.querySelector('#info');

        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].title == this.size) {
                this.price += this.products[i].price
                this.calories += this.products[i].calories
            }
            if (this.products[i].title == this.stuffing) {
                this.price += this.products[i].price
                this.calories += this.products[i].calories
            }
            if (this.products[i].title == this.spice) {
                this.price += this.products[i].price
                this.calories += this.products[i].calories
            }
            if (this.products[i].title == this.sauce) {
                this.price += this.products[i].price
                this.calories += this.products[i].calories
            }
        }
        let msg = `Стоимость бургера составляет ${this.price} руб, калорийность ${this.calories} калорий`;
        info.innerHTML = msg;
    }

}

// По нажатию кнопки создаем экземпляр класса
function makeOrder() {
    // Получаем из формы данные
    const form = document.getElementById("order");

    const size = form.elements["size"].value;
    const stuffing = form.elements["stuffing"].value;
    const topping = [document.querySelector('#spice').checked, document.querySelector('#sauce').checked];

    const burger = new Hamburger(size, stuffing, topping);
    burger.showContent();
    burger.showPriceAndCalories();
}
