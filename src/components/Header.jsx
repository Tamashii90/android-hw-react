import React, { useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import ListContext from "../context/ListContext";
import UsernameContext from "../context/UsernameContext";
import { ToastContainer, Zoom } from "react-toastify";

export default function Header() {
	const [user, setUser] = useContext(UsernameContext);
	const [, setList] = useContext(ListContext);
	const history = useHistory();

	const logOut = () => {
		localStorage.clear();
		setList(null);
		setUser("");
		history.replace("/login");
	};
	return (
		<>
			<div className="d-flex justify-content-between align-items-center p-4">
				<Link to="/">This is logo</Link>
				{user && (
					<div>
						<span className="me-2">{user}</span>
						<button className="btn btn-primary" onClick={logOut}>
							Log Out
						</button>
					</div>
				)}
			</div>
			<ToastContainer
				position="top-center"
				theme="colored"
				transition={Zoom}
				autoClose={1500}
				hideProgressBar
				newestOnTop={false}
				rtl={false}
				pauseOnHover
				closeButton={false}
			/>
		</>
	);
}
