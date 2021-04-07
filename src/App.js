import { Route, Switch, BrowserRouter, Redirect} from 'react-router-dom';
import { useState, useMemo } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import UserDetails from './components/Auth/UserDetails'
import Upload from './components/Files/Upload';
import EditImage from './components/Images/EditImage';
import MyImages from './components/Images/MyImages';
import AllImages from './components/Images/AllImages';
import ImageDetails from './components/Images/ImageDetails';
import Logout from './components/Auth/Logout';
import { UserContext } from './UserContext';

function App() {
	const [user, setUser] = useState(null);
	const userValue = useMemo(() => ({ user, setUser }), [user, setUser]);
	const isLogged = user && user.loggedIn;

	return (
		<div>
			<BrowserRouter >
				<UserContext.Provider value={userValue}>
					<Header />
					<Switch>
						<Route path="/" exact component={Home} />
						<Route path="/users/login" component={Login} />
						<Route path="/users/register" component={Register} />
						<Route path="/users/logout" component={Logout} />
						<Route path="/users/:id/details" exact >{ isLogged ? <UserDetails/> : <Redirect to='/'/>} </Route>
						<Route path="/users/:id/images"> {isLogged ? <MyImages/> : <Redirect to='/' />} </Route>
						<Route path="/images/all"> {isLogged ? <AllImages/> : <Redirect to='/' />} </Route>
						<Route path="/images/upload">{isLogged ? <Upload/> : <Redirect to='/' />} </Route>
						<Route path="/images/:id/edit"> {isLogged ? <EditImage/> : <Redirect to='/'/>} </Route>
						<Route path="/images/details/:id" component={ImageDetails} />
					</Switch>
				</UserContext.Provider>
			</BrowserRouter>
		</div>
	)
}

export default App;
