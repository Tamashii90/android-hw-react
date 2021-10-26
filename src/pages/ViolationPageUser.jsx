import React, { useContext, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { toast } from "react-toastify";
import searchCriteria from "../utils/searchCriteria";
import ListContext from "../context/ListContext";
import MyApi from "../utils/MyApi";
import ProgressBar from "../components/ProgressBar";
import MyTable from "../components/Table/MyTable";
import Row from "../components/Table/Row";

export default function ViolationPageUser() {
	const {
		get,
		loading: pageLoader,
		response,
		cache,
		data: violation = {}
	} = new MyApi();
	const { post, loading } = new MyApi();
	const [, setList] = useContext(ListContext);
	const { id: violationId } = useParams();
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
			await get(`/api/violations-log/${violationId}`);
			if (!response.ok) {
				toast.error(response.data?.message);
			}
		} catch (e) {
			toast.error("Network Error");
		}
	}, []);
	return (
		<>
			{pageLoader && <ProgressBar />}
			{!pageLoader && response.ok && (
				<div className="container text-center">
					<h2 className="text-center text-secondary mb-5">
						Violation Details
					</h2>
					<MyTable>
						<Row heading="Date" value={violation.date} />
						<Row heading="Driver" value={violation.driver} />
						<Row heading="Tax" value={violation.tax} />
						<Row
							heading="Paid"
							value={violation.paid ? "Yes" : "No"}
						/>
						<Row heading="Location" value={violation.location} />
						<Row heading="Type" value={violation.type} />
						<Row
							heading="Pluged Number"
							value={violation.plugedNumber}
						/>
					</MyTable>
					<button
						className="btn btn-primary my-3"
						onClick={payForViolation}
					>
						Pay for This Violation
						{loading && (
							<span className="ms-2 spinner-grow spinner-grow-sm"></span>
						)}
					</button>
				</div>
			)}
		</>
	);
}
