import React from 'react';
import loginService from '../services/logins'
import blogService from '../services/blogs'
import Notification from "./Notification";
import {useState} from "react";


const LoginForm = ({
                       setUser,
                       message,
                       setMessage,
                   }) => {
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')


    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const user = await loginService.login({username, password})
            window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

            blogService.setToken(user.token)
            setUser(user)


        } catch (error) {
            setMessage('wrong username or password')
            setTimeout(() => {
                setMessage(null)
            }, 3000)
            console.error(error.message)
        } finally {
            setPassword('')
            setUsername('')
        }
    }
    return (
        <div>
            <div>
                <h2>log in to application</h2>
                <Notification message={message}/>
            </div>
            <form onSubmit={handleLogin}>
                <div>
                    username
                    <input
                        value={username}
                        name="Username"
                        type="text"
                        onChange={({target}) => {
                            setUsername(target.value)

                        }}
                    />
                </div>
                <div>
                    password
                    <input
                        type="password"
                        value={password}
                        name="Password"
                        onChange={({target}) => setPassword(target.value)}
                    />
                </div>
                <div>
                    <button type="submit">login</button>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;