const { getCategoryById } = require("./categories");
const { client } = require("./client");
const { testFirstRow, getNestedTable, getQueryValuesString, deleteReferencedTable, deleteTableRow } = require("./api");
const { getItemCategoriesByItem, updateCategoryItems, getItemCategoriesByCategory } = require("./itemCategories");

//creates new item row in DB
const createItem = async ({ itemNumber, description, name, cost, price, onHand, status, type, webstoreStatus, taxable, featured }) => {

    try {
        const { rows } = await client.query(`INSERT INTO items("itemNumber", "description", name, cost, price, "onHand", status, type, "webstoreStatus", taxable, featured)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
                ON CONFLICT ("itemNumber") DO NOTHING 
                RETURNING *;`, [itemNumber.toUpperCase(), description, name, cost, price, onHand, status, type, webstoreStatus, taxable, featured]);
        testFirstRow(rows);
        return rows[0];
    }

    catch (error) {
        console.error('error creating item..', error);
        throw error;
    }
    //returns newly create item object
};

//reads item row by id, includes categories
const getItemById = async (id) => {
    try {

        const promisedDraftItem = await getNestedTable('items', 'id', 'categories', getItemCategoriesByItem, Number(id));
        const draftItem = await Promise.all(promisedDraftItem);
        if (!!draftItem.categories) {
            draftItem.categories = draftItem.categories.map(async (categoryItem) => {
                return await getCategoryById(categoryItem.categoryId);
            });
        }
        return draftItem;
    }

    catch (error) {
        console.error('error getItemById..', error);
        throw error;
    }

    // returns an item object
};

const getCompleteItemFromItemNumber = async (itemNumber, admin = false) => {
    //query for items
    const itemsQuery = await client.query('SELECT * from "items" WHERE "itemNumber"=$1', [itemNumber]);
    if (itemsQuery.length < 1) {
        const err = "item by ItemNumber does not exist";
        return { error: err, name: err }
    }
    const item = itemsQuery.rows[0];
    // const resultItems = [...items];
    const categoriesQuery = await client.query('SELECT * FROM "categories";');
    const categories = categoriesQuery.rows;
    const itemCategoriesQuery = await client.query('SELECT * FROM "itemCategories" WHERE "itemId"=$1;', [item.id]);
    const itemCategories = itemCategoriesQuery.rows;
    const imagesQuery = await client.query('SELECT * FROM images;');
    const images = imagesQuery.rows;
    const itemImagesQuery = await client.query('SELECT * FROM "itemImages";');
    const itemImages = itemImagesQuery.rows;
    ////


    const categoriesResult = [...itemCategories.filter(itemCategory => itemCategory.itemId === item.id)]
    categoriesResult.map(itemCategory => {
        const selectedCategory = categories.find(category =>
            itemCategory.categoryId === category.id
        );
        const result = selectedCategory;
        return result;
    });
    //itemCategories is now array of Categories
    console.log("itemCateogires: ", categoriesResult)
    item.categories = categoriesResult;

    //now getting images


    const resultImages = {};
    const itemImagesResult = [...itemImages.filter(itemImage => itemImage.itemId === item.id)];
    itemImagesResult.forEach(itemImage => {
        const imageName = images.find(image => image.id === itemImage.imageId);
        //images
        resultImages[itemImage.type] = imageName;
    });
    item.images = resultImages;

    if (admin === false) {
        delete item.cost;
    }   
    //itemCategories is now array of Categories
    return item
};

