import React, { useContext } from "react";
import { toast } from "react-toastify";
import searchCriteria from "../utils/searchCriteria";
import ListContext from "../context/ListContext";
import MyApi from "../utils/MyApi";
import Button from "./Form/Button";
import Label from "./Form/Label";
import Input from "./Form/Input";
import Form from "./Form";
import FormGroup from "./Form/FormGroup";

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
		<Form onSubmit={search} title="Find Violations">
			<FormGroup>
				<Label htmlFor="plugedNumber">Pluged Number</Label>
				<Input name="plugedNumber" minLength="6" maxLength="6" />
			</FormGroup>
			<FormGroup>
				<Label htmlFor="driver">Driver</Label>
				<Input name="driver" />
			</FormGroup>
			<FormGroup>
				<Label htmlFor="location">Location</Label>
				<Input name="location" />
			</FormGroup>
			<FormGroup>
				<Label htmlFor="fromDate">From Date</Label>
				<Input type="date" name="fromDate" />
			</FormGroup>
			<FormGroup>
				<Label htmlFor="toDate">To Date</Label>
				<Input type="date" name="toDate" />
			</FormGroup>
			<Button loading={loading}>Search</Button>
		</Form>
	);
}
