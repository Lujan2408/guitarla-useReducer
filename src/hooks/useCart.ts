import { useState, useEffect } from "react"
import type { CartItem } from "../types/types"

export const useCart = () => {
  
    const intialCart = () : CartItem[] => {
        const localStorageCart = localStorage.getItem('cart') 
        return localStorageCart ? JSON.parse(localStorageCart) : []
    }
    
    const [cart, setCart] = useState(intialCart) // Carrito de compras

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart]) 

    function clearCart() {
        setCart([])
    }

    return {
        cart,
        clearCart
    }
}
