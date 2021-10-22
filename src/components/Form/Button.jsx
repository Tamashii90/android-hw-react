import React from "react";

export default function Button({ loading, children: text }) {
	return (
		<div className="col-12">
			<button type="submit" className="btn my-4">
				{text}
				{loading && (
					<span className="text-primary ms-2 spinner-grow spinner-grow-sm"></span>
				)}
			</button>
		</div>
	);
}
