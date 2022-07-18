import { useState, useEffect } from "react";

const ListView = ({ inputList, columnKeys, columnNames, componentDisplay, setComponentDisplay, rowEnterFunction }) => {
    //columnList === [["key", "name"],["", ""],["", ""]]
    //states
    const [selectedRow, setSelectedRow] = useState(null);

    //functions

    const mapInputList = (item) => {
        const mapColumnKeys = (key, index) => {
            return (
                <td className="table-cell" key={index}>
                    {item[key]}
                </td>
            )
        };

        return (<tr className="row" key={item.id} clicker-key={item.id} onClick={onClickRow}>
            <td className="table-cell">
                {item.id}
            </td>
            {columnKeys.map(mapColumnKeys)}
        </tr>
        )
    };
    const mapColumnNames = (name, index) => {

        return (
            <th className="table-cell" key={index}>
                {name}
            </th>
        )
    };



    //onClick functions

    const onClickCloseWindow = (e) => {
        setComponentDisplay("none");
    };
    const onClickView = (e) => {
        if (selectedRow !== null) {
            rowEnterFunction(selectedRow);
        }

    };
    const onClickRow = (e) => {
        setSelectedRow(e.target.getAttribute("clicker-key"))
    };
    const onClickClose = () => {
        setComponentDisplay("none");
    }

    //Actions

    // useEffect(() => {

    // }, []);


    if (Array.isArray(columnKeys) === true &&
        Array.isArray(columnNames) === true &&
        Array.isArray(inputList) === true &&
        typeof (inputList[0] === 'object')) {

        return (
            <table className='list-view' style={{ display: componentDisplay }}>
                <tbody>
                    {/* map items in interactive table */}
                    <tr>
                        <td colSpan="4" style={{ 'textAlign': 'right' }}>
                            <button onClick={onClickClose}>X</button>
                        </td>
                    </tr>
                    <tr className="row table-header">
                        <th className="table-cell">
                            Id#
                        </th>
                        {columnNames.map(mapColumnNames)}
                    </tr>
                    <tr className="row">

                    </tr>
                    {inputList.map(mapInputList)}
                    <tr>
                        <td colSpan={4}>
                            <button onClick={onClickView}>View</button>
                            <button onClick={onClickCloseWindow}>Close</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        )
    }
    else {
        return
    }
};

export default ListView;