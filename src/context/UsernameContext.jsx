import React, { useState, createContext } from "react";

const UsernameContext = createContext();

export function UsernameContextProvider({ children }) {
	const [user, setUser] = useState(localStorage.getItem("user"));
	const setUserFull = value => {
		if (value) {
			// this prevents setting it to empty string after cleaing localstorage on logout
			localStorage.setItem("user", value);
		}
		setUser(value);
	};
	return (
		<UsernameContext.Provider value={[user, setUserFull]}>
			{children}
		</UsernameContext.Provider>
	);
}

export default UsernameContext;
