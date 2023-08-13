const BASE_URL = 'http://localhost:5000/api';
// 35.245.212.150

// *** Functions ***

const respError = async (name, message) => {
    throw new Error({
        name,
        message,
        error: message
    });
};

const checkForUpdates = async (localStorageTime) => {
    const resp = await fetch(`${BASE_URL}/updates`);
    const lastUpdateTime = resp.json();
    if (localStorageTime < lastUpdateTime) {
        localStorage.clear();
        return true
        //need to refresh React??
    } else {
        return false
        //most of the time will end up here
    }
};


// ***USERS***
//Register a user
async function fetchRegister({ username, password, address1Billing,
    address1Shipping, address2Billing, address2Shipping, zipBilling, zipShipping,
    cityBilling, cityShipping, stateBilling, stateShipping, phoneBilling, phoneShipping,
    emailBilling, emailShipping, firstName, lastName }) {
    try {
        return await fetch(`${BASE_URL}/users/register`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username, password, address1Billing,
                address1Shipping, address2Billing, address2Shipping, zipBilling, zipShipping,
                cityBilling, cityShipping, stateBilling, stateShipping, phoneBilling, phoneShipping,
                emailBilling, emailShipping, firstName, lastName
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
};
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

// ***ITEMS***
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

// ***ORDERS***
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



//  ***Item Functions***
const getAllItems = async () => {
    try {
        // if (!token) {
        //     throw new Error('missing token');
        // }
        const allItemsJson = await fetch(`${BASE_URL}/items`);
        const allItems = await allItemsJson.json();
        localStorage.setItem('allItems', JSON.stringify(allItems));
        console.log("getAllItems result: ", allItems);
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
        console.log("getItemNumber result: ", result);
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

////// Orders

const createOrder = async (token, orderDetails, lineItems) => {
    const orderResp = await fetch(`${BASE_URL}/orders`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            lineItems, orderDetails
        })
    });
    const newOrder = await orderResp.json();
    return newOrder;

};
const getOrdersByUser = async (token) => {
    const ordersResp = await fetch(`${BASE_URL}/orders/user`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${token}`
        }
    });
    console.log("ordersResp: ", ordersResp)
    const orders = await ordersResp.json();
    console.log("orders: ", orders)
    return orders;
}

/// images


const saveStoreLogoImage = async (token, file) => {
    //probably need to submit as formData
    try {
        const formData = new FormData();
        formData.append("storeLogo", file);
        console.log("running saveStoreLogo file: ", formData, "token: ", token);
        const imageResp = await fetch(`${BASE_URL}/images/storeLogo`, {
            method: "POST",
            headers: {
                "autorization": `Beaerer ${token}`
            },
            body: formData
        });


        // imageResp.formData().then(data=>{
        //     console.log("data: ", data)
        // }).catch(err=>{console.error(err)})
        // const data = await readStream(imageResp.body);
        console.log("imageResp", imageResp);
        // imageResp.body.reader(data=>{console.log(data)})
    }
    catch (error) {
        console.error(error);
    }
};
const saveHomeBannerImage = async (token, file) => {
    //probably need to submit as formData
    try {
        const formData = new FormData();
        formData.append("homeBanner", file);
        console.log("running saveHomeBanner file: ", formData, "token: ", token);
        const imageResp = await fetch(`${BASE_URL}/images/homeBanner`, {
            method: "POST",
            headers: {
                "autorization": `Beaerer ${token}`
            },
            body: formData
        });


        // imageResp.formData().then(data=>{
        //     console.log("data: ", data)
        // }).catch(err=>{console.error(err)})
        // const data = await readStream(imageResp.body);
        console.log("imageResp", imageResp);
        // imageResp.body.reader(data=>{console.log(data)})
    }
    catch (error) {
        console.error(error);
    }
};
const saveItemImage = async ({ token, thumbnailImage, smallImage, largeImage, itemNumber }) => {
    //probably need to submit as formData
    try {
        if (!thumbnailImage) {
            throw new Error("no thumbnail file provided");
        }
        const formData = new FormData();
        formData.append("thumbnail", thumbnailImage);
        // formData.append("small", smallImage);
        // formData.append("large", largeImage);
        // console.log("running saveStoreLogo file: ", formData, "token: ", token);
        const imageResp = await fetch(`${BASE_URL}/images/item/thumbnail/${itemNumber}`, {
            method: "POST",
            headers: {
                "autorization": `Beaerer ${token}`
            },
            body: formData
        });

        console.log("imageResp", imageResp);
    }

    catch (error) {
        console.error(error);
    }
    try {
        if (!smallImage) {
            throw new Error("no small file provided");
        }
        const formData = new FormData();
        formData.append("small", smallImage);
        // formData.append("small", smallImage);
        // formData.append("large", largeImage);
        // console.log("running saveStoreLogo file: ", formData, "token: ", token);
        const imageResp = await fetch(`${BASE_URL}/images/item/small/${itemNumber}`, {
            method: "POST",
            headers: {
                "autorization": `Beaerer ${token}`
            },
            body: formData
        });

        console.log("imageResp", imageResp);
    }

    catch (error) {
        console.error(error);
    }
    try {
        if (!largeImage) {
            throw new Error("no large file provided");
        }
        const formData = new FormData();
        formData.append("large", largeImage);
        // formData.append("small", smallImage);
        // formData.append("large", largeImage);
        // console.log("running saveStoreLogo file: ", formData, "token: ", token);
        const imageResp = await fetch(`${BASE_URL}/images/item/large/${itemNumber}`, {
            method: "POST",
            headers: {
                "autorization": `Beaerer ${token}`
            },
            body: formData
        });

        console.log("imageResp", imageResp);
    }

    catch (error) {
        console.error(error);
    }
}

export { fetchCatalog };
export { fetchRegister };
export { getAllItems };
export { respError };
export { fetchUsers };
export { fetchLogin };
export { getItemByItemNumber };
export { getAllCategories };
export { createItem };
export { getUserByUsername };
export { updateItem };
export { removeItem };
export { createCategory };
export { updateCategory };
export { removeCategory };
export { createOrder };
export { getCategoriesOfItem };
export { saveStoreLogoImage };
export { saveHomeBannerImage };
export { saveItemImage };
export { checkForUpdates };
export { getOrdersByUser };
export { BASE_URL };