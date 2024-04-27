import { Guitar } from "../types/types";

export type CartActions = 
    { type: 'add-to-cart', payload: { item: Guitar }} |
    { type: 'remove-from-cart', payload: { item: Guitar['id'] }} |
    { type: 'increase-quantity', payload: { item: Guitar['id'] }} |
    { type: 'decrease-quantity', payload: { item: Guitar['id'] }} |
    { type: 'clear-cart'} 