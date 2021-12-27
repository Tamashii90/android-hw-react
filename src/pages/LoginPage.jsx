import React, { useContext } from "react";
import { Link, useHistory, Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import UsernameContext from "../context/UsernameContext";
import MyApi from "../utils/MyApi";
import Form from "../components/Form/Form";
import Label from "../components/Form/Label";
import Button from "../components/Form/Button";
import FormGroup from "../components/Form/FormGroup";
import Input from "../components/Form/Input";

export default function LoginPage() {
	const { post, loading, response } = new MyApi();
	const [, setUser] = useContext(UsernameContext);
	const history = useHistory();
	const login = async e => {
		e.preventDefault();
		const form = new FormData(e.target);
		const plateNumber = e.target.password.value;
		try {
			const data = await post("/api/login", Object.fromEntries(form));
			if (response.ok) {
				if (data.authority === "USER") {
					localStorage.setItem("plateNumber", plateNumber);
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
		<div className="container text-center">
			<Form onSubmit={login} title="Log in to Your Account">
				<FormGroup>
					<Label htmlFor="username">Username</Label>
					<Input name="username" value="admin" required />
				</FormGroup>
				<FormGroup>
					<Label htmlFor="password">Password</Label>
					<Input name="password" type="password" defaultValue="12345678" required />
				</FormGroup>
				<Button loading={loading}>Log in</Button>
			</Form>
		</div>
	);
}
