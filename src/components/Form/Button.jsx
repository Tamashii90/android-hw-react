import React from "react";

export default function Button({ loading, children: text }) {
	return (
		<button type="submit" className="btn btn-primary">
			{text}
			{loading && (
				<span className="ms-2 spinner-grow spinner-grow-sm"></span>
			)}
		</button>
	);
}
