import { useState } from 'react';
import { getUserByUsername } from './api';
import { fetchLogin } from './api';



const Login = () => {

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
            if(user===undefined) {
                throw new Error("user is undefined, something went wrong with fetch");
            }
            console.log("user", user)
            if(user===null || user===undefined) {
                throw new Error("could not locate user");
            };
            //if yes, is the password correct?
            const isPasswordGood = await fetchLogin(username, password);
            console.log(isPasswordGood);
            if (!isPasswordGood) {
                throw new Error("password did not match.")
            };
            //create cookie with user info
            delete user.password;
            await addUserCookie(JSON.stringify(user));
            console.log("user: ", user);
        }
        catch (error) { throw error }
    };

    // cookies
    const addUserCookie = async (user) => {
        localStorage.setItem("user", user);
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