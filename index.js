const testDotenv = require('dotenv').config();
if (testDotenv.error) { console.log(testDotenv.error) }
const jwt = require('jsonwebtoken');
// const { JWT_SECRET } = process.env;
const JWT_SECRET = 'apples';

const { createUser, loginUser, getAllUsers, client, getUserByUsername, updateUser,
    createOrder, updateOrder, getAllOrders, createLineItem, updateLineItem, deleteOrder, getItemCategoriesByItem,
    getCategoryById, createItem, getAllItems, getItemById, updateItem,
    removeItem, getLineItemsByOrder, removeLineItem,
    createCategory, getAllCategories, removeCategory, updateCategory, getItemCategoriesByCategory,
    removeItemCategory, createItemCategory, getItemByItemNumber, respError, getUserById, createImage,
    createItemImage } = require('./db');

// create the express server here

const PORT = 5000;
const express = require('express');
const multer = require('multer');
const path = require("path");
const storage_storeLogo = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/images/')
    },
    filename: function (req, file, cb) {
        //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + path.parse(file.originalname).ext)
    }
})
const upload_storeLogo = multer({ storage: storage_storeLogo });
const storage_itemThumbnail = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/images/items/')
    },
    filename: function (req, file, cb) {
        //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, req.params.itemNumber + "_thumbnail" + path.parse(file.originalname).ext)
    }
})
const upload_itemThumbnail = multer({ storage: storage_itemThumbnail });
const storage_itemSmall = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/images/items/')
    },
    filename: function (req, file, cb) {
        //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, req.params.itemNumber + "_small" + path.parse(file.originalname).ext)
    }
})
const upload_itemSmall = multer({ storage: storage_itemSmall });
const storage_itemLarge = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/images/items/')
    },
    filename: function (req, file, cb) {
        //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, req.params.itemNumber + "_large" + path.parse(file.originalname).ext)
    }
})
const upload_itemLarge = multer({ storage: storage_itemLarge });
const server = express();
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const fs = require("fs");

// const { rebuildDB } = require('./db/seedData');

// rebuildDB();


server.use(cors());
server.use(morgan('dev'));
server.use(bodyParser.json());

const apiRouter = express.Router();
const usersRouter = express.Router();
const ordersRouter = express.Router();
const itemsRouter = express.Router();
const lineItemsRouter = express.Router();
const categoriesRouter = express.Router();
const itemCategoriesRouter = express.Router();
const imagesRouter = express.Router();

server.use('/api', apiRouter);
apiRouter.use('/users', usersRouter);
apiRouter.use('/orders', ordersRouter);
apiRouter.use('/images', imagesRouter);
apiRouter.use('/items', itemsRouter);
apiRouter.use('/lineItems', lineItemsRouter);
apiRouter.use('/categories', categoriesRouter);
apiRouter.use('/itemCategories', itemCategoriesRouter);

client.connect();


// ***helper functions***
function requireUsername(req, res, next) {

    if (!req.body.username) {
        next({
            error: "Missing User Name",
            name: "MissingUserNameError",
            message: "You must provide a valid username."
        });
    }


    next();
};
function requirePassword(req, res, next) {
    if (!req.body.password) {
        next({
            name: "MissingPasswordError",
            message: "You must provide a valid password."
        });
    } else if (req.body.password.length < 8) {
        next({
            name: "PasswordNotLongEnough",
            message: "You must provide a password atleast 8 characters long."
        });
    }
    next();
};


const verifyToken = async (req, res, next) => {
    try {
        console.log('ver tok start')
        const prefix = 'Bearer ';
        const auth = await req.header('authorization');

        if (!auth) { // nothing to see here
            res.status(401);
            res.send('auth token missing');
        } else if (auth.startsWith(prefix)) {
            const token = auth.slice(prefix.length);

            const verified = jwt.verify(token, JWT_SECRET);
            console.log('token verifiied: ', verified);
            next();
        } else {
            res.status(401);
            res.send(`Authorization token must start with ${prefix}`);
        }
    }
    catch (error) {
        console.error(error)
        res.send(error);
    }
};

