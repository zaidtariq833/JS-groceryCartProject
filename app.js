// SELECT ELEMENTS

const productE1 = document.querySelector(".products");
const cartItemsE1 = document.querySelector(".cart-items");
const subTotal = document.querySelector(".subtotal");
const totalItemsInCart = document.querySelector('.total-items-in-cart')

//RENDER PRODUCTS

function renderProducts() {
  products.forEach((product) => {
    productE1.innerHTML += `
         <div class="item">
         <div class="item-container">
             <div class="item-img">
                 <img src="${product.imgSrc}" alt="${product.name}">
             </div>
             <div class="desc">
                 <h2>${product.name}</h2>
                 <h2><small>$</small>${product.description}</h2>
                 <p>
                     Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum, dicta!
                 </p>
             </div>
             <div class="add-to-wishlist">
                 <img src="./icons/heart.png" alt="add to wish list">
             </div>
             <div class="add-to-cart" onclick = "addToCart(${product.id})">
                 <img src="./icons/bag-plus.png" alt="add to cart">
             </div>
         </div>
     </div>
         `;
  });
}

renderProducts();

//CART ARRAY
let cart = [];

//ADD TO CART
function addToCart(id) {
  //check if product already exist in cart
  if (cart.some((item) => item.id === id)) {
    changeNumberOfUnits("plus", id);
  } else {
    const item = products.find((product) => product.id === id);
    cart.push({
      ...item,
      numberOfUnits: 1,
    });
  }

  updateCart();
}

//Update cart items

function updateCart() {
  renderCartItems();
  renderSubTotal();
}

//calculate and render subtotal

function renderSubTotal() {
    let totalPrice = 0, totalItems = 0
    cart.forEach((item) => {
       totalPrice += item.price * item.numberOfUnits
       totalItems += item.numberOfUnits;
    })

    subTotal.innerHTML = `
    Subtotal (${totalItems}): $${totalPrice.toFixed(2)}
    `

    totalItemsInCart.innerHTML = totalItems
}

function renderCartItems() {
  cartItemsE1.innerHTML = ""; //clear cart element
  cart.forEach((item) => {
    cartItemsE1.innerHTML += `
        <div class="cart-item">
        <div class="item-info" onclick = "removeItemFromCart(${item.id})">
            <img src="${item.imgSrc}" alt="${item.name}">
            <h4>${item.name}</h4>
        </div>
        <div class="unit-price">
            <small>$</small>${item.price}
        </div>
        <div class="units">
            <div class="btn minus" onclick = "changeNumberOfUnits('minus', ${item.id})">-</div>
            <div class="number">${item.numberOfUnits}</div>
            <div class="btn plus" onclick = "changeNumberOfUnits('plus', ${item.id})">+</div>           
        </div>
    </div>
        `;
  });
}

// remove items from the cart

function removeItemFromCart(id){
  cart = cart.filter((item) => item.id !== id)
  updateCart()
}

//change number of units for an item

function changeNumberOfUnits(action, id) {
  cart = cart.map((item) => {
    let numberOfUnits = item.numberOfUnits;
    if (item.id === id) {
      if (action === "minus" && numberOfUnits > 1) {
        numberOfUnits--;
      } else if (action === "plus" && numberOfUnits < item.instock) {
        numberOfUnits++;
      }
    }
    return {
      ...item,
      numberOfUnits,
    };
  });

  updateCart();
}
