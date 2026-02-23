import menuArray from '/data.js'
import {v4 as uuidv4} from 'https://jspm.dev/uuid'

let orderItems = []

const CardDetails = document.getElementById('card-details')
const orderSummary = document.getElementById('order-summary')

document.addEventListener('click', (e)=> {
    if(e.target.dataset.add) {
        handleAddClick(e.target.dataset.add)
    } else if(e.target.id === 'complete-order') {
        handleCompleteOrderClick()
    } else if (e.target.id === 'close-card') {
        handleCloseCardClick()
    } else if (e.target.dataset.removeId) {
        handleRemoveClick(e.target.dataset.removeId)
    }
})

function addOrderItem(itemId) {
    orderItems.push(
        ...menuArray
            .filter(item => item.id === Number(itemId)) // Here I find out matching item (Selection)
            .map(filterItem => {   // Here I make Copy of it (Transformation)
                return {
                     ...filterItem,
                    orderId: uuidv4() // Here I added OrderId
                }
            })
    ) // Here lastly I push it to Ordered Items
}

function handleAddClick(itemId){
    addOrderItem(itemId)
    orderSummary.innerHTML = getOrderSummary()
    orderSummary.classList.add('visible')

}

function handleRemoveClick(itemOrderId) {
    orderItems = orderItems.filter(item => item.orderId !== itemOrderId)
    orderSummary.innerHTML =getOrderSummary()

    if(orderItems.length === 0){
        orderSummary.classList.remove('visible')
    }
}

function handleCompleteOrderClick() {
    CardDetails.innerHTML = getCardHtml()
    CardDetails.classList.add('visible')
}

function handleCloseCardClick() {
    CardDetails.classList.remove('visible')
}


function getFeedHtml() {
    const feedHtml = menuArray.map(function(menuItem) {
        const {name, ingredients, price,emoji, id} = menuItem
        return `
        <div class="child">
            <span>${emoji}</span>
            <div class="child-attributes">
                <span class="title">${name}</span>
                <p>${ingredients.join(', ')}</p>
                <span class="price">$${price}</span>
            </div>
                <i class="fa-solid fa-plus add-btn" data-add="${id}"></i>
        </div>
        `
    }).join('')
    return feedHtml
}

function getOrderSummary() {
    let sum = 0
    let orderSummaryHtml = ''
    orderSummaryHtml += `
        <h3>Your Order</h3>
        <div class="ordered-items">
    `
    orderItems.forEach((item)=>{
        const {name,price,orderId} = item
        sum += price
        orderSummaryHtml+=`
            <div class="ordered-item" id="${orderId}">
                <span>${name}</span><button data-remove-id="${orderId}">remove</button>
                <span class="item-price">$${price}</span>
            </div>
        `
    })
    orderSummaryHtml += `
        </div>
        <hr>
        <div class="orders-total">
            <span>Total Price: </span>
            <span class="total-price">$${sum}</span>
        </div>
        <button id="complete-order" class="complete-order">Complete order</button>
    `
    return orderSummaryHtml
}

function getCardHtml () {
    return `
            <div class="card-head">
                <h3>Enter card details</h3>
                <i class="fa-solid fa-xmark close-btn" id="close-card"></i>
            </div>
            <form action="" method="">
                <input type="text" name="full-name" id="full-name" placeholder="Enter your name" required>
                <input type="text" name="card-number" id="card-number" placeholder="Enter card number" required>
                <input type="text" name="CVV" id="CVV" placeholder="Enter CVV">
                <button class="payment">Pay</button>
            </form>
    `
}

function render() {
    document.getElementById('feed').innerHTML = getFeedHtml()
}
// Rendering the App
render()