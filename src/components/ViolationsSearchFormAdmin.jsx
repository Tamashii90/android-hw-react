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
				document.getElementById("search-div").scrollIntoView();
			} else {
				toast.error(response.data.message);
			}
		} catch (e) {
			toast.error("Network Error");
		}
	};
	return (
		<div className="form-container container my-5">
			<form onSubmit={search}>
				<div className="row">
					<h2 className="text-center p-4">Find Violations</h2>

					<div className="form-group col-sm-6 row">
						<label
							className="col-form-label col-sm-3 big-label"
							htmlFor="plugedNumber"
						>
							Pluged Number
						</label>
						<div className="col-sm-9">
							<input
								className="form-control"
								minLength="6"
								maxLength="6"
								type="text"
								id="plugedNumber"
								name="plugedNumber"
							/>
						</div>
					</div>
					<div className="form-group col-sm-6 row">
						<label
							className="col-form-label col-sm-3"
							htmlFor="driver"
						>
							Driver
						</label>
						<div className="col-sm-9">
							<input
								className="form-control"
								type="text"
								id="driver"
								name="driver"
							/>
						</div>
					</div>
					<div className="form-group col-sm-6 row">
						<label
							className="col-form-label col-sm-3"
							htmlFor="location"
						>
							Location
						</label>
						<div className="col-sm-9">
							<input
								className="form-control"
								type="text"
								id="location"
								name="location"
							/>
						</div>
					</div>
					<div className="form-group col-sm-6 row">
						<label
							className="col-form-label col-sm-3 big-label"
							htmlFor="fromDate"
						>
							From Date
						</label>
						<div className="col-sm-9">
							<input
								className="form-control"
								type="date"
								id="fromDate"
								name="fromDate"
							/>
						</div>
					</div>
					<div className="form-group col-sm-6 row">
						<label
							className="col-form-label col-sm-3 big-label"
							htmlFor="toDate"
						>
							To Date
						</label>
						<div className="col-sm-9">
							<input
								className="form-control"
								type="date"
								id="toDate"
								name="toDate"
							/>
						</div>
					</div>
					<div className="col-12">
						<button type="submit" className="btn btn-primary">
							Search
							{loading && (
								<span className="ms-3 spinner-grow spinner-grow-sm"></span>
							)}
						</button>
					</div>
				</div>
			</form>
		</div>
	);
}
