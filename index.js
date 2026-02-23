import menuArray from '/data.js'
import {v4 as uuidv4} from 'https://jspm.dev/uuid'

let orderItems = []

const cardDetails = document.getElementById('card-details')
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
    } else if(e.target.dataset.star) {
        handleStarClick(e.target.dataset.star)
    } else if (e.target.id === 'home-btn') {
        handleHomeClick()
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
    cardDetails.innerHTML = getCardHtml()
    cardDetails.classList.add('visible')
    document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault()
    const userName = document.getElementById('full-name')
    const confirmationEl = document.getElementById('confirmation-rating')
    cardDetails.classList.remove('visible')
    orderSummary.classList.remove('visible')
    confirmationEl.innerHTML = getConfirmationMessage(userName.value)
    confirmationEl.style.display = 'block'
    setTimeout(()=> document.getElementById('rating').style.display = 'block',2000)
})
}

function handleCloseCardClick() {
    cardDetails.classList.remove('visible')
}

function handleStarClick(starId) {
    const star = document.getElementById(`${starId}`)
    if (star.classList.contains('filled')) {
        star.classList.remove('fa-solid', 'filled')
        star.classList.add('fa-regular')
    } else {
        star.classList.add('fa-solid', 'filled')
        star.classList.remove('fa-regular')
    }
}

function handleHomeClick() {
    orderItems = [];
    document.getElementById('confirmation-rating').style.display = 'none';
    document.getElementById('confirmation-rating').innerHTML = '';
    // orderSummary.classList.remove('visible');
    orderSummary.innerHTML = '';
    // cardDetails.classList.remove('visible');
    cardDetails.innerHTML = '';
    render();
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

function getConfirmationMessage(userName) {
    return `
        <div class="confirmation">
          <span>Thanks, ${userName} Your order is on its way!</span>
        </div>
        <div class="rating" id="rating">
          <span>Rate US: </span>
          <i class="fa-regular fa-star" id="1" data-star="1"></i>
          <i class="fa-regular fa-star" id="2" data-star="2"></i>
          <i class="fa-regular fa-star" id="3" data-star="3"></i>
          <i class="fa-regular fa-star" id="4" data-star="4"></i>
          <i class="fa-regular fa-star" id="5" data-star="5"></i>
          <button type="button" class="home-btn" id="home-btn">Home</button>
        </div>
    `
}

function render() {
    document.getElementById('feed').innerHTML = getFeedHtml()
}
// Rendering the App
render()