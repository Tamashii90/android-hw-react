import React from "react";

export default function Row({ value, heading }) {
	return (
		<tr>
			<th>{heading}</th>
			<td className="table-dark">{value}</td>
		</tr>
	);
}
