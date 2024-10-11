let menu = [
    {
        name: 'pasta',
        price:3000,
        description: 'Pasta with a rich tomato sauce and herbs.',
        image: 'download (2).jfif'
    },

    {
        name:'chicken',
        price:2000,
        description: 'Cripsy and yummy fried chicken with wonderful seasoning.',
        image: 'chicken.avif'
        
    },

    {
        name:'fried rice and beef',
        price:4000,
        description: 'delicious beef fried rice with fresh carrot and peas.',
        image: 'fried rice.jfif'
    }
    
]

let cart = []

let btnsearch = document.getElementById('order-now')
let quantity = 1

btnsearch.addEventListener('click', ()=>{
    let searchinput = document.getElementById('search')
    let dishName = searchinput.value.trim().toUpperCase()
    let regexp = /^[a-zA-Z ]*$/
    if(dishName == ''){
        alert('Input Dish Name')
        searchinput.value = ''
    }
    else if(!regexp.test(dishName)){
        alert('A Dish Name Cannot Contain Numbers Or Characters')
        searchinput.value = ''
    }
    else{
        let exist = menu.find((m) => m.name.toUpperCase() == dishName.toUpperCase())
        if(!exist){
            alert('dish does not exist')
            searchinput.value = ''
        }
        else{
            cart.push({...exist})
            alert(`${exist.name} \nprice: ${exist.price}\nadded succesfully`)
            searchinput.value = ''
        }
        
    }
})
function addToCart(dish) {
    let existingDish = cart.find(item => item.name === dish.name);
    if (existingDish == true) {
        existingDish.quantity ++;
    } else {
        cart.push({ ...dish, quantity:1});
        updateCartDisplay()

    }
}
function updateCartDisplay() {
    let  cartContainer = document.querySelector('.cart-items');
    cartContainer.innerHTML = '';

    cart.forEach(item => {
        let cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>Quantity: ${item.quantity}</p>
            <p>Price: $${(item.price * item.quantity).toFixed(2)}</p>
            <button id= "remove" onclick="removeFromCart('${item.name}')">Remove</button>
        `;
        cartContainer.appendChild(cartItem);
        updateCartTotal()
    });

}

function updateCartTotal() {
    let totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    document.querySelector('.cart-total').innerText = `Total: $${totalPrice.toFixed(2)}`;
}

function removeFromCart(name) {
    cart = cart.filter(item => item.name !== name);
    updateCartDisplay();
}

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        let card = button.parentElement;
        let dish = {
            name: card.getAttribute('data-name'),
            price: parseFloat(card.getAttribute('data-price')),
            image: card.querySelector('img').src
        };
        addToCart(dish);
    });
});


document.getElementById('checkout').addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Your cart is empty!');
    } else {
        confirm('Proceeding to checkout!');
        cartContainer.innerHTML = '';
    }
});
