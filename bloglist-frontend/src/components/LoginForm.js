import React from 'react';
import {useState} from "react";


const LoginForm = ({
                       children,
                       setAuthorization,
                   }) => {
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')

    const handlePassword = ({target}) => setPassword(target.value)
    const handleUsername = ({target}) => setUsername(target.value)
    const handleLogin = (e) => {
        e.preventDefault()
        setAuthorization({username, password})
        setPassword('')
        setUsername('')
    }

    return (
        <div>
            <div>
                <h2>log in to application</h2>
                {children}
            </div>
            <form onSubmit={handleLogin}>
                <div>
                    username
                    <input
                        id="username"
                        value={username}
                        name="Username"
                        type="text"
                        onChange={handleUsername}
                    />
                </div>
                <div>
                    password
                    <input
                        id="password"
                        type="password"
                        value={password}
                        name="Password"
                        onChange={handlePassword}
                    />
                </div>
                <div>
                    <button
                        id="login-button"
                        type="submit">
                        login
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;