import React, { useState, useCallback } from 'react';
import { login } from 'actions/oauth';

const LoginPage = ({ history }) => {
	const [email, setEmail] = useState("");
	const [pass, setPass] = useState("");

	const onSubmit = useCallback(e => {
		login(email, pass)
			.then(() => history.push("/"));
		e.preventDefault();
	}, [email, pass, history]);

	return (
		<div>
			<form onSubmit={onSubmit}>
				<input name="email" type="text" value={email} onChange={e => setEmail(e.currentTarget.value)} />
				<input name="pass" type="password" value={pass} onChange={e => setPass(e.currentTarget.value)} />
				<button type="submit">Login</button>
			</form>
		</div>
	)
}

export default LoginPage;