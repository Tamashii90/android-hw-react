import React from "react";
import { Link } from "react-router-dom";

export default function ViolationCard({ card }) {
	return (
		<ul>
			<li>{card.date}</li>
			<li>{card.driver}</li>
			<li>{card.tax}</li>
			<li>{String(card.paid)}</li>
			<li>{card.location}</li>
			<li>{card.type}</li>
			<li>{card.plugedNumber}</li>
			<li>
				<Link to={`/violations-log/${card.id}`}>Show Details</Link>
			</li>
		</ul>
	);
}
