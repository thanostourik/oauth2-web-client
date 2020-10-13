import React from 'react';
import { Link } from 'react-router-dom';

const AppNav = ({ isAuthenticated, logout }) => (
	<nav className="App-nav">
		<Link to="/" className="App-link">Home</Link>
		<Link to="/private" className="App-link">Private</Link>
		{
			!isAuthenticated &&
			<Link to="/login" className="App-link">Login</Link>
		}
		{
			isAuthenticated &&
			<button type="button" onClick={() => logout()} className="App-link App-logout">Logout</button>
		}
	</nav>
);

export default AppNav;