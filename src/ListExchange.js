import { useState, useEffect } from "react";

const ListExchange = ({ inputList, outputList, setOutputList, componentDisplay, setComponentDisplay }) => {

    const [availableInputs, setAvailableInputs] = useState([...inputList]);

    const setOutputListAsync = async (value) => {
        await setOutputList(value);
    }
    const setAvailableInputsAsync = async (value) => {
        await setAvailableInputs(value);
    }
    
    //onClick functions

    const onClickCloseWindow = (e) => {
        setComponentDisplay("none");
    };
    
    const onClickInput = (e) => {
        //when you click on a row from the available list, remove from available list and add to output list
        const id = Number(e.target.getAttribute("clicker-key"));       
        const i = availableInputs.findIndex((input)=>{
            if(input.id === id) {return true} else {return false}
        });


        //push to outputlist
        const tempList = [...outputList];
        tempList.push(availableInputs[i]);
        setAvailableInputsAsync(availableInputs.filter((input, index) => index !== i ));
        setOutputListAsync(tempList);
    };
    const onClickOutput = (e) => {
        //when you click on a row from the selected list, remove from selected list and add to available list
        const id = Number(e.target.getAttribute("clicker-key"));     
        const i = outputList.findIndex((input)=>{
            if(input.id === id) {return true} else {return false}
        });


        //push to available list
        const tempList = [...availableInputs];
        tempList.push(outputList[i]);
        setOutputListAsync(outputList.filter((input, index) => index !== i ));
        setAvailableInputsAsync(tempList);
    };

    //Actions

    useEffect(() => {
        const tempList =[...inputList];
        outputList.forEach((output) => {
            
            tempList.some((input, i) => { 
                if(input.id === output.id ) {
                    tempList.splice(i, 1);
                    return true;
                };
            });
        });
        setAvailableInputs(tempList);
        
    }, []);

    return (
        <div className="list-exchange" style={{ "display": componentDisplay }}>
            <button onClick={onClickCloseWindow}>Close Window</button>
            <div className="category-list">
                {availableInputs.map((category => {
                    return <div className="row" key={category.id} clicker-key={category.id} onClick={onClickInput}>
                        {category.name}
                    </div>
                }))}
            </div>
            <div className="category-selected">
                {outputList.map((category => {
                    if(category === undefined) {
                        return (<></>)
                    }
                    return <div className="row" key={category.id} clicker-key={category.id} onClick={onClickOutput}>
                        {category.name}
                    </div>
                }))}
            </div>

        </div>
    )
};

export default ListExchange;