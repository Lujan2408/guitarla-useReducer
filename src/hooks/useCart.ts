import { useState, useEffect } from "react"
import type { CartItem, Guitar } from "../types/types"

export const useCart = () => {
  
    const intialCart = () : CartItem[] => {
        const localStorageCart = localStorage.getItem('cart') 
        return localStorageCart ? JSON.parse(localStorageCart) : []
    }
    
    const [cart, setCart] = useState(intialCart) // Carrito de compras

    const MAX_ITEMS = 8
    const MIN_ITEMS = 1

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart]) 

    //Incrementar cantidad de items al carrito 
    function increaseQuantity(id : Guitar['id']) {
        const updatedCart = cart.map( item => {
            if(item.id === id && item.quantity < MAX_ITEMS) {
                return {...item, quantity: item.quantity + 1 }
            }
            return item
        })
        
        setCart(updatedCart)
    }

    function decreaseQuantity(id : Guitar['id']) {
        const updatedCart = cart.map( item => {
            if(item.id === id && item.quantity > MIN_ITEMS) {
                return{...item, quantity: item.quantity - 1}
            }
            return item    
        })
        
        setCart(updatedCart)
    }

    function clearCart() {
        setCart([])
    }

    return {
        cart,
        increaseQuantity,
        decreaseQuantity,
        clearCart
    }
}
