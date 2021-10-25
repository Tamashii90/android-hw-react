import React from "react";
export default function Select({ children, className, name, ...attrs }) {
	return (
		<div className="col-md-9">
			<select
				className={className || "custom-select form-control"}
				name={name}
				id={name}
				{...attrs}
			>
				{children}
			</select>
		</div>
	);
}
