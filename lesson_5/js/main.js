const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        products: [],
        filtered: [],
        imgCatalog: 'https://via.placeholder.com/200x150',
        userSearch: '',
        show: false,
        cart: []
    },
    methods: {
        filter() {
            const regexp = new RegExp(this.userSearch, 'i');
            this.filtered = this.products.filter(product => regexp.test(product.product_name));
        },
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },
        addProduct(product) {
            // console.log(product.id_product);
            let find = this.cart.find(item => product.id_product === item.id_product);
            if (find) {
                find.quantity++;
            } else {
                this.$set(product, 'quantity', 1);
                this.cart.push(product);
            }
        },
        // Если элемент найден в корзине, уменьшаем кол-во на 1, и если кол-во == 0,
        // то находим индекс элемента в массиве, и удаляем элемент. 
        minusOneProduct(product) {
            let find = this.cart.find(item => product.id_product === item.id_product);
            if (find) {
                find.quantity--;
                if (find.quantity === 0) {
                    this.cart.splice(this.cart.indexOf(find), 1);
                }
            }
        },
        deleteProduct(product) { // Удалить элемент из массива
            let find = this.cart.find(item => product.id_product === item.id_product);
            if (find) {
                this.cart.splice(this.cart.indexOf(find), 1);
            }
        }
    },

    mounted() {
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                }
            });

        this.getJson(`getProducts.json`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                }
            });

        // При каждой перезагрузке страницы - добавляем все товары в массив filtered
        // А в дальнейшем уже фильтруем по запросу пользователя
        this.filtered = this.products;
    }
})
