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
let cartDiv = document.getElementById("cart-div");
let cartDivM = document.getElementById("cart-div-m");
let counterValue = 0;
let allDeleteButtons = document.getElementsByClassName("delete");
let cartArray = [];
let index = 0
let cartParentElement = document.querySelector(".cart-list")
const burgerMenu = document.getElementById('burger-toggle')
const bottomMenu = document.getElementById('bottom')
let cartFloater = document.getElementById('cart-floater')

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
        thumbnailArray.forEach((item) => {
            item.classList.remove('thumbnail-active');
        });
        this.classList.add('thumbnail-active')
        let thumbnailSrcWithReplacedText = this.getAttribute("src").replace("-thumbnail", '')
        main_image.setAttribute('src', thumbnailSrcWithReplacedText)
    })
})
document.addEventListener('click', (event) => {
    // Check if the click is outside the items
    if (!event.target.classList.contains('thumbnail')) {
        // Remove focus from all items
        thumbnailArray.forEach((item) => {
            item.classList.remove('thumbnail-active');
        });
    }
});

//using an array of objects to pass data using js template strings 
AddToCartBtn.addEventListener("click", function addItemsToCart() {
    // let cartFloater = document.querySelector('.cart-floater')

    if (!Number(counter_value.value)) {
        console.log("you have to have something in your cart");
        counter_value.classList.add("red")
        return;

    }

    cartArray.push({
        productName: productMainName,
        productImage: main_image.getAttribute('src'),
        productQuantity: counter_value.value,
        productPrices: Number(productPrice)
    })
    createElements(cartArray);
    counter_value.classList.remove("red")
    console.log(cartArray);
    cartFloater.classList.add('cart-floater-shown')
})


function createElements(wholeCartArray) {
    const cartArr = wholeCartArray.map((eachItem, index) => {
        return `
        <div class="item" id=${index}>
            <div><img src=${eachItem.productImage} alt="" srcset="" class="item-picture"></div>
            <div class="item-description">
            <h2 class="product-title" id="product-title">${eachItem.productName}</h2>
            <h3 class="main-price" id="main-price-cart">$${eachItem.productPrices} x ${eachItem.productQuantity} = $${eachItem.productPrices * Number(eachItem.productQuantity)}</h3>
            </div>
            <img src="icon-delete.svg" class="delete delete-div" alt="delete" id=${index}>
            </div>`
    })
    cartParentElement.innerHTML = cartArr.join('');



    document.querySelectorAll(".delete").forEach((delButton) => {
        delButton.addEventListener('click', function print(event,) {
            const relativeParent = this.parentElement;
            cartArray.splice(Number(relativeParent.id), 1)
            relativeParent.remove()

        })
    })
}


// ========================================================================


// toggle cart icon using the onclick event

cartDiv.addEventListener("click", function () {
    console.log('cart icon was clickweened')
    let cartFloater = document.getElementById('cart-floater')
    cartFloater.classList.toggle('cart-floater-shown')
})







burgerMenu.addEventListener('click', function () {
    console.log('checkbox checked')
    if (burgerMenu.checked) {
        bottomMenu.classList.add("bottom-checked")
    } else {
        bottomMenu.classList.remove("bottom-checked")
    }
});



const prevButton = document.getElementById('prev')
const nextButton = document.getElementById('next')
const mainPopupImage = document.getElementById('main-image-popup')
let tracker = 0;
const popupImgArray = ['./images/image-product-1.jpg', './images/image-product-2.jpg', './images/image-product-3.jpg', './images/image-product-4.jpg']

const mainImage = document.getElementById('product-main-image')

mainImage.addEventListener('click', () => {
    console.log('clg nigga')
    document.getElementById('main-right-dialog').style.display = "flex"
})


// popupThumbnailArray[tracker].classList.add('thumbnail-active')
nextButton.addEventListener('click', function () {
    tracker++;
    if (tracker >= popupImgArray.length) {
        tracker = 0
    }
    showActiveThumbnail()
    mainPopupImage.setAttribute('src', popupImgArray[tracker])
});

prevButton.addEventListener('click', function () {
    tracker--;
    if (tracker < 0) {
        tracker = popupImgArray.length - 1;
    }
    showActiveThumbnail()
    mainPopupImage.setAttribute('src', popupImgArray[tracker])
});

document.getElementById('close-dialog').addEventListener('click', function (event) {
    document.getElementById('main-right-dialog').style.display = 'none'
});

const popupThumbnails = document.getElementsByClassName("popup-Thumbnail")
const popupThumbnailArray = Array.from(popupThumbnails)


function showActiveThumbnail() {
    popupThumbnailArray.forEach(eachThumbnail => {
        eachThumbnail.classList.remove('thumbnail-active');
        popupThumbnailArray[tracker].classList.add('thumbnail-active')

    })
}
