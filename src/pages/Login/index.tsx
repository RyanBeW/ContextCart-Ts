import { Button } from '@mui/material';
import {
  Container,
  Titulo,
  InputContainer
} from './styles';
import {
  Input,
  InputLabel,
  InputAdornment 
} from '@mui/material';
import { useNavigate } from 'react-router-dom'
import { useUserContext } from '../../common/context/User';

export function Login() {
  const navigate = useNavigate();
  const { login,setLogin,balance,setBalance } = useUserContext()
  return (
    <Container>
          <Titulo>
            Input your name
          </Titulo>
          <InputContainer>
            <InputLabel>
              Name
            </InputLabel>
            <Input
              type="text"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />
          </InputContainer>
          <InputContainer>
            <InputLabel>
              Balance
            </InputLabel>
            <Input
              type="number"
              value={balance}
              onChange={(e) => setBalance(parseInt(e.target.value))}
              
              startAdornment={
              <InputAdornment position="start">
                R$
              </InputAdornment>
            }
          />

          </InputContainer>
          <Button
            variant="contained"
            color="primary"
            disabled={login.length < 4 || balance === 0}
            onClick={() => {navigate("/store")}}
          >
            Next
          </Button>
    </Container>
  )
};
