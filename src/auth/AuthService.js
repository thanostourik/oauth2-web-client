import { decodeJwt } from 'auth/JwtUtils';

class AuthService {
	accessToken = null;
	expiration = null;
	refreshToken = null;
	refreshExpiration = null;
	setJwt;

	constructor(setJwt) {
		this.setJwt = setJwt;
	}

	login(jwt) {
		if ( !jwt ) return undefined;

		this.accessToken = jwt.access_token;
		this.expiration = decodeJwt(this.accessToken).exp;
		this.refreshToken = jwt.refresh_token;
		this.refreshExpiration = decodeJwt(this.refreshToken).exp;

		const auth = {
			isAuthenticated: true,
			accessToken: this.accessToken,
			expiration: this.expiration
		};

		// Set the auth context
		this.setJwt(auth);

		// Return the auth object
		return auth;
	}

	logout(notifyStorage = true) {
		this.accessToken = null;
		this.expiration = null;
		this.setJwt({
			isAuthenticated: false,
			accessToken: null,
			expiration: null
		});
		if ( notifyStorage ) {
			window.localStorage.setItem('logout', Date.now().toString());
		}
	}
}

export default AuthService;