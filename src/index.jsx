// Application entrypoint.

// Load up the application styles
require("../styles/application.scss");

// Render the top-level React component
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.jsx";
import { Provider } from 'react-redux';
import store from './lib/store.js';

ReactDOM.render(
<Provider store={store}>
<App />
</Provider>, document.getElementById("react-root"));
