import { useEffect, useState } from "react";
import storeLogo from "../images/storeLogo.png";
import homeBanner from "../images/homeBanner.png";
import { saveStoreLogoImage, saveHomeBannerImage } from "../api/"
// import * as fs from 'node:fs';


const GeneralAdmin = ({ user, setSelectedCat, verifyToken }) => {
  const reader = new FileReader();
  reader.onload = (async (e) => {
    console.log(e.target.result);

  });
  //states
  const [logoImage, setLogoImage] = useState(storeLogo);
  const [logoImageFile, setLogoImageFile] = useState(null);
  const [storeLogoSaved, setStoreLogoSaved] = useState(false);
  const [homeBannerImage, setHomeBannerImage] = useState(homeBanner);
  const [homeBannerImageFile, setHomeBannerImageFile] = useState(null);
  const [homeBannerSaved, setHomeBannerSaved] = useState(false);

  //funtions
  const onClickStoreLogoSaveChanges = async (e) => {
    e.preventDefault();
    await saveStoreLogoImage(user.token, logoImageFile);
    setStoreLogoSaved(true);
    document.getElementById("general-admin-form").reset();
  }
  const onClickHomeBannerSaveChanges = async (e) => {
    e.preventDefault();
    await saveHomeBannerImage(user.token, homeBannerImageFile);
    setHomeBannerSaved(true);
    document.getElementById("general-admin-form").reset();
  }
  const onChangeImageInput = (e, { filename, setImageFile, setImage, setSavedBoolean }) => {
    const file = e.target.files[0];
    const namedFile = new File([file], filename);
    setImageFile(namedFile);
    const newImg = URL.createObjectURL(file);
    setImage(newImg);
    setSavedBoolean(false);
  };
  const onChangeLogo = (e) => {
    onChangeImageInput(e, {
      filename: "storeLogo.jpg",
      setImageFile: setLogoImageFile,
      setImage: setLogoImage,
      setSavedBoolean: setStoreLogoSaved
    });
  };
  const onChangeHomeBanner = (e) => {
    onChangeImageInput(e, {
      filename: "homeBanner.png",
      setImageFile: setHomeBannerImageFile,
      setImage: setHomeBannerImage,
      setSavedBoolean: setHomeBannerSaved
    });
  };

  const mapDescriptionRows = (row) => {

    return (<div key={row.id} className="row" accept="image/*" >
      {row.description}
    </div>)
  };
  const mapInputRows = (row) => {

    return (<div key={row.id} className="row">
      <span style={{ color: "purple" }}>{row.inputDescription} </span>
      {row.input}
    </div>)
  };

  const mapPreviewtRows = (row) => {

    return (<div key={row.id} className="row">
      {row.preview}
    </div>)
  };
  const printWebstoreLogoSaveChangesButton = () => {
    if (logoImage !== storeLogo && storeLogoSaved === false) {
      return (<button onClick={onClickStoreLogoSaveChanges}>Save Changes</button>)
    } else {
      return
    }
  }
  const printHomeBannerSaveChangesButton = () => {
    if (homeBannerImage !== homeBanner && homeBannerSaved === false) {
      return (<button onClick={onClickHomeBannerSaveChanges}>Save Changes</button>)
    } else {
      return
    }
  }

  // CONSTANTS
  const ROWS_OBJECTS = [
    {
      id: 0,
      description: "Webstore Logo",
      inputDescription: "Only supports .png images.",
      input: (<input type="file" accept=".png" name="storeLogo" id="webstore-logo" onChange={onChangeLogo} />),
      preview: (<div style={{ display: "flex", flexFlow: "column nowrap", width: "300px" }}>
        <img className="store-logo" src={logoImage} alt="logo" />
        {printWebstoreLogoSaveChangesButton()}
      </div>)

    },
    {
      id: 1,
      description: "Home Page Banner",
      inputDescription: "Only supports .png images. 6x1, 1200x200",
      input: (<input type="file" accept=".png" name="homeBanner" id="home-banner" onChange={onChangeHomeBanner} />),
      preview: (<div style={{ display: "flex", flexFlow: "column nowrap", width: "300px" }}>
        <img className="home-banner" src={homeBannerImage} style={{width:"450px", height:"75px"}} alt="home banner" />
        {printHomeBannerSaveChangesButton()}
      </div>)

    }
  ];

  useEffect(() => {
    setSelectedCat('general');
  });




  return (
    <form method="post" id="general-admin-form" className="admin-body">
      <div className="admin-descriptions">
        {ROWS_OBJECTS.map(mapDescriptionRows)}
      </div>
      <div className="admin-fields">
        {ROWS_OBJECTS.map(mapInputRows)}
      </div>
      <div className="admin-values">
        {ROWS_OBJECTS.map(mapPreviewtRows)}
      </div>
    </form>
  )
};

export default GeneralAdmin;