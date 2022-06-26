import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./assets/scss/style.scss";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import Loader from "./layouts/loader/Loader";
import { Provider } from "react-redux";
import store from './store/store';

ReactDOM.render(
  <Suspense fallback={<Loader />}>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </Suspense>,

  document.getElementById("root")
);