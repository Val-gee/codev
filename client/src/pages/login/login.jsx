import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { MUTATION_LOGIN } from '../../utils/mutations';
import { Link } from 'react-router-dom';

import Auth from '../../utils/auth';

const Login = () => {
    const [formState, setFormState] = useState({
        username: "",
        password: ""
    });

    const [login, { error, data }] = useMutation(MUTATION_LOGIN);

    //update state based on form input changes
    const handleChange = (event) => {
        console.log(event.target.value)
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value
        });
    };

    //submit form
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(formState);
        try {
            const { data } = await login({
                variables: { ...formState }
            });
            console.log("Data: ", data)
            Auth.login(data.login.token);
        } catch (err) {
            console.log('ERROR DETAILS: ' + err)
        }
        // Clear form values
        setFormState({ email: "", password: "" });
    };

    return (
        <div
            className="login-form"
            style={{
                borderRadius: "3%",
                padding: "3% 4%",
                margin: "3% auto",
                backgroundColor: "white",
                width: "40%"
            }}
        >
            {data ? (
                <Link to={"/"}>Home</Link>
            ) : (
                <form onSubmit={handleSubmit} >
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
                            Log in
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
                                Username
                            </label>
                            <input
                                style={{
                                    padding: "0 1.5px",
                                    borderRadius: "2px",
                                    borderBottom: "1px solid #BEBCBC",
                                }}
                                className="form-input"
                                name="username"
                                type="text"
                                value={formState.username}
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
                                name="password"
                                type="text"
                                value={formState.password}
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
                            Log in
                        </button>
                        <label style={{ fontSize: "13px", margin: "0 auto" }}>
                            Don't have an account?{" "}
                            <span style={{ color: "#1A4A60", fontWeight: "bold" }}>
                                <Link to="/signup">Sign up</Link>
                            </span>
                        </label>
                    </div>
                </form>
            )}
        </div>
    )
};

export default Login;