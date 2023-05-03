import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { MUTATION_LOGIN } from '../../utils/mutations';
import { Naviagte } from 'react-router-dom';

import Auth from '../../utils/auth';

const Login = (props) => {
    const [formState, setFormState] = useState({ email: '', password: '' });

    const [login, { error, data }] = useMutation(MUTATION_LOGIN);

    //update state based on form input changes
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({ ...formState, [name]: value });
    };

    //submit form
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(formState);
        try {
            const { data } = await login({ variables: { ...formState } });

            Auth.login(data.login.token);
        } catch (err) {
            console.log('ERROR DETAILS: ' + err)
        }
        // Clear form values
        setFormState({ email: '', password: '' });
    };

    return (
        <main>
            <div>
                <div>
                    
                </div>
            </div>
        </main>
        )
}