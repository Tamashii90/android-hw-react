import React from "react";
import { Switch, Route } from "react-router-dom";
import Helmet from "react-helmet";
import Header from "./components/Header";
import LoginPage from "./pages/LoginPage";
import IndexPage from "./pages/IndexPage";
import RegisterPage from "./pages/RegisterPage";
import ErrorPage from "./pages/ErrorPage";
import ViolationPageRouter from "./components/ViolationPageRouter";
import "./styles/styles.scss";

export function App() {
	return (
		<>
			<header>
				<Helmet>
					<title>E-Traffic Violations</title>
				</Helmet>
				<Header />
			</header>
			<main>
				<Switch>
					<Route exact path="/" component={IndexPage} />
					<Route exact path="/login" component={LoginPage} />
					<Route exact path="/register" component={RegisterPage} />
					<Route
						exact
						path="/api/violations-log/:id"
						component={ViolationPageRouter}
					/>
					<Route exact path="/*" component={ErrorPage} />
				</Switch>
			</main>
		</>
	);
}
