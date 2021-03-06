import React, { useState, createContext } from "react";

const ListContext = createContext();

export function ListContextProvider({ children }) {
	const [list, setList] = useState(null);
	return (
		<ListContext.Provider value={[list, setList]}>
			{children}
		</ListContext.Provider>
	);
}

export default ListContext;
