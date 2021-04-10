import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import {UserContext} from '../UserContext';

const isAuth = (WrappedComponent) => {

    const Component = (props) => {
        const { user } = useContext(UserContext);
        const history = useHistory();
        
        if (!user) {
            history.push('/users/login')

            return null;
        }

        return <WrappedComponent {...props} />
    }

    return Component;
};

export default isAuth;