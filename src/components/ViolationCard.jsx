import React from "react";
import { useHistory } from "react-router-dom";
import ErrorSvg from "./ErrorSvg";

export default function ViolationCard({ card }) {
	const history = useHistory();
	const navigateToCard = () => {
		history.push(`/violations-log/${card.id}`);
	};
	return (
		<div className="col-md-6 my-3" onClick={navigateToCard}>
			<div className="violation-card bg-primary p-3 mx-1">
				<div className="d-flex">
					<ErrorSvg width="100px" />
					<div className="ms-2 d-flex flex-column flex-grow-1 justify-content-between">
						<div className="d-flex justify-content-between">
							<span>{card.driver}</span>
							<span>{card.date}</span>
						</div>
						<div className="d-flex justify-content-between">
							<span>{card.location}</span>
							<span>{"$" + card.tax}</span>
						</div>
						{/* <div className="d-flex justify-content-between mb-3">
						</div> */}
					</div>
				</div>
			</div>
		</div>
	);
}
