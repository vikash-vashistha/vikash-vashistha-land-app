import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "../src/store/store";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
  <ReduxProvider store={store}>
  <BrowserRouter>
  <App />
  </BrowserRouter>
  </ReduxProvider>
  
  </React.StrictMode>
  );
  // <ChakraProvider></ChakraProvider>;
