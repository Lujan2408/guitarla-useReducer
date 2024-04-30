import { db } from "../data/db";
import { CartItem, Guitar } from "../types/types";

export type CartActions = 
    { type: 'add-to-cart', payload: { item: Guitar }} |
    { type: 'remove-from-cart', payload: { item: Guitar['id'] }} |
    { type: 'increase-quantity', payload: { item: Guitar['id'] }} |
    { type: 'decrease-quantity', payload: { item: Guitar['id'] }} |
    { type: 'clear-cart'} 

export type CartState = {
    data: Guitar[]
    cart: CartItem[]
}

export const initialState = {
    data: db,
    cart: []
}

const MAX_ITEMS = 8

export const cartReducer = (
        state: CartState = initialState,
        action: CartActions        
    ) => {
    
    if(action.type === 'add-to-cart') {
        // Detectar si un elemento existe en el carrito con findIndex
        const itemExists = state.cart.findIndex(guitar => guitar.id === action.payload.item.id)

        let updatedCart : CartItem[] = []
                
        if (itemExists >= 0) { // Existe el elemento en el carrito 
            if(state.cart[itemExists].quantity >= MAX_ITEMS) return
            // Incrementar la cantidad de un articulo agregado 
            updatedCart = [...state.cart]
            updatedCart[itemExists].quantity++
        } else {
            const newItem : CartItem = {...action.payload.item, quantity : 1} // Agregando una propiedad nueva al objeto 
            updatedCart = [...state.cart, newItem]
        }
        
        return {
            ...state, 
            cart: updatedCart
        }
    }

    if(action.type === 'remove-from-cart') {
        
        return {
            ...state
        }
    }

    if(action.type === 'increase-quantity') {

        return {
            ...state
        }
    }

    if(action.type === 'decrease-quantity') {

        return {
            ...state
        }
    }

    if(action.type === 'clear-cart') {

        return {
            ...state
        }
    }   
}