const menu = document.getElementById("menu")
const cartBtn = document.getElementById("cart-btn")
const cartModal = document.getElementById("cart-modal")
const cartItemsContainer = document.getElementById("cart-items")
const cartTotal = document.getElementById("cart-total")
const checkoutBtn = document.getElementById("checkout-btn")
const closeModalBtn = document.getElementById("close-modal-btn")
const cartCounter = document.getElementById("cart-count")
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

// Adicionar ao carrinho
menu.addEventListener("click", function(event){
    let parentButton = event.target.closest(".add-to-cart-btn")
    
    if(parentButton){
        const name = parentButton.getAttribute("data-name")
        const price = parseFloat(parentButton.getAttribute("data-price"))

        // Adicionar no carrinho
        addToCart(name, price)
    }
})


// Função para adicionar no carrinho
function addToCart(name, price){
    // Verificar se o item já existe no carrinho
    const existingItem = cart.find(item => item.name === name)

    //Se o item já existir, aumenta a quantidade
    if(existingItem){
        existingItem.quantity += 1
    } else{
        // Vai adicionar no carrinho o nome, preço e quantidade
        cart.push({
            name,
            price,
            quantity: 1
        })
    }

}
