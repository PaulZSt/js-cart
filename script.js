'use strict';

class Helpers{
    constructor() {
        this.xhr = new XMLHttpRequest();
        this.xhr.open('GET', '/products.json', false);
        this.xhr.send();
    }

    xhronreadystatechange (){
        if (this.xhr.readyState != 4) return;

        if (this.xhr.status != 200) {
            alert(this.xhr.status + ': ' + this.xhr.statusText);
        } else {
            const JsonArray = this.xhr.responseText;
            return JsonArray
        }
    }

    createLocalStorage = () => {
        if(!localStorage.getItem('productsInCart')) {
            let lSproductsJson = JSON.stringify(productInCart);
            localStorage.setItem('productsInCart', lSproductsJson);
        } else {
            this.getLocalStorage();
        }
    };

    setLocalStorage = () => {
            let lSproductsJson = JSON.stringify(productInCart);
            localStorage.setItem('productsInCart', lSproductsJson);
    };

    getLocalStorage = () => {
        productInCart = JSON.parse(localStorage.getItem('productsInCart'));
    }

}

let helper = new Helpers();

let productsArray = JSON.parse(helper.xhronreadystatechange());

class Product{
    id    = 0;
    title = '';
    price = 0;
    constructor( id, title, price ){
        this.id = id;
        this.title = title;
        this.price = price;
    }
}


class Cart {
    constructor(){
        let cartList = [];
        let cartProduct = [];
    }


    addOneProduct (id = null) {
        productInCart[id]++;
        helper.setLocalStorage();
    }

    cartProducts () {
        productInCart = JSON.parse(productInCart);
        if(productInCart[item.id] >= 1) {
           cartProduct[item.id] = productInCart[item.id];
        }
    }

}



let currency = ' UAH';
let productsList = [];
let productInCart = {};
productsArray.forEach( item => {
    //console.log(item);
    productsList.push(new Product(item.id, item.title, item.price));
    productInCart[item.id] = 0;
});




helper.createLocalStorage();



productsList.forEach( (item, index) => {
    //console.log(item);
    let productTitle = '<h3 class="product_title">' + item.title + '</h3>';

    let productPrice = '<p class="price">';
    productPrice += item.price;
    productPrice += currency;
    productPrice += '</p>';

    let productButton = '<button onclick="cart.addOneProduct(' + item.id + ')">';
    productButton += 'Добавить в корзину';
    productButton += '</button>';

    let product = document.createElement('div');
    product.innerHTML = productTitle;
    product.innerHTML += productPrice;
    product.innerHTML += productButton;
    product.className = 'product_item';
    document.querySelector('.product_list').appendChild(product);
});


let cart = new Cart();
let cartList = [];

productsArray.forEach( item => {
    //console.log(item);
        cartList.push(new Product(item.id, item.title, item.price));

    });


cartList.forEach( (item, index) => {
    let cartProduct = document.createElement('div');

    let cartProductTitle = '<h3 class="cart_product__name">';
        cartProductTitle += item.title;
        cartProductTitle +='</h3>';

    let cartProductPrice              = '<p class="product_price">';
    cartProductPrice              += item.price;
    cartProductPrice              += currency;
    cartProductPrice              += '</p>';

    if(cartList[ item.id ] >= 2){
        cartProductPrice              = '<p class="product_price">';
        cartProductPrice              += item.price + ' * ' + productInCart[ item.id ] + ' = ';
        cartProductPrice              += productInCart[ item.id ] * item.price;
        cartProductPrice              += currency;
        cartProductPrice              += '</p>';
    }

    let cartProductCount              = '<p class="product_count">';
    cartProductCount              += 'Count (';
    cartProductCount              += productInCart[ item.id ];
    cartProductCount              += ')</p>';




    cartProduct.innerHTML = cartProductTitle;
    cartProduct.innerHTML = cartProductPrice;
    cartProduct.innerHTML = cartProductCount;
    document.querySelector('.cart_product').appendChild(cartProduct);
});



