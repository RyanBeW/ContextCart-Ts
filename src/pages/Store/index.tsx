import {
  Container,
  Header,
  List,
} from './styles';
import storeproducts from './storeproducts.json';
import NavBar from './NavBar';
import { Products } from '../../components/Products';
import { useUserContext } from '../../common/context/User';
interface ProductProps {
  name: string;
  photo: string;
  value: number;
  id: string;
}

export function Store() {
  const { login,setLogin,balance,setBalance } = useUserContext()
  return (
    <Container>
      <NavBar />
      <Header>
        <div>
          <h2> Hello! {login}</h2>
          <h3> Balance: $ {balance}</h3>
        </div>
        <p>Find the best organic products</p>
      </Header>
      <List>
        <h2>
          Products:
        </h2>
        {storeproducts.map((product:ProductProps) => (
          <Products
            {...product}
            key={product.id}
          />
        ))}
      </List>
    </Container>
  )
}
