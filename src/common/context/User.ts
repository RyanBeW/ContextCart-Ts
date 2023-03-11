import {createContext,useContext} from 'react'
interface LoginProps {
  login: string;
  setLogin: (login: string) => void 
  balance: number;
  setBalance: (balance:number) => void 
}
export const UserContext = createContext<LoginProps>({
  login:"",
  balance:0,
  setLogin: () => {},
  setBalance: () => {},
});

export const useUserContext = () => useContext(UserContext)