import React from 'react';
export const InitialAuth = {
	initialized: false,
	isAuthenticated: false,
	accessToken: null,
	expiration: null
}
const AuthContext = React.createContext(InitialAuth);
export default AuthContext;