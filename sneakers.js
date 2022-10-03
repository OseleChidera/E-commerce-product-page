let counter_value = document.getElementById("counter-value");
let add = document.getElementById("add");
let sub = document.getElementById("sub");
let main_image = document.getElementById("main-image");
let thumbnail = document.getElementsByClassName("thumbnail");
let thumbnailArray = Array.from(thumbnail);
let productMainName = document.getElementById("product-title").innerHTML;
let productPrice = document.getElementById("main-price").innerHTML.replace("$", "");
let AddToCartBtn = document.getElementById("add-to-cart");
let finalQuantity = Number(counter_value.value);
let cartIcon = document.getElementById("cart-icon-main");
let allDeleteButtons = document.getElementsByClassName("item");
let counterValue = 0;

let productObject = {
    productName: productMainName,
    productImage: main_image.getAttribute('src'),
    productQuantity: 0,
    productPrices: Number(productPrice)
}


//Counter functionality
add.addEventListener("click", function add() {
    counterValue++
    updateCounterValue()
})
sub.addEventListener("click", function subtract() {
    if (counterValue > 0) {
        counterValue--
        updateCounterValue()

    } else console.error("cannot go backwards")
})

function updateCounterValue() {
    counter_value.value = counterValue
    productObject.productQuantity = counterValue;
}


//changing the src using preset images from the thumbnails
thumbnailArray.forEach((e) => {
    e.addEventListener("click", function changeMainImageOnclick() {
        let thumbnailSrcWithReplacedText = this.getAttribute("src").replace("-thumbnail", '')
        main_image.setAttribute('src', thumbnailSrcWithReplacedText)
    })
})

//this function checks the item quantity entered by the user . If  0 > it goes ahead and adds the element into the cart div 
function createCartItems(cartList) {
    if (Number(counter_value.value) > 0) {
        let m = cartList.forEach((e) => {
            document.getElementById("cart-list").innerHTML += e;
        })
    } else {
        console.log("you have to have something in your cart");
        counter_value.style.border = "1.5px solid red"
    }
}


let cartArray = [];
//cart item templates make use of the data displayed on the screen to create another element item
AddToCartBtn.addEventListener("click", function addItemsToCart() {
    let item = '<div class="item">' +
        `<div><img src=${productObject.productImage} alt="" srcset="" class="item-picture"></div>` +
        '<div class="item-description">' +
        `<h2 class="product-title" id="product-title">${productObject.productName}</h2>` +
        `<h3 class="main-price" id="main-price-cart">$${productObject.productPrices} x ${productObject.productQuantity} = $${productObject.productPrices * productObject.productQuantity}</h3>` +
        '</div>' +
        `<div class="delete-div"><img src='icon-delete.svg' alt="delete" srcset="" class="delete"></div>` +
        '</div>';

    cartArray.push(item)
    console.log(cartArray)

    createCartItems(cartArray)
    deleteCartItem();
})

function deleteCartItem() {
    let deleteButtons = document.querySelectorAll('.delete-div img.delete');

    deleteButtons.forEach(deleteButton => {
        deleteButton.addEventListener('click', function(event) {
            event.target.parentElement.parentElement.remove();
        })
    })
}

//by default the cart list is set to display none this toggles the display using the onclick event
cartIcon.addEventListener("click", function showCartItems() {
    let wholeContainer = this.parentNode.querySelector("div")
    if (wholeContainer.style.display === "none") {
        wholeContainer.style.display = "flex"
    } else wholeContainer.style.display = "none"

})