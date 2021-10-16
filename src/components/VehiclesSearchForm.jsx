import React from "react";
import { useFetch } from "use-http";
import { ToastContainer, toast, Zoom } from "react-toastify";

export default function VehiclesSearchForm({ setVehicle }) {
	const { get, loading, response } = useFetch(process.env.BASE_URL, {
		headers: {
			"Authorization": `Bearer ${localStorage.getItem("token")}`
		}
	});
	const findVehicle = async e => {
		e.preventDefault();
		setVehicle(null);
		const plugedNumber = e.target.plugedNumber.value;
		try {
			const vehicle = await get(`/api/vehicles/${plugedNumber}`);
			if (response.ok) {
				setVehicle(vehicle);
			} else {
				toast.error(response.data?.message);
			}
		} catch (e) {
			toast.error("Network Error");
		}
	};
	return (
		<div className="form-container container mb-5">
			<h2 className="text-center">Find Vehicle</h2>
			<form onSubmit={findVehicle}>
				<div className="form-group">
					<label htmlFor="plugedNumber">Pluged Number</label>
					<input
						className="form-control"
						minLength="6"
						maxLength="6"
						type="text"
						id="plugedNumber"
						required
						name="plugedNumber"
					/>
				</div>
				<button className="btn btn-primary" type="submit">
					Search
					{loading && (
						<span className="ms-2 spinner-grow spinner-grow-sm"></span>
					)}
				</button>
			</form>
		</div>
	);
}
