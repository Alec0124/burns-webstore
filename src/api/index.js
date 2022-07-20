const BASE_URL = 'http://localhost:5000/api';

// *** Functions ***

const respError = async (name, message) => {
    throw new Error({
        name,
        message,
        error: message
    });
};


//Register a user
async function fetchRegister(username, password) {
    try {
        return await fetch(`${BASE_URL}/users/register`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: {
                    username,
                    password
                }
            })
        })
            .then(response => response.json())
            .then(result => {
                return result;
            })
            .catch(console.error);
    }
    catch (error) {
        throw error;
    }
}


//Login a user
async function fetchLogin(username, password) {
    return await fetch(`${BASE_URL}/users/login`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
        .then(response => {
            return response.json()
        })
        .then(result => {
            return result;
        })
        .catch(console.error)
}


//Return everything in the catalog
//get all items ?
async function fetchCatalog() {
    try {
        const allItemsJson = await fetch(`${BASE_URL}/items`);
        const allItems = await allItemsJson.json();
        localStorage.setItem('allItems', JSON.stringify(allItems));
        return allItems;
    } catch (error) {
        throw error;
    }

}


//Return list of user's orders
const fetchMyOrders = async (user) => {
    const resp = await fetch(`/api/users/${user.username}/orders`,
        {
            headers: {
                "Content-Type": "application/json",
                "authorization": "Bearer " + user.token
            }
        }
    );
    return await resp.json();
};
// Users front end API
const fetchUsers = async () => {
    try {
        const resp = await fetch(`${BASE_URL}/users`, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        // console.log(resp);
        const users = resp.json();
        if (users === null) {
            respError("USERS_NULL", "Could not retrieve users")
        };
        return users;
    }
    catch (error) {
        throw error;
    }
};
const getUserByUsername = async (username) => {
    try {
        const user = await fetch(`${BASE_URL}/users/${username}`);
        if (user === undefined) {
            throw new Error("user undefined, fetch failed.");
        };
        return user.json();
    }
    catch (error) {
        throw error;
    }
};

//  ***Item Functions***
const getAllItems = async () => {
    try {
        // if (!token) {
        //     throw new Error('missing token');
        // }
        const allItemsJson = await fetch(`${BASE_URL}/items`);
        const allItems = await allItemsJson.json();
        localStorage.setItem('allItems', JSON.stringify(allItems));
        return allItems;
    } catch (error) {
        throw error;
    }
};
const getItemByItemNumber = async (itemNumber) => {
    try {
        if (typeof (itemNumber) !== 'string') {
            throw new Error("itemNumber is invalid data type, looking for string.")
        }
        const input = itemNumber.toUpperCase();
        const resultJson = await fetch(`${BASE_URL}/items/itemNumber/${input}`);
        const result = resultJson.json();
        // console.log("getItemNumber result: ", result);
        return result;
    }
    catch (error) {
        throw error;
    }
};

const createItem = async (token, { itemNumber, name, description, cost, price, status, webstoreStatus, type, taxable, categories }) => {
    try {
        // console.log('running createItem...', itemNumber);
        const resultJson = await fetch(`${BASE_URL}/items`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                itemNumber, name, description, cost, price, status, webstoreStatus, type, taxable
            })
        });
        const result = resultJson.json();
        return result;
    }
    catch (error) {
        throw error;
    }
};
const updateItem = async (token, { itemId, name, description, cost, price, status, webstoreStatus, type, taxable, categories }) => {
    try {
        // console.log('running updateItem...');
        // console.log(token, itemId, name, description, cost, price, status, webstoreStatus, type, taxable)
        //backend does not want itemNumber but the item id instead.
        const resultJson = await fetch(`${BASE_URL}/items/${itemId}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                name, description, cost, price, status, webstoreStatus, type, taxable, categories
            })
        });
        const result = resultJson.json();
        return result;
    }
    catch (error) {
        throw error;
    }
};

const removeItem = async (token, id) => {
    try {
        const result = await fetch(`${BASE_URL}/items/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
            }
        });
        const finalResult = await result.json()
        return finalResult;
    }
    catch (error) {
        throw error
    }
}

//  *** Category Functions ***
const getAllCategories = async () => {
    try {
        const allItemsJson = await fetch(`${BASE_URL}/categories`);
        const allItems = await allItemsJson.json();
        localStorage.setItem('categoriesList', JSON.stringify(allItems));
        return allItems;
    } catch (error) {
        throw error;
    }
};
const createCategory = async (token, name) => {
    try {
        const resp = await fetch(`${BASE_URL}/categories`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ name })
        });
        const newCategory = resp.json();

        return newCategory;
    } catch (error) { throw error }
};
const updateCategory = async (token, id, name) => {
    try {
        const resp = await fetch(`${BASE_URL}/categories/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ name })
        });
        const updatedCategory = resp.json();
        return updatedCategory;
    } catch (error) { throw error }
};
const removeCategory = async (token, id) => {
    try {
        const result = await fetch(`${BASE_URL}/categories/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
            }
        });
        const finalResult = await result.json()
        return finalResult;
    }
    catch (error) {
        throw error
    }
};
const getCategoriesOfItem = async (id) => {

    const resp = await fetch(`${BASE_URL}/itemCategories/${id}`);
    const tempCategories = await resp.json();
    return tempCategories
};


module.exports = {
    fetchCatalog,
    fetchRegister,
    getAllItems,
    respError,
    fetchUsers,
    fetchLogin,
    getItemByItemNumber,
    getAllCategories,
    createItem,
    getUserByUsername,
    updateItem,
    removeItem,
    createCategory,
    updateCategory,
    removeCategory,
    getCategoriesOfItem,
    BASE_URL
};