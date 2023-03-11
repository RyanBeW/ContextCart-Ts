import { Nav } from './styles';
import { Logo } from './Logo';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { IconButton } from '@mui/material';
import Badge from '@mui/material/Badge';
import { useCartContext } from '../../../common/context/Cart';
import { useNavigate } from 'react-router-dom'
export default function NavBar() {
  const {quantityProducts} = useCartContext()
  const history = useNavigate();
  return (
    <Nav>
    <Logo/> 
    <IconButton
      disabled={quantityProducts === 0}
      onClick={() => history("/cart")}
    >
        <Badge
          color="primary"
          badgeContent={quantityProducts}
        >
          <ShoppingCartIcon />
        </Badge>
    </IconButton>
    </Nav>
  )
}