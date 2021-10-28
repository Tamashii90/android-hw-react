import React, { useContext, useEffect } from "react";
import { Link, useHistory, Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import Form from "../components/Form/Form";
import Input from "../components/Form/Input";
import Label from "../components/Form/Label";
import FormGroup from "../components/Form/FormGroup";
import Button from "../components/Form/Button";
import Select from "../components/Form/Select";
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
				toast.success("Success!");
				history.push("/admin");
			} else {
				toast.error(response.data.message);
			}
		} catch (err) {
			toast.error("Network Error");
		}
	};

	if (
		!localStorage.getItem("token") ||
		localStorage.getItem("authority") !== "ADMIN"
	) {
		return <Redirect to="/" />;
	}
	return (
		<div className="container text-center">
			<Form title="Register a Vehicle" onSubmit={register}>
				<FormGroup>
					<Label htmlFor="driver">Driver</Label>
					<Input name="driver" required />
				</FormGroup>
				<FormGroup>
					<Label htmlFor="plugedNumber">Pluged Number</Label>
					<Input
						maxLength="6"
						minLength="6"
						name="plugedNumber"
						required
					/>
				</FormGroup>
				<FormGroup>
					<Label htmlFor="repeatPlugedNumber">
						Repeat Pluged Number
					</Label>
					<Input
						maxLength="6"
						minLength="6"
						name="repeatPlugedNumber"
						required
					/>
				</FormGroup>
				<FormGroup>
					<Label htmlFor="type">Type</Label>
					<Select name="type">
						{types.map((type, idx) => (
							<option key={idx}>{type}</option>
						))}
					</Select>
				</FormGroup>
				<FormGroup>
					<Label htmlFor="productionDate">Production Date</Label>
					<Input type="date" name="productionDate" required />
				</FormGroup>
				<Button loading={loading}>Register</Button>
			</Form>
			<Link to="/admin">Back</Link>
		</div>
	);
}
