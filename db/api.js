const { client } = require('./client');
const testFirstRow = rows => {
  try {
  if (!rows[0]) {
    throw new Error('could not find queried row');
  }
}
catch (error) { throw error}
};
const respError = (name, message) => {
  return {
    name: `error_${name}`,
    message,
    error: message
  };
};
const getQueryValuesString = (objectsArray, id) => {
  /*
  {
    name, value, type
  }
  */
  let dynamicArray = [];
  let dynamicArrayNames = [];
  let queryValuesString = `SET `;
  objectsArray.forEach(object => {
    console.log('testing: ', object);
    if (typeof (object.value) === object.type) {
      console.log("pass");
      dynamicArray.push(object.value);
      dynamicArrayNames.push(object.name);
    };
  });
  if (dynamicArray.length < 1) {
    throw respError('error_noInputValues', 'missing input values for database');
  };
  queryValuesString = queryValuesString + `${dynamicArrayNames[0]}=$1`;
  if (dynamicArray.length > 1) {
    for (let i = 1; dynamicArray.length > i; i++) {
      queryValuesString = queryValuesString + `, ${dynamicArrayNames[i]}=$${String(i+1)}`;
    };
  };
  queryValuesString = queryValuesString + ` WHERE id=${id} RETURNING *;`;

  return [dynamicArray, queryValuesString];
};

const deleteReferencedTable = async ( topTable, bottomTable, referenceName, id ) => {
  const deletedBottomRows = await client.query(`DELETE FROM ${bottomTable}  
  WHERE $2=($3) 
  RETURNING *;`, [bottomTable, referenceName, id]).rows;
  const deletedTopRow = await client.query(`DELETE FROM ${topTable}  
  WHERE id=($2) 
  RETURNING *;`, [topTable, id]).rows;
  deletedTopRow[bottomTable] = deletedBottomRows;
  return deletedTopRow;

};
const deleteTableRow = async (tableName, column, value) => {
  const deletedRow = await client.query(`DELETE FROM "${tableName}" WHERE "${column}"=${value} RETURNING *;`);
  return deletedRow.rows[0]
};

// searches firstTableName where firstTableRefId == id; then uses readSecondTable with id of each row in fristTable.
//uses secondKey to store the array of rows into the first table object; returns array of firstTableObjects
const getNestedTable = async (firstTableName, firstTableRefId, secondTableKey, readSecondTable, id) => {
  console.log('running getNestedTable...')
  let queryString;
  let valuesArray;

  if (typeof (firstTableRefId) !== 'string' || typeof (id) !== 'number') {
    console.log('tableRef and/or id not found!!!');
    queryString = `SELECT * FROM ${firstTableName};`
    valuesArray = [firstTableName];
  } else {
    queryString = `SELECT * FROM ${firstTableName} WHERE ${firstTableRefId}=(${id});`
    valuesArray = [];
  };

  const { rows } = await client.query(queryString);


  const myMapFunction = async (secondTableKey, readSecondTable) => {
    return async (firstTableRow) => {
      const data = await readSecondTable(firstTableRow.id);
      const result = { ...firstTableRow };
      if ( !data ) {
        result[secondTableKey] = [];  
      } else {
        result[secondTableKey] = data;
      };
      return result;
    }
  };

  const mapFirstTable = await myMapFunction(secondTableKey, readSecondTable);
  const result = rows.map(mapFirstTable);

  return result;
};

//////  i dont like above   ///////

const insertQueryValuesString = (objectsArray, tableName) => {
  /*
  {
    name, value, type
  }
  */
  let dynamicArray = [];
  let dynamicArrayNames = [];
  let queryValuesString = `INSERT INTO  ${tableName}(`;
  objectsArray.forEach(object => {
    if (typeof (object.value) === object.type) {
      dynamicArray.push(object.value);
      dynamicArrayNames.push(object.name);
    } else {
    }
  });
  if (dynamicArray.length < 1) {
    throw { name: 'error_noInputValues', message: 'missing input values for database' }
  };
  queryValuesString = queryValuesString + `${dynamicArrayNames[0]}`;
  if (dynamicArray.length > 1) {
    for (let i = 1; dynamicArray.length > i; i++) {
      queryValuesString = queryValuesString + `, ${dynamicArrayNames[i]}`;
    }
  };
  queryValuesString = queryValuesString + `) VALUES ($1`;
  if (dynamicArray.length > 1) {
    for (let i = 1; dynamicArray.length > i; i++) {
      queryValuesString = queryValuesString + `, $${i + 1}`
    };
    queryValuesString = queryValuesString + `) RETURNING *;`;
  }
  return [dynamicArray, queryValuesString];
};


module.exports = {
  testFirstRow,
  respError,
  getQueryValuesString,
  getNestedTable,
  deleteReferencedTable,
  insertQueryValuesString,
  deleteTableRow
}