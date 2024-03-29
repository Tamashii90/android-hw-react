import React from "react";
import { Switch, Route } from "react-router-dom";
import Helmet from "react-helmet";
import Header from "./components/Header";
import LoginPage from "./pages/LoginPage";
import UserPage from "./pages/UserPage";
import RegisterPage from "./pages/RegisterPage";
import ErrorPage from "./pages/ErrorPage";
import ViolationPageRouter from "./components/ViolationPageRouter";
import "./styles/styles.scss";
import AdminPage from "./pages/AdminPage";
import { Analytics } from '@vercel/analytics/dist/react';

export function App() {
	return (
		<>
			<Helmet>
				<title>E-Traffic Violations</title>
			</Helmet>
			<Header />
		    <Analytics />
			<main className="mb-5">
				<Switch>
					<Route exact path="/" component={UserPage} />
					<Route exact path="/admin" component={AdminPage} />
					<Route exact path="/login" component={LoginPage} />
					<Route exact path="/register" component={RegisterPage} />
					<Route
						exact
						path="/violations-log/:id"
						component={ViolationPageRouter}
					/>
					<Route exact path="/*" component={ErrorPage} />
				</Switch>
			</main>
		</>
	);
}
