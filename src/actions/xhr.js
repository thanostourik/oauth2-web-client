import { getBearerToken } from 'actions/oauth';

const get = async url => {
	const accessToken = await getBearerToken();
	return fetch(url, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${accessToken}`
		}
	});
};

export { get };