import React from "react";
import { useHistory } from "react-router-dom";

export default function ViolationCard({ card }) {
	const history = useHistory();
	const navigateToCard = () => {
		history.push(`/violations-log/${card.id}`);
	};
	return (
		<div className="col-md-6 my-3" onClick={navigateToCard}>
			<div className="violation-card bg-primary p-4 mx-1">
				<div className="d-flex justify-content-between mb-3">
					<span>{card.plugedNumber}</span>
					<span>{card.driver}</span>
				</div>
				<div className="d-flex justify-content-between mb-3">
					<span>{card.location}</span>
					<span>{card.date}</span>
				</div>
				<div className="d-flex justify-content-between mb-3">
					<span>{card.paid}</span>
					<span>{"$" + card.tax}</span>
				</div>
			</div>
		</div>
	);
}
