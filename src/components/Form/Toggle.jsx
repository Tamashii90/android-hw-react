import React, { useState } from "react";

export default function Toggle({ defaultChecked, name }) {
	return (
		<div className="col-md-9" style={{ textAlign: "left" }}>
			<label className="switch">
				<input
					name={name}
					type="checkbox"
					defaultChecked={defaultChecked}
				/>
				<span className="slider"></span>
			</label>
		</div>
	);
}