const verifyTokenReturn = async (req, res, next) => {
    try {
        const prefix = 'Bearer ';
        const auth = req.header('authorization');

        if (!auth) { // nothing to see here
            throw new Error('auth is missing!!');
        } else if (auth.startsWith(prefix)) {
            const token = auth.slice(prefix.length);
            const { id } = jwt.verify(token, JWT_SECRET);
            if (id) {
                const user = await getUserById(id);
                delete user.password;
                const token = jwt.sign({ id: user.id, username: user.username, exp: Math.floor(Date.now() / 1000) + (60 * 60) }, JWT_SECRET);
                user.token = token;
                res.send({ user: user });
                next();
            }

        } else {
            throw new Error(`Authorization token must start with ${prefix}`);
        }
    } catch ({ name, message }) {
        next({ name, message });
    }
};


// *** templates ***

// usersRouter.get('', requireUsername, requirePassword, verifyToken, async (req, res, next) => {

//     if ( !req.user.admin) {
//         throw {
//             name: 'error_requireAdmin', 
//             error: 'must use token of admin user', 
//             message: 'must use token of admin user'
//         };
//     };
//     const { username, password } = req.body;

//     try {

//         const result = await DBFUNCTION({ username, password });

//         res.send(result);
//         next();
//     }
//     catch ({ name, message }) {
//         next({ name, message })
//     }

// });

///////////////////////////////

server.listen(PORT, () => {
    console.log('The server is up on port', PORT);
});

apiRouter.get('/health', (req, res, next) => {
    console.log('The server is up and healthy on port', PORT);

    res.send({ message: 'server is up and healthy!!!' });
});
apiRouter.get('/verify', verifyTokenReturn);


// ***users***
// POST /users/register
// Create a new user. Require username and password, and hash password before saving user to DB. Require all passwords to be at least 8 characters long.
// BROKEN
usersRouter.post('/register', async (req, res, next) => {
    const { username, password, address1Billing,
        address1Shipping, address2Billing, address2Shipping, zipBilling, zipShipping,
        cityBilling, cityShipping, stateBilling, stateShipping, phoneBilling, phoneShipping,
        emailBilling, emailShipping, firstName, lastName } = req.body;

    try {

        const _user = await getUserByUsername(username);

        if (!!_user) {
            next(respError('userExistsError', 'A user by that name already exists'));
        };
        const user = await createUser({
            username, password, address1Billing,
            address1Shipping, address2Billing, address2Shipping, zipBilling, zipShipping,
            cityBilling, cityShipping, stateBilling, stateShipping, phoneBilling, phoneShipping,
            emailBilling, emailShipping, firstName, lastName
        });
        const token = jwt.sign({ id: user.id, username }, JWT_SECRET, { expiresIn: '1w' });
        res.send({ message: 'register user success!', user, token });
        next();
    }
    catch ({ name, message }) {
        next({ name, message })
    }
});

// Throw errors for duplicate username, or password-too-short.

//POST /api/users/login
usersRouter.post('/login', requireUsername, requirePassword, async (req, res, next) => {

    const { username, password } = req.body;

    try {

        const user = await loginUser({ username, password });

        const token = jwt.sign({ id: user.id, username, exp: Math.floor(Date.now()) + (1000 * 60 * 60 * 24) }, JWT_SECRET);
        // const token = 'apple';
        res.send(JSON.stringify({ message: 'Login user success!', user, token }));
        next();
    }
    catch (error) {
        next(error);
    }

});

// GET /api/users 
//returns all users but without passwords
usersRouter.get('', async (req, res, next) => {

    try {

        const users = await getAllUsers();
        if (users.length < 1) {
            throw new Error('no rows were returned from getAllUsers query');
        };

        res.send(users);
        next();
    }
    catch ({ name, message }) {
        res.send({ name, message });
        next({ name, message })
    }

});
// GET /api/users 
usersRouter.get('/:username', async (req, res, next) => {

    try {
        const username = req.params.username;
        const users = await getUserByUsername(username);
        if (users.length < 1) {
            throw new Error('no rows were returned from getAllUsers query');
        };

        res.send(users);
        next();
    }
    catch ({ name, message }) {
        res.send({ name, message });
        next({ name, message })
    }

});


