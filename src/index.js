import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./Redux/store";
import { MantineProvider, Text } from "@mantine/core";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <MantineProvider theme={{ colorScheme: "light" }}>
      <ReduxProvider store={store}>
        <ChakraProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ChakraProvider>
      </ReduxProvider>
    </MantineProvider>
);
