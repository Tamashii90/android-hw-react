import React from "react";
import { toast } from "react-toastify";
import MyApi from "../utils/MyApi";
import { Link } from "react-router-dom";
import Form from "./Form/Form";
import FormGroup from "./Form/FormGroup";
import Label from "./Form/Label";
import Input from "./Form/Input";
import Button from "./Form/Button";

export default function VehiclesSearchForm({ setVehicle }) {
	const { get, loading, response } = new MyApi();
	const findVehicle = async e => {
		e.preventDefault();
		setVehicle(null);
		const plugedNumber = e.target.plugedNumber.value;
		try {
			const vehicle = await get(`/api/vehicles/${plugedNumber}`);
			if (response.ok) {
				setVehicle(vehicle);
				document.getElementById("vehicle-table").scrollIntoView();
			} else {
				toast.error(response.data?.message);
			}
		} catch (e) {
			toast.error("Network Error");
		}
	};
	return (
		<div className="container text-center">
			<Form title="Find Vehicle" onSubmit={findVehicle}>
				<FormGroup>
					<Label htmlFor="plugedNumber">Pluged Number</Label>
					<Input
						minLength="6"
						maxLength="6"
						required
						name="plugedNumber"
					/>
				</FormGroup>
				<Button loading={loading}>Search</Button>
			</Form>
			<Link to="/register">Register a New Vehicle</Link>
		</div>
	);
}
