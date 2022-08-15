import { useState, useEffect } from 'react';
import React from "react";
import { getUserByUsername, fetchLogin, fetchRegister } from './api';
import { useNavigate } from "react-router-dom";



const Register = ({ user, setUser }) => {

    const navigate = useNavigate();
    //states
    const [billingIsSame, setBillingIsSame] = useState(true);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [emailShipping, setEmailShipping] = useState("");
    const [phoneShipping, setPhoneShipping] = useState("");
    const [address1Shipping, setAddress1Shipping] = useState("");
    const [address2Shipping, setAddress2Shipping] = useState("");
    const [cityShipping, setCityShipping] = useState("");
    const [stateShipping, setStateShipping] = useState("");
    const [zipShipping, setZipShipping] = useState("");
    const [emailBilling, setEmailBilling] = useState("");
    const [phoneBilling, setPhoneBilling] = useState("");
    const [address1Billing, setAddress1Billing] = useState("");
    const [address2Billing, setAddress2Billing] = useState("");
    const [cityBilling, setCityBilling] = useState("");
    const [zipBilling, setZipBilling] = useState("");
    const [stateBilling, setStateBilling] = useState("");
    const [errorMessage, setErrorMessage] = useState("")

    //onChange
    const onChangeAddress = (e, setShipping, setBilling) => {
        setShipping(e.target.value);
        if (!!billingIsSame) {
            setBilling(e.target.value);
        }

    }

    //onClick
    const onClickRegister = async () => {
        //validate variables, set new error message if fail
        let message = "";
        const valuesArray = [ address1Billing,
            address1Shipping, zipBilling,
            zipShipping, cityShipping, cityBilling, stateBilling, stateShipping,
            phoneBilling, phoneShipping, emailBilling, emailShipping, firstName, lastName];
        if (password.length < 6) {
            message = message + "Password must be 6 characters or longer. ";
        };
        if (username.length < 4) {
            message = message + "Username must be 4 characters or longer. ";
        }
        if (password !== confirmPassword) {
            message = message + "Confirm Password does not match Password. ";
        }

        if (valuesArray.includes("")) {
            message = message + "All required * fields must be filled.";
        }
        //check if username already exists
        //check email  for some text folowed by a single @ followed by a "." followed by at least a single character. no special character allowed. 
        if (message !== "") {
            setErrorMessage(message);
        } else {
            //attempt register
            const newUser = await fetchRegister({
                username, password, address1Billing,
                address1Shipping, address2Billing, address2Shipping, zipBilling, zipShipping,
                cityBilling, cityShipping, stateBilling, stateShipping, phoneBilling, phoneShipping,
                emailBilling, emailShipping, firstName, lastName
            });
            console.log("new user registered: ", newUser);
            if(newUser.message === "register user success!") {
                localStorage.setItem("token", newUser.token);
                setUser(newUser.user);
            }
        }

    };
    const onClickCancel = () => {
        navigate("/home");
    };

    //general functions 
    const setValueThrowback = (throwback, value) => {
        if (!!value.target) {
            value.preventDefault();
            throwback(value.target.value);
        } else {
            throwback(value);
        }
    };

    const setShippingToBilling = () => {
        setZipBilling(zipShipping);
        setStateBilling(stateShipping);
        setCityBilling(cityShipping);
        setAddress1Billing(address1Shipping);
        setAddress2Billing(address2Shipping);
        setPhoneBilling(phoneShipping);
        setEmailBilling(emailShipping);
    };
    const printErrors = () => {


        return <div className="errors">
            {errorMessage}
        </div>
    }


    // script

    useEffect(() => {
        if (!!user) {
            navigate("/home");
        }
        if (!!billingIsSame &&
            (   address1Billing !== address1Shipping ||
                address2Billing !== address2Shipping ||
                cityBilling !== cityShipping ||
                stateBilling !== stateShipping ||
                zipBilling !== zipShipping ||
                phoneShipping !== phoneBilling ||
                emailShipping !== emailBilling
            )) {
            setShippingToBilling();
        }
    });



    return (<div className="register">
        <div className="register-popout">

            <div className="row">
                First Name:
                <input type="text" value={firstName} onChange={(e) => { setValueThrowback(setFirstName, e) }} />
                <span className="errors">*</span>
            </div>
            <div className="row">
                Last Name:
                <input type="text" value={lastName} onChange={(e) => { setValueThrowback(setLastName, e) }} />
                <span className="errors">*</span>
            </div>
            <div className="row">
                Username:
                <input type="text" value={username} onChange={(e) => { setValueThrowback(setUsername, e) }} />
                <span className="errors">*</span>
            </div>
            <div className="row">
                Password:
                <input type="password" value={password} onChange={(e) => { setValueThrowback(setPassword, e) }} />
                <span className="errors">*</span>
            </div>

            <div className="row">
                Confirm Password:
                <input type="password" value={confirmPassword} onChange={(e) => { setValueThrowback(setConfirmPassword, e) }} />
                <span className="errors">*</span>
            </div>
            <div className="register-address">
                <div>
                    Shipping Info:
                    <div>
                        Address 1: <input type="text" value={address1Shipping} onChange={(e) => { onChangeAddress(e, setAddress1Shipping, setAddress1Billing) }} />
                        <span className="errors">*</span>
                    </div>
                    <div>
                        Address 2: <input type="text" value={address2Shipping} onChange={(e) => { onChangeAddress(e, setAddress2Shipping, setAddress2Billing) }} />
                    </div>
                    <div>
                        City: <input type="text" value={cityShipping} onChange={(e) => { onChangeAddress(e, setCityShipping, setCityBilling) }} />
                        <span className="errors">*</span>
                    </div>
                    <div>
                        State: <input type="text" value={stateShipping} onChange={(e) => { onChangeAddress(e, setStateShipping, setStateBilling) }} />
                        <span className="errors">*</span>
                    </div>
                    <div>
                        Zip: <input type="text" value={zipShipping} onChange={(e) => { onChangeAddress(e, setZipShipping, setZipBilling) }} />
                        <span className="errors">*</span>
                    </div>
                    <div>
                        Phone: <input type="text" value={phoneShipping} onChange={(e) => { onChangeAddress(e, setPhoneShipping, setPhoneBilling) }} />
                        <span className="errors">*</span>
                    </div>
                    <div>
                        Email: <input type="text" value={emailShipping} onChange={(e) => { onChangeAddress(e, setEmailShipping, setEmailBilling) }} />
                        <span className="errors">*</span>
                    </div>
                </div>

                <div>
                    <div>
                        Billing Info:
                    </div>
                    <div>
                        <label>Same as Shipping <input type="checkbox" checked={billingIsSame} onChange={(e) => { setValueThrowback(setBillingIsSame, !billingIsSame) }} /> </label>
                        {/* needs onChange and value */}
                    </div>
                    <div>
                        Address 1: <input disabled={billingIsSame} type="text" value={address1Billing} onChange={(e) => { setValueThrowback(setAddress1Billing, e) }} />
                        <span className="errors">*</span>
                    </div>
                    <div>
                        Address 2: <input disabled={billingIsSame} type="text" value={address2Billing} onChange={(e) => { setValueThrowback(setAddress2Billing, e) }} />
                    </div>
                    <div>
                        City: <input disabled={billingIsSame} type="text" value={cityBilling} onChange={(e) => { setValueThrowback(setCityBilling, e) }} />
                        <span className="errors">*</span>
                    </div>
                    <div>
                        State: <input disabled={billingIsSame} type="text" value={stateBilling} onChange={(e) => { setValueThrowback(setStateBilling, e) }} />
                        <span className="errors">*</span>
                    </div>
                    <div>
                        Zip: <input disabled={billingIsSame} type="text" value={zipBilling} onChange={(e) => { setValueThrowback(setZipBilling, e) }} />
                        <span className="errors">*</span>
                    </div>
                    <div>
                        Phone: <input disabled={billingIsSame} type="text" value={phoneBilling} onChange={(e) => { setValueThrowback(setPhoneBilling, e) }} />
                        <span className="errors">*</span>
                    </div>
                    <div>
                        Email: <input disabled={billingIsSame} type="text" value={emailBilling} onChange={(e) => { setValueThrowback(setEmailBilling, e) }} />
                        <span className="errors">*</span>
                    </div>
                </div>
            </div>

            {printErrors()}

            <div className="row" style={{ marginTop: "15px" }}>
                <input type="submit" value="register" onClick={onClickRegister} />
                <button onClick={onClickCancel}>Cancel</button>
            </div>
        </div>

    </div>);
};

export default Register;