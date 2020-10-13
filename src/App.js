import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AuthContext from 'auth/AuthContext';
import useInitializeAuth from 'auth/useInitializeAuth';
import LoginPage from 'components/LoginPage';
import PrivatePage from 'components/PrivatePage';
import HomePage from 'components/HomePage';
import "App.css";

function App() {
	const jwtBag = useInitializeAuth();

	return (
		<div className="App">
			<AuthContext.Provider value={jwtBag}>
				<Switch>
					<Route path="/login" component={LoginPage} />
					<Route path="/private" component={PrivatePage} />
					<Route exact path="/" component={HomePage} />
				</Switch>
			</AuthContext.Provider>
		</div>
	);
}

export default App;