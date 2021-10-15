import React from "react";
import SearchForm from "../components/ViolationsSearchFormAdmin";
import ViolationsList from "../components/ViolationsList";

export default function AdminPage() {
	return (
		<>
			<SearchForm />
			<ViolationsList />
		</>
	);
}
