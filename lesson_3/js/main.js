const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';


class ProductsList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];//массив товаров из JSON документа
        this._getProducts()
            .then(data => { //data - объект js
                this.goods = data;
                this.render()
            });
    }

    _getProducts() {
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            });
    }

    calcSum() {
        return this.allProducts.reduce((accum, item) => accum += item.price, 0);
    }

    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObj = new ProductItem(product);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }
    }
}


class ProductItem {
    constructor(product, img = 'https://via.placeholder.com/200x150') {
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = img;
    }

    render() {
        return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} $</p>
                    <button class="buy-btn">Купить</button>
                </div>
            </div>`
    }
}

let list = new ProductsList();


class Basket {
    constructor(container = '.bastetItems') {
        this.container = container;
        this.basketGoods = [];//массив товаров из JSON документа
        this._getBasket()
            .then(data => { //data - объект js. Обрабатываем promise .json
                this.basketGoods = data.contents; // Получаем массив с объектами заказа, используем данные по ключу contents
                // console.log(this.basketGoods);
                this.render()
            });
    }

    _getBasket() { // Запускаем запрос на получение данных корзины
        return fetch(`${API}/getBasket.json`)
            .then(result => result.json()) // Обрабатываем promise fetch
            .catch(error => {
                console.log(error);
            });
    }


    render() { // Формируем данные для вывода в html
        const block = document.querySelector(this.container);
        const basketHeader = `<hr> <b> Товары в корзине (${this.calcQuantity()}) </b>`; // Заголовок для вывода информации корзины
        block.insertAdjacentHTML('beforeend', basketHeader);
        for (let item of this.basketGoods) {
            const basketObj = new BasketItem(item);
            block.insertAdjacentHTML('beforeend', basketObj.render());
        }
    }

    calcQuantity() { // Считаем кол-во в этом методе, чтобы повторно не отправлять запрос на сервер, тк все данные у нас уже есть
        let totalQuantity = 0;
        this.basketGoods.forEach(item => {
            totalQuantity += item.quantity;
        })
        return totalQuantity;
    }

}

class BasketItem {
    constructor(item) {
        this.product_name = item.product_name;
        this.price = item.price;
        this.quantity = item.quantity;

    }

    render() {
        return `<div>
            <p>${this.product_name} - ${this.price} $, ${this.quantity} шт.</p>
        </div>`
    }
}

function getBasket() {
    let basketList = new Basket();
}


// данные на сервере хранятся в виде:

// {
//     "amount": 46600,
//     "countGoods": 2,
//     "contents": [
//       {
//         "id_product": 123,
//         "product_name": "Ноутбук",
//         "price": 45600,
//         "quantity": 1
//       },
//       {
//         "id_product": 456,
//         "product_name": "Мышка",
//         "price": 1000,
//         "quantity": 1
//       }
//     ]
//   }