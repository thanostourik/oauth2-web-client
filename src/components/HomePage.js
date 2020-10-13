import React from 'react';
import { useAuth } from 'auth';
import { logout } from 'actions/oauth';
import AppNav from 'components/AppNav';
import logo from "logo.svg";


const HomePage = () => {
	const { isAuthenticated } = useAuth();
	return (
		<header className="App-header">
			<h1>Home Page</h1>
			<img src={logo} className="App-logo" alt="logo" />
			<AppNav
				isAuthenticated={isAuthenticated}
				logout={logout}
			/>
		</header>
	)
}

export default HomePage;