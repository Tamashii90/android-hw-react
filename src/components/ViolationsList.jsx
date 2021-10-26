import React, { useContext } from "react";
import ViolationCard from "./ViolationCard";
import ListContext from "../context/ListContext";

export default function ViolationsList() {
	const [list] = useContext(ListContext);
	const totalTax = list.reduce((acc, el) => acc + el.tax, 0);
	const count = list.length;
	return (
		<div className="container">
			<div
				id="search-div"
				className="d-flex justify-content-between mb-3 mt-5"
			>
				<h4>
					Found <b>{count}</b> violations.
				</h4>
				{!!count && (
					<h4>
						Tax: <b>{totalTax}£S</b>
					</h4>
				)}
			</div>
			<div className="row">
				{list.map(el => (
					<ViolationCard key={el.id} card={el} />
				))}
			</div>
		</div>
	);
}