// PATCH /api/users/:userId
//updated user row **admin** or **owner**
// NOT TESTED
usersRouter.patch('/:userId', verifyToken, async (req, res, next) => {
    try {
        if (!req.user) {
            throw new Error('must provide a BEARER token');
        }
        const id = req.params.userId;

        if (!req.user.admin) {
            //user is not admin; so if he owner of user?
            if (req.user.id !== id) {
                throw new Error('must use token of admin user');
            };
        };

    }
    catch (error) {
        throw error;
    }


    try {

        const { admin, firstName, lastName, email, phoneNumber, address, address2, zip, state } = req.body;

        const updatedUser = await updateUser({ id, admin, firstName, lastName, email, phoneNumber, address, address2, zip, state });


        res.send({ message: 'Update user success!', updatedUser });
        next();
    }
    catch ({ name, message }) {
        next({ name, message })
    }
});

// *** Orders *** */

//POST api/orders (optional token)
//creates a new Order; if token provided then assign creator id
//pass in optional "lineItems" array to have line items added to new order. NOT IMPLEMENTED
ordersRouter.post('', verifyToken, async (req, res, next) => {
    const { orderDetails, lineItems } = req.body;
    const { userId,
        attnShipping,
        emailShipping,
        phoneShipping,
        address1Shipping,
        address2Shipping,
        zipShipping,
        stateShipping,
        attnBilling,
        emailBilling,
        phoneBilling,
        address1Billing,
        address2Billing,
        zipBilling,
        stateBilling } = orderDetails;


    try {

        const newOrder = await createOrder({
            userId,
            attnShipping,
            emailShipping,
            phoneShipping,
            address1Shipping,
            address2Shipping,
            zipShipping,
            stateShipping,
            attnBilling,
            emailBilling,
            phoneBilling,
            address1Billing,
            address2Billing,
            zipBilling,
            stateBilling
        });

        // 
        //
        if (!lineItems || !Array.isArray(lineItems)) {
            res.send({ newOrder });
            next();
        } else {
            // if there are line items...
            const newLineItems = [];
            lineItems.forEach(async lineItem => {
                const newLineItem = await createLineItem(lineItem);
                newLineItems.push(newLineItem);
            });
            newOrder.lineItems = newLineItems;
            res.send(newOrder);
            next();
        };

        // res.send({ message: 'create order success!', newOrder });
        // next();
    }
    catch ({ name, message }) {
        next({ name, message })
    }
});

//PATCH api/orders/:orderId (**admin**)
//updates order by order id with optional values; returns updated order
ordersRouter.patch('/:orderId', verifyToken, async (req, res, next) => {

    if (!req.user.admin) {
        throw {
            name: 'error_requireAdmin',
            error: 'must use token of admin user',
            message: 'must use token of admin user'
        };
    };
    const id = Number(req.params.orderId);
    //should test this
    if (typeof (id) !== 'number') {
        throw {
            name: 'error_OrderId',
            error: 'orderId not supplied',
            message: 'orderId not supplied'
        }
    };

    const { attn, email, phoneNumber, address, address2, zip, state } = req.body;

    try {

        const updatedOrder = await updateOrder({ id, attn, email, phoneNumber, address, address2, zip, state });

        res.send(updatedOrder);
        next();
    }
    catch ({ name, message }) {
        next({ name, message })
    }

});

//DELETE api/orders/:orderId (**admin**)
//BROKEN
ordersRouter.delete('/:orderId', verifyToken, async (req, res, next) => {

    if (!req.user.admin) {
        throw {
            name: 'error_requireAdmin',
            error: 'must use token of admin user',
            message: 'must use token of admin user'
        };
    };
    const id = Number(req.params.orderId);
    if (typeof (id) !== "number") {
        throw {
            name: "error_orderId",
            message: "orderId input invalid",
            error: "orderId input invalid"
        };
    };


    try {

        const data = await deleteOrder(id);

        // Could be a usefil update i guess?
        // res.send({
        //     success: true,
        //     message: `order id ${id} deleted`,
        //     data
        // });
        res.send({ data });
        next();
    }
    catch ({ name, message }) {
        next({ name, message })
    }

});

