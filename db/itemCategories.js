const { testFirstRow, respError } = require("./api");
const { client } = require("./client");

const createItemCategory = async ({ itemId, categoryId }) => {

    try {

        const { rows } = await client.query(`INSERT INTO "itemCategories"("itemId", "categoryId")
        VALUES ($1, $2) RETURNING *;`, [itemId, categoryId]);
        testFirstRow(rows);

        return rows[0];
    }

    catch (error) {
        console.error('error createItemCategory..', error);
        throw error;
    }
};
const getItemCategoriesByItem = async (itemId) => {

    try {

        const { rows } = await client.query(`SELECT * FROM "itemCategories" 
        WHERE "itemId"=($1);`, [itemId]);
        if(!rows[0]) {
            return [];
        }

        return rows;
    }

    catch (error) {
        console.error('error getItemCategoriesByItem..', error);
        throw error;
    }
};
const updateCategoryItems = async (id, categories) => {
    const itemCategories = await getItemCategoriesByItem(id)
    const deletedItemCategories = [];
    const ignoreItemCategories = [];
    itemCategories.forEach((itemCategory, index)=> {
        if(categories.some(category => category.id === itemCategory.categoryId)) {
            ignoreItemCategories.push(itemCategory);
        } else {
            deletedItemCategories.push(itemCategory);
        }
    });
    deletedItemCategories.forEach(async itemCategory => {
        await removeItemCategory(itemCategory.id);
    });
    categories.forEach(async category => {
        if(ignoreItemCategories.some(itemCategory => itemCategory.categoryId === category.id)) {
            //ignore
        } else {
            //add itemCategory
            await createItemCategory({ itemId:id, categoryId:category.id })
        }
    });
    return categories;

};
const getItemCategoriesByCategory = async (categoryId) => {

    try {
        console.log('entering getItemCategoriesByCategory')
        const { rows } = await client.query(`SELECT * FROM "itemCategories" 
        WHERE "categoryId"=($1)`, [categoryId]);
        if(!rows) {
            return false
        };

        return rows[0];
    }

    catch (error) {
        console.error('error getItemCategoriesByCategory..', error);
        throw error;
    }
};
const removeItemCategory = async (id) => {

    try {

        const { rows } = await client.query(`DELETE FROM "itemCategories" 
        WHERE id=($1)
        RETURNING *;`, [id]);
        testFirstRow(rows);

        return rows[0];
    }

    catch (error) {
        console.error('error removeItemCategory..', error);
        throw error;
    }
};




module.exports = {
    createItemCategory,
    getItemCategoriesByItem,
    getItemCategoriesByCategory,
    removeItemCategory,
    updateCategoryItems
}