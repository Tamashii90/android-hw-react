import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import MyApi from "../utils/MyApi";
import Button from "./Form/Button";

export default function ViolationModal({ plateNumber, showModal }) {
	const [types, setTypes] = useState([]);
	const { post, loading, response } = new MyApi();
	const { get, response: fetchResponse } = new MyApi();
	// prevent scroll when modal is visible
	document.body.style.overflow = "hidden";

	useEffect(async () => {
		try {
			const data = await get("/api/violations");
			if (fetchResponse.ok) {
				setTypes(data);
			}
		} catch (e) {
			toast.error("Network Error");
		}
	}, []);

	const submitViolation = async e => {
		e.preventDefault();
		const form = new FormData(e.target);
		form.append("paid", "false");
		form.append("plateNumber", plateNumber);
		try {
			await post(`/api/violations-log`, Object.fromEntries(form));
			if (response.ok) {
				toast.success("Success!");
				closeModal({ target: null });
			} else {
				toast.error(response.data?.message);
			}
		} catch (e) {
			toast.error("Network Error");
		}
	};
	const closeModal = e => {
		if (!e.target || e.target.classList.contains("overlay")) {
			showModal(false);
			document.body.style.overflow = "visible";
		}
	};

	return (
		<div className="overlay fixed-top w-100 h-100" onClick={closeModal}>
			<form onSubmit={submitViolation} className="bg-primary">
				<div className="form-group row">
					<label htmlFor="plateNumber" className="col-sm-3 col-form-label">
						Plate Number
					</label>
					<div className="col-sm-9">
						<input
							type="text"
							readOnly
							required
							className="form-control-plaintext"
							id="plateNumber"
							defaultValue={plateNumber}
						/>
					</div>
				</div>
				<div className="form-group row">
					<label htmlFor="violationType" className="col-sm-3 col-form-label">
						Type
					</label>
					<div className="col-sm-9">
						<select
							className="custom-select form-control"
							name="violationType"
							id="violationType"
							required
						>
							{types.map((type, idx) => (
								<option key={idx}>{type}</option>
							))}
						</select>
					</div>
				</div>
				<div className="form-group row">
					<label htmlFor="location" className="col-sm-3 col-form-label">
						Location
					</label>
					<div className="col-sm-9">
						<input
							type="text"
							className="form-control"
							name="location"
							id="location"
							required
						/>
					</div>
				</div>
				<Button loading={loading}>Submit</Button>
			</form>
		</div>
	);
}
