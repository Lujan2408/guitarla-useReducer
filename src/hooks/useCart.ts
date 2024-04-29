import { useState, useEffect, useMemo } from "react"
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

    function addToCart(item : Guitar) {
        // Detectar si un elemento existe en el carrito con findIndex
        const itemExists = cart.findIndex(guitar => guitar.id === item.id)
        
        if (itemExists >= 0) { // Existe el elemento en el carrito 
            if(cart[itemExists].quantity >= MAX_ITEMS) return
            // Incrementar la cantidad de un articulo agregado 
            const updatedCart = [...cart]
            updatedCart[itemExists].quantity++
            setCart(updatedCart)
        } else {
            const newItem : CartItem = {...item, quantity : 1} // Agregando una propiedad nueva al objeto 
            setCart([...cart, newItem])
        }
    }

    //Eliminar los articulos del carrito
    function removeFromCart(id : Guitar['id']) {
        setCart(prevCart => prevCart.filter(guitar => guitar.id != id))
    }

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

    //State derivado 
    const isEmpty = useMemo(() => cart.length === 0, [cart])
    const cartTotal = useMemo(() => cart.reduce((total, item) => total + (item.quantity * item.price), 0), [cart]) 


    return {
        cart, 
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart, 
        isEmpty,
        cartTotal
    }
}
