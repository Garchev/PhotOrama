import './Auth.css';
import Cookie from 'js-cookie';


function Logout({history}) {
   
    Cookie.remove('auth');
    console.log(history)
    history.push('/')
    return null

}


export default Logout;