import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import {useState} from "react"
import { Cart } from "./pages/Cart";
import { Login } from "./pages/Login";
import { Store } from "./pages/Store";
import { UserContext } from "./common/context/User";
import { CartContext } from "./common/context/Cart";
import { PaymentProvider } from "./common/context/Payment";
import { ProductsProps } from "./common/context/Cart";
export function AppRouter() {
  const [login,setLogin] = useState("")
  const [balance,setBalance] = useState(0)
  const [cart, setCart] = useState<Array<ProductsProps>>([]);

  return(
    <BrowserRouter>
      <Routes>
        
          <Route path="/" element=
          {
            <UserContext.Provider value={{login, setLogin, balance, setBalance}}>
              <Login />
            </UserContext.Provider>
          }/>
          <Route path="/store" element={
            <CartContext.Provider value={{cart,setCart}}>
              <UserContext.Provider value={{login,balance,setLogin,setBalance}}>
              <PaymentProvider>
                <Store/>
              </PaymentProvider>
              </UserContext.Provider>    
            </CartContext.Provider>
          }/>

          <Route path="/cart" element={
          <PaymentProvider>
            <CartContext.Provider value= {{cart,setCart}}>
              <UserContext.Provider value={{login,balance,setLogin,setBalance}}>
                <Cart/>
              </UserContext.Provider>
              
            </CartContext.Provider>
          </PaymentProvider>
          }/>
      </Routes>
    </BrowserRouter>
  )
  
}