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

function render() {
    const feedContainer = document.getElementById('feed')
    feedContainer.innerHTML = getFeedHtml()

}

render()