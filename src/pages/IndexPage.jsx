import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import SearchForm from "../components/SearchForm";
import ViolationsList from "../components/ViolationsList";

export default function IndexPage() {
	if (!localStorage.getItem("token")) {
		return <Redirect to="/login" />;
	}
	return (
		<>
			<SearchForm />
			<ViolationsList />
		</>
	);
}
