import { useState, useEffect } from 'react';
import AuthUtils from 'auth/AuthUtils';
import AuthService from 'auth/AuthService';
import { loginRefresh } from 'actions/oauth';

const InitialJwt = {
	isAuthenticated: false,
	accessToken: null,
	expiration: null
}

export default function useInitializeAuth() {
	const [initialized, setInitialized] = useState(false);
	const [jwt, setJwt] = useState(InitialJwt);

	//
	// Initialize authentication in first land
	//
	useEffect(() => {
		// Initialize AuthService
		AuthUtils.service = new AuthService(setJwt);

		// Try refresh token in case we have an active one
		loginRefresh()
			.then(res => {
				AuthUtils.login(res.data);
				setInitialized(true);
			});

		// Add listener to localStorage to trigger logout in the non active tabs
		const syncLogout = event => {
			if ( event.key === 'logout' ) {
				AuthUtils.logout(false);
			}
		}
		window.addEventListener('storage', syncLogout)
		return () => {
			window.removeEventListener('storage', syncLogout);
		}
	}, []);

	return { initialized, ...jwt };
}