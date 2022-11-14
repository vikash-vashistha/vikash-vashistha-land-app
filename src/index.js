import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "../src/store/store";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ReduxProvider store={store}>
  <BrowserRouter>
  <App />
  </BrowserRouter>
  </ReduxProvider>
  );
  // <React.StrictMode></React.StrictMode>
