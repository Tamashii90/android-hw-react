import React, { useState } from "react";
import ViolationsSearchForm from "../components/ViolationsSearchFormAdmin";
import ViolationsList from "../components/ViolationsList";
import VehiclesSearchForm from "../components/VehiclesSearchForm";
import VehicleDetails from "../components/VehicleDetails";

export default function AdminPage() {
	const [violations, setViolations] = useState(true);
	const [vehicle, setVehicle] = useState(null);
	return (
		<>
			<div className="btn-group">
				<button
					className="btn btn-primary"
					onClick={() => setViolations(true)}
				>
					Violations
				</button>
				<button
					className="btn btn-primary"
					onClick={() => setViolations(false)}
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
