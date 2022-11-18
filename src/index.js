import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "../src/store/store";
import { BrowserRouter } from "react-router-dom";
import { ThemeContextProviderComponent } from "./Context/TheamContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeContextProviderComponent>
      <ReduxProvider store={store}>
        <ChakraProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ChakraProvider>
      </ReduxProvider>
    </ThemeContextProviderComponent>
  </React.StrictMode>
);
