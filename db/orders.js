

const { client } = require("./client");
const { testFirstRow, getQueryValuesString, getNestedTable, insertQueryValuesString } = require("./api");
const { getLineItemsByOrder } = require("./lineItems");


//creates order; line items attached seperately
const createOrder = async ({
    userId,
    attnShipping,
    emailShipping,
    phoneShipping,
    address1Shipping,
    address2Shipping,
    zipShipping,
    stateShipping,
    cityShipping,
    attnBilling,
    emailBilling,
    phoneBilling,
    address1Billing,
    address2Billing,
    zipBilling,
    stateBilling,
    cityBilling,

}) => {
    const [valuesArray, queryString] = insertQueryValuesString([
        {
            name: '"userId"',
            value: userId,
            type: 'string'
        },
        {
            name: "attnShipping",
            value: attnShipping,
            type: 'string'
        },
        {
            name: "emailShipping",
            value: emailShipping,
            type: 'string'
        },
        {
            name: '"phoneShipping"',
            value: phoneShipping,
            type: 'string'
        },
        {
            name: "address1Shipping",
            value: address1Shipping,
            type: 'string'
        },
        {
            name: "address2Shiping",
            value: address2Shipping,
            type: 'string'
        },
        {
            name: "zipShipping",
            value: zipShipping,
            type: 'string'
        },
        {
            name: "stateShipping",
            value: stateShipping,
            type: 'string'
        },
        {
            name: "cityShipping",
            value: cityShipping,
            type: 'string'
        },
        {
            name: "attnBilling",
            value: attnBilling,
            type: 'string'
        },
        {
            name: "emailBilling",
            value: emailBilling,
            type: 'string'
        },
        {
            name: '"phoneBilling"',
            value: phoneBilling,
            type: 'string'
        },
        {
            name: "address1Billing",
            value: address1Billing,
            type: 'string'
        },
        {
            name: "address2Billing",
            value: address2Billing,
            type: 'string'
        },
        {
            name: "zipBilling",
            value: zipBilling,
            type: 'string'
        },
        {
            name: "stateBilling",
            value: stateBilling,
            type: 'string'
        },
        {
            name: "cityBilling",
            value: cityBilling,
            type: 'string'
        }
        
    ], "orders");


    try {
        //if there are no values passed in except token and id; this should error out as no values provided

        // console.log('queryString: ', queryValuesString);
        const { rows } = await client.query(queryString, valuesArray);
        testFirstRow(rows);
        return rows[0];
        // returns user object of updated row (not password);
    }
    catch (error) {
        console.error('error creating order..', error);
        throw error;
    }
    //returns new order object
};

const getAllOrders = async () => {
    console.log('running getAllOrders..');

    try {
        const allOrders = await Promise.all(await getNestedTable("orders", null, "lineItems", getLineItemsByOrder, null));
        // const lineItems = await getLineItemsByOrder(id).rows;
        // testFirstRow(lineItems);
        return allOrders;
    }

    catch (error) {
        console.error('error getAllOrders..', error);
        throw error;
    }
    //returns order object
};

//retrieves order row from DB, includes linesItems
const getOrderById = async (id) => {
    console.log('running getOrderById..');

    try {
        const { rows } = await client.query(`
            SELECT * FROM orders
            WHERE id=$1;`, [id]);
        testFirstRow(rows);
        const lineItems = await getLineItemsByOrder(id).rows;
        testFirstRow(lineItems);
        return { ...rows[0], lineItems: lineItems };
    }

    catch (error) {
        console.error('error getting order by id..', error);
        throw error;
    }
    //returns order object
};

//gets all order rows from DB, includes lineItems

//updates the order row in database *note line items are handled seperately*
const updateOrder = async ({ id, attn, email, phoneNumber, address, address2, zip, state }) => {
    console.log('running updateOrder..');

    try {
        const [valuesArray, queryValuesString] = getQueryValuesString([
            {
                name: 'attn',
                value: attn,
                type: 'string'
            },
            {
                name: 'email',
                value: email,
                type: 'string'
            },
            {
                name: '"phoneNumber"',
                value: phoneNumber,
                type: 'string'
            },
            {
                name: 'address',
                value: address,
                type: 'string'
            },
            {
                name: 'address2',
                value: address2,
                type: 'string'
            },
            {
                name: 'zip',
                value: zip,
                type: 'string'
            },
            {
                name: 'state',
                value: state,
                type: 'string'
            }
        ], id);
        // console.log('queryString: ', queryValuesString);
        const { rows } = await client.query(`
            UPDATE orders 
            ${queryValuesString}`, valuesArray);
        testFirstRow(rows);
        return rows[0];
    }

    catch (error) {
        console.error('error updating order by id..', error);
        throw error;
    }
    //returns order object
};
//gets all orders by userId; includes lineItems
const getOrdersByUserId = async (id) => {
    console.log('running getOrdersByUserId..');
    try {

        return await getNestedTable('orders', '"userId"', "lineItems", getLineItemsByOrder, id);
    }

    catch (error) {
        console.error('error getting orders by user id..', error);
        throw error;
    }
}

//deletes the order row in DB by id; will delete lineItems associated with the order first
//NEEDS ADJUSTING
const deleteOrder = async (id) => {
    console.log('running deleteOrder..');
    try {

        const lineItems = await client.query(`
            DELETE FROM "lineItems"
            WHERE "orderId"=($1)
            RETURNING *;`, [id]);
        const fields = await client.query(`
            DELETE FROM orders
            WHERE "id"=($1)
            RETURNING *;`, [id]);

        return [fields, lineItems];
    }

    catch (error) {
        console.error('error deleting order by id..', error);
        throw error;
    }
    //returns null
};

module.exports = {
    createOrder,
    getOrderById,
    getOrdersByUserId,
    updateOrder,
    deleteOrder,
    getAllOrders
}