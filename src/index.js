import React from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthContextProvider } from "./store/auth-context";
import { SettingContextProvider } from "./store/setting-context";

ReactDOM.render(
  <SettingContextProvider>
    <AuthContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthContextProvider>
  </SettingContextProvider>,
  document.getElementById("root")
);
