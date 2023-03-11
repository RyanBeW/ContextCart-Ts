import { createContext,useState,PropsWithChildren,useContext } from 'react'
interface PropsPaymentContext {
  payments: [{
    name: string,
    id: string,
    fees: number
  }]
  
}
export const PaymentContext = createContext({
})
PaymentContext.displayName = 'PaymentContext'

export const PaymentProvider = ({ children }: PropsWithChildren) => {
  const paymentsTypes = [ {
    name: 'creditCard',
    id: "1",
    fees: 1.3,
  },
  {
    name: 'paypal',
    id:'2',
    fees: 1.1,
  },
  {
    name: 'bankTransfer',
    id: '3',
    fees: 1
  },
  {
    name: 'bankSlip',
    id: '4',
    fees: 1
  }
]
const [payments, setPayments] = useState(paymentsTypes[0])
  return (
    <PaymentContext.Provider value={{
      payments,
      setPayments,
      paymentsTypes,
    }}>
      {children}
    </PaymentContext.Provider>
    
  )
}
export const usePaymentContext = () => {
  const {
    payments,
    paymentsTypes,
    setPayments,
  } = useContext(PaymentContext)
  function changePaymentsForm(id:string) {
    const nowPayment = paymentsTypes.find( payment => payment.id === id)
    setPayments(nowPayment)
  }
  return {
    paymentsTypes,
    payments,
    changePaymentsForm
  }
} 
