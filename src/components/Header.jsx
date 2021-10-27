import React, { useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import ListContext from "../context/ListContext";
import UsernameContext from "../context/UsernameContext";
import { ToastContainer, Zoom } from "react-toastify";

export default function Header() {
	const [user, setUser] = useContext(UsernameContext);
	const [, setList] = useContext(ListContext);
	const history = useHistory();
	const logo = new URL("/logo.png", import.meta.url);

	const logOut = () => {
		localStorage.clear();
		setList(null);
		setUser("");
		history.replace("/login");
	};
	return (
		<header className="bg-primary mb-5">
			<div className="d-flex justify-content-between align-items-center p-4">
				<Link to="/">
					<img src={logo} alt="E-Traffic" />
				</Link>
				{user && (
					<div className="d-flex align-items-baseline">
						<span className="me-2">{user}</span>
						<button className="btn" onClick={logOut}>
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
		</header>
	);
}
