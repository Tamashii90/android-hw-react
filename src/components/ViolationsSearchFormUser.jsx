import React, { useContext } from "react";
import { toast } from "react-toastify";
import searchCriteria from "../utils/searchCriteria";
import Form from "./Form/Form";
import FormGroup from "./Form/FormGroup";
import Button from "./Form/Button";
import Label from "./Form/Label";
import Input from "./Form/Input";
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
		const plateNumber = localStorage.getItem("plateNumber");
		try {
			const data = await get(
				`/api/violations-log/user/${plateNumber}?location=${location}&fromDate=${fromDate}&toDate=${toDate}`
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
		<div className="container text-center">
			<Form title="Find Unpaid Violations" onSubmit={search}>
				<FormGroup>
					<Label htmlFor="location">Location</Label>
					<Input type="text" name="location" />
				</FormGroup>
				<FormGroup>
					<Label htmlFor="fromDate">From Date</Label>
					<Input type="date" id="fromDate" name="fromDate" />
				</FormGroup>
				<FormGroup>
					<Label htmlFor="toDate">To Date</Label>
					<Input type="date" id="toDate" name="toDate" />
				</FormGroup>
				<Button loading={loading}>Search</Button>
			</Form>
		</div>
	);
}
