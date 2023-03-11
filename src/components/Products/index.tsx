import { Container } from './styles';
import { memo, useState } from 'react';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useCartContext } from '../../common/context/Cart';
interface ProductsProps {
  name: string;
  photo:string;
  id: string;
  value: number;
  unit?: number 
}
//
export function Products({
  name,
  photo,
  id,
  value,
  unit
}:ProductsProps) {
  const { cart, addProduct,removeProduct} = useCartContext()
  const productInCart = cart.find(product => product.id === id)
  return (
      <Container>
        <div>
          <img
            src={`/assets/${photo}.png`}
            alt={`foto de ${name}`}
          />
          <p>
            {name} - R$ {value?.toFixed(2)} <span>Kg</span>
          </p>
        </div>
        <div>
          <IconButton
            onClick={() => removeProduct(id)}
            color="secondary"
            disabled={!productInCart}
          >
            <RemoveIcon />
          </IconButton>
          {productInCart?.unit || 0}
          <IconButton onClick={() => addProduct({ name,photo,id, value})}
            color="primary"
          >
            <AddIcon />
          </IconButton>
        </div>
      </Container>
  )
}

export default memo(Products)