//GET api/orders
//returns all orders
ordersRouter.get('', verifyToken, async (req, res, next) => {

    if (!req.user.admin) {
        throw {
            name: 'error_requireAdmin',
            error: 'must use token of admin user',
            message: 'must use token of admin user'
        };
    };
    try {

        const data = await getAllOrders();

        res.send(data);
        next();
    }
    catch ({ name, message }) {
        next({ name, message })
    }

});

//GET api/orders/:orderId
//returns order by order id

// *** Items ***

//POST api/items (**admin**)
//creates a new item for the item DB; requires a token from an admin user
itemsRouter.post('', verifyToken, async (req, res, next) => {

    try {

        // if (!req.user.admin) {
        //     throw new Error('must use token of admin user');
        // };
        const { itemNumber, description, name, cost, price, status, webstoreStatus, type } = req.body;
        // requires all fields
        if (typeof (itemNumber) !== 'string') {
            throw respError('itemNumber', 'itemNumber is missing or invalid');
        }
        if (typeof (description) !== 'string' || typeof (name) !== 'string' ||
            typeof (cost) !== 'number' || typeof (price) !== 'number' || typeof (status) !== 'string' ||
            typeof (webstoreStatus) !== 'string' || typeof (type) !== 'string') {
            throw respError('missingData', 'body is missing required values');
        }
        const result = await createItem({ itemNumber, description, name, cost, price, status, webstoreStatus, type });

        res.send(result);
        next();
    }
    catch ({ name, message }) {
        next({ name, message })
    }

});

//GET api/items (public)
//returns array of all item objects
//only returns cost if admin token is used -NOT IMPLEMENTED
itemsRouter.get('', async (req, res, next) => {
    //includes categories



    try {

        const allItems = await getAllItems();
        //Should work!
        res.send(allItems);
        next();
    }
    catch ({ name, message }) {
        next({ name, message })
    }

});

//GET api/items/id/:itemId (public command)
//returns item object
//only return cost if admin token is passed in - NEEDS TO BE IMPLEMENTED
itemsRouter.get('/id/:itemId', verifyToken, async (req, res, next) => {

    const { itemId } = req.params;

    try {
        const item = await getItemById(Number(itemId));
        if (!req.user.admin) {
            delete item.cost
        };
        res.send(item);
        next();
    }
    catch ({ name, message }) {
        next({ name, message })
    }

});

//GET api/items/itemNumber/:itemNumber (public command)
//returns item object
//only return cost if admin token is passed in - NEEDS TO BE IMPLEMENTED
itemsRouter.get('/itemNumber/:itemNumber', verifyToken, async (req, res, next) => {

    const { itemNumber } = req.params;

    try {
        const item = await getItemByItemNumber(itemNumber.toUpperCase());
        if (!req.user.admin) {
            delete item.cost
        };
        res.send(item);
        next();
    }
    catch ({ name, message }) {
        next({ name, message })
    }

});

// PATCH api/items/:itemId (**admin**)
//updates an item in the DB

itemsRouter.patch('/:itemId', verifyToken, async (req, res, next) => {
    console.log('preparing to run updateItem')
    try {

        // if (!req.user.admin) {
        //     throw new Error('must use token of admin user');
        // };
        const itemId = Number(req.params.itemId);
        //edge case: NaN id passed through
        if (typeof (itemId) !== 'number' || isNaN(itemId)) {
            throw new Error('itemId is missing or invalid');
        };
        const { name, description, cost, price, status, webstoreStatus, type, taxable, categories } = req.body;
        // itemNumber, name, description, cost, price, status, webstoreStatus, type, taxable
        const id = itemId;
        const updatedItem = await updateItem({ id, name, description, cost, price, status, webstoreStatus, type, taxable, categories });
        res.send(updatedItem);
        next();
    }
    catch (error) {
        next(error)
    }

});

//DELETE api/items/:itemId (**admin**)
//deletes item from DB and all associated line items

