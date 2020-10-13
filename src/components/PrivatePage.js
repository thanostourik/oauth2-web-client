import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { logout } from 'actions/oauth';
import { get } from 'actions/xhr';
import useAuth from 'auth/useAuth';
import AppNav from 'components/AppNav';
import logo from "logo.svg";

const PrivatePage = () => {
	const { isAuthenticated } = useAuth();
	const [, setMe] = useState(undefined);

	useEffect(() => {
		if ( isAuthenticated ) {
			get('/api/someresources')
				.then(res => res.json())
				.then(res => setMe(res));
		}
	}, [isAuthenticated]);

	if ( !isAuthenticated ) {
		return (
			<div>
				<h1>Not authorized!!</h1>
				<Link to="/" className="App-link">Home</Link>
			</div>
		)
	}
	return (
		<header className="App-header">
			<h1>Private Page</h1>
			<img src={logo} className="App-logo" alt="logo" />
			<AppNav
				isAuthenticated={isAuthenticated}
				logout={logout}
			/>
		</header>
	);
}

export default PrivatePage;