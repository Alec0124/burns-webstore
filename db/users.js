
const { client } = require("./client");
const bcrypt = require('bcrypt');
const { testFirstRow, insertQueryValuesString, respError } = require("./api");

const createUser = async ({ username, password, address1Billing,
    address1Shipping, address2Billing, address2Shipping, zipBilling, zipShipping,
    cityBilling, cityShipping, stateBilling, stateShipping, phoneBilling, phoneShipping,
    emailBilling, emailShipping, firstName, lastName }) => {

    try {
        // const SALT_COUNT = 10;
        const [valuesArray, queryString] = insertQueryValuesString(
            [{
                name: "username",
                value: username,
                type: "string"
            },
            {
                name: "password",
                value: password,
                type: "string"
            },
            //start here, fill in below
            {
                name: '"firstName"',
                value: firstName,
                type: "string"
            },
            {
                name: '"lastName"',
                value: lastName,
                type: "string"
            },
            {
                name: '"emailBilling"',
                value: emailBilling,
                type: "string"
            },
            {
                name: '"phoneBilling"',
                value: phoneBilling,
                type: "string"
            },
            {
                name: '"address1Billing"',
                value: address1Billing,
                type: "string"
            },
            {
                name: '"address2Billing"',
                value: address2Billing,
                type: "string"
            },
            {
                name: '"zipBilling"',
                value: zipBilling,
                type: "string"
            },
            {
                name: '"stateBilling"',
                value: stateBilling,
                type: "string"
            },
            {
                name: '"cityBilling"',
                value: cityBilling,
                type: "string"
            },
            {
                name: '"emailShipping"',
                value: emailShipping,
                type: "string"
            },
            {
                name: '"phoneShipping"',
                value: phoneShipping,
                type: "string"
            },
            {
                name: '"address1Shipping"',
                value: address1Shipping,
                type: "string"
            },
            {
                name: '"address2Shipping"',
                value: address2Shipping,
                type: "string"
            },
            {
                name: '"zipShipping"',
                value: zipShipping,
                type: "string"
            },
            {
                name: '"stateShipping"',
                value: stateShipping,
                type: "string"
            },
            {
                name: '"cityShipping"',
                value: cityShipping,
                type: "string"
            }],
            "users" //this is the table name
        );
        const { rows } = await client.query(queryString, valuesArray);
        testFirstRow(rows);
        delete rows[0].password;
        return rows[0];
        //Would also like to do nothing on conflict with email; but haven't figured out how to work it.
        // could just write code to compare new entry to db
    }

    catch (error) {
        throw error;
    }
};
//this function updates a user row by id
const updateUser = async ({ id, admin, firstName, lastName, email, phoneNumber, address, address2, zip, state }) => {
    let dynamicArray = [];
    let dynamicArrayNames = [];
    const verifyValue = (value, type = 'string', name) => {
        if (type === null) { type = 'string' };
        if (typeof (value) === type) {
            dynamicArray.push(value);
            dynamicArrayNames.push(name);
        } else {

        }
    };
    const _ = null;
    const getQueryValuesString = () => {
        let queryValuesString = `SET `;
        verifyValue(admin, 'boolean', 'admin');
        verifyValue(firstName, _, '"firstName"');
        verifyValue(lastName, _, '"lastName"');
        verifyValue(firstName, _, '"firstName"');
        verifyValue(email, _, 'email');
        verifyValue(phoneNumber, _, 'phoneNumber');
        verifyValue(address, _, 'address');
        verifyValue(address2, _, 'address2');
        verifyValue(zip, _, 'zip');
        verifyValue(state, _, 'state');
        if (dynamicArray.length < 1) {
            throw respError('error_noInputValues', 'missing input values for database');
        }
        queryValuesString = queryValuesString + `${dynamicArrayNames[0]}=$1`;

        if (dynamicArray.length > 1) {
            for (let i = 1; dynamicArray.length > i; i++) {
                queryValuesString = queryValuesString + `, ${dynamicArrayNames[i]}=$${i + 1}`;
            }
        }
        dynamicArray.push(id);

        return queryValuesString;
    };

    try {
        //if there are no values passed in except token and id; this should error out as no values provided
        const queryValuesString = getQueryValuesString();
        // console.log('queryString: ', queryValuesString);
        const { rows } = await client.query(`
        UPDATE users
        ${queryValuesString}
        WHERE id=$${dynamicArray.length}
        RETURNING *;`, dynamicArray);
        testFirstRow(rows);
        return rows[0];
        // returns user object of updated row (not password);
    }
    catch (error) {
        console.error('updateUser failed...', error);
        throw error;
    }
};




//for logging in
const loginUser = async ({ username, password }) => {
    console.log('running getUser..');
    try {

        const { rows } = await client.query(`
            SELECT * FROM users
            WHERE username=$1;`, [username]);
        testFirstRow(rows);
        if (rows[0].password === password) {
            delete rows[0].password;
            return rows[0];
        } else {
            throw new Error({ name: 'PASSWORD_FAIL', message: 'Password is incorrect', error: 'Password is incorrect' });
        }

    }

    catch (error) {
        throw error;
    }
};
//this function lets you read the data of a user (hide password)
const getUserByUsername = async (username) => {
    console.log('running getUserByUsername..');
    try {

        const { rows } = await client.query(`
            SELECT * FROM users
            WHERE username=$1;`, [username]);
        // if (!rows[0]) {
        //     throw { name: "userNotExist", message: "Username does not exist" }
        // }

        return rows[0];
    }

    catch (error) {
        console.error('error getting user by Username..', error);
        throw error;
    }
};

const getUserById = async (id) => {
    console.log('running getUserById..');
    try {

        const { rows } = await client.query(`
            SELECT * FROM users
            WHERE id=$1;`, [id]);
        testFirstRow(rows);

        return rows[0];
    }

    catch (error) {
        console.error('error getting user by id..', error);
        throw error;
    }
};

const getAllUsers = async () => {
    console.log('running getUserById..');
    try {

        const { rows } = await client.query(`
            SELECT * FROM users;`);
        testFirstRow(rows);

        return rows;
    }

    catch (error) {
        console.error('error getAllUsers..', error);
        throw error;
    }
};



module.exports = {
    createUser,
    loginUser,
    getUserByUsername,
    getUserById,
    updateUser,
    getAllUsers
}