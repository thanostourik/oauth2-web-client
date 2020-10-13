import axios from 'axios';
import qs from 'query-string';
import AuthUtils from 'auth/AuthUtils';
import { OAuthClientId, OAuthClientSecret } from 'utils/env-vars';

const GRANT_TYPE_PASSWORD = 'password';
const GRANT_TYPE_REFRESH_TOKEN = 'refresh_token';

export function login(username, password) {
	const headers = {
		'Content-Type': 'application/x-www-form-urlencoded'
	};
	const data = qs.stringify({
		grant_type: GRANT_TYPE_PASSWORD,
		client_id: OAuthClientId,
		client_secret: OAuthClientSecret,
		username, password
	});
	return axios.post('/oauth/token', data, { headers })
		.then(res => {
			console.log(res)
			return AuthUtils.login(res.data)
		});
}

export function loginRefresh() {
	const headers = {
		'Content-Type': 'application/x-www-form-urlencoded'
	};
	const data = qs.stringify({
		grant_type: GRANT_TYPE_REFRESH_TOKEN,
		client_id: OAuthClientId,
		client_secret: OAuthClientSecret
	});
	return axios.post('/oauth/token', data, { headers });
}

export function logout() {
	const headers = {
		'Content-Type': 'application/x-www-form-urlencoded'
	};
	return axios.post('/oauth/token/revoke', null, { headers })
		.then(() => AuthUtils.logout());
}

export async function getBearerToken() {
	if ( !AuthUtils.isTokenExpired() ) {
		return AuthUtils.getToken();
	}
	if ( !AuthUtils.isRefreshExpired() ) {
		const res = await loginRefresh();
		console.log(res)
		return AuthUtils.login(res.data)
	}
	return undefined;
}