itemsRouter.delete('/:itemId', verifyToken, async (req, res, next) => {

    try {
        // if (!req.user.admin) {
        //     throw new Error('must use token of admin user');
        // };
        const itemId = Number(req.params.itemId);
        if (typeof (itemId) !== 'number' || isNaN(itemId) === true) {
            throw new Error('itemId is missing or invalid');
        }
        const data = await removeItem(itemId);
        res.send(JSON.stringify(data));
        next();
    }
    catch (error) {
        next(error)
    }

});

// *** Line Items ***

//POST api/lineItems
//creates a new lineItem for the lineItems DB;

lineItemsRouter.post('', verifyToken, async (req, res, next) => {

    // if ( !req.user.admin) {
    //     throw {
    //         name: 'error_requireAdmin', 
    //         error: 'must use token of admin user', 
    //         message: 'must use token of admin user'
    //     };
    // };
    const quantity = Math.floor(req.body.quantity);
    const { orderId, itemId, cost, price, name, description } = req.body;
    //I'm thinking we can pass an item object with quantity, itemId, and orderId added to the object
    if (typeof (orderId) !== 'number' || typeof (itemId) !== 'number' || typeof (quantity) !== 'number' ||
        typeof (cost) !== 'number' || typeof (price) !== 'number' || typeof (name) !== 'string' || typeof (description) !== 'string') {
        throw respError('invalid_data', 'data provided in body is invalid or missing')
    }

    try {

        const lineItem = await createLineItem({ orderId, itemId, quantity, cost, price, name, description });

        res.send(lineItem);
        next();
    }
    catch ({ name, message }) {
        next({ name, message })
    }

});

//GET api/lineItems/:orderId (public) (*userToken or *admin token) ()
//returns array of all lineItem objects by orderId
//only returns cost if admin token is used

lineItemsRouter.get('/:orderId', verifyToken, async (req, res, next) => {

    if (!req.user) {
        throw respError('invalid_token', 'must provide an auth token');
    };
    const orderId = Number(req.params.orderId);
    if (typeof (orderId) !== 'number' || orderId === NaN) {
        throw respError('invalid_orderId', 'orderId missing or invalid');
    }

    try {

        const lineItems = await getLineItemsByOrder(orderId);
        if (!lineItems || lineItems.length < 1) {
            throw respError('error_notFound', 'could not locate lineItems for that id')
        }

        res.send(lineItems);
        next();
    }
    catch ({ name, message }) {
        next({ name, message })
    }

});

// PATCH api/lineItems/:lineItemId (**admin**)
//updates a lineItem in the DB

lineItemsRouter.patch('/:lineItemId', verifyToken, async (req, res, next) => {

    if (!req.user.admin) {
        throw {
            name: 'error_requireAdmin',
            error: 'must use token of admin user',
            message: 'must use token of admin user'
        };
    };

    const lineItemId = Math.floor(Number(req.params.lineItemId));
    if (typeof (lineItemId) !== 'number' || lineItemId === NaN) {
        respError('invalid_lineItemId', 'lineItemId is missing or invalid')
    }

    const quantity = Math.floor(req.body.quantity);
    const { cost, price, name, description } = req.body;

    if (typeof (quantity) !== 'number' || typeof (cost) !== 'number' || typeof (price) !== 'number' ||
        typeof (name) !== 'string' || typeof (description) !== 'string') {
        throw respError('invalid_data', 'data provided in body is invalid or missing')
    }
    try {
        const id = lineItemId
        const updatedLineItem = await updateLineItem({ id, quantity, cost, price, name, description });

        res.send(updatedLineItem);
        next();
    }
    catch ({ name, message }) {
        next({ name, message })
    }

});

//DELETE api/lineItems/:lineItemId (**admin**)
//deletes lineItem from DB

lineItemsRouter.delete('/:lineItemId', verifyToken, async (req, res, next) => {

    if (!req.user.admin) {
        throw {
            name: 'error_requireAdmin',
            error: 'must use token of admin user',
            message: 'must use token of admin user'
        };
    };


    try {

        const lineItemId = Math.floor(Number(req.params.lineItemId));
        if (typeof (lineItemId) !== 'number' || lineItemId === NaN) {
            respError('invalid_lineItemId', 'lineItemId is missing or invalid')
        }
        const data = await removeLineItem({ username, password });

        res.send(data);
        next();
    }
    catch ({ name, message }) {
        next({ name, message })
    }

});

