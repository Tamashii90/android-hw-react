import React, { useContext } from "react";
import ViolationCard from "./ViolationCard";
import ListContext from "../context/ListContext";

export default function ViolationsList() {
	const [list] = useContext(ListContext);
	const totalTax = list.reduce((acc, el) => acc + el.tax, 0);
	const count = list.length;
	return (
		<>
			<h3>
				<div id="search-div" className="text-left">
					Found {count} violations.
				</div>
				{!!count && <div className="text-right">{totalTax}</div>}
			</h3>
			{list.map(el => (
				<ViolationCard key={el.id} card={el} />
			))}
		</>
	);
}
