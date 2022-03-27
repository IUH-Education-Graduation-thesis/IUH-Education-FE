import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import client from "core/apollo";
import reportWebVitals from "./reportWebVitals";
import {
  LoginPage as Login,
  HomePage,
  HocPhanPage,
  LopHocPhanPage,
} from "pages";

import "./index.css";
import "assets/styles/main.scss";
import "antd/dist/antd.css";

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/hoc-phan/:id">
            <HocPhanPage />
          </Route>
          <Route path="/lop-hoc-phan/:id">
            <LopHocPhanPage />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
        </Switch>
      </Router>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
