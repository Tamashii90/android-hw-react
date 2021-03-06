import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { toast } from "react-toastify";
import searchCriteria from "../utils/searchCriteria";
import ListContext from "../context/ListContext";
import MyApi from "../utils/MyApi";
import ProgressBar from "../components/ProgressBar";
import Form from "../components/Form/Form";
import Select from "../components/Form/Select";
import Button from "../components/Form/Button";
import FormGroup from "../components/Form/FormGroup";
import Input from "../components/Form/Input";
import Label from "../components/Form/Label";
import Toggle from "../components/Form/Toggle";

export default function ViolationPageAdmin() {
	const [, setList] = useContext(ListContext);
	const [types, setTypes] = useState([]);
	const [violation, setViolation] = useState([]);
	const { id: violationId } = useParams();
	const history = useHistory();
	const { get, loading: pageLoader, response } = new MyApi();
	const { put, loading: btnLoader } = new MyApi();
	useEffect(async () => {
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
			await put(`/api/violations-log/${violation.id}`, Object.fromEntries(form));
			if (response.ok) {
				toast.success("Success!");
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
		const plateNumber = searchCriteria.plateNumber;
		try {
			const data = await get(
				`/api/violations-log/?plateNumber=${plateNumber}&driver=${driver}&location=${location}&fromDate=${fromDate}&toDate=${toDate}`
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
		<div className="container text-center">
			{pageLoader && <ProgressBar />}
			{response.ok && (
				<Form onSubmit={updateViolation} title="Violation Details">
					<FormGroup>
						<Label htmlFor="driver">Driver</Label>
						<Input
							className="form-control-plaintext"
							defaultValue={violation.driver}
							readOnly
							name="driver"
						/>
					</FormGroup>
					<FormGroup>
						<Label htmlFor="plateNumber">Plate Number</Label>
						<Input
							className="form-control-plaintext"
							defaultValue={violation.plateNumber}
							readOnly
							name="plateNumber"
						/>
					</FormGroup>
					<FormGroup>
						<Label htmlFor="location">Location</Label>
						<Input defaultValue={violation.location} name="location" />
					</FormGroup>
					<FormGroup>
						<Label htmlFor="type">Type</Label>
						<Select name="type">
							{types.map((type, idx) => (
								<option key={idx} selected={violation.type === type}>
									{type}
								</option>
							))}
						</Select>
					</FormGroup>
					<FormGroup>
						<Label htmlFor="date">Date</Label>
						<Input type="date" defaultValue={violation.date} name="date" />
					</FormGroup>
					<FormGroup>
						<Label htmlFor="tax">Tax</Label>
						<Input
							className="form-control-plaintext"
							defaultValue={violation.tax && `$${violation.tax}`}
							name="tax"
							readOnly
						/>
					</FormGroup>
					<FormGroup>
						<Label htmlFor="paid">Paid</Label>
						<Toggle name="paid" defaultChecked={violation.paid} />
					</FormGroup>
					<Button loading={btnLoader}>Update</Button>
				</Form>
			)}
		</div>
	);
}
