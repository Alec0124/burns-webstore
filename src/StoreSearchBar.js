import { useState } from "react";
import { useNavigate } from "react-router-dom";



const StoreSearchBar = ({ contentItems }) => {
    //notes
    //can add additional functionallity with esc button, up down arrow keys, enter button

    const searchIcon = require('./images/search.png')

    //states
    const [inputText, setInputText] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    //
    const navigateTo = useNavigate();
    //

    //functions
    //onChange functions
    const onChangeInputText = async (e) => {
        const newText = (e.target.value.trim());
        if (newText.length >= 3) {
            //show search box if there is at least one

            if (contentItems.length > 0) {
                //show dropdown display
                //set search results
                const searchResultsProto = [];
                contentItems.forEach(item => {
                    if (
                        item.itemNumber.includes(newText.toUpperCase()) ||
                        item.name.toLowerCase().includes(newText.toLowerCase()) ||
                        item.description.toLowerCase().includes(newText.toLowerCase())
                    ) {
                        searchResultsProto.push(item);
                    }
                });
                setSearchResults(searchResultsProto);
            }

        }
        setInputText(newText);
    };
    //onClick Functions
    const onClickItem = (e) => {
        const item = searchResults.find(item =>
            item.name === e.target.textContent
        )
        navigateTo(`/item/${item.itemNumber}`);
        setInputText("");
    };
    //
    const displaySearchResults = () => {
        if (searchResults.length > 0 && inputText.trim().length >= 3) {
            return <div id="storeSearchBar" className="store-searchbar-dropdown" > {searchResults.map(mapSearchResults)}
            </div>
        } else {
            return null
        }
    };
    const mapSearchResults = (item) => {
        return <div value={item.name} key={item.id} onClick={onClickItem}>
            {item.name}
        </div>
    };

    // if(contentItems.length > 0) {

    // }

    return <div id="store-searchbar-root">
        <input className="store-search-bar" type="text" value={inputText} onChange={onChangeInputText} />
        <button  className="store-search-bar-button" >
            <img src={searchIcon} alt="search" />
        </button>
        {displaySearchResults()}
    </div>
};

export default StoreSearchBar;