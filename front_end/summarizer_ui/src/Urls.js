import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import Login from "./components/Login.js";
import Home from "./components/Home.js"
import PasswordUpdate from "./components/PasswordUpdate";

// A wrapper for <Route> that redirects to the login screen if you're not yet authenticated.
function PrivateRoute({ isAuthenticated, children, ...rest}) {
    return (
      <Route
        {...rest}
        render={({ location }) =>
        isAuthenticated ? (
            children
          ) : (
            <Navigate
              to={{
                pathname: "/login/",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }


function Urls(props) {

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route  path="/login" element = {<Login/>}/>
                    <Route path = "/" isAuthenticated={props.isAuthenticated} element = {<Home/>}/>
                    <Route path = "/update_password" isAuthenticated={props.isAuthenticated} element = {<PasswordUpdate/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
};

export default Urls;