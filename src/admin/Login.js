import { useState } from 'react';
import { getUserByUsername } from '../api';
import { fetchLogin } from '../api';



const Login = ({user, setUser}) => {

    //states
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    //onChange
    const onChangeUsername = (e) => {
        setUsername(e.target.value);
    };
    const onChangePassword = (e) => {
        setPassword(e.target.value);
    };
    //onClick
    const onClickCheckCookie = (e) => {
        console.log(localStorage.getItem('user'));
    };

    const onClickLogin = async (e) => {
        e.preventDefault();
        try {
            //is user in DB
            const user = await getUserByUsername(username);
            if (user === undefined) {
                throw new Error("user is undefined, something went wrong with fetch");
            }
            if (user === null || user === undefined) {
                throw new Error("could not locate user");
            };
            const response = await fetchLogin(username, password);
            //create cookie with user info
            if(!response || !response.user || !response.token) {
                throw new Error("resp failed in fetchLogin");
            };
            response.user.token = response.token;
            console.log("user logged in:", response.user)
            await storeUserObject(response.user);
            console.log("user: ", response.user);
        }
        catch (error) { throw error }
    };
    const storeUserObject = async (userObject) => {
        try {
            if (typeof (userObject) !== 'object') {
                throw new Error('expected object type of parmeter, error');
            };
            localStorage.setItem('user', JSON.stringify(userObject));
            setUser(userObject);
            console.log('stored user: ', userObject);
        }
        catch(error) {throw error}

    };


    return (<div className="Login">
        <div className="row">
            Print errors here
        </div>
        <div className="row">
            Username:
            <input type="text" onChange={onChangeUsername} />
        </div>
        <div className="row">
            Password:
            <input type="password" onChange={onChangePassword} />
        </div>
        <div className="row">
            <input type="submit" value="login" onClick={onClickLogin} />
            <button onClick={onClickCheckCookie}>Check cookie</button>
        </div>
    </div>);
};

export default Login;