

const GeneralAdmin = ({setSelectedCat}) => {

      setSelectedCat('general');

    return (
        <div className="admin-body">
        <div className="admin-descriptions">
          <div className="row">
            Webstore Logo
          </div>
          <div className="row">
            Front Page Banner
          </div>
          <div className="row">
            Color Scheme
          </div>
          <div className="row">
            Description
          </div>
          <div className="row">
            Description
          </div>
          <div className="row">
            Description
          </div>
          <div className="row">
            Description
          </div>
        </div>
        <div className="admin-fields">
          <div className="row">
            <button>Browse</button>
          </div>
          <div className="row">
          <button>Browse</button>
          </div>
          <div className="row">
            Drop Down List
          </div>
          <div className="row">
            Description
          </div>
          <div className="row">
            Description
          </div>
          <div className="row">
            Description
          </div>
          <div className="row">
            Description
          </div>
        </div>
        <div className="admin-values">
          <div className="row">
            Display
          </div>
          <div className="row">
            Display
          </div>
          <div className="row">
            Default
          </div>
          <div className="row">
          Default
          </div>
          <div className="row">
          Default
          </div>
          <div className="row">
          Default
          </div>
          <div className="row">
          Default
          </div>
        </div>
      </div>
    )
};

export default GeneralAdmin;