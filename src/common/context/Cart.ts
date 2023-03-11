import { Context, createContext, useState, useContext, useEffect} from "react";
import { usePaymentContext } from "./Payment";
import { useUserContext } from "./User";

interface CartContextProps {
  cart: Array<ProductsProps>;
  setCart: (cart: ProductsProps[]) => void;
}
export interface ProductsProps {
  name: string;
  photo:string;
  id: string;
  value: number;
  unit?: number;
}
export const CartContext = createContext<CartContextProps>({
  cart: [
    {
      id: "",
      name: "",
      photo: "",
      value: 0,
      unit:0
    }
  ],
  setCart: () => {},
});

export const useCartContext = () => {
  const {cart, setCart } = useContext(CartContext)
  const [quantityProducts,setQuantityProducts] = useState<number>(0);
  const [totalPriceProducts, setTotalPriceProducts] = useState<number>(0)
  const {
    payments
  } = usePaymentContext()
  const { setBalance, balance } = useUserContext()
  function changeUnit(id:string,quantity:number):ProductsProps[]{
    return cart.map((item)=> {
      if(item.id === id) item.unit! += quantity;
      return item;
  })}
  function addProduct(newCart: ProductsProps) {
    const haveCart = cart.some((cartItem) => cartItem.id === newCart.id);
    if (!haveCart) {
      newCart.unit = 1;
      setCart((cart: ProductsProps[]) => [...cart, newCart]);
    } else {
      setCart(changeUnit(newCart.id, 1));
    }
  }
  function removeProduct(id:string):void {
    const product = cart.find((item) => item.id === id)
    const lastProduct = product?.unit === 1
    if(lastProduct){
       setCart((cart: ProductsProps[]) => cart.filter((item) => item.id !== id))
    }
    setCart(changeUnit(id,-1))
  }
  function buying() :void{
    setCart([])
    setBalance(balance - totalPriceProducts)
  } 

  useEffect(() => {
    const {newQuantity, newTotal} = cart.reduce((count, product) => 
      ({
        newQuantity: count.newQuantity + product.unit!,
        newTotal: count.newTotal + (product.value * product.unit!)
      })
    ,{
      newQuantity: 0,
      newTotal: 0,
    })
    setQuantityProducts(newQuantity)
    setTotalPriceProducts(newTotal * payments.fees)
    console.log(payments.fees)
  },[cart,setQuantityProducts,setTotalPriceProducts,payments])
  return{
    cart,
    setCart,
    addProduct,
    removeProduct,
    quantityProducts,
    setQuantityProducts,
    totalPriceProducts,
    buying
  }}
