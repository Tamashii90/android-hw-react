import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { toast } from "react-toastify";
import searchCriteria from "../utils/searchCriteria";
import ListContext from "../context/ListContext";
import MyApi from "../utils/MyApi";
import ProgressBar from "../components/ProgressBar";

export default function ViolationPageAdmin() {
	const [, setList] = useContext(ListContext);
	const [types, setTypes] = useState([]);
	const [violation, setViolation] = useState([]);
	const { id: violationId } = useParams();
	const history = useHistory();
	const { get, cache, loading: pageLoader, response } = new MyApi();
	const { put, loading: btnLoader } = new MyApi();
	useEffect(async () => {
		cache.clear();
		try {
			const violation = await get(`/api/violations-log/${violationId}`);
			if (response.ok) {
				setViolation(violation);
			} else {
				toast.error(response.data?.message);
			}
			const types = await get("/api/violations");
			if (response.ok) {
				setTypes(types);
			} else {
				toast.error(response.data?.message);
			}
		} catch (e) {
			toast.error("Network Error");
		}
	}, []);

	const updateViolation = async e => {
		e.preventDefault();
		const form = new FormData();
		form.append("date", e.target.date.value);
		form.append("location", e.target.location.value);
		form.append("type", e.target.type.value);
		form.append("paid", e.target.paid.checked);
		try {
			await put(
				`/api/violations-log/${violation.id}`,
				Object.fromEntries(form)
			);
			if (response.ok) {
				refreshViolationsList();
			} else {
				toast.error(response.data?.message);
			}
		} catch (e) {
			toast.error("Network Error");
		}
	};

	const refreshViolationsList = async () => {
		const location = searchCriteria.location;
		const driver = searchCriteria.driver;
		const fromDate = searchCriteria.fromDate;
		const toDate = searchCriteria.toDate;
		const plugedNumber = searchCriteria.plugedNumber;
		cache.clear();
		try {
			const data = await get(
				`/api/violations-log/?plugedNumber=${plugedNumber}&driver=${driver}&location=${location}&fromDate=${fromDate}&toDate=${toDate}`
			);
			if (response.ok) {
				setList(data);
				history.replace("/admin");
			} else {
				toast.error(response.data.message);
			}
		} catch (e) {
			console.log(e);
			toast.error("Network Error");
		}
	};

	return (
		<>
			{pageLoader && <ProgressBar />}
			{response.ok && (
				<div>
					<form onSubmit={updateViolation}>
						<h2 className="text-center">Violation Details</h2>
						<div className="form-group">
							<label htmlFor="driver">Driver</label>
							<input
								className="form-control-plaintext"
								type="text"
								defaultValue={violation.driver}
								readOnly
								id="driver"
								name="driver"
							/>
						</div>
						<div className="form-group">
							<label htmlFor="plugedNumber">Pluged Number</label>
							<input
								className="form-control-plaintext"
								defaultValue={violation.plugedNumber}
								readOnly
								type="text"
								id="plugedNumber"
								name="plugedNumber"
							/>
						</div>
						<div className="form-group">
							<label htmlFor="location">Location</label>
							<input
								className="form-control"
								defaultValue={violation.location}
								type="text"
								id="location"
								name="location"
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
									<option
										key={idx}
										selected={violation.type === type}
									>
										{type}
									</option>
								))}
							</select>
						</div>
						<div className="form-group">
							<label htmlFor="date">Date</label>
							<input
								className="form-control"
								type="date"
								defaultValue={violation.date}
								id="date"
								name="date"
							/>
						</div>
						<div className="form-group">
							<label htmlFor="tax">Tax</label>
							<input
								className="form-control-plaintext"
								type="text"
								defaultValue={violation.tax}
								id="tax"
								name="tax"
								readOnly
							/>
						</div>
						<div>
							<label className="form-check-label" htmlFor="paid">
								Paid
							</label>
							<input
								className="form-check-input"
								type="checkbox"
								defaultChecked={violation.paid}
								id="paid"
								name="paid"
							/>
						</div>
						<button type="submit" className="btn btn-primary">
							Update
							{btnLoader && (
								<span className="ms-2 spinner-grow spinner-grow-sm"></span>
							)}
						</button>
					</form>
				</div>
			)}
		</>
	);
}
