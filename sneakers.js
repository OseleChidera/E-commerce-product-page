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
let counterValue = 0;
let allDeleteButtons = document.getElementsByClassName("delete");
let cartArray = [];
let index = 0
    //Counter functionality
add.addEventListener("click", function add() {
    counterValue += 1
    counter_value.value = counterValue

})
sub.addEventListener("click", function subtract() {
    if (counterValue > 0) {
        counterValue -= 1
        counter_value.value = counterValue

    } else console.error("cannot go backwards")
})



//changing the src using preset images from the thumbnails
thumbnailArray.forEach((e) => {
    e.addEventListener("click", function changeMainImageOnclick() {
        let thumbnailSrcWithReplacedText = this.getAttribute("src").replace("-thumbnail", '')
        main_image.setAttribute('src', thumbnailSrcWithReplacedText)
    })
})


//using an array of objects to pass data using js template strings 
AddToCartBtn.addEventListener("click", function addItemsToCart() {
    if (Number(counter_value.value) > 0) {
        cartArray.push({
            productName: productMainName,
            productImage: main_image.getAttribute('src'),
            productQuantity: counter_value.value,
            productPrices: Number(productPrice)
        })
        createElements();
        counter_value.classList.remove("red")
    } else {
        console.log("you have to have something in your cart");
        counter_value.classList.add("red")
    }
    console.log(cartArray);
})


function createElements() {
    const cartArr = cartArray.map((eachItem) => {
            return `<div class="item">
            <div><img src=${eachItem.productImage} alt="" srcset="" class="item-picture"></div>
            <div class="item-description">
            <h2 class="product-title" id="product-title">${eachItem.productName}</h2>
            <h3 class="main-price" id="main-price-cart">$${eachItem.productPrices} x ${eachItem.productQuantity} = $${eachItem.productPrices * Number(eachItem.productQuantity)}</h3>
            </div>
            <img src="icon-delete.svg" class="delete delete-div" alt="delete" srcset="">
            </div>`;
        });
    document.getElementById("cart-list").innerHTML = cartArr;



    document.querySelectorAll(".delete").forEach((delButton) => {
        delButton.addEventListener('click', function print(e) {
          console.log("a delete icon was clicked")
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





