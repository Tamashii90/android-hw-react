import React, { useState } from "react";
import { toast } from "react-toastify";
import MyApi from "../utils/MyApi";
import ViolationModal from "./ViolationModal";

export default function VehicleDetails({ vehicle, setVehicle }) {
	const { post, loading, response, cache } = new MyApi();
	const [modal, showModal] = useState(false);

	const crossOutUnCrossOut = async () => {
		const reqObj = {
			"crossOut": !vehicle.crossOut
		};
		try {
			await post(`/api/vehicles/${vehicle.plugedNumber}`, reqObj);
			if (response.ok) {
				cache.clear();
				setVehicle(null);
				toast.success("Success!");
			} else {
				toast.error(response.data?.message);
			}
		} catch (e) {
			toast.error("Network Error");
		}
	};
	if (!vehicle) return null;
	return (
		<>
			<div>
				<ul>
					<li>{vehicle.productionDate}</li>
					<li>{vehicle.registrationDate}</li>
					<li>{String(vehicle.crossOut)}</li>
					<li>{vehicle.driver}</li>
					<li>{vehicle.type}</li>
					<li>{vehicle.plugedNumber}</li>
				</ul>
				<button
					className="btn btn-primary"
					onClick={() => showModal(true)}
				>
					Add a Violation to The Vehicle
				</button>
				<button
					className="btn btn-primary"
					onClick={crossOutUnCrossOut}
				>
					{vehicle.crossOut
						? "Uncross Out The Vehicle"
						: "Cross Out The Vehicle"}
					{loading && (
						<span className="ms-2 spinner-grow spinner-grow-sm"></span>
					)}
				</button>
			</div>
			{modal && (
				<ViolationModal
					plugedNumber={vehicle.plugedNumber}
					showModal={showModal}
				/>
			)}
		</>
	);
}
