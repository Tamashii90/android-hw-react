import React from "react";

export default function FormGroup({ children, ...attrs }) {
	return (
		<div className="form-group row" {...attrs}>
			{children}
		</div>
	);
}
