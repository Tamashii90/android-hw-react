import React from "react";

export default function MyTable({ children: rows }) {
	return (
		<table className="my-2 table table-bordered text-center">
			<tbody>{rows}</tbody>
		</table>
	);
}
