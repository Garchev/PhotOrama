import { Route, Switch, BrowserRouter } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Upload from './components/Files/Upload';
import Logout from './components/Auth/Logout';
import ImageDetails from './components/Images/ImageDetails';

function App() {

	return (
		<div>
			<BrowserRouter >
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
			</BrowserRouter>
		</div>
	)
}

export default App;
