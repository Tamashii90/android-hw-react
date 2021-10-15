import React, { useEffect } from "react";
import { useFetch } from "use-http";
import { useLocation } from "react-router";
import { ToastContainer, toast, Zoom } from "react-toastify";

export default function ViolationPageAdmin() {
	const {
		get,
		loading,
		response,
		data: violation = {}
	} = useFetch(process.env.BASE_URL, {
		headers: {
			"Authorization": `Bearer ${localStorage.getItem("token")}`
		}
	});
	const location = useLocation();
	const updateViolation = () => {};

	useEffect(async () => {
		try {
			await get(location.pathname);
			if (!response.ok) {
				toast.error(response.data?.message);
			}
		} catch (e) {
			toast.error("Network Error");
		}
	}, []);
	return (
		<>
			{loading && <h2>Loading..</h2>}
			{response.ok && (
				<div>
					<ul>
						<li>{violation.date}</li>
						<li>{violation.driver}</li>
						<li>{violation.tax}</li>
						<li>{String(violation.paid)}</li>
						<li>{violation.location}</li>
						<li>{violation.type}</li>
						<li>{violation.plugedNumber}</li>
					</ul>
					<button
						className="btn btn-primary"
						onClick={updateViolation}
					>
						Update
					</button>
				</div>
			)}
			<ToastContainer
				position="top-center"
				theme="colored"
				transition={Zoom}
				autoClose={1000}
				hideProgressBar
				newestOnTop={false}
				rtl={false}
				pauseOnHover
				closeButton={false}
			/>
		</>
	);
}
