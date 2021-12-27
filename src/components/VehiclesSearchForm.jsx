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
		const plateNumber = e.target.plateNumber.value;
		try {
			const vehicle = await get(`/api/vehicles/${plateNumber}`);
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
					<Label htmlFor="plateNumber">Plate Number</Label>
					<Input name="plateNumber" minLength="6" maxLength="6" defaultValue="222222" required  />
				</FormGroup>
				<Button loading={loading}>Search</Button>
			</Form>
			<Link to="/register">Register a New Vehicle</Link>
		</div>
	);
}
