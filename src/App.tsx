import { useReducer } from 'react'
import Header from './components/Header'
import Guitar from './components/Guitar'
import { useCart } from './hooks/useCart'
import { cartReducer, initialState } from './reducers/cart-reducer'

function App() {

    const { increaseQuantity, decreaseQuantity, clearCart } = useCart()

    const [state, dispatch] = useReducer(cartReducer, initialState)

  return (
    <>
      <Header 
        cart={state.cart}
        dispatch={dispatch}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        clearCart={clearCart}
      />
      
    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
            {/* Iteramos sobre cada elemento para mostrarlo en pantalla, luego pasamos las propiedades */}
            {state?.data.map((guitar) => (
                <Guitar 
                    guitar={guitar}
                    dispatch={dispatch}
                    key={guitar.id}
                />
            ))}
        </div>
    </main>


    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
    </footer>
    </>
  )
}

export default App
