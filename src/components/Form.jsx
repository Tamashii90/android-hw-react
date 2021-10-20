import React from "react";
import FormGroup from "./Form/FormGroup";

export default function Form({ children, title, onSubmit }) {
	return (
		<div className="form-container container my-5">
			<form onSubmit={onSubmit}>
				<div className="row">
					<h2 className="text-center text-secondary p-4">{title}</h2>
					{children.map((el, idx) => el)}
				</div>
			</form>
		</div>
	);
}