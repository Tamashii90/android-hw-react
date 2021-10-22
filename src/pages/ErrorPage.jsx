import React from "react";
import { Helmet } from "react-helmet";

export default function ErrorPage() {
	return (
		<>
			<Helmet>
				<title>404 - Not Found</title>
			</Helmet>
			<div className="container">
				<h1 className="text-center">Dead End</h1>
			</div>
		</>
	);
}
