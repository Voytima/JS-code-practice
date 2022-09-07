"use strict";

const basketGoods = document.querySelector(".cartIconWrap span");
const basketSum = document.querySelector(".basketTotalValue");
const basketIcon = document.querySelector(".basket");
const basketTotalEl = document.querySelector(".basketTotal");

document.querySelector(".cartIconWrap").addEventListener('mouseover', () => {
    basketIcon.classList.remove("hidden")
});
document.querySelector(".cartIconWrap").addEventListener('mouseout', () => {
    basketIcon.classList.add("hidden")
});

const basket = {};

document.querySelector(".featuredItems").addEventListener('click', event => {
    if (!event.target.closest(".addToCart")) {
        return;
    }
    const featuredItem = event.target.closest(".featuredItem");
    const id = +featuredItem.dataset.id;
    const name = featuredItem.dataset.name;
    const price = +featuredItem.dataset.price;
    addToCart(id, name, price);
});

function addToCart(id, name, price) {
    if (!(id in basket)) {
        basket[id] = { id, name, price, count: 0 }
    }
    basket[id].count++;
    basketGoods.textContent = getTotalBasketCount();
    basketSum.textContent = getTotalBasketPrice().toFixed(2);
    renderProductInBasket(id);
}

function getTotalBasketCount() {
    return Object.values(basket)
        .reduce((acc, product) => acc + product.count, 0);
}

function getTotalBasketPrice() {
    return Object.values(basket)
        .reduce((acc, product) => acc + product.count * product.price, 0)
}

function renderProductInBasket(id) {
    const basketRowEl = basketIcon
        .querySelector(`.basketRow[data-productId="${id}"]`);
    if (!basketRowEl) {
        renderNewProductINBasket(id);
        return;
    }
    basketRowEl.querySelector(".productCount").textContent = basket[id].count;
    basketRowEl.querySelector(".productTotalRow")
        .textContent = basket[id].count * basket[id].price;
}

function renderNewProductINBasket(productId) {
    const productRow = `
        <div class="basketRow" data-productId="${productId}">
            <div>${basket[productId].name}</div>
            <div>
                <span class="productCount">${basket[productId].count}</span> шт.
            </div>
            <div>${basket[productId].price}</div>
            <div>
                <span class="productTotalRow">${(basket[productId].price * basket[productId].count)}</span>
            </div>
        </div>
    `;
    basketTotalEl.insertAdjacentHTML("beforebegin", productRow);
}