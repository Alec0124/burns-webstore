import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserByUsername } from './api';
import { fetchLogin } from './api';



const Login = ({user, setUser, displayLogin, setDisplayLogin}) => {
    const navigate = useNavigate();
    if(!!user) {
        navigate("/home");
    }
    //states
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    //onChange
    const onChangeUsername = (e) => {
        setUsername(e.target.value);
    };
    const onChangePassword = (e) => {
        setPassword(e.target.value);
    };
    //onClick
    const onClickCancel = (e)=> {
        setDisplayLogin("none");
    }

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
            localStorage.setItem('token', userObject.token);
            setUser(userObject);
            console.log('stored user: ', userObject);
        }
        catch(error) {throw error}

    };
    const keyDownEventListener = async (e) => {
        if(e.key === 'Enter') {
            await onClickLogin(e);
        }
    }


    return (<div className="Login" style={{display: displayLogin}}>
        
        <div className="row">
            Username:
            <input type="text" onChange={onChangeUsername} />
        </div>
        <div className="row">
            Password:
            <input type="password" onKeyDown={keyDownEventListener} onChange={onChangePassword} />
        </div>
        <div className="errors">
            {errorMessage}
        </div>
        <div className="row">
            <input type="submit" value="login" onClick={onClickLogin} />
            <button onClick={onClickCancel}>Cancel</button>
        </div>
    </div>);
};

export default Login;