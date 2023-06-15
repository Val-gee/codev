// 
// PROFILE PAGE FOR USER THAT IS LOGGED IN!
//
import React from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { QUERY_USERBYID } from "../../utils/queries";
import Auth from "../../utils/auth";

import './profile.css';

const Profile = () => {
    const id = Auth.getProfile().data._id;

    const { loading, data } = useQuery(id ? QUERY_USERBYID : console.log("not logged in?"), {
        variables: { id }
    });
    console.log(data)
    if (Auth.loggedIn() && console.log(Auth.getProfile().data)) {
        return <Navigate to="/" />;
    }
    return (
        <div
            style={{
                borderRadius: "3%",
                padding: "3% 4%",
                margin: "3% auto",
                backgroundColor: "white",
                width: "80%"
            }}
        >
            <div>
                {data ? (
                    <div className="profile-info">
                        <h1 className='users-info' style={{ fontSize: "23px", fontWeight: "bold" }}>{data.user.firstname}{data.user.lastname} <br></br>@{data.user.username}</h1>
                        <div className='profileImg'>
                            {data.user.profile.profilePicture}
                        </div>
                        <div className='bio-section'>
                            <p>{data.user.profile.bio}</p>
                        </div>
                        <div className='project-section'>
                            <h3>Projects</h3>
                            {data.user.projects}
                            <button style={{
                                cursor: "pointer",
                                borderRadius: "3%",
                                color: "white",
                                fontSize: "13px",
                                padding: "5px 10px",
                                margin: "3% auto",
                                textAlign: "center",
                                backgroundColor: "#1F485B"
                            }}
                                type="submit"
                            >
                                Create Project
                            </button>
                        </div>
                        <div className='contact-section'>
                            <h3>Contact Info.</h3>
                            <p>{data.user.email}</p>
                            <p>{data.user.profile.contact.github}</p>
                            <p>{data.user.profile.contact.linkedIn}</p>
                            <p>{data.user.profile.contact.website}</p>
                        </div>
                    </div>
                ) : (
                    <div><Link to="/login"></Link></div>
                )
                }
            </div>
        </div>
    )
}

export default Profile;