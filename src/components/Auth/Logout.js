import { useContext } from 'react';
import { UserContext } from '../../UserContext';
import { logout } from '../../services/user';

function Logout({ history }) {
const {setUser} = useContext(UserContext)
    
    logout().then(() => {
        setUser(null);       
        history.push('/');
    })
    
    return null;
}

export default Logout;