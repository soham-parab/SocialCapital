import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "./Redux/store";
import { ChakraProvider, theme } from "@chakra-ui/react";
import { AuthProvider } from "./context/authContext";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <Provider store={store}>
        <ChakraProvider theme={theme}>
          <App />
        </ChakraProvider>
      </Provider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
