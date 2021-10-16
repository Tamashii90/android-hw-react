import React, { useContext } from "react";
import useFetch from "use-http";
import { ToastContainer, toast, Zoom } from "react-toastify";
import searchCriteria from "../utils/searchCriteria";
import ListContext from "../context/ListContext";

export default function SearchForm() {
	const [, setList] = useContext(ListContext);
	const { get, loading, response } = useFetch(process.env.BASE_URL, {
		headers: {
			"Authorization": `Bearer ${localStorage.getItem("token")}`
		}
	});
	const search = async e => {
		e.preventDefault();
		const driver = e.target.driver.value;
		const location = e.target.location.value;
		const fromDate = e.target.fromDate.value;
		const toDate = e.target.toDate.value;
		const plugedNumber = e.target.plugedNumber.value;
		try {
			const data = await get(
				`/api/violations-log/?plugedNumber=${plugedNumber}&driver=${driver}&location=${location}&fromDate=${fromDate}&toDate=${toDate}`
			);
			if (response.ok) {
				searchCriteria.location = location;
				searchCriteria.plugedNumber = plugedNumber;
				searchCriteria.driver = driver;
				searchCriteria.fromDate = fromDate;
				searchCriteria.toDate = toDate;
				setList(data);
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
				<h2 className="text-center">Find Violations</h2>
				<div className="form-group">
					<label htmlFor="driver">Driver</label>
					<input
						className="form-control"
						type="text"
						id="driver"
						name="driver"
					/>
				</div>
				<div className="form-group">
					<label htmlFor="plugedNumber">Pluged Number</label>
					<input
						className="form-control"
						minLength="6"
						maxLength="6"
						type="text"
						id="plugedNumber"
						name="plugedNumber"
					/>
				</div>
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
						<span className="ml-3 spinner-grow spinner-grow-sm"></span>
					)}
				</button>
			</form>
		</div>
	);
}
