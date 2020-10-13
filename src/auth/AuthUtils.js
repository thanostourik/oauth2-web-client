import { isExpired } from 'auth/JwtUtils';

export default class AuthUtils {
	static service;
	static login = jwt => AuthUtils.service.login(jwt);
	static logout = () => AuthUtils.service.logout()
	static getToken = () => AuthUtils.service?.accessToken;
	static isTokenExpired = () => isExpired(AuthUtils.service?.expiration);
	static isRefreshExpired = () => isExpired(AuthUtils.service?.refreshExpiration);
}