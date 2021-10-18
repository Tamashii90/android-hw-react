import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import SearchForm from "../components/ViolationsSearchFormUser";
import ViolationsList from "../components/ViolationsList";
import ListContext from "../context/ListContext";

export default function IndexPage() {
	const [list] = useContext(ListContext);

	if (!localStorage.getItem("token")) {
		return <Redirect to="/login" />;
	}
	if (localStorage.getItem("authority") != "USER") {
		return <Redirect to="/admin" />;
	}
	return (
		<>
			<SearchForm />
			{list && <ViolationsList />}
		</>
	);
}
