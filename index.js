import menuArray from '/data.js'

function getFeedHtml() {
    const feedHtml = menuArray.map(function(menuItem) {
        const {name, ingredients, price,emoji, id} = menuItem
        return `
        <div class="child">
            <span>${emoji}</span>
            <div class="child-attributes">
                <span class="title">${name}</span>
                <p>${ingredients.join(', ')}</p>
                <span class="price">${price}</span>
            </div>
                <i class="fa-solid fa-plus add-btn" data-add="${id}"></i>
        </div>
        `
    }).join('')
    return feedHtml
}

function getCardHtml () {
    return `
        <div class="card-details">
            <div class="card-head">
                <h3>Enter card details</h3>
                <i class="fa-solid fa-xmark close-btn" data-close="close-card"></i>
            </div>
            <form action="" method="">
                <input type="text" name="full-name" id="full-name" placeholder="Enter your name" required>
                <input type="text" name="card-number" id="card-number" placeholder="Enter card number" required>
                <input type="text" name="CVV" id="CVV" placeholder="Enter CVV">
                <button class="payment">Pay</button>
                </form>
            </div>
    `
}

function render() {
    const feedContainer = document.getElementById('feed')
    feedContainer.innerHTML = getFeedHtml()
    document.querySelector('main').innerHTML += getCardHtml()

}

render()