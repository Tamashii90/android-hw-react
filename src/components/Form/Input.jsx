import React from "react";

export default function Input({ type, name, ...attrs }) {
	return (
		<div className="col-md-9">
			<input
				type={type || "text"}
				className="form-control"
				id={name}
				name={name}
				{...attrs}
			/>
		</div>
	);
}
