import React, { useContext, useEffect } from "react";
import { Link, useHistory, Redirect } from "react-router-dom";
import { ToastContainer, toast, Flip } from "react-toastify";
import UsernameContext from "../context/UsernameContext";
import MyApi from "../utils/MyApi";

export default function RegisterPage() {
	const { post, loading, response } = new MyApi();
	const { get, data: types = [] } = new MyApi();
	const [, setUser] = useContext(UsernameContext);
	const history = useHistory();

	useEffect(async () => {
		try {
			await get("/api/vehicles/types");
		} catch (e) {
			toast.error("Network Error");
		}
	}, []);

	const register = async e => {
		e.preventDefault();
		const form = new FormData(e.target);
		form.append("crossOut", "false");
		try {
			const data = await post("/api/register", Object.fromEntries(form));
			if (response.ok) {
				localStorage.setItem("token", data.jwt);
				localStorage.setItem("authority", data.authority);
				setUser(e.target.driver.value);
				history.replace("/");
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
		<div className="container form-container mb-5">
			<h2 className="text-center">Register An Account</h2>
			<form onSubmit={register}>
				<div className="form-group">
					<label htmlFor="driver">Driver</label>
					<input
						className="form-control"
						type="text"
						id="driver"
						name="driver"
						required
					/>
				</div>
				<div className="form-group">
					<label htmlFor="plugedNumber">Pluged Number</label>
					<input
						className="form-control"
						id="plugedNumber"
						maxLength="6"
						minLength="6"
						name="plugedNumber"
						required
					/>
				</div>
				<div className="form-group">
					<label htmlFor="repeatPlugedNumber">
						Repeat Pluged Number
					</label>
					<input
						className="form-control"
						id="repeatPlugedNumber"
						maxLength="6"
						minLength="6"
						name="repeatPlugedNumber"
						required
					/>
				</div>
				<div className="form-group">
					<label htmlFor="type">Type</label>
					<select
						className="custom-select form-control"
						name="type"
						id="type"
						required
					>
						{types.map((type, idx) => (
							<option key={idx}>{type}</option>
						))}
					</select>
				</div>
				<div className="form-group">
					<label htmlFor="productionDate">Production Date</label>
					<input
						className="form-control"
						type="date"
						id="productionDate"
						name="productionDate"
						required
					/>
				</div>
				<button type="submit" className="btn btn-primary">
					Register
					{loading && (
						<span className="ms-2 spinner-grow spinner-grow-sm"></span>
					)}
				</button>
			</form>
			<Link to="/login">Already a member ?</Link>
		</div>
	);
}
