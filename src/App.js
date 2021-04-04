import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { useState, useMemo } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Upload from './components/Files/Upload';
import Logout from './components/Auth/Logout';
import ImageDetails from './components/Images/ImageDetails';
import { UserContext } from './UserContext';

function App() {
	const [user, setUser] = useState(null);
	const userValue = useMemo(() => ({ user, setUser }), [user, setUser])

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
						{/* <Route path="/users/details/:id" component={UserDetails} /> */}
						<Route path="/images/upload" component={Upload} />
						<Route path="/images/details/:id" component={ImageDetails} />
					</Switch>
				</UserContext.Provider>
			</BrowserRouter>
		</div>
	)
}

export default App;