const getCompleteItemList = async (admin = false) => {
    //query for items
    const itemsQuery = await client.query('SELECT * from items;');
    const items = itemsQuery.rows;
    // const resultItems = [...items];
    const categoriesQuery = await client.query('SELECT * FROM "categories";');
    const categories = categoriesQuery.rows;
    const imagesQuery = await client.query('SELECT * FROM images;');
    const images = imagesQuery.rows;
    const itemCategoriesQuery = await client.query('SELECT * FROM "itemCategories"');
    const itemCategories = itemCategoriesQuery.rows;
    const itemImagesQuery = await client.query('SELECT * FROM "itemImages";');
    const itemImages = itemImagesQuery.rows;
    items.forEach(item => {
        const categoriesResult = [...itemCategories.filter(itemCategory => itemCategory.itemId === item.id)]
        const finalCategoriesResult = [];
        categoriesResult.forEach(itemCategory => {
            const selectedCategory = categories.find(category =>
                itemCategory.categoryId === category.id
            );
                finalCategoriesResult.push(selectedCategory);
        });
        //itemCategories is now array of Categories
        console.log("categoriesResult: ", finalCategoriesResult)
        item.categories = finalCategoriesResult;

        //now getting images


        const resultImages = {};
        const itemImagesResult = [...itemImages.filter(itemImage => itemImage.itemId === item.id)];
        itemImagesResult.forEach(itemImage => {
            const imageName = images.find(image => image.id === itemImage.imageId);
            //images
            resultImages[itemImage.type] = imageName;
        });
        item.images = resultImages;

        if (admin === false) {
            delete item.cost;
        }
        
    });
    return items;
}

//return item object in database by itemNumber
const getItemByItemNumber = async (itemNumber) => {
    try {
        const draftItem = await getCompleteItemFromItemNumber(itemNumber);
        return draftItem;
    }

    catch (error) {
        console.error('error creating item..', error);
        throw error;
    }
};
//returns all item objects in database

const getAllItems = async () => {
    try {
        // get imageItems


        ///
        const draftItems = await getCompleteItemList();
        return draftItems;
    }

    catch (error) {
        console.error('error getAllItems..', error);
        throw error;
    }
};
//updates an item row by id
const updateItem = async ({ id, name, description, cost, price, status, webstoreStatus, taxable, type, categories, featured }) => {
    console.log('running updateItem()');
    try {

        const [valuesArray, queryValuesString] = getQueryValuesString([
            {
                name: "name",
                type: "string",
                value: `${name}`
            },
            {
                name: "description",
                type: "string",
                value: `${description}`
            },
            {
                name: "cost",
                type: "number",
                value: cost
            },
            {
                name: "price",
                type: "number",
                value: price
            },
            {
                name: "status",
                type: "string",
                value: `${status}`
            },
            {
                name: '"webstoreStatus"',
                type: "string",
                value: `"${webstoreStatus}"`
            },
            {
                name: "taxable",
                type: "boolean",
                value: taxable
            },
            {
                name: "type",
                type: "string",
                value: type
            },
            {
                name: "featured",
                type: "boolean",
                value: featured
            }
        ], id);
        const { rows } = await client.query(`UPDATE items ${queryValuesString}`, valuesArray);
        testFirstRow(rows);
        console.log('updated item: ', rows);
        /////////
        const updatedCategories = await updateCategoryItems(id, categories);
        console.log('updatedCategories: ', updatedCategories);
        rows[0].categories = updatedCategories;
        return rows[0];
    }

    catch (error) {
        console.error('error updating item..', error);
        throw error;
    }
    // returns updated item object
};

//deletes item row from DB

const removeItem = async (id) => {
    console.log('running removeItem id: ', id);
    try {
        // return await deleteReferencedTable('items', '"itemCategories"', '"itemId"', id);
        await deleteTableRow("itemCategories", "itemId", id);
        return await deleteTableRow("items", "id", id);
    }

    catch (error) {
        console.error('error updating item..', error);
        throw error;
    }
    // returns null or success message
};



// example item object
// {
//     id: 0,
//     itemNumber: 'REDSHIRT', //item number will always be converted to caps. only '_' and '-' special characters
//     name: 'Red T-Shirt',
//     description: 'A mervelous red shirt, the tee kind.',
//     cost: 5.48,
//     price: 8.99,
//     onHand: 22,
//     allocated: 4
//     categories: [{id: 0, name: 'shirts'}, {id:1, name: 'pants'}]
// }



module.exports = {
    createItem,
    getAllItems,
    getItemById,
    getItemByItemNumber,
    updateItem,
    removeItem,
    getCompleteItemFromItemNumber
}