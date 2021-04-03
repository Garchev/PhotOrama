import './Auth.css';
import Cookie from 'js-cookie';
import { logout } from '../../services/user';

function Logout({ history }) {

    logout().then(() => {
        
        history.push('/users/login')
        
    })
    
    return null;
}

export default Logout;