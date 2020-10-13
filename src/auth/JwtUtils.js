import jwtDecoder from 'jsonwebtoken';

export const decodeJwt = jwt => jwt ? jwtDecoder.decode(jwt) : null;
export const isExpired = exp => exp ? Date.now() > new Date(exp * 1000) : true;