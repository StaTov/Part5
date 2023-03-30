import React from 'react';
import loginService from '../services/loginService'
import blogService from '../services/blogs'


const LoginForm = ({
                       password,
                       setPassword,
                       username,
                       setUsername,
                       setUser,
    setToken
                   }) => {

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const user = await loginService.login({username, password})
            window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

            blogService.setToken(user.token)
            setUser(user)
            setPassword('')
            setUsername('')

        } catch (error) {
            console.error(error.name, error.message)
        }
    }
    return (
        <div>
            <div>
                <h2>log in to application</h2>
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