// *** Categories ***

//POST api/categories (**admin**)
//creates a new category for the categories DB; requires a token from an admin user

categoriesRouter.post('', verifyToken, async (req, res, next) => {

    // if (!req.user.admin) {
    //     throw {
    //         name: 'error_requireAdmin',
    //         error: 'must use token of admin user',
    //         message: 'must use token of admin user'
    //     };
    // };
    const { name } = req.body;

    try {

        const category = await createCategory(name);

        res.send(category);
        next();
    }
    catch ({ name, message }) {
        next({ name, message })
    }

});

//GET api/categories (public)
//returns array of all categories

categoriesRouter.get('', async (req, res, next) => {

    try {

        const categories = await getAllCategories();

        res.send(categories);
        next();
    }
    catch ({ name, message }) {
        next({ name, message })
    }

});

//GET api/categories/:categoryId (public command) ***Don't think this is needed, save for last ***
//returns item object
//only return cost if admin token is passed in

// categoriesRouter.get('', verifyToken, async (req, res, next) => {

//     if ( !req.user.admin) {
//         throw {
//             name: 'error_requireAdmin', 
//             error: 'must use token of admin user', 
//             message: 'must use token of admin user'
//         };
//     };
//     const { username, password } = req.body;

//     try {

//         const result = await DBFUNCTION({ username, password });

//         res.send(result);
//         next();
//     }
//     catch ({ name, message }) {
//         next({ name, message })
//     }

// });

// PATCH api/categories/:categoryId (**admin**)
//updates a category in the DB

categoriesRouter.patch('/:categoryId', verifyToken, async (req, res, next) => {

    // if (!req.user.admin) {
    //     throw {
    //         name: 'error_requireAdmin',
    //         error: 'must use token of admin user',
    //         message: 'must use token of admin user'
    //     };
    // };
    const id = Math.floor(Number(req.params.categoryId));
    if (typeof (id) !== 'number' || isNaN(id)) {
        respError('invalid_categoryId', 'categoryId is missing or invalid')
    };
    const { name } = req.body;

    try {

        const updatedCategory = await updateCategory({ id, name });

        res.send(updatedCategory);
        next();
    }
    catch ({ name, message }) {
        next({ name, message })
    }

});

//DELETE api/categories/:categoryId (**admin**)
//deletes category from DB and all associated itemCategories

categoriesRouter.delete('/:categoryId', verifyToken, async (req, res, next) => {

    console.log('delete cat id running');

    // if (!req.user.admin) {
    //     throw {
    //         name: 'error_requireAdmin',
    //         error: 'must use token of admin user',
    //         message: 'must use token of admin user'
    //     };
    // };

    try {
        const id = Math.floor(Number(req.params.categoryId));
        if (typeof (id) !== 'number' || isNaN(id)) {
            throw new Error('categoryId is missing or invalid');
        }
        // *** Does not delete categories that have itemcategory links. Needs work ***
        const itemCategories = await getItemCategoriesByCategory(id);
        console.log('itemCategories: ', itemCategories);

        if (!!itemCategories) {
            itemCategories.forEach(async itemCategory => {
                await removeItemCategory(itemCategory.id);
            });
        }
        const data = await removeCategory(id);
        if (!!itemCategories) {
            data.itemCategories = itemCategories;
        }

        res.send(data);
        next();
    }
    catch (error) {
        next(error)
    }

});

// *** itemCategories ***

//POST api/itemCategories (**admin**)
//creates a new category for the categories DB; requires a token from an admin user

itemCategoriesRouter.post('', verifyToken, async (req, res, next) => {

    if (!req.user.admin) {
        throw {
            name: 'error_requireAdmin',
            error: 'must use token of admin user',
            message: 'must use token of admin user'
        };
    };
    const { itemId, categoryId } = req.body;
    if (typeof (itemId) !== 'number' || itemId === NaN || typeof (categoryId) !== 'number' || categoryId === NaN) {
        respError('invalid_data', 'data is missing or invalid')
    }

    try {

        const itemCategory = await createItemCategory({ itemId, categoryId });

        res.send(itemCategory);
        next();
    }
    catch ({ name, message }) {
        next({ name, message })
    }

});

