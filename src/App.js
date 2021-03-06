import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { lazy, Suspense, useState, useMemo } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Login from './components/Auth/Login';
import UserDetails from './components/Auth/UserDetails'
import Logout from './components/Auth/Logout';
import { UserContext } from './UserContext';
import isAuth from './hoc/isAuth';
import Register from './components/Auth/Register';
import ImageUpload from './components/Files/ImageUpload';
import MyImages from './components/Images/MyImages';
import AllImages from './components/Images/AllImages';
import ImageDetails from './components/Images/ImageDetails';
import EditImage from './components/Images/EditImage';

function App() {
	const [user, setUser] = useState(null);
	const userValue = useMemo(() => ({ user, setUser }), [user, setUser]);
	
	return (

		<BrowserRouter >
			<UserContext.Provider value={userValue}>
				<Header />
				<main>

					<Switch>
						<Route path="/" exact component={Home} />
						<Route path="/users/login" component={Login} />
						<Route path="/users/register" component={Register} />
						<Route path="/users/logout" component={Logout} />
						<Route path="/users/:id/details" exact component={isAuth(UserDetails)} />
						<Route path="/users/:id/images" component={isAuth(MyImages)} />
						<Route path="/images/all" component={isAuth(AllImages)} />
						<Route path="/images/upload" component={isAuth(ImageUpload)} />
						<Route path="/images/:id/edit" component={isAuth(EditImage)} />
						<Route path="/images/details/:id" component={ImageDetails} />
					</Switch>
				</main>
			</UserContext.Provider>
		</BrowserRouter>

	)
}

export default App;
