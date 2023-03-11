import { Button, Snackbar, InputLabel,Alert,Select,MenuItem } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useState,useMemo} from 'react';
import { Container, Back, TotalContainer, PaymentContainer} from './styles';
import { useCartContext } from '../../common/context/Cart';
import { Products } from '../../components/Products';
import { useNavigate } from 'react-router-dom';
import { PaymentContext, usePaymentContext } from '../../common/context/Payment';
import { useUserContext } from '../../common/context/User';


export function Cart() {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate()
  const {balance = 0} = useUserContext()
  const { cart,totalPriceProducts,buying } = useCartContext()
  const { paymentsTypes, payments,changePaymentsForm }  = usePaymentContext()
  const totalPrice = useMemo(() => balance - totalPriceProducts, [balance,totalPriceProducts])
  return (
    <Container>
      {payments.name}
      <Back 
        onClick={() => {navigate('/store')}}
      >
        <ArrowBackIcon />
      </Back>
      <h2>
        
        Carrinho
      </h2>
      {
        cart.map(product => (
          <Products 
            {...product}
            key={product.id}
          />
        ))
      }
      <PaymentContainer>
        <InputLabel> Forma de Pagamento </InputLabel>
        <Select
          value={payments.id}
          onChange={(e) => changePaymentsForm(e.target.value)}
        >
          {
            paymentsTypes.map(type =>(
              <MenuItem value={type.id} key={type.id} >
                {type.name}
              </MenuItem>
            ))

          }
        </Select>
      </PaymentContainer>
      <TotalContainer>
          <div>
            <h2>Total no Carrinho: </h2>
            <span>$ {totalPrice.toFixed(2)} </span>
          </div>
          <div>
            <h2> Saldo: </h2>
            <span> $ {balance.toFixed(2)} </span>
          </div>
          <div>
            <h2> Saldo Total: </h2>
            <span> $ {totalPriceProducts.toFixed(2)} </span>
          </div>
        </TotalContainer>
      <Button
        onClick={() => {
          buying();
          setOpenSnackbar(true);
          
        }}
        disabled={totalPrice < 0 || cart.length === 0}
        color="primary"
        variant="contained"
      >
         Comprar
       </Button>
        <Snackbar
          anchorOrigin={
            { 
              vertical: 'top',
              horizontal: 'right'
            }
          }
          open={openSnackbar}
          onClose={() => setOpenSnackbar(false)}
        >
           <Alert
            onClose={() => setOpenSnackbar(false)}
            severity="success"
          >
            Compra feita com sucesso!
          </Alert>
        </Snackbar>
    </Container>
  )
}
