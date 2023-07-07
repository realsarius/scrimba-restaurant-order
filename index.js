import {menuArray} from "./data.js";
import { v4 as uuidv4 } from 'uuid';

const meals = document.querySelector("#meals");
const orders = document.querySelector("#orders");
const orderModalForm = document.querySelector("#order-modal-form");

const orderName = document.querySelector("#order-name");
const orderCard = document.querySelector("#order-card");
const orderCvv = document.querySelector("#order-cvv");

let yourOrder = [];

document.addEventListener('click', function(e){
    if(e.target.id === "complete-order-buton"){
        handleCompleteOrder();
    }
    else if(e.target.id === "order-remove"){
        handleRemoveOrder(e.target.dataset.id)
    }
    else if(e.target.id === 'addBtn'){
        handleAddOrder(e.target.dataset.uuid)
    } else if (e.target.id === "close-order-modal-img") {
        document.querySelector("#modal-overlay").style.display = "none";
        document.querySelector("#order-modal").style.display = "none";
    }
})

orderModalForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = orderName.value;
    const card = orderCard.value;
    const reg = new RegExp(/^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/);
    const cvv = orderCvv.value;
    if (reg.test(card)) {
        document.querySelector("#modal-overlay").style.display = "none";
        document.querySelector("#order-modal").style.display = "none";
        const thankYou = `
                        <div id="thank-you-container">
                            <p id="thank-you-message">Thanks, ${name}! Your order is on its way!</p>
                        </div>`
        orders.innerHTML = thankYou
        yourOrder = [];
    }
})

const handleCompleteOrder = () => {
    document.querySelector("#modal-overlay").style.display = "flex";
    document.querySelector("#order-modal").style.display = "flex";
}

const handleRemoveOrder = (uuid) => {
    yourOrder = yourOrder.filter(order => order.uuid !== uuid)
    renderOrders();
}

const handleAddOrder = (uuid) => {
    for(let meal of menuArray) {
        if(meal.uuid === uuid) {
            yourOrder.push({
                name: meal.name,
                uuid: uuidv4(),
                price: meal.price
            });
        }
    }
    render();
}

const renderOrders = () => {
    let orderHTML = "";
    let totalPrice = 0;
    if(yourOrder.length >0) {
        orderHTML += "<h1 id='your-order-text'>Your order</h1>"
        for(let order of yourOrder) {
            orderHTML += `
                        <div class=order-container>
                            <h2 id="order-name">${order.name}</h2>
                            <p id="order-remove" data-id="${order.uuid}">remove</p>
                            <h4 id="order-price">$${order.price}</h4>
                        </div>
            `
        totalPrice += order.price;
        }
        orderHTML += `
                     <hr>
                     <div id="total-price-container">
                        <p id="total-price-text">Total price:</p>
                        <p id="total-price">$${totalPrice}</p>
                     </div>
                    <div id="complete-order-container">
                        <button id="complete-order-buton">Complete order</button>
                    </div>
        `
    }
    orders.innerHTML = orderHTML
}

const renderMeals = () => {
    let mealHTML = "";
    for(let meal of menuArray) {
        mealHTML += `
                <div class="meals-container">
                    <div class="meal-img">
                        <img src="${meal.img}" />
                    </div>
                    <div class="meal-info">
                        <h3 id="name">${meal.name}</h3>
                        <p id="ingredients">pepperoni, mushrom, mozarella</p>
                        <p id="price">$${meal.price}</p>
                    </div>
                    <div class="meal-add">
                        <button id="addBtn" data-uuid=${meal.uuid}>+</button>
                    </div>
                </div>
                <hr />
        `
    }
    meals.innerHTML = mealHTML;
}

const render = () => {
    renderMeals();
    renderOrders();
}

render();
