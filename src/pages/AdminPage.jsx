import React, { useContext, useState } from "react";
import ViolationsSearchForm from "../components/ViolationsSearchFormAdmin";
import ViolationsList from "../components/ViolationsList";
import VehiclesSearchForm from "../components/VehiclesSearchForm";
import VehicleDetails from "../components/VehicleDetails";
import ListContext from "../context/ListContext";

export default function AdminPage() {
	const [, setList] = useContext(ListContext);
	const [violations, setViolations] = useState(true);
	const [vehicle, setVehicle] = useState(null);

	const transitionToVehicles = () => {
		setList([]);
		setViolations(false);
	};
	const transitionToViolations = () => {
		setViolations(true);
	};
	return (
		<>
			<div className="btn-group">
				<button
					className="btn btn-primary"
					onClick={transitionToViolations}
				>
					Violations
				</button>
				<button
					className="btn btn-primary"
					onClick={transitionToVehicles}
				>
					Vehicles
				</button>
			</div>
			{violations ? (
				<ViolationsSearchForm />
			) : (
				<VehiclesSearchForm setVehicle={setVehicle} />
			)}
			{violations ? (
				<ViolationsList />
			) : (
				<VehicleDetails vehicle={vehicle} setVehicle={setVehicle} />
			)}
		</>
	);
}
