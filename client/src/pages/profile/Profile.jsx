import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { QUERY_USERBYID } from "../utils/auth";

import Auth from '../utils/auth';

const Profile = () => {
    const { id: userParam } = useParams();

    const { loading, data } = useQuery(userParam ? QUERY_USERBYID : console.log("not logged in?"), {
        variables: { id: userParam }
    });

    if (Auth.loggedIn() && console.log(Auth.getProfile().data)) {
        return <Navigate to="/profile" />;
    }

}