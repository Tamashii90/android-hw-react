import React, { useContext } from "react";
import { ToastContainer, toast, Zoom } from "react-toastify";
import searchCriteria from "../utils/searchCriteria";
import ListContext from "../context/ListContext";
import MyApi from "../utils/MyApi";

export default function SearchForm() {
	const [, setList] = useContext(ListContext);
	const { get, loading, response } = new MyApi();
	const search = async e => {
		e.preventDefault();
		const location = e.target.location.value;
		const fromDate = e.target.fromDate.value;
		const toDate = e.target.toDate.value;
		const plugedNumber = localStorage.getItem("plugedNumber");
		try {
			const data = await get(
				`/api/violations-log/user/${plugedNumber}?location=${location}&fromDate=${fromDate}&toDate=${toDate}`
			);
			if (response.ok) {
				searchCriteria.location = location;
				searchCriteria.fromDate = fromDate;
				searchCriteria.toDate = toDate;
				setList(data);
				document.getElementById("search-div").scrollIntoView();
			} else {
				toast.error(response.data.message);
			}
		} catch (e) {
			toast.error("Network Error");
		}
	};
	return (
		<div className="form-container container mb-5">
			<form onSubmit={search}>
				<h2 className="text-center">Find Unpaid Violations</h2>
				<div className="form-group">
					<label htmlFor="location">Location</label>
					<input
						className="form-control"
						type="text"
						id="location"
						name="location"
					/>
				</div>
				<div className="form-group">
					<label htmlFor="fromDate">From Date</label>
					<input
						className="form-control"
						type="date"
						id="fromDate"
						name="fromDate"
					/>
				</div>
				<div className="form-group">
					<label htmlFor="toDate">To Date</label>
					<input
						className="form-control"
						type="date"
						id="toDate"
						name="toDate"
					/>
				</div>
				<button type="submit" className="btn btn-primary">
					Search
					{loading && (
						<span className="ms-2 spinner-grow spinner-grow-sm"></span>
					)}
				</button>
			</form>
		</div>
	);
}
