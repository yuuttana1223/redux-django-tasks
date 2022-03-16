import React from "react";
import ReactDOM from "react-dom";
import "index.css";
import { store } from "app/store";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import { App } from "App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "features/login/Login";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
