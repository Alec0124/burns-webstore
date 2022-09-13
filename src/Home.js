import {Link} from "react-router-dom";
const homeBanner = require("./images/homeBanner.png");

const Home = ({ contentItems }) => {

    const imgSrc = (item) => {
        try {
            if (!!item.images.thumbnail) {
                console.log("item.images.thumbnail exists")
                return require(`./images/items/${item.images.thumbnail.name}`);
            } else {
                return "";
            }
        }
        catch (err) {
            console.error(err);
            return ""
        }
    }
    const mapContentItems = () => {


        if (!!contentItems) {
            console.log('inside contentItems', contentItems)

            return (<div className="store-content">
                {contentItems.map((item) => {


                    if (!!item.featured) {

                        return (<Link to={`/item/${item.itemNumber}`} className="thumbnail" key={item.id} >
                            <div><b>{item.name}</b></div>
                            {/* image */}
                            <img className="thumbnail-image" alt="thumb_image" src={imgSrc(item)} />
                            <div><small># {item.itemNumber}</small></div>
                            <div>${Number.parseFloat(item.price).toFixed(2)}</div>
                        </Link>)
                    }
                    else {
                        return null;
                    }
                })
                }
            </div>)
        } else {
            return null;
        };

        // useEffect(() => {

        // });



    };

    return (<div className="store-home">
        <div>
            <img className="home-banner" src ={homeBanner} alt="banner" />
        </div>
        {mapContentItems()}
    </div>)
};

export default Home;