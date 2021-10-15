import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter } from "react-router-dom";
import { ListContextProvider } from "./context/ListContext";
import { UsernameContextProvider } from "./context/UsernameContext";

const app = document.getElementById("app");
ReactDOM.render(
	<BrowserRouter>
		<ListContextProvider>
			<UsernameContextProvider>
				<App />
			</UsernameContextProvider>
		</ListContextProvider>
	</BrowserRouter>,
	app
);
