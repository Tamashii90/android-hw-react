import React from "react";
import ViolationPageUser from "../pages/ViolationPageUser";
import ViolationPageAdmin from "../pages/ViolationPageAdmin";

export default function ViolationPageRouter() {
	const authority = localStorage.getItem("authority");

	return authority === "ADMIN" ? (
		<ViolationPageAdmin />
	) : (
		<ViolationPageUser />
	);
}
