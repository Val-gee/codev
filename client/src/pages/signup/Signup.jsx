import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { MUTATION_NEW_USER } from "../../utils/mutations";
import Auth from '../../utils/auth';

const Signup = () => {
    // creates signupForm object and sets its initial state to those variables with those values
    const [signupForm, setSignupForm] = useState({
      firstname: "",
      lastname: "",
      username: "",
      password: "",
      email: "",
    });
    //setting up the useMutation hook
    const [newUser, {error, data}] = useMutation(MUTATION_NEW_USER);

    const handleChange = (event) => {
        console.log(event.target)
        const { name, value } = event.target

        setSignupForm({
            ...signupForm,
            [name]: value,
        })
    }
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(signupForm)
        try {
            const { data } = await newUser({
                variables: { ...signupForm },
            });
            console.log("data", data)
            Auth.login(data.newUser.token);
        } catch (error) {
            console.error(error);
        }
    }

    return (
      <div
        onSubmit={handleFormSubmit}
        className="shadow-xl"
        style={{
          borderRadius: "3%",
          padding: "3% 4%",
          margin: "3% auto",
          backgroundColor: "white",
          width: "40%"
          // border: "1px solid red",
        }}
      >
        {data ? (
          <Link to="/">home</Link>
        ) : (
          <form>
            <div
              style={{
                // border: "1px solid red",
                display: "flex",
                flexFlow: "row wrap",
              }}
            >
              <label
                style={{
                  fontSize: "23px",
                  fontWeight: "bold",
                  margin: "3%",
                }}
              >
                Sign Up
              </label>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  margin: "3%",
                }}
              >
                <label style={{ fontSize: "13px", fontWeight: "bold" }}>
                  First Name
                </label>
                <input
                  style={{
                    padding: "0 1.5px",
                    borderRadius: "2px",
                    borderBottom: "1px solid #BEBCBC",
                  }}
                  className="form-input"
                  placeholder="John"
                  name="firstname"
                  type="text"
                  value={signupForm.firstname}
                  onChange={handleChange}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  margin: "3%",
                }}
              >
                <label style={{ fontSize: "13px", fontWeight: "bold" }}>
                  Last Name
                </label>
                <input
                  style={{
                    padding: "0 1.5px",
                    borderRadius: "2px",
                    borderBottom: "1px solid #BEBCBC",
                  }}
                  className="form-input"
                  placeholder="Smith"
                  name="lastname"
                  type="text"
                  value={signupForm.lastname}
                  onChange={handleChange}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  margin: "3%",
                }}
              >
                <label style={{ fontSize: "13px", fontWeight: "bold" }}>
                  Username
                </label>
                <input
                  style={{
                    padding: "0 1.5px",
                    borderRadius: "2px",
                    borderBottom: "1px solid #BEBCBC",
                  }}
                  className="form-input"
                  placeholder="johnsmith123"
                  name="username"
                  type="text"
                  value={signupForm.username}
                  onChange={handleChange}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  margin: "3%",
                }}
              >
                <label style={{ fontSize: "13px", fontWeight: "bold" }}>
                  Email
                </label>
                <input
                  style={{
                    padding: "0 1.5px",
                    borderRadius: "2px",
                    borderBottom: "1px solid #BEBCBC",
                  }}
                  className="form-input"
                  placeholder="jsmith@example.com"
                  name="email"
                  type="text"
                  value={signupForm.email}
                  onChange={handleChange}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  margin: "3%",
                }}
              >
                <label style={{ fontSize: "13px", fontWeight: "bold" }}>
                  Password
                </label>
                <input
                  style={{
                    padding: "0 1.5px",
                    borderRadius: "2px",
                    borderBottom: "1px solid #BEBCBC",
                  }}
                  className="form-input"
                  placeholder="password"
                  name="password"
                  type="text"
                  value={signupForm.password}
                  onChange={handleChange}
                />
              </div>
              <button
                className="form-btn"
                style={{
                  cursor: "pointer",
                  borderRadius: "3px",
                  color: "white",
                  fontSize: "13px",
                  fontWeight: "600",
                  padding: "8px 10px",
                  margin: "3% auto",
                  width: "95%",
                  textAlign: "center",
                  backgroundColor: "#1F485B",
                }}
                type="submit"
              >
                Create Account
              </button>
              <label style={{ fontSize: "13px", margin: "0 auto" }}>
                Already have an account?{" "}
                <span style={{ color: "#1A4A60", fontWeight: "bold" }}>
                  <Link to="/login">Log In</Link>
                </span>
              </label>
            </div>
          </form>
        )}
      </div>
    );
}

export default Signup;