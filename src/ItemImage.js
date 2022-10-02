// import * as fs from "fs";


const ItemImage = ({ alt, imageName }) => {
    
    //
    // const Path = require('path');

    // const path = Path.join(__dirname, "existing-file.txt");

    // console.log("Fs.exists test: ", Fs.existsSync(path));
    // // true
    console.log("ItemImage: imageName: ", imageName)
    if (!!imageName) {

        const imageSrc = require(`./images/items/${imageName}`);
        // const imageSrc = "";
        return <img className="order-history-image" alt={alt} src={imageSrc} />
    } else {
        return <img className="order-history-image" alt={alt} src="" />
    }
}

export default ItemImage;