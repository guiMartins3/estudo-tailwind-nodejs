const menu = document.getElementById("menu")
const cartBtn = document.getElementById("cart-btn")
const cartModal = document.getElementById("cart-modal")
const cartItemsContainer = document.getElementById("cart-items")
const cartTotal = document.getElementById("cart-total")
const checkoutBtn = document.getElementById("checkout-btn")
const closeModalBtn = document.getElementById("close-modal-btn")
const cartCounter = document.getElementById("cart-counter")
const addressInput = document.getElementById("address")
const addressWarning = document.getElementById("address-warn")

let cart = [];

// Abrir o Modal do carrinho
cartBtn.addEventListener("click", function(){
    cartModal.style.display = "flex"
})

// Fechar o Modal ao clicar fora
cartModal.addEventListener("click", function(event){
    if(event.target === cartModal){
        cartModal.style.display = "none"
    }
})

// Botão de fechar o Modal
closeModalBtn.addEventListener("click", function(){
    cartModal.style.display = "none"
})