//GET api/itemCategories/item/:itemId (public)
//returns array of all itemCategories for item by item id
//IMPROVE? maybe should return category objects instead of itemCategory objects

itemCategoriesRouter.get('/:itemId', async (req, res, next) => {

    const itemId = Math.floor(Number(req.params.itemId));
    if (typeof (itemId) !== 'number' || isNaN(itemId)) {
        respError('invalid_itemId', 'itemId is missing or invalid')
    }
    try {

        const itemCategories = await getItemCategoriesByItem(itemId);

        res.send(itemCategories);
        next();
    }
    catch ({ name, message }) {
        next({ name, message })
    }

});

//GET api/itemCategories/category/:categoryId (public)
//returns array of all itemCategories for item by category id

itemCategoriesRouter.get('/:categoryId', async (req, res, next) => {

    const categoryId = Math.floor(Number(req.params.categoryId));
    if (typeof (categoryId) !== 'number' || categoryId === NaN) {
        respError('invalid_categoryId', 'categoryId is missing or invalid')
    }
    try {

        const itemCategories = await getItemCategoriesByCategory(categoryId);

        res.send(itemCategories);
        next();
    }
    catch ({ name, message }) {
        next({ name, message })
    }

});


// PATCH api/itemCategories/:itemId (**admin**) *** As of now don't need this ***
//updates a itemCategory in the DB

// itemCategoriesRouter.patch('', verifyToken, async (req, res, next) => {

//     if ( !req.user.admin) {
//         throw {
//             name: 'error_requireAdmin', 
//             error: 'must use token of admin user', 
//             message: 'must use token of admin user'
//         };
//     };
//     const { username, password } = req.body;

//     try {

//         const result = await DBFUNCTION({ username, password });

//         res.send(result);
//         next();
//     }
//     catch ({ name, message }) {
//         next({ name, message })
//     }

// });

//DELETE api/itemCategories/:itemCategoryId (**admin**)
//deletes itemCategory from DB

itemCategoriesRouter.delete('/:itemCategoryId', verifyToken, async (req, res, next) => {

    if (!req.user.admin) {
        throw {
            name: 'error_requireAdmin',
            error: 'must use token of admin user',
            message: 'must use token of admin user'
        };
    };
    const itemCategoryId = Math.floor(Number(req.params.itemCategoryId));
    if (typeof (itemCategoryId) !== 'number' || itemCategoryId === NaN) {
        respError('invalid_itemCategoryId', 'itemCategoryId is missing or invalid')
    }

    try {

        const data = await removeItemCategory(itemCategoryId);

        res.send(data);
        next();
    }
    catch ({ name, message }) {
        next({ name, message })
    }

});

// *** IMAGES ***
// const storeLogoSetup = (req, res, next) => {
//     storage = multer.diskStorage({
//         destination: function (req, file, cb) {
//             cb(null, 'src/images/')
//         },
//         filename: function (req, file, cb) {
//             //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//             cb(null, file.fieldname + ".png")
//         }
//     });
//     upload = multer({ storage: storage });
//     next();
// }
imagesRouter.post('/storeLogo', upload_storeLogo.single("storeLogo"), async (req, res, next) => {
    try {
        // console.log('posting to storeLogo')
        const file = req.file;

        console.log("posted file: ", file);

        // fs.writeFile("./src/images/storeLogo.png", file.buffer, (err) => {
        //     console.error(err);
        // });


        res.send({ body: file });
    } catch (err) {
        console.error(err);
        next();
    }

});

// const itemImageSetup = (req, res, next) => {
//     try {
//         const { itemNumber } = req.params;
//         console.log(`posting to item/${itemNumber}`);
//         console.log("req.file: ", req.file);

