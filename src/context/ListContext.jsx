import React, { useState, createContext, useEffect } from "react";
import { useLocation } from "react-router";

const ListContext = createContext();

export function ListContextProvider({ children }) {
	const [list, setList] = useState([]);
	const location = useLocation();
	useEffect(() => {
		// prevents list from persisting between navigations
		setList([]);
	}, [location]);
	return (
		<ListContext.Provider value={[list, setList]}>
			{children}
		</ListContext.Provider>
	);
}

export default ListContext;
