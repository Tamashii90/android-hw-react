import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import UsernameContext from "../context/UsernameContext";

export default function Header() {
	const [user, setUser] = useContext(UsernameContext);
	const history = useHistory();

	const logOut = () => {
		localStorage.clear();
		setUser("");
		history.replace("/login");
	};
	return (
		<div className="d-flex justify-content-between align-items-center p-4">
			<span>This is logo</span>
			{user && (
				<div>
					<span className="me-2">{user}</span>
					<button className="btn btn-primary" onClick={logOut}>
						Log Out
					</button>
				</div>
			)}
		</div>
	);
}
