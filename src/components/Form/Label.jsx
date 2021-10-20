import React from "react";

export default function Label({ htmlFor, children: text }) {
	return (
		<label className="col-form-label col-md-3" htmlFor={htmlFor}>
			{text}
		</label>
	);
}
