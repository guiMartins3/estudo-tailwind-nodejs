const menu = document.getElementById("menu")
const cartBtn = document.getElementById("cart-btn")
const cartModal = document.getElementById("cart-modal")
const cartItemsContainer = document.getElementById("cart-items")
const cartTotal = document.getElementById("cart-total")
const checkoutBtn = document.getElementById("checkout-btn")
const closeModalBtn = document.getElementById("close-modal-btn")
const cartCounter = document.getElementById("cart-count")
const addressInput = document.getElementById("address")
const addressWarn = document.getElementById("address-warn")

let cart = [];

// Abrir o Modal do carrinho
cartBtn.addEventListener("click", function(){
    updateCartModal();
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

    updateCartModal()
}

// Atualiza o carrinho
function updateCartModal(){
    cartItemsContainer.innerHTML = "";
    let total = 0

    cart.forEach(item => {
        const cartItemElement = document.createElement("div")
        cartItemElement.classList.add("flex", "justify-between", "mb-4", "flex-col")

        cartItemElement.innerHTML = `
        <div class="flex items-center justify-between">
            <div>
                <p class="font-medium">${item.name}</p>
                <p>Qtd: ${item.quantity}</p>
                <p class="font-medium mt-2">R$ ${item.price.toFixed(2)}</p>
            </div>

            <button class="remove-from-cart-btn" data-name="${item.name}">
                Remover
            </button>
           
        </div>
    `

    // Calcula o total
    total += item.price * item.quantity

    // Adiciona o elemento html criado no container do carrinho
    cartItemsContainer.appendChild(cartItemElement)
    })

    // Mostrando o total formatado em reais
    cartTotal.textContent = total.toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL"
    })

    
    // Atualiza o contador do carrinho no footer
    cartCounter.innerHTML = cart.length
}

// Função para remover o item do carrinho
cartItemsContainer.addEventListener("click", function(event){
    if(event.target.classList.contains("remove-from-cart-btn")){
        const name = event.target.getAttribute("data-name")

        removeItemCart(name)
    }
})

// Função para remover o item do carrinho
function removeItemCart(name){
    const index = cart.findIndex(item => item.name === name)

    // Se o item existir no carrinho, remove ele
    if(index !== -1){
        const item = cart[index]

        // Se a quantidade for maior que 1, diminui a quantidade
        if(item.quantity > 1){
            item.quantity -= 1
            updateCartModal()
            return
        }

        // Remove o item da lista do carrinho
        cart.splice(index, 1)
        updateCartModal()
    }    
}

// Função para pegar o que for digitado
addressInput.addEventListener("input", function(event){
    let inputValue = event.target.inputValue

    // Verificar se esta digitando algo
    if(inputValue !== ""){
        addressInput.classList.remove("border-red-500")
        addressWarn.classList.add("hidden")
    }
})

// Lógica para finalizar pedido do carrinho
checkoutBtn.addEventListener("click", function(){
    const isOpen = checkResteurantOpen()
    if(!isOpen){
        Toastify({
            text: "Ops o resturante está fechado!",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: {
                background: "#ef4444",
            }
        }).showToast()
        return
    }

    //Se estiver vazio vai barrar
    if(cart.length === 0 ) return

    if(addressInput.value === ""){
        addressWarn.classList.remove("hidden")
        addressInput.classList.add("border-red-500")
        return
    }

    // Enviar o pedido para API whatsapp
    const cartItems = cart.map((item) => {
        return (
            `${item.name} Quantidade: (${item.quantity}) Preço: R$${item.price} |`
        )
    }).join("")

    const message = encodeURIComponent(cartItems)
    const phone = ""

    // Redireciona para o whatsapp em uma nova página
    window.open(`https://wa.me/${phone}?text=${message} Endereço: ${addressInput.value}, "_blank"`)

    // Deixando o carrinho vazio após o pedido
    cart = []
    // Atualizando visualmente a modificação
    updateCartModal()
})

// Verificar a hora e manipular o card horário
function checkResteurantOpen(){
    const data = new Date()
    const hora = data.getHours()
    return hora >= 18 && hora < 22 //True = restaurante aberto
}

const spanItem = document.getElementById("date-span")
const isOpen = checkResteurantOpen()

// Muda a cor do card se estiver aberto ou fechado
if(isOpen){
    spanItem.classList.remove("bg-red-500")
    spanItem.classList.add("bg-green-600")
} else{
    spanItem.classList.remove("bg-green-600")
    spanItem.classList.add("bg-red-500")
}


