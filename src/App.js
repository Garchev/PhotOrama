import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Header from './components/Header/Header';

import './App.css';
import Home from './components/Home/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Upload from './components/Files/Upload';
import Logout from './components/Auth/Logout';

function App() {

	return (
		<div>
			<BrowserRouter >
				<Header />
				<Switch>
					<Route path="/" exact component={Home} />
					<Route path="/users/login" component={Login} />
					<Route path="/users/register" component={Register} />
					<Route path="/images/upload" component={Upload} />
					<Route path="/users/logout" component={Logout} />
				</Switch>
			</BrowserRouter>
		</div>
	)
}

export default App;
