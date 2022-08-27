class ProductList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this._fetchProducts();//рекомендация, чтобы метод был вызван в текущем классе
        this.render();//вывод товаров на страницу
        this.costSum = 0; // Сумма всех товаров
        this.getProductsCostSum();
    }
    _fetchProducts() {
        this.goods = [
            { id: 1, title: 'Notebook', price: 2000 },
            { id: 2, title: 'Mouse', price: 20 },
            { id: 3, title: 'Keyboard', price: 200 },
            { id: 4, title: 'Gamepad', price: 50 },
        ];
    }

    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const item = new ProductItem(product);
            block.insertAdjacentHTML("beforeend", item.render());
            //              block.innerHTML += item.render();
        }
    }

    // Определяем сумму стоимости всех товаров
    getProductsCostSum() {
        this.goods.forEach(item => this.costSum += item.price);
        const cost = document.querySelector('.costSum');
        cost.innerHTML = `Сумма стоимости всех товаров ${this.costSum}`;
        // console.log(`Сумма стоимости всех товаров ${this.costSum}`);
    }
}

class ProductItem {
    constructor(product, img = 'https://via.placeholder.com/200x150') {
        this.title = product.title;
        this.id = product.id;
        this.price = product.price;
        this.img = img;
    }
    render() {
        return `<div class="product-item">
                <img src="${this.img}">
                <h3>${this.title}</h3>
                <p>${this.price}</p>
                <button class="buy-btn">Купить</button>
            </div>`
    }
}

let list = new ProductList();


// Классы для работы с корзиной

// Список товаров корзины
class CartList {
    constructor() { }

    getTotalCost() { } // Общая стоимость
    getTotalQuantity() { } // Количество
    showProducts() { } //Вывести товары корзины
    clearCart() { } //Очистить корзину
}

// Товары корзины
class CartItem {
    constructor() { }

    addProduct() { } // Добавить товар
    deleteProduct() { } // Удалить товар
    showProduct() { } // Вывести 1 товар (посмотреть характеристики, описание)
}