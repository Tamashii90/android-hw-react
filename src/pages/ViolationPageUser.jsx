import React, { useContext, useEffect } from "react";
import { useHistory, useLocation } from "react-router";
import { toast } from "react-toastify";
import searchCriteria from "../utils/searchCriteria";
import ListContext from "../context/ListContext";
import MyApi from "../utils/MyApi";

export default function ViolationPageUser() {
	const {
		get,
		post,
		loading,
		response,
		cache,
		data: violation = {}
	} = new MyApi();
	const [, setList] = useContext(ListContext);
	const location = useLocation();
	const history = useHistory();
	const payForViolation = async e => {
		try {
			await post(`/api/violations-log/pay/${violation.id}`);
			if (response.ok) {
				refreshViolationsList();
				toast.success("Success!");
			} else {
				toast.error(response.data?.message);
			}
		} catch (e) {
			toast.error("Network Error");
		}
	};

	const refreshViolationsList = async () => {
		const location = searchCriteria.location;
		const fromDate = searchCriteria.fromDate;
		const toDate = searchCriteria.toDate;
		const plugedNumber = localStorage.getItem("plugedNumber");
		cache.clear();
		try {
			const data = await get(
				`/api/violations-log/user/${plugedNumber}?location=${location}&fromDate=${fromDate}&toDate=${toDate}`
			);
			if (response.ok) {
				setList(data);
				history.replace("/");
			} else {
				toast.error(response.data.message);
			}
		} catch (e) {
			console.log(e);
			toast.error("Network Error");
		}
	};

	useEffect(async () => {
		try {
			await get(location.pathname);
			if (!response.ok) {
				toast.error(response.data?.message);
			}
		} catch (e) {
			toast.error("Network Error");
		}
	}, []);
	return (
		<>
			{loading && <h2>Loading..</h2>}
			{!loading && response.ok && (
				<div>
					<ul>
						<li>{violation.date}</li>
						<li>{violation.driver}</li>
						<li>{violation.tax}</li>
						<li>{String(violation.paid)}</li>
						<li>{violation.location}</li>
						<li>{violation.type}</li>
						<li>{violation.plugedNumber}</li>
					</ul>
					<button
						className="btn btn-primary"
						onClick={payForViolation}
					>
						Pay
					</button>
				</div>
			)}
		</>
	);
}