//         // console.log('req: ', req);
//         storage = multer.diskStorage({
//             destination: function (req, file, cb) {
//                 cb(null, 'src/images/items/')
//             },
//             filename: function (req, file, cb) {
//                 //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//                 cb(null, itemNumber + "_thumbnail" + path.parse(file.originalname).ext);
//             }
//         });
//         upload = multer({ storage: storage });
//         console.log("storage: ", storage)
//         next();
//     } catch (err) {
//         console.error(err);
//         next();
//     }

// };
imagesRouter.post('/item/thumbnail/:itemNumber', upload_itemThumbnail.single("thumbnail"), async (req, res, next) => {
    console.log("req.file.filename: ", req.file.filename);
    const itemNumber = req.params.itemNumber;
    const fileName = req.file.filename;
    const { rows } = await client.query('SELECT * FROM "itemImages" WHERE "itemNumber"=$1 AND type=$2;',
        [itemNumber, "thumbnail"]);
        console.log("pass first client.query")
    if (rows.length > 0) {
        const imageQuery = await client.query('SELECT * FROM images WHERE id=$1', [rows[0].imageId]);
        const imageName = imageQuery.rows[0].name;
        if(imageName !== fileName) {   
            //rows[0].imageId is the id of the previous image
            client.query('UPDATE images SET name=$1 WHERE id=$2', [fileName, rows[0].imageId]);
            //We need to also delete the original image file that we are replacing
        }
    } else {
        const newImage = await createImage(fileName);
        const itemImage = await createItemImage({
            itemNumber: itemNumber,
            imageId: newImage.id,
            type: "thumbnail"
        });
    }


    next();
});
imagesRouter.post('/item/small/:itemNumber', upload_itemSmall.single("small"), async (req, res, next) => {
    console.log("req.file.filename: ", req.file.filename);
    const itemNumber = req.params.itemNumber;
    const fileName = req.file.filename;
    const { rows } = await client.query('SELECT * FROM "itemImages" WHERE "itemNumber"=$1 AND "type"=$2;',
        [itemNumber, "small"]);
        if (rows.length > 0) {
            const imageQuery = await client.query('SELECT * FROM images WHERE id=$1', [rows[0].imageId]);
            const imageName = imageQuery.rows[0].name;
            if(imageName !== fileName) {   
                //rows[0].imageId is the id of the previous image
                client.query('UPDATE images SET name=$1 WHERE id=$2', [fileName, rows[0].imageId]);
                //We need to also delete the original image file that we are replacing
            }
        } else {
        //create image filename.
        const newImage = await createImage(fileName);
        const itemImage = await createItemImage({
            itemNumber: itemNumber,
            imageId: newImage.id,
            type: "small"
        });
        console.log('created image: ', newImage, "and itemImage: ", itemImage);
    }


    next();
});
imagesRouter.post('/item/large/:itemNumber', upload_itemLarge.single("large"), async (req, res, next) => {
    console.log("req.file.filename: ", req.file.filename);
    const itemNumber = req.params.itemNumber;
    const fileName = req.file.filename;
    const { rows } = await client.query('SELECT * FROM "itemImages" WHERE "itemNumber"=$1 AND "type"=$2;',
        [itemNumber, "large"]);
        if (rows.length > 0) {
            const imageQuery = await client.query('SELECT * FROM images WHERE id=$1', [rows[0].imageId]);
            const imageName = imageQuery.rows[0].name;
            if(imageName !== fileName) {   
                //rows[0].imageId is the id of the previous image
                client.query('UPDATE images SET name=$1 WHERE id=$2', [fileName, rows[0].imageId]);
                //We need to also delete the original image file that we are replacing
            }
        } else {
        //create image filename.
        const newImage = await createImage(fileName);
        const itemImage = await createItemImage({
            itemNumber: itemNumber,
            imageId: newImage.id,
            type: "large"
        });
        console.log('created image: ', newImage, "and itemImage: ", itemImage);
    }


    next();
});
//come back to this after setting up front end to upload 3 image files. _thumbnail, _reg, _large


apiRouter.use((error, req, res, next) => {
    res.send(error);
});

module.exports = {
    server,
    apiRouter
}
// *** Notes ***
//make sure id and other number types are checked against NaN
//floor integers
//more error handling?
//can write more helper functions for similar code to condense 
