import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";


import "../index.css";

export default function SigninScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const submitHandler = (e) => {
        e.preventDefault();
    }

    return (
        <div className="App">
          <div className="appAside" />
          <div className="appForm">
            <div className="pageSwitcher">
              <NavLink
                to="/signin"
                activeClassName="pageSwitcherItem-active"
                className="pageSwitcherItem"
              >
                Sign In
              </NavLink>
              <NavLink
                exact
                to="/register"
                activeClassName="pageSwitcherItem-active"
                className="pageSwitcherItem"
              >
                Sign Up
              </NavLink>
            </div>

            <div className="formTitle">
              <Link
                to="/signin"
                activeClassName="formTitleLink-active"
                className="formTitleLink"
              >
                Sign In
              </Link>{" "}
              or{" "}
              <Link
                exact
                to="/register"
                activeClassName="formTitleLink-active"
                className="formTitleLink"
              >
                Sign Up
              </Link>
            </div>
            <form className="form" onSubmit={submitHandler}>
              <div>
                  <h1>Sign In</h1>
              </div>
              <div>
                  <label htmlFor="email"> Email Address</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter email"
                    required
                    onChange={(e)=> setEmail(e.target.value)}
                  ></input>
              </div>
              <div>
                  <label htmlFor="password"> Password </label>
                  <inpu
                    type="password"
                    id="password"
                    placeholder="Enter password"
                    required
                    onChange={(e)=> setPassword(e.target.value)}
                  ></inpu>
              </div>
              <div>
                  <label/>
                  <button className="primary" type="submit"> Sign In</button>
              </div>
              <div>
                  <label/>
                  <div>
                      New customer ? {' '}
                      <Link to="/register"> Create account</Link>
                  </div>
              </div>
          </form>
          </div>
          
        </div>
        
    );
  }
