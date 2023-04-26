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
      <div onSubmit={handleFormSubmit}>
        <form>
          <input
            className="form-input"
            placeholder="John"
            name="firstname"
            type="text"
            value={signupForm.firstname}
            onChange={handleChange}
          />
          <input
            className="form-input"
            placeholder="Smith"
            name="lastname"
            type="text"
            value={signupForm.lastname}
            onChange={handleChange}
          />
          <input
            className="form-input"
            placeholder="johnsmith123"
            name="username"
            type="text"
            value={signupForm.username}
            onChange={handleChange}
          />
          <input
            className="form-input"
            placeholder="jsmith@example.com"
            name="email"
            type="text"
            value={signupForm.email}
            onChange={handleChange}
          />
          <input
            className="form-input"
            placeholder="password"
            name="password"
            type="text"
            value={signupForm.password}
            onChange={handleChange}
          />
          <button
            className="form-btn"
            style={{ cursor: "pointer" }}
            type="submit"
          >
            submit
          </button>
        </form>
      </div>
    );
}

export default Signup;