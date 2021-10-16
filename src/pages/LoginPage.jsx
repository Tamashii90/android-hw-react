import React, { useEffect, useContext } from "react";
import { Link, useHistory, Redirect } from "react-router-dom";
import { ToastContainer, toast, Zoom } from "react-toastify";
import useFetch from "use-http";
import UsernameContext from "../context/UsernameContext";

export default function LoginPage() {
	const { post, loading, response } = useFetch(process.env.BASE_URL);
	const [, setUser] = useContext(UsernameContext);
	const history = useHistory();
	const login = async e => {
		e.preventDefault();
		const form = new FormData(e.target);
		const plugedNumber = e.target.password.value;
		try {
			const data = await post("/api/login", Object.fromEntries(form));
			if (response.ok) {
				if (data.authority === "USER") {
					localStorage.setItem("plugedNumber", plugedNumber);
				}
				localStorage.setItem("token", data.jwt);
				localStorage.setItem("authority", data.authority);
				setUser(e.target.username.value);
				history.replace(data.authority === "ADMIN" ? "/admin" : "/");
			} else {
				toast.error(response.data.message);
			}
		} catch (err) {
			toast.error("Network Error");
		}
	};

	if (localStorage.getItem("token")) {
		return <Redirect to="/" />;
	}
	return (
		<>
			<div className="form-container container mb-5">
				<h2 className="text-center">Log In to Your Account</h2>
				<form onSubmit={login}>
					<div className="form-group">
						<label htmlFor="username">Username</label>
						<input
							className="form-control"
							type="text"
							id="username"
							name="username"
							defaultValue="noob"
							required
						/>
					</div>
					<div className="form-group">
						<label htmlFor="password">Password</label>
						<input
							className="form-control"
							type="password"
							id="password"
							name="password"
							defaultValue="12345678"
							required
						/>
					</div>
					<button type="submit" className="btn btn-primary">
						Log In
						{loading && (
							<span className="ml-3 spinner-grow spinner-grow-sm"></span>
						)}
					</button>
				</form>
				<Link to="/register">Don't have an account ?</Link>
			</div>
		</>
	);
}
