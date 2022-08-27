const products = [
    { id: 1, title: 'Ноутбук', price: 2000, description: 'Игровой ноутбук. Процессор AMD' },
    { id: 2, title: 'Мышка', price: 20, description: 'Две кнопки, скролл' },
    { id: 3, title: 'Клавиатура', price: 200, description: 'Русская и английская раскладки' },
    { id: 4, title: 'Джойстик', price: 50, description: 'Подходит для ПК и приставок' },
    { id: 5, title: 'Наушники', price: 70, description: 'Закрытого типа. Частоты: 20 - 20000 Гц' },
    { id: 6, title: 'Видеорегистратор', price: 42, description: 'Full HD' },
];

//Функция для формирования верстки каждого товара
const renderProduct = (data) => {
    return `<div class="product-item">
                <h3>${data.title}</h3>
                <img src="img/${data.id}.jpg" alt="" width="100px" height="100px" data-img=${data.id}>
                <p>${data.description}</p>
                <p class="price">${data.price} руб</p>
                <button class="buy-btn" data-id=${data.id}>Купить</button>
            </div>`
};

const renderPage = list => {
    const productsList = list.map(item => renderProduct(item));
    // console.log(productsList);
    // Явно указываем join, чтобы не было знака(,)
    document.querySelector('.products').innerHTML = productsList.join('');
};

renderPage(products);


let currentYear = new Date().getFullYear();
let contact = 'shop@shop.com';
document.querySelector('.footer').innerHTML = `${currentYear} ${contact}`;
