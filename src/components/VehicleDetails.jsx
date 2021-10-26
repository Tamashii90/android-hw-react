import React, { useState } from "react";
import { toast } from "react-toastify";
import MyApi from "../utils/MyApi";
import ViolationModal from "./ViolationModal";
import MyTable from "./Table/MyTable";
import Row from "./Table/Row";

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
		<div className="container text-center my-5" id="vehicle-table">
			<MyTable className="table">
				<Row heading="Pluged Number" value={vehicle.plugedNumber} />
				<Row heading="Driver" value={vehicle.driver} />
				<Row heading="Type" value={vehicle.type} />
				<Row heading="Production Date" value={vehicle.productionDate} />
				<Row
					heading="Registration Date"
					value={vehicle.registrationDate}
				/>
				<Row
					heading="Crossed Out"
					value={vehicle.crossOut ? "Yes" : "No"}
				/>
			</MyTable>
			<div className="btn-group mt-3">
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
		</div>
	);